<script setup lang="ts"></script>

<template>
  <article>
    <header>
      <slot name="title"></slot>
    </header>
    <section>
      <slot></slot>
    </section>
  </article>
</template>

<style>
article {
  color: rgba(255, 255, 255, 0.8);
}

header {
  font-size: 2rem;
  padding: 0.2rem 0.5rem;
  border-bottom: 1px rgba(255, 255, 255, 0.2) solid;
  color: rgba(255, 255, 255, 0.9);
}

section {
  font-size: 1.5rem;
  padding: 0.5rem;
  text-align: justify;
  line-height: 1.3;
}
</style>
