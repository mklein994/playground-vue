<template>
  <div class="about-grid">
    <span>User Agent</span>
    <span>{{ userAgent }}</span>
    <span>Inner Width</span>
    <span>{{ inner }}</span>
    <span>Outer Width</span>
    <span>{{ outer }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const userAgent = navigator.userAgent;
const inner = computed(() => ({
  width: window.innerWidth,
  height: window.innerHeight,
}));

const outer = computed(() => ({
  width: window.outerWidth,
  height: window.outerHeight,
}));
</script>

<style scoped>
.about-grid {
  display: grid;
  grid: auto-flow / auto auto;
  justify-content: center;
  width: 100%;
  gap: 0.5em 2em;

  font-family: monospace;
}
</style>
