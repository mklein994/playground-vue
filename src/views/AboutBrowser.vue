<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from "vue";

const userAgent = navigator.userAgent;
const inner = reactive({
  width: window.innerWidth,
  height: window.innerHeight,
});

const outer = reactive({
  width: window.outerWidth,
  height: window.outerHeight,
});

const handleResize = () => {
  inner.width = window.innerWidth;
  inner.height = window.innerHeight;
  outer.width = window.outerWidth;
  outer.height = window.outerHeight;
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
</style>
