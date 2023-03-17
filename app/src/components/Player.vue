<script setup lang="ts">
import { watch } from 'vue'
import { getData } from '../data'
import { usePlayerStore } from '../stores/player'

const playerStore = usePlayerStore()

const audio = new Audio()

audio.addEventListener('ended', () => {
  playerStore.next(1)
})

watch(
  () => playerStore.isPlaying,
  async () => {
    console.log(playerStore.isPlaying ? 'Playing' : 'Paused')
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
    console.log('Play info changed:', playerStore.playInfo)

    const albumData = (await getData()).find(
      (album) => album.id === playerStore.playInfo.albumId
    )

    if (!albumData) {
      return
    }

    const track = albumData.track[playerStore.playInfo.trackIndex]

    audio.src = track.source
    audio.load()
    audio.play()
  },
  { deep: true }
)
</script>

<template></template>
