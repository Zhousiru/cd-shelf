<script setup lang="ts">
import { watch } from 'vue'
import { getData } from '../data'
import type { Album, Track } from '../data'
import { usePlayerStore } from '../stores/player'

const playerStore = usePlayerStore()

const audio = new Audio()

navigator.mediaSession.setActionHandler('previoustrack', () => {
  console.log('MS: Previous')
  playerStore.next(-1)
})
navigator.mediaSession.setActionHandler('nexttrack', () => {
  console.log('MS: Next')
  playerStore.next(1)
})

navigator.mediaSession.setActionHandler('play', () => {
  console.log('MS: Play')
  playerStore.isPlaying = true
})

navigator.mediaSession.setActionHandler('pause', () => {
  console.log('MS: Pause')
  playerStore.isPlaying = false
})

navigator.mediaSession.setActionHandler('stop', () => {
  playerStore.isPlaying = false
  playerStore.playInfo = {
    albumId: '',
    trackIndex: -1,
  }
})

function setMetadata(albumData: Album, trackData: Track) {
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
    audio.play().then(() => setMetadata(albumData, track))
  },
  { deep: true }
)
</script>

<template></template>
