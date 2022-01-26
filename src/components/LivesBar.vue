<template>
  <div class="flex space-x-1">
    <component
      v-for="i in total"
      :is="i <= lives ? HeartIcon : OutlineHeartIcon"
      class="w-6 h-6 text-rose-500"
    />
  </div>
</template>

<script setup lang="ts">
  import { HeartIcon } from '@heroicons/vue/solid'
  import { HeartIcon as OutlineHeartIcon } from '@heroicons/vue/outline'

  defineProps<{
    lives: number
    total: number
  }>()
</script>
