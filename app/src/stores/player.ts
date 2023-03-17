import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const playInfo = ref<{
    albumId: string
    trackIndex: number
  }>({
    albumId: '',
    trackIndex: -1,
  })
  const isPlaying = ref(false)

  function play(id: string, index: number) {
    playInfo.value.albumId = id
    playInfo.value.trackIndex = index
    isPlaying.value = true
  }

  function toggle() {
    isPlaying.value = !isPlaying.value
  }

  return { playInfo, isPlaying, play, toggle }
})
