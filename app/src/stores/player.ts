import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getData } from '../data'

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

  async function next(step: number) {
    const albumData = (await getData()).find(
      (album) => album.id === playInfo.value.albumId
    )

    if (!albumData) {
      return
    }

    const len = albumData.track.length

    play(playInfo.value.albumId, (playInfo.value.trackIndex + step + len) % len)
  }

  return { playInfo, isPlaying, play, toggle, next }
})
