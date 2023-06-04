<script setup lang="ts">
import type { Album, Track } from '@/data'
import { usePlayerStore } from '@/stores/player'
import { watch } from 'vue'

const playerStore = usePlayerStore()

const audio = new Audio()

navigator.mediaSession.setActionHandler('previoustrack', () => {
  playerStore.next(-1)
})
navigator.mediaSession.setActionHandler('nexttrack', () => {
  playerStore.next(1)
})

navigator.mediaSession.setActionHandler('play', () => {
  playerStore.isPlaying = true
})

navigator.mediaSession.setActionHandler('pause', () => {
  playerStore.isPlaying = false
})

navigator.mediaSession.setActionHandler('stop', () => {
  playerStore.isPlaying = false
  playerStore.playInfo = {
    albumId: '',
    trackIndex: -1,
  }
})

function setMetadata(albumData: Album | null, trackData: Track) {
  if (!albumData) {
    navigator.mediaSession.metadata = null
    return
  }

  navigator.mediaSession.metadata = new MediaMetadata({
    title: trackData.title,
    artist: albumData.publisher,
    album: albumData.name,
    artwork: [
      {
        src: albumData.cover,
      },
    ],
  })
}

audio.addEventListener('ended', () => {
  playerStore.next(1)
})

watch(
  () => playerStore.isPlaying,
  async () => {
    if (playerStore.isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }
)

watch(
  () => playerStore.playInfo,
  async () => {
    if (!playerStore.albumData) {
      return
    }
    const data = await playerStore.albumData
    const track = data.track[playerStore.playInfo.trackIndex]

    audio.src = track.source
    await audio.play()
    setMetadata(data, track)
  },
  { deep: true }
)
</script>

<template></template>
