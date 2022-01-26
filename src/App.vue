<template>
  <div class="h-screen flex flex-col">
    <header
      :style="{ height: `${HEADER_HEIGHT}px` }"
      class="flex items-center justify-center border-b-2 border-orange-200 shrink-0"
    >
      <span class="select-none text-3xl text-orange-400 font-sans" role="img"
        >lynes</span
      >
    </header>

    <Game />
  </div>
</template>

<script setup lang="ts">
  import Game from './components/Game.vue'
  import { HEADER_HEIGHT } from './store/game'
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates&family=Roboto+Slab:wght@350&display=swap');

  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  html {
    @apply bg-zinc-50 font-serif;
  }
</style>
