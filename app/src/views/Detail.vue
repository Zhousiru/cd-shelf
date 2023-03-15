<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import { gridContentWidth } from '../providers'
import { PlayArrowRound } from '@vicons/material'
import { Icon } from '@vicons/utils'
import DetailSection from '../components/DetailSection.vue'

const navWidth = inject(gridContentWidth, ref(0))
const mainWidth = computed(() => {
  const maxWidth =
    document.documentElement.clientWidth > 1600
      ? 1600
      : document.documentElement.clientWidth
  const rate = navWidth.value / maxWidth

  if (maxWidth > 1100 && rate > 0.85) {
    return navWidth.value
  }
  if (maxWidth <= 1100) {
    return navWidth.value
  }
  return 0.85 * document.documentElement.clientWidth
})
const albumRef = ref<HTMLDivElement | null>()
const floatAlbumVisibility = ref(false)

const observer = new IntersectionObserver(setFloatAlbumVisibility, {
  threshold: [0],
})
function setFloatAlbumVisibility(e: IntersectionObserverEntry[]) {
  floatAlbumVisibility.value = !e[0].isIntersecting
}

onMounted(() => {
  if (albumRef.value) {
    observer.observe(albumRef.value)
  }
})

onUnmounted(() => {
  if (albumRef.value) {
    observer.unobserve(albumRef.value)
    observer.disconnect()
  }
})
</script>

<template>
  <div class="background">
    <div
      class="cover"
      :style="{
        backgroundImage: `url(/debug/album1.jpg)`,
      }"
    ></div>
    <div class="overlay"></div>
  </div>
  <div class="container" :style="{ width: `${mainWidth}px` }">
    <Navbar dark />
    <div class="detail-wrapper">
      <img class="album-cover" src="/debug/album1.jpg" />
      <div class="album-info" ref="albumRef">
        <h1>晴雲秋月</h1>
        <h2>Sound Refil</h2>
        <ul class="album-meta">
          <li>发行于 2015 年</li>
          <div class="dot"></div>
          <li>购于骏河屋</li>
        </ul>
      </div>
      <div class="play-button-wrapper">
        <button class="play" :style="{ backgroundColor: 'rgb(207, 66, 22)' }">
          <Icon :size="24">
            <PlayArrowRound />
          </Icon>
        </button>
      </div>
      <div class="detail" :style="{ width: `${navWidth}px` }">
        <DetailSection v-for="i in 10">
          <template #title>Intro</template>
          介绍介绍，介绍介绍介绍，介绍。介绍介绍，介绍介绍介绍，介绍。介绍介绍，介绍介绍介绍，介绍。介绍介绍，介绍介绍介绍，介绍。介绍介绍，介绍介绍介绍，介绍。介绍介绍，介绍介绍介绍，介绍。介绍介绍，介绍介绍介绍，介绍。介绍介绍，介绍介绍介绍，介绍。介绍介绍，介绍介绍介绍，介绍。介绍介绍，介绍介绍介绍，介绍。
        </DetailSection>
      </div>
    </div>
    <div class="float-album-wrapper" :style="{ width: `${mainWidth}px` }">
      <div class="float-album" :class="{ visible: floatAlbumVisibility }">
        <div class="album-info">
          <h1>晴雲秋月</h1>
          <h2>Sound Refil</h2>
          <ul class="album-meta">
            <li>发行于 2015 年</li>
            <div class="dot"></div>
            <li>购于骏河屋</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../styles/grid.scss';
$navbar-gap: 80px;
$grid-row-gap: 2rem;
$grid-col-gap: 5rem;
$breakpoint-lg: 1300px;
$breakpoint-md: 950px;
$breakpoint-sm: 450px;
$normal-cover-size: 350px;

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: $navbar-gap;
  box-sizing: border-box;
  position: relative;
  z-index: 20;
  margin: 0 auto;
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
    transform: scale(1.2); // Fix mobile browser navigator gap.
  }

  .overlay {
    background-color: rgba(0, 0, 0, 0.6);
    transform: scale(1.2);
  }
}

.detail-wrapper {
  margin-top: $navbar-gap;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: $grid-col-gap;
  row-gap: $grid-row-gap;
  container-type: inline-size;
  width: 100%;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: auto;
  }
}

.album-cover {
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 5px;
  display: block;
  grid-row: span 2;
  align-self: center;
  justify-self: center;
  box-shadow: 0 20px 40px 10px rgba(0, 0, 0, 0.2);
  width: $normal-cover-size;
  position: sticky;
  top: calc(120px + $grid-col-gap);
  z-index: 20;

  @media (max-width: $breakpoint-lg) {
    position: static;
  }

  @media (max-width: $breakpoint-md) {
    width: 90cqi;
  }

  @media (max-width: $breakpoint-sm) {
    width: 100cqi;
  }
}

.album-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  container-type: inline-size;

  h1,
  h2,
  ul {
    margin: 0;
    padding: 0;
  }

  h1 {
    color: rgba(255, 255, 255, 0.9);
    font-size: clamp(4rem, 12cqi, 8rem);
    font-weight: 400;
  }

  h2 {
    margin-top: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
    font-size: clamp(1.5rem, 4cqi, 3rem);
    font-weight: 200;
  }

  ul {
    margin-top: 2rem;
    display: flex;
    list-style-type: none;
    gap: 0.5rem;
    font-weight: 100;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);

    .dot {
      width: 4px;
      height: 4px;
      border-radius: 2px;
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
}

.play-button-wrapper {
  align-self: center;

  button.play {
    border: none;
    width: 150px;
    height: 50px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background-color: rgba(255, 255, 255, 0.1);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s;
    }

    &:hover::after {
      opacity: 1;
    }
  }
}

.float-album-wrapper {
  $top-offset: calc(120px + $grid-col-gap + $normal-cover-size + 1rem);

  position: fixed;
  top: $top-offset;
  left: 50%;
  transform: translateX(-50%);
}

.float-album {
  position: absolute;
  left: 0;
  width: $normal-cover-size;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: translateY(-5%);
  opacity: 0;
  transition: all 0.2s;

  @media (max-width: $breakpoint-lg) {
    display: none;
  }

  &.visible {
    transform: translateY(0);
    opacity: 1;
  }

  h1 {
    font-size: 2.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }
}

.detail {
  margin-top: calc($navbar-gap - $grid-row-gap);
  grid-column: 2;
  justify-self: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: $breakpoint-lg) {
    width: 100% !important;
  }

  @media (max-width: $breakpoint-lg) {
    grid-column: 1 / -1;
  }
}
</style>
