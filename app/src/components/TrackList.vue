<script setup lang="ts">
import { NumbersRound, StarRound, PlayArrowRound } from '@vicons/material'
import { Icon } from '@vicons/utils'
import { onMounted, onUnmounted, ref } from 'vue'
import DetailSection from './DetailSection.vue'
import type { Track } from '../data'

const { data, playing, color } = defineProps<{
  data: Array<Track>
  playing: number
  color: string
}>()
const emit = defineEmits<{ (e: 'play', index: number): void }>()

const trackListRef = ref<Record<number, HTMLOListElement>>({})
const expanded = ref<{
  index: number
  height: number
}>({
  index: -1,
  height: -1,
})

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

function humanizeDuration(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = (sec % 60).toString().padStart(2, '0')
  return `${m}:${s}`
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
          playing: index === playing,
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
          <div class="duration">
            {{ humanizeDuration(track.duration) }}
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
            <div v-html="track.comment"></div>
          </div>
          <button class="button-round play-button" @click="emit('play', index)">
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

      .duration {
        margin-inline: 0.8rem 0.4rem;
        color: rgba(255, 255, 255, 0.4);
        font-size: 1rem;
      }

      .badge {
        display: flex;
        align-items: center;
        color: rgba(255, 255, 255, 0.4);
        margin-right: 0.4rem;
        width: 24px;
        flex-shrink: 0;
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
        background-color: v-bind(color);
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
  background-color: v-bind(color);
}
</style>
