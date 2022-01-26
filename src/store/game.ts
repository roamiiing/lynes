import { computed, reactive, ref, watchEffect } from 'vue'
import randomWords from 'random-words'
import { sleep } from '../utils/sleep'

export type Word = {
  x: number
  y: number
  speed: number
  word: string
}

export const DEATH_LINE = 200

export const HEADER_HEIGHT = 64

const gameStarted = ref(false)

const currentSpeed = ref(0.5)

const gameOver = ref(false)

const words = reactive<Word[]>([])

const displayWords = computed(() =>
  words.map(v => ({
    ...v,
    highlighted:
      currentWord.value.length >= 2 && v.word.includes(currentWord.value, 0),
  })),
)

const score = ref(0)

const totalLives = ref(3)

const lives = ref(3)

const streakCount = ref(0)

const currentWord = ref('')

watchEffect(() => {
  if (lives.value <= 0) {
    gameOver.value = true
    words.splice(0, words.length)
  }
})

const addNewWord = () => {
  words.push({
    // x: Math.random() * 0.8 * window.innerWidth + 0.1 * window.innerWidth,
    x: window.innerWidth * (Math.random() * 0.8 + 0.1),
    y: 0,
    word: randomWords({ exactly: 1, maxLength: 9 })[0],
    speed: currentSpeed.value,
  })
}

const startGame = async () => {
  if (gameStarted.value) return

  gameStarted.value = true

  const animation = () => {
    words.forEach((word, i) => {
      if (word.y > window.innerHeight - HEADER_HEIGHT - DEATH_LINE - 20) {
        words.splice(i, 1)
        lives.value--
        streakCount.value = 0
        addNewWord()
      }

      word.y += currentSpeed.value
    })

    requestAnimationFrame(animation)
  }

  requestAnimationFrame(animation)

  for await (const _ of Array.from({ length: 5 }, (_, i) => sleep(600 * i))) {
    addNewWord()
  }
}

const submitWord = () => {
  const indexToRemove = words.findIndex(val => val.word === currentWord.value)

  if (indexToRemove !== -1) {
    words.splice(indexToRemove, 1)
    score.value += currentWord.value.length

    streakCount.value++
    if (streakCount.value % 10 === 0 && totalLives.value < 10) {
      totalLives.value++
    }

    if (streakCount.value % 5 === 0 && lives.value < totalLives.value) {
      lives.value++
    }

    addNewWord()

    currentWord.value = ''
    return true
  }

  streakCount.value = 0
  currentSpeed.value += 0.1

  currentWord.value = ''

  return false
}

export const useGame = () => {
  return {
    gameStarted,
    gameOver,
    startGame,
    words,
    submitWord,
    lives,
    score,
    totalLives,
    currentWord,
    displayWords,
  }
}
