<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'lodash-es'
import CDCase from '../components/CDCase.vue'

const elCDCases = ref<Array<InstanceType<typeof CDCase>> | null>(null)
const elNavbar = ref<HTMLDivElement | null>(null)
const navWidth = ref('0px')
const navbarFloating = ref(false)

const adjustNavWidth = throttle(() => {
  if (!elCDCases.value) return

  const first: HTMLDivElement = elCDCases.value[0].$el

  const width =
    document.documentElement.clientWidth -
    first.getBoundingClientRect().left * 2

  navWidth.value = width + 'px'
}, 200)

const adjustNavFloating = throttle(() => {
  if (!elNavbar.value) return

  const top = elNavbar.value.getBoundingClientRect().top

  if (top > 20) {
    navbarFloating.value = false
  } else {
    navbarFloating.value = true
  }
}, 200)

onMounted(() => {
  adjustNavWidth()
  window.addEventListener('resize', adjustNavWidth)
  window.addEventListener('scroll', adjustNavFloating)
})

onUnmounted(() => {
  window.removeEventListener('resize', adjustNavWidth)
  window.removeEventListener('scroll', adjustNavFloating)
})
</script>

<template>
  <div class="container">
    <nav
      :style="{ width: navWidth }"
      class="navbar"
      :class="{ float: navbarFloating }"
      ref="elNavbar"
    >
      <div class="title">
        <div class="sup">指针的</div>
        <div>CD 架</div>
      </div>
      <div></div>
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
  background-color: #fff;
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
}

.navbar.float {
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.9);
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

.cd-case {
  width: 400px;
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
