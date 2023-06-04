<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue'
import { gridContentWidth } from '@/providers'

const width = ref(0)
const testerRef = ref<HTMLDivElement | null>(null)

provide(gridContentWidth, width)

function updateWidth() {
  if (!testerRef.value) return

  width.value =
    document.documentElement.clientWidth -
    testerRef.value.getBoundingClientRect().left * 2
}

onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<template>
  <div class="grid-content-width-provider">
    <div class="grid-container">
      <div ref="testerRef"></div>
    </div>
  </div>
  <slot></slot>
</template>

<style lang="scss" scoped>
@import '@/styles/grid.scss';

.grid-content-width-provider {
  position: absolute;
  inset-inline: 0;
  height: 0;
  visibility: hidden;
}
</style>
