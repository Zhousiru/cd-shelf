<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import CDCase from '../components/CDCase.vue'
import Navbar from '../components/Navbar.vue'

const elCDCases = ref<Array<InstanceType<typeof CDCase>> | null>(null)
const navbarWidth = ref(0)

function setNavbarWidth() {
  if (!elCDCases.value) return

  const first: HTMLDivElement = elCDCases.value[0].$el

  navbarWidth.value =
    document.documentElement.clientWidth -
    first.getBoundingClientRect().left * 2

  console.log(navbarWidth.value)
}

onMounted(() => {
  setNavbarWidth()
  window.addEventListener('resize', setNavbarWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', setNavbarWidth)
})
</script>

<template>
  <div class="container">
    <Navbar :width="navbarWidth" />
    <div class="cd-container">
      <!-- Debug Data -->
      <CDCase
        class="cd-case"
        v-for="i in 10"
        :album-art="`http://127.0.0.1:8000/album${(i % 5) + 1}.jpg`"
        ref="elCDCases"
      />
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
}
</style>
