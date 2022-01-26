<template>
  <div class="relative flex flex-col justify-between h-full">
    <div class="relative h-full px-8">
      <div
        class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <span class="text-[30rem] text-zinc-200" v-if="gameStarted">
          {{ score }}
        </span>

        <div class="" v-else>
          <EnterKey class="w-40 h-40 text-zinc-300 animate-pulse" />
        </div>
      </div>

      <span
        class="absolute text-2xl transition-colors duration-200"
        :style="{
          top: `${y}px`,
          left: `${x}px`,
        }"
        v-for="{ word, x, y, highlighted } in displayWords"
        :key="word + x"
        :class="highlighted && 'text-lime-500'"
      >
        {{ word }}
      </span>
    </div>

    <div
      class="fixed bottom-0 w-full flex flex-col items-center justify-center space-y-3 bg-white border-t-2"
      :style="{
        height: `${DEATH_LINE}px`,
      }"
      :class="
        gameStarted
          ? isLastWordCorrect
            ? 'border-lime-400'
            : 'border-rose-400'
          : 'border-orange-200'
      "
    >
      <LivesBar :lives="lives" :total="totalLives" />

      <input
        ref="inputElement"
        class="bg-transparent text-center focus:outline-none text-2xl md:text-3xl mx-3"
        v-model="currentWord"
        @keydown="filterLetters"
        maxlength="15"
        autofocus
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useGame, DEATH_LINE } from '../store/game'
  import { onKeyPressed, useFocus } from '@vueuse/core'
  import { ref, watch } from 'vue'
  import LivesBar from './LivesBar.vue'
  import EnterKey from '../assets/EnterKey.svg'

  const isLastWordCorrect = ref(true)

  const {
    startGame,
    words,
    gameStarted,
    lives,
    gameOver,
    submitWord,
    score,
    totalLives,
    currentWord,
    displayWords,
  } = useGame()

  onKeyPressed('Enter', () => {
    if (!gameStarted.value) {
      startGame()
    } else {
      isLastWordCorrect.value = submitWord()
    }
  })

  const inputElement = ref<HTMLInputElement>()

  const { focused } = useFocus({
    target: inputElement,
    initialValue: true,
  })

  watch(focused, () => {
    focused.value = true
  })

  const filterLetters = (e: KeyboardEvent) => {
    if (!/[a-zа-яё]/i.test(e.key)) {
      e.preventDefault()
    }
  }
</script>
