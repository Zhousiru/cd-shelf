<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <div class="background">
    <div
      class="cover"
      :style="{ backgroundImage: 'url(http://127.0.0.1:8000/album1.jpg)' }"
    ></div>
    <div class="overlay"></div>
  </div>
  <div class="container">
    <Navbar dark />
  </div>
</template>

<style scoped lang="scss">
@import '../styles/grid.scss';

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  box-sizing: border-box;
}

.background {
  position: fixed;
  inset: 0;

  > * {
    position: fixed;
    inset: 0;
  }

  .cover {
    background-size: cover;
    filter: blur(40px);
    transform: scale(1.2);
  }

  .overlay {
    background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
