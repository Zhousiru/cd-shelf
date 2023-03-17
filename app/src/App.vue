<script setup lang="ts">
import GridContentWidthProvider from './components/GridContentWidthProvider.vue'
import Player from './components/Player.vue'
</script>

<template>
  <KeepAlive>
    <Player />
  </KeepAlive>
  <GridContentWidthProvider>
    <RouterView />
  </GridContentWidthProvider>
</template>

<style scoped></style>
