<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    done?: boolean
    dark?: boolean
  }>(),
  {
    done: true,
    dark: false,
  }
)

const display = ref(true)
const duration = ref(0.5)

watch(
  () => props.done,
  () => {
    if (props.done) {
      setTimeout(() => {
        display.value = false
      }, duration.value * 1000)
    }
  }
)
</script>

<template>
  <div class="loading" :class="{ hidden: props.done }" v-if="display">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.loading {
  position: fixed;
  inset: 0;
  z-index: 100;
  background-color: v-bind('props.dark ? "#222222" : "#f0f0f0"');
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading.hidden {
  transition: all v-bind('duration - 0.1 + "s"') 0.1s;
  opacity: 0;
  pointer-events: none;
  transform: scale(1.5);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: rotation 1s linear infinite;
  mix-blend-mode: difference;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
