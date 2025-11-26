<script setup lang="ts">
defineProps<{
  colors: string[];
}>();
</script>

<template>
  <div class="swatch-sample">
    <div
      v-for="color of colors"
      :key="color"
      :style="`--color: ${color}`"
      class="sample"
    ></div>
  </div>
</template>

<style>
.swatch-sample {
  display: grid;
  min-width: 100px;
  grid-auto-flow: column;
  grid-auto-rows: 1fr;

  .sample {
    aspect-ratio: 1 / 1;
    background-color: var(--color);
  }
}
</style>
