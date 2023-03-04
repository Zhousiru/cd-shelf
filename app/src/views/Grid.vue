<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { PlayArrowRound, SkipNextRound } from '@vicons/material'
import { Icon } from '@vicons/utils'
import CDCase from '../components/CDCase.vue'

const elCDCases = ref<Array<InstanceType<typeof CDCase>> | null>(null)
const elNavbar = ref<HTMLDivElement | null>(null)

const navWidth = ref('0px')

function adjustNavWidth() {
  if (!elCDCases.value) return

  const first: HTMLDivElement = elCDCases.value[0].$el

  const width =
    document.documentElement.clientWidth -
    first.getBoundingClientRect().left * 2

  navWidth.value = width + 'px'
}

onMounted(() => {
  adjustNavWidth()
  window.addEventListener('resize', adjustNavWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', adjustNavWidth)
})
</script>

<template>
  <div class="container">
    <nav :style="{ width: navWidth }" class="navbar" ref="elNavbar">
      <div class="title">
        <div class="sup">指针的</div>
        <div>CD 架</div>
      </div>
      <div class="playing">
        <div
          class="cover"
          style="background-image: url(http://127.0.0.1:8000/album3.jpg)"
        ></div>
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
        <button class="info" translate="no">
          <div class="title">雲上の桜花道</div>
          <div class="album-info">
            <div class="album">桜花爛漫</div>
            <div class="dot"></div>
            <div class="artist">Sound Refil</div>
          </div>
        </button>
      </div>
    </nav>
    <div class="cd-container">
      <!-- Debug Data -->
      <CDCase
        class="cd-case"
        v-for="i in 10"
        :album-art="`http://127.0.0.1:8000/album${(i % 5) + 1}.jpg`"
        ref="elCDCases"
      ></CDCase>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 20vh;
  box-sizing: border-box;
}

.navbar {
  height: 100px;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  padding: 1em;
  box-sizing: border-box;
  align-items: center;
  border-radius: var(--card-border-radius);
  position: sticky;
  top: 20px;
  z-index: 10;
  transition: background-color 0.2s;
  border: rgba(30, 30, 30, 0.2) 1px solid;
  overflow: hidden;
}

.navbar > .title {
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.8);
  flex: 1;
}

.navbar > .title > .sup {
  color: rgba(0, 0, 0, 0.5);
  font-size: 1rem;
}

.playing {
  display: flex;
  align-items: center;
  gap: 5px;
}

.playing > .control {
  display: flex;
  gap: 5px;
}

.playing > .control {
  background-color: transparent;
  border: none;
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  transition: background-color 0.2s;
  cursor: pointer;
}

.playing > .control:hover {
  background-color: rgba(30, 30, 30, 0.1);
}

.playing > .cover {
  position: absolute;
  background-size: cover;
  inset-block: 0;
  left: 60%;
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

.playing .info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: background-color 0.2s;
  padding: 10px;
  border-radius: var(--card-border-radius);
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.playing .info:hover {
  background-color: rgba(30, 30, 30, 0.1);
}

.playing .info > .title {
  font-size: 1.1rem;
  opacity: 0.8;
}

.playing .album-info {
  opacity: 0.5;
  font-size: 0.9rem;
  display: flex;
  gap: 5px;
  align-items: center;
}

.playing .album-info .dot {
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: #000;
}

.cd-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  justify-content: center;
  width: 90vw;
  max-width: 1400px;
  grid-gap: clamp(50px, 5vw, 100px);
  margin-top: clamp(50px, 5vw, 100px);
}

.cd-case {
  width: 400px;
}

@media (max-width: 950px) {
  .cd-container {
    grid-template-columns: repeat(auto-fill, clamp(420px, 60vw, 100vw));
  }

  .cd-case {
    width: clamp(420px, 60vw, 100vw);
  }
}

@media (max-width: 450px) {
  .cd-container {
    grid-template-columns: repeat(auto-fill, 320px);
  }

  .cd-case {
    width: 320px;
  }

  .playing > .control {
    display: none;
  }
}
</style>
