<script setup lang="ts">
import DetailSection from '@/components/DetailSection.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import Navbar from '@/components/Navbar.vue'
import TrackList from '@/components/TrackList.vue'
import { Album, getAlbumDetail } from '@/data'
import { gridContentWidth } from '@/providers'
import { usePlayerStore } from '@/stores/player'
import { PlayArrowRound } from '@vicons/material'
import { Icon } from '@vicons/utils'
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const playerStore = usePlayerStore()

const navWidth = inject(gridContentWidth, ref(0))
const mainWidth = computed(() => {
  const maxWidth =
    document.documentElement.clientWidth > 1600
      ? 1600
      : document.documentElement.clientWidth
  const rate = navWidth.value / maxWidth

  if (maxWidth > 1100 && rate > 0.85) {
    return navWidth.value
  }
  if (maxWidth <= 1100) {
    return navWidth.value
  }
  return 0.85 * document.documentElement.clientWidth
})
const albumNameRef = ref<HTMLDivElement | null>()
const floatAlbumVisibility = ref(false)

const observer = new IntersectionObserver(setFloatAlbumVisibility, {
  threshold: [0],
  rootMargin: '-120px',
})
function setFloatAlbumVisibility(e: IntersectionObserverEntry[]) {
  floatAlbumVisibility.value = !e[0].isIntersecting
}

onMounted(() => {
  if (albumNameRef.value) {
    observer.observe(albumNameRef.value)
  }
})

onUnmounted(() => {
  if (albumNameRef.value) {
    observer.unobserve(albumNameRef.value)
    observer.disconnect()
  }
})

const albumData = ref<Album | null>(null)
const albumNameSize = ref(10)

const playingIndex = computed(() => {
  if (playerStore.playInfo.albumId === albumData.value?.id) {
    return playerStore.playInfo.trackIndex
  }
  return -1
})

function handlePlay(index: number) {
  playerStore.play(albumData.value?.id ?? '', index)
}

const route = useRoute()

onMounted(async () => {
  const { id } = <{ id: string }>route.params
  albumData.value = await getAlbumDetail(id)

  const partials = albumData.value.name.split(' ')
  for (const partial of partials) {
    const asciiLen = (partial.match(/[\x00-\x7F]/g) || []).length
    const otherLen = partial.length - asciiLen
    const len = 100 / (otherLen + 0.5 * asciiLen)

    if (len < albumNameSize.value) {
      albumNameSize.value = len
    }
  }
})
</script>

<template>
  <LoadingScreen dark :done="albumData !== null" />
  <div class="background">
    <div class="cover"></div>
    <div class="overlay"></div>
  </div>
  <div class="container">
    <Navbar dark />
    <div class="detail-wrapper">
      <img class="album-cover" :src="albumData?.cover" />
      <div class="album-info">
        <h1 ref="albumNameRef">{{ albumData?.name }}</h1>
        <h2>{{ albumData?.publisher }}</h2>
        <ul class="album-meta">
          <li>发行于 {{ albumData?.year }} 年</li>
          <template v-for="meta in albumData?.meta">
            <div class="dot"></div>
            <li>{{ meta }}</li>
          </template>
        </ul>
      </div>
      <div class="play-button-wrapper">
        <button class="button-round play-button" @click="handlePlay(0)">
          <Icon :size="24">
            <PlayArrowRound />
          </Icon>
        </button>
      </div>
      <div class="detail">
        <DetailSection>
          <template #title>Intro</template>
          <div v-html="albumData?.intro" class="intro-content"></div>
        </DetailSection>
        <TrackList
          :color="albumData?.color"
          :playing="playingIndex"
          :data="albumData?.track ?? []"
          @play="handlePlay"
        />
      </div>
    </div>
    <div class="float-album-wrapper">
      <div class="float-album" :class="{ visible: floatAlbumVisibility }">
        <div class="album-info">
          <h1>{{ albumData?.name }}</h1>
          <h2>{{ albumData?.publisher }}</h2>
          <ul class="album-meta">
            <li>发行于 {{ albumData?.year }} 年</li>
            <template v-for="meta in albumData?.meta">
              <div class="dot"></div>
              <li>{{ meta }}</li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/grid.scss';
