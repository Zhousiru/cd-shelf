<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    albumArt: string
    animation?: boolean
  }>(),
  {
    animation: true,
  }
)
</script>

<template>
  <div class="cd-case" :class="{ animation: props.animation }">
    <div class="cd-shadow"></div>
    <div class="cover cover-shadow"></div>
    <div class="cover"></div>
    <div class="case-mask"></div>
  </div>
</template>

<style scoped>
.cd-case {
  aspect-ratio: 10 / 9;
  width: 500px;
  position: relative;
  /* Fix sub-pixel rendering */
  will-change: transform;
}

.cd-case > .case-mask {
  background-image: url(@/assets/images/case.webp);
  background-size: cover;
  position: absolute;
  inset: 0;
  mix-blend-mode: multiply;
}

.cd-case > .cover,
.cd-case > .cd-shadow {
  background-image: v-bind('"url(" + props.albumArt + ")"');
}

.cd-case > .cover {
  background-size: cover;
  position: absolute;
  top: calc(31 / 900 * 100%);
  bottom: calc(34 / 900 * 100%);
  left: calc(109 / 1000 * 100%);
  right: calc(39 / 1000 * 100%);
}

.cd-case > .cover-shadow {
  filter: blur(5px);
  transform: translateY(0.5%);
}

.cd-shadow {
  opacity: 1;
  background-size: cover;
  position: absolute;
  inset: 0;
  filter: blur(80px);
  transform: scale(0.75);
  border-radius: 50px;
}

.animation.cd-case,
.animation.cd-case .cd-shadow,
.animation.cd-case .case-mask {
  transition: all 0.3s;
}

.animation.cd-case:hover {
  transform: scale(1.02);
}

.animation.cd-case:hover > .cd-shadow {
  opacity: 0.8;
  transform: scale(0.7);
}

.animation.cd-case:hover > .case-mask {
  filter: brightness(1.1);
}
</style>
