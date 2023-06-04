<script setup lang="ts">
import CDCase from '@/components/CDCase.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import Navbar from '@/components/Navbar.vue'
import { Index, getIndex } from '@/data'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function handleCDClick(cdID: string) {
  router.push({
    name: 'detail',
    params: {
      id: cdID,
    },
  })
}

const items = ref<Array<Index> | null>(null)

onMounted(async () => {
  items.value = await getIndex()
})
</script>

<template>
  <LoadingScreen :done="items !== null" />
  <div class="container">
    <Navbar />
    <div class="grid-container">
      <CDCase
        v-for="album in items"
        :album-art="album.cover"
        @click="handleCDClick(album.id)"
      />
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/grid.scss';

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
