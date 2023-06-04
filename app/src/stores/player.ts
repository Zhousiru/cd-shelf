import { Album, getAlbumDetail } from '@/data'
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
  const albumData = ref<null | Promise<Album>>(null)

  async function play(id: string, index: number) {
    if (id !== playInfo.value.albumId) {
      albumData.value = getAlbumDetail(id)
    }

    playInfo.value.albumId = id
    playInfo.value.trackIndex = index
    isPlaying.value = true
  }

  function toggle() {
    isPlaying.value = !isPlaying.value
  }

  async function next(step: number) {
    const data = await albumData.value
    if (!data) {
      return
    }

    const len = data.track.length

    play(playInfo.value.albumId, (playInfo.value.trackIndex + step + len) % len)
  }

  return { playInfo, isPlaying, albumData, play, toggle, next }
})
