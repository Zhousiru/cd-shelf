<script setup lang="ts">
import { watch } from 'vue'
import { usePlayerStore } from '../stores/player'

const playerStore = usePlayerStore()

watch(
  () => playerStore.isPlaying,
  async () => {
    console.log(playerStore.isPlaying ? 'Playing' : 'Paused')
  }
)

watch(
  () => playerStore.playInfo,
  async () => {
    console.log('Play info changed:', playerStore.playInfo)
  },
  { deep: true }
)
</script>

<template></template>
