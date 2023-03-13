<script setup lang="ts">
import {
  PlayArrowRound,
  SkipNextRound,
  SkipPreviousRound,
} from '@vicons/material'
import { Icon } from '@vicons/utils'
import { inject, ref } from 'vue'
import { gridContentWidth } from '../providers'

const { dark } = withDefaults(
  defineProps<{
    dark: boolean
  }>(),
  {
    dark: false,
  }
)

const width = inject(gridContentWidth, ref(0))
const playerVisibility = ref(false)

let timerId: number | null = null

function showPlayer() {
  if (timerId) {
    clearTimeout(timerId)
  }

  playerVisibility.value = true
}

function hidePlayer() {
  timerId = setTimeout(() => {
    playerVisibility.value = false
  }, 250)
}
</script>

<template>
  <div class="navbar-wrapper" :class="{ dark }">
    <div
      class="overlay"
      :class="{ visible: playerVisibility }"
      @click="playerVisibility = false"
    ></div>
    <div :style="{ width: `${width}px` }">
      <nav>
        <div class="site-title" role="link" @click="$router.push('/')">
          <div class="sup">指针的</div>
          <div>CD 架</div>
        </div>
        <div class="mini-player">
          <div
            class="blur-cover"
            :style="{ backgroundImage: `url(/debug/album3.jpg)` }"
          ></div>
          <div class="control-area" :class="{ visible: !playerVisibility }">
            <button class="control">
              <Icon :size="24">
                <PlayArrowRound />
              </Icon>
            </button>
            <button class="control">
              <Icon :size="24">
                <SkipNextRound />
              </Icon>
            </button>
          </div>
          <button
            class="expand-info"
            @mouseenter="showPlayer"
            @mouseleave="hidePlayer"
          >
            <div class="play-info" translate="no">
              <div class="title">雲上の桜花道</div>
              <div class="album-info">
                <div class="album">桜花爛漫</div>
                <div class="dot"></div>
                <div class="artist">Sound Refil</div>
              </div>
            </div>
          </button>
        </div>
      </nav>
      <div
        class="player"
        :class="{ visible: playerVisibility }"
        @mouseenter="showPlayer"
        @mouseleave="hidePlayer"
      >
        <img src="/debug/album3.jpg" />
        <div class="content">
          <div class="play-info">
            <div class="title">雲上の桜花道</div>
            <div class="album-info">
              <div class="album">桜花爛漫</div>
              <div class="dot"></div>
              <div class="artist">Sound Refil</div>
            </div>
          </div>
          <div class="control-area">
            <button class="control">
              <Icon :size="24">
                <SkipPreviousRound />
              </Icon>
            </button>
            <button class="control">
              <Icon :size="24">
                <PlayArrowRound />
              </Icon>
            </button>
            <button class="control">
              <Icon :size="24">
                <SkipNextRound />
              </Icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$border-radius: 5px;
$border: rgba(30, 30, 30, 0.2) 1px solid;
$outline-shadow: 0 0 0 0.5px rgba(30, 30, 30, 0.2);
$backdrop-blur: 20px;
$text-in-light: rgba(0, 0, 0, 0.8);
$text-in-dark: rgba(255, 255, 255, 0.8);

.navbar-wrapper {
  position: sticky;
  top: 20px;
  z-index: 90;
}

nav {
  height: 100px;
  backdrop-filter: blur($backdrop-blur);
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  padding: 1em;
  box-sizing: border-box;
  align-items: center;
  border-radius: $border-radius;
  box-shadow: $outline-shadow;
  overflow: hidden;
  position: relative;
  z-index: 100;

  @at-root .dark & {
    background-color: rgba(255, 255, 255, 0.1);
  }

  button {
    @at-root .dark & {
      color: $text-in-dark;
    }
  }
}

.site-title {
  font-size: 2rem;
  cursor: pointer;

  .sup {
    color: rgba(0, 0, 0, 0.5);
    font-size: 1rem;

    @at-root .dark & {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  @at-root .dark & {
    color: $text-in-dark;
  }
}

button.control,
button.expand-info {
  background-color: transparent;
  border: none;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: rgba(30, 30, 30, 0.1);
  }
}

button.control {
  display: flex;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
}

.mini-player {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;

  .expand-info {
    padding: 10px;
    border-radius: $border-radius;
  }

  .blur-cover {
    position: absolute;
    background-size: cover;
    inset-block: 0;
    width: 40%;
    min-width: 300px;
    right: 0;
    filter: blur(40px);
    mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1) 30%,
      rgba(0, 0, 0, 1)
    );
    opacity: 0.5;
    pointer-events: none;
    z-index: -1;
  }

  .play-info .title {
    opacity: 0.8;
  }

  .control-area {
    display: flex;
    gap: 5px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(5%);
    transition: all 0.2s;

    &.visible {
      opacity: 1;
      transform: translateX(0);
      pointer-events: all;
    }
  }

  button.control {
    @media (width < 450px) {
      display: none;
    }
  }
}

.play-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  .title {
    font-size: 1.1rem;
  }

  .album-info {
    opacity: 0.5;
    font-size: 0.9rem;
    display: flex;
    gap: 5px;
    align-items: center;

    .dot {
      width: 4px;
      height: 4px;
      border-radius: 2px;
      background-color: $text-in-light;

      @at-root .dark nav & {
        background-color: $text-in-dark;
      }
    }
  }
}

.player {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 90;
  right: 0;
  margin-top: 10px;
  border-radius: $border-radius;
  box-shadow: $outline-shadow;
  overflow: hidden;
  backdrop-filter: blur($backdrop-blur);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-5%) scale(0.95);
  transition: all 0.2s;

  &.visible {
    transform: translateY(0) scale(1);
    pointer-events: all;
    opacity: 1;
  }

  img {
    display: block;
    object-fit: cover;
    height: 250px;
    aspect-ratio: 1;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .play-info {
    padding: 0.5rem;
    border-block: $border;
  }

  .control-area {
    display: flex;
    justify-content: center;
    gap: 5px;
    padding-block: 0.5rem;
    background-color: rgba(0, 0, 0, 0.03);
  }

  button.control {
    height: 42px;
    width: 42px;
  }
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  backdrop-filter: grayscale(0.8) blur(2px);
  background-color: rgba(255, 255, 255, 0.2);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;

  &.visible {
    opacity: 1;
    pointer-events: all;

    @at-root .dark & {
      opacity: 0;
    }
  }
}
</style>
