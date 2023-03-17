<script setup lang="ts">
import { NumbersRound, StarRound, PlayArrowRound } from '@vicons/material'
import { Icon } from '@vicons/utils'
import { onMounted, onUnmounted, ref } from 'vue'
import DetailSection from './DetailSection.vue'

const data = ref([
  {
    title: '諷詠',
    duration: 145,
    star: true,
    comment:
      'test test test test test test test test test test test test test test test test test test',
    meta: { 编曲: '漉餡', 原曲: '不思議なお祓い棒' },
    source: '',
  },
  {
    title: '汀',
    duration: 214,
    star: true,
    comment:
      'test test test test test test test test test test test test test test test test test test',
    meta: {
      编曲: '漉餡',
      演唱: 'Laco.',
      作詞: '鷹野友紀',
      原曲: 'ミストレイク',
    },
    source: '',
  },
  {
    title: '柳ニ風',
    duration: 209,
    star: false,
    comment: '',
    meta: { 编曲: '漉餡', 原曲: '柳の下のデュラハン' },
    source: '',
  },
  {
    title: '蒼月夜',
    duration: 329,
    star: false,
    comment: '',
    meta: {
      编曲: '漉餡',
      演唱: 'Laco.',
      作詞: '鷹野友紀',
      原曲: '満月の竹林',
    },
    source: '',
  },
  {
    title: '鬼謳',
    duration: 231,
    star: false,
    comment: '',
    meta: {
      编曲: 'RD-Sounds',
      原曲: 'リバースイデオロギー',
    },
    source: '',
  },
  {
    title: '敢闘 -little bravery-',
    duration: 205,
    star: false,
    comment: '',
    meta: {
      编曲: '漉餡',
      原曲: '輝く針の小人族 ~ Little Princess',
    },
    source: '',
  },
  {
    title: '汀 (Instrumental ver)',
    duration: 214,
    star: true,
    comment: '',
    meta: { 编曲: '漉餡', 原曲: 'ミストレイク' },
    source: '',
  },
  {
    title: '蒼月夜 (Instrumental ver)',
    duration: 328,
    star: true,
    comment: '',
    meta: { 编曲: '漉餡', 原曲: '満月の竹林' },
    source: '',
  },
])
const trackListRef = ref<Record<number, HTMLOListElement>>({})
const expanded = ref<{
  index: number
  height: number
}>({
  index: -1,
  height: -1,
})
const nowPlaying = ref<number>(0)

function setExpandedHeight() {
  if (expanded.value.index === -1) {
    return
  }

  const contentEl = trackListRef.value[expanded.value.index].querySelector(
    '.content'
  ) as HTMLDivElement

  expanded.value.height = contentEl.getBoundingClientRect().height
}

function toggleExpand(index: number) {
  if (expanded.value.index !== index) {
    expanded.value.index = index
  } else {
    expanded.value.index = -1
  }

  setExpandedHeight()
}

onMounted(() => {
  window.addEventListener('resize', setExpandedHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', setExpandedHeight)
})
</script>

<template>
  <DetailSection>
    <template #title>Tracks</template>
    <ol>
      <li
        v-for="(track, index) in data"
        :class="{
          active: index === expanded.index,
          playing: index === nowPlaying,
        }"
        :ref="(el) => (trackListRef[index] = el as HTMLOListElement)"
      >
        <div class="header" @click="toggleExpand(index)">
          <div class="badge">
            <Icon :size="24" v-show="track.star">
              <StarRound />
            </Icon>
          </div>
          <div class="title">
            {{ track.title }}
          </div>
          <div class="count">
            <Icon :size="24">
              <NumbersRound />
            </Icon>
            {{ index + 1 }}
          </div>
        </div>
        <div class="content">
          <ul class="meta">
            <template v-for="(v, k) in track.meta">
              <li>
                <div>{{ k }}：{{ v }}</div>
              </li>
            </template>
          </ul>
          <div class="comment" v-show="track.comment !== ''">
            {{ track.comment }}
          </div>
          <button
            class="button-round play-button"
            :style="{ backgroundColor: 'rgb(207, 66, 22)' }"
          >
            <Icon :size="24">
              <PlayArrowRound />
            </Icon>
          </button>
        </div>
      </li>
    </ol>
  </DetailSection>
</template>

<style scoped lang="scss">
@import '../styles/button.scss';

ol {
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: column;
  list-style-type: none;

  > li {
    $title-height: 50px;
    $split-border: 1px rgba(255, 255, 255, 0.1) solid;

    overflow: hidden;
    height: $title-height;
    transition: all 0.2s;

    &:not(:first-child) {
      border-top: $split-border;
    }

    .header {
      height: $title-height;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: background-color 0.2s;
      padding-inline: 0.5rem;
      position: relative;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .count {
        display: flex;
        align-items: center;
        gap: 0.05rem;
        font-size: 1.2rem;
        font-weight: 500;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.4);
        margin-left: auto;
        user-select: none;
      }

      .title {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .badge {
        display: flex;
        align-items: center;
        color: rgba(255, 255, 255, 0.4);
        margin-right: 0.4rem;
        width: 24px;
      }
    }

    .content {
      border-top: $split-border;
      display: flex;
      flex-direction: column;
      padding: 0.8rem 1.6rem;
      gap: 0.8rem;
    }

    &.active {
      height: calc($title-height + v-bind('expanded.height + "px"'));
      background-color: rgba(0, 0, 0, 0.1);
    }

    .header {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        background-color: rgb(207, 66, 22);
        left: 0;
        inset-block: 0;
        width: 2px;
        opacity: 0;
        transition: opacity 0.2s;
      }
    }

    &.playing .header::after {
      opacity: 1;
    }
  }
}

.meta {
  display: flex;
  list-style-type: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  gap: 0.8rem 1.6rem;
  padding: 0;
  margin: 0;
  align-items: center;
  flex-wrap: wrap;
}

.comment {
  font-size: 1.2rem;
}

.play-button {
  width: 36px;
  height: 36px;
}
</style>
