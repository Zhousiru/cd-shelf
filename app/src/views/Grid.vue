<script setup lang="ts">
import { useRouter } from 'vue-router'
import CDCase from '../components/CDCase.vue'
import Navbar from '../components/Navbar.vue'

const router = useRouter()

function handleCDClick(cdID: string) {
  router.push({
    name: 'detail',
    params: {
      id: cdID,
    },
  })
}
</script>

<template>
  <div class="container">
    <Navbar />
    <div class="grid-container">
      <!-- Debug Data -->
      <CDCase
        v-for="i in 10"
        :album-art="`album${(i % 5) + 1}.jpg`"
        @click="handleCDClick(i.toString())"
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
