<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import CDCase from '../components/CDCase.vue'
import Navbar from '../components/Navbar.vue'
</script>

<template>
  <div class="container">
    <Navbar />
    <div class="grid-container">
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
@import '../styles/grid.scss';

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 20vh;
  box-sizing: border-box;
}

.grid-container {
  margin-top: 80px;
}
</style>
