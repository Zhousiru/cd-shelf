<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import { gridContentWidth } from '../providers'
import { PlayArrowRound } from '@vicons/material'
import { Icon } from '@vicons/utils'

const navWidth = inject(gridContentWidth, ref(0))
const mainWidth = computed(() => {
  const maxWidth =
    document.documentElement.clientWidth > 1600
      ? 1600
      : document.documentElement.clientWidth
  const rate = navWidth.value / maxWidth

  if (maxWidth > 1100 && rate > 0.85) {
    return navWidth.value + 'px'
  }
  if (maxWidth <= 1100) {
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
        <img src="http://127.0.0.1:8000/album1.jpg" />
        <div class="album-info">
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
  flex-direction: column;
}

.album {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 5rem;
  row-gap: 2rem;
  container-type: inline-size;

  @media screen and (max-width: 950px) {
    grid-template-columns: auto;
    justify-content: center;
  }

  > img {
    width: min(100cqi, 350px);
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 5px;
    display: block;
    grid-row: span 2;
    align-self: center;
    box-shadow: 0 20px 40px 10px rgba(0, 0, 0, 0.2);
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
}
</style>
