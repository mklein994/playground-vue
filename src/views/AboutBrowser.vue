<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";

import MediaQueries from "@/components/MediaQueries.vue";

const userAgent = navigator.userAgent;
const inner = reactive({
  width: window.innerWidth,
  height: window.innerHeight,
});

const outer = reactive({
  width: window.outerWidth,
  height: window.outerHeight,
});

const dpr = ref(window.devicePixelRatio);

const handleResize = () => {
  inner.width = window.innerWidth;
  inner.height = window.innerHeight;
  outer.width = window.outerWidth;
  outer.height = window.outerHeight;

  // Cheat a bit and listen to resize events to update the dpr
  dpr.value = window.devicePixelRatio;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="about-grid">
    <span>User Agent</span>
    <span>{{ userAgent }}</span>
    <span>Inner Width</span>
    <span>{{ inner }}</span>
    <span>Outer Width</span>
    <span>{{ outer }}</span>
    <abbr title="Device Pixel Ratio">DPR</abbr>
    <span>{{ dpr }}</span>
    <MediaQueries class="media-queries"></MediaQueries>
  </div>
</template>

<style scoped>
.about-grid {
  display: grid;
  width: 100%;
  justify-content: center;

  font-family: monospace;
  gap: 0.5em 2em;
  grid: auto-flow / auto auto;
}

.media-queries {
  grid-column: 1 / -1;
}
</style>