@import '@/styles/button.scss';

$navbar-gap: 80px;
$grid-row-gap: 2rem;
$grid-col-gap: 5rem;
$breakpoint-lg: 1300px;
$breakpoint-md: 950px;
$breakpoint-sm: 450px;
$normal-cover-size: 350px;

.container {
  width: v-bind('mainWidth + "px"');
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: $navbar-gap;
  box-sizing: border-box;
  position: relative;
  z-index: 20;
  margin: 0 auto;
}

.background {
  position: fixed;
  inset: 0;
  z-index: 10;

  > * {
    position: fixed;
    inset: 0;
  }

  .cover {
    background-image: v-bind('"url("+albumData?.cover+")"');
    background-size: cover;
    filter: blur(40px);
    transform: scale(1.2); // Fix mobile browser navigator gap.
  }

  .overlay {
    background-color: rgba(0, 0, 0, 0.6);
    transform: scale(1.2);
  }
}

.detail-wrapper {
  margin-top: $navbar-gap;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: $grid-col-gap;
  row-gap: $grid-row-gap;
  container-type: inline-size;
  width: 100%;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: auto;
  }
}

.album-cover {
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 5px;
  display: block;
  grid-row: span 2;
  align-self: center;
  justify-self: center;
  box-shadow: 0 20px 40px 10px rgba(0, 0, 0, 0.2);
  width: $normal-cover-size;
  position: sticky;
  top: calc(120px + $grid-col-gap);
  z-index: 20;

  @media (max-width: $breakpoint-lg) {
    position: static;
  }

  @media (max-width: $breakpoint-md) {
    width: 90cqi;
  }

  @media (max-width: $breakpoint-sm) {
    width: 100cqi;
  }
}

.album-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  container-type: inline-size;

  h1,
  h2,
  ul {
    margin: 0;
    padding: 0;
  }

  h1 {
    color: rgba(255, 255, 255, 0.9);
    font-size: clamp(3rem, v-bind('albumNameSize + "cqi"'), 8rem);
    font-weight: 400;
  }

  h2 {
    margin-top: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
    font-size: clamp(1.5rem, 4cqi, 3rem);
    font-weight: 200;
  }

  ul {
    margin-top: 2rem;
    display: flex;
    list-style-type: none;
    gap: 0.5rem;
    font-weight: 300;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);

    .dot {
      width: 4px;
      height: 4px;
      border-radius: 2px;
      background-color: rgba(255, 255, 255, 0.6);
    }
  }
}

.play-button-wrapper {
  align-self: center;

  .play-button {
    background-color: v-bind('albumData?.color');
  }
}

.float-album-wrapper {
  $top-offset: calc(120px + $grid-col-gap + $normal-cover-size + 1rem);

  width: v-bind('mainWidth + "px"');
  position: fixed;
  top: $top-offset;
  left: 50%;
  transform: translateX(-50%);
}

.float-album {
  position: absolute;
  left: 0;
  width: $normal-cover-size;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: translateY(-5%);
  opacity: 0;
  transition: all 0.2s;

  @media (max-width: $breakpoint-lg) {
    display: none;
  }

  &.visible {
    transform: translateY(0);
    opacity: 1;
  }

  h1 {
    font-size: 2.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }
}

.detail {
  margin-top: calc($navbar-gap - $grid-row-gap);
  grid-column: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 15vh;

  @media (max-width: $breakpoint-lg) {
    justify-self: center;
    width: v-bind('navWidth + "px"');
    grid-column: 1 / -1;
  }
}

.intro-content {
  padding: 1rem;
}
</style>
