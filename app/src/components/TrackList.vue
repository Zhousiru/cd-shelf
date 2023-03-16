<script setup lang="ts">
import { NumbersRound } from '@vicons/material'
import { Icon } from '@vicons/utils'
import { ref } from 'vue'
import DetailSection from './DetailSection.vue'

const data = ref([
  {
    title: '諷詠',
    duration: 145,
    star: false,
    comment: '',
    meta: { 编曲: '漉餡', 原曲: '不思議なお祓い棒' },
    source: '',
  },
  {
    title: '汀',
    duration: 214,
    star: false,
    comment: '',
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
    star: false,
    comment: '',
    meta: { 编曲: '漉餡', 原曲: 'ミストレイク' },
    source: '',
  },
  {
    title: '蒼月夜 (Instrumental ver)',
    duration: 328,
    star: false,
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

function toggleExpand(index: number) {
  const contentEl = trackListRef.value[index].querySelector(
    '.content'
  ) as HTMLDivElement

  expanded.value.height = contentEl.getBoundingClientRect().height

  if (expanded.value.index !== index) {
    expanded.value.index = index
  } else {
    expanded.value.index = -1
  }
}
</script>

<template>
  <DetailSection>
    <template #title>Tracks</template>
    <ol>
      <li
        v-for="(track, index) in data"
        :class="{ active: index === expanded.index }"
        :ref="(el) => (trackListRef[index] = el as HTMLOListElement)"
      >
        <div class="header" @click="toggleExpand(index)">
          <div class="count">
            <Icon :size="24">
              <NumbersRound />
            </Icon>
            {{ index + 1 }}
          </div>
          {{ track.title }}
        </div>
        <div class="content">
          <ul class="meta">
            <template v-for="(v, k) in track.meta">
              <li>
                <div>{{ k }}：{{ v }}</div>
              </li>
            </template>
          </ul>
        </div>
      </li>
    </ol>
  </DetailSection>
</template>

<style scoped lang="scss">
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
      gap: 0.8rem;
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
      }
    }

    .content {
      border-top: $split-border;
      padding: 0.5rem;
    }

    &.active {
      height: calc($title-height + v-bind('expanded.height + "px"'));
    }
  }
}

.meta {
  display: flex;
  list-style-type: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  gap: 1.6rem;
  padding: 0;
  margin: 0;
  align-items: center;

  li:not(:last-child) {
    position: relative;

    &::after {
      content: '/';
      position: absolute;
      right: -0.8rem;
      top: 50%;
      transform: translate(50%, -50%);
      font-size: 0.8rem;
    }
  }
}
</style>
