<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import CDCase from '../components/CDCase.vue'

const elPlayerCardContent = ref<HTMLDivElement | null>(null)
const navWidth = ref('0px')

function adjustNav() {
  if (!elPlayerCardContent.value) return

  const width =
    document.documentElement.clientWidth -
    elPlayerCardContent.value.getClientRects()[0].left * 2

  navWidth.value = width + 'px'
}

onMounted(() => {
  adjustNav()
  window.addEventListener('resize', adjustNav)
})

onUnmounted(() => {
  window.removeEventListener('resize', adjustNav)
})
</script>

<template>
  <div class="container">
    <nav :style="{ width: navWidth }" class="navbar">
      <div class="title">
        <div class="sup">指针的</div>
        <div>CD 架</div>
      </div>
      <div></div>
    </nav>
    <div class="cd-container">
      <div class="player-card">
        <div class="shadow">
          <div class="bg"></div>
        </div>
        <div class="content" ref="elPlayerCardContent">Player</div>
      </div>
      <!-- Debug Data -->
      <CDCase
        class="cd-case"
        v-for="i in 10"
        :album-art="`http://127.0.0.1:8000/album${(i % 5) + 1}.jpg`"
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
  padding-block: 10vh;
  box-sizing: border-box;
}

.navbar {
  height: 100px;
  background-color: #fff;
  margin-top: 10vh;
  display: flex;
  padding: 1em;
  box-sizing: border-box;
  align-items: center;
  border-radius: var(--card-border-radius);
}

.navbar > .title {
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.8);
}

.navbar > .title > .sup {
  color: rgba(0, 0, 0, 0.5);
  font-size: 1rem;
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

.cd-case,
.player-card {
  width: 400px;
}

.player-card {
  aspect-ratio: 10 / 9;
  position: relative;
}

.player-card > div {
  position: absolute;
  inset: 6px;
}

.player-card > .content {
  background-color: #fff;
  border-radius: var(--card-border-radius);
}

.player-card > .shadow {
  filter: blur(80px);
  transform: scale(0.75);
  border-radius: 50px;
  overflow: hidden;
  opacity: 0.8;
}

.player-card > .shadow > .bg {
  background-image: linear-gradient(
    103.3deg,
    rgba(252, 225, 208, 1) 30%,
    rgba(255, 173, 214, 1) 55.7%,
    rgba(162, 186, 245, 1) 81.8%
  );
  inset: 0;
  position: absolute;
  animation: spin 10s linear infinite;
}

@keyframes spin {
  from {
    transform: scale(1.4) rotate(0deg);
  }
  to {
    transform: scale(1.4) rotate(360deg);
  }
}

@media (max-width: 450px) {
  .cd-container {
    grid-template-columns: repeat(auto-fill, 320px);
  }

  .cd-case,
  .player-card {
    width: 320px;
  }
  .player-card > div {
    position: absolute;
    inset: 4px;
  }
}

.sidebar {
  background-color: #fff;
  width: 120px;
  height: 500px;
  position: fixed;
  left: 10vw;
  top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  gap: 1rem;
}

.sidebar .title {
  padding: 0;
}
</style>
