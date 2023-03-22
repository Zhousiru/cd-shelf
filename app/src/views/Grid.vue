<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CDCase from '../components/CDCase.vue'
import Navbar from '../components/Navbar.vue'
import { getData } from '../data'
import type { Data } from '../data'

const router = useRouter()

function handleCDClick(cdID: string) {
  router.push({
    name: 'detail',
    params: {
      id: cdID,
    },
  })
}

const data = ref<Data>()

onMounted(async () => {
  data.value = await getData()
})
</script>

<template>
  <div class="container">
    <Navbar />
    <div class="grid-container">
      <!-- Debug Data -->
      <CDCase
        v-for="album in data"
        :album-art="album.cover"
        @click="handleCDClick(album.id)"
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
