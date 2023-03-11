<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import { gridContentWidth } from '../providers'

const navWidth = inject(gridContentWidth, ref(0))
const mainWidth = computed(() => {
  const maxWidth =
    document.documentElement.clientWidth > 1600
      ? 1600
      : document.documentElement.clientWidth
  const rate = navWidth.value / maxWidth

  if (maxWidth > 1200 && rate > 0.85) {
    return navWidth.value + 'px'
  }
  if (maxWidth <= 1200) {
    return navWidth.value + 'px'
  }
  return '85vw'
})
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
    <div class="detail-wrapper" :style="{ width: mainWidth }">
      <div class="album">
        <img
          src="https://uni-storage-1253266055.cos.ap-guangzhou.myqcloud.com/bye-2022.webp"
        />
        <div class="album-info"></div>
      </div>
      <div class="detail"></div>
    </div>
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
  position: relative;
  z-index: 20;
}

.background {
  position: fixed;
  inset: 0;
  z-index: 10;

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

.detail-wrapper {
  display: flex;
  margin-top: 100px;
}

.album {
  > img {
    width: 350px;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 5px;
    display: block;
  }
}
</style>
