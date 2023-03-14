import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const albumId = ref('')
  const status = ref<'playing' | 'paused' | undefined>()

  return { albumId, status }
})
