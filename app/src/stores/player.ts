import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getData } from '../data'

export const usePlayerStore = defineStore('player', () => {
  const albumId = ref('')
  const trackIndex = ref(0)
  const isPlaying = ref(false)

  const album = computed(async () => {
    for (const el of await getData()) {
      if (albumId.value === el.id) {
        return el
      }
    }
    return undefined
  })

  const track = computed(async () => {
    const trackList = (await album.value)?.track

    if (!trackList || trackList.length - 1 < trackIndex.value) {
      return undefined
    }

    return trackList[trackIndex.value]
  })

  function play(id: string, index: number) {
    albumId.value = id
    trackIndex.value = index
    isPlaying.value = true
  }

  function toggle() {
    isPlaying.value = !isPlaying.value
  }

  return { isPlaying, album, track, play, toggle }
})
