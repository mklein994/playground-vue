<script setup lang="ts">
import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
  useTemplateRef,
  watchEffect,
} from "vue";

import MediaQueries from "@/components/MediaQueries.vue";

import { useMetaViewport } from "@/use/use-meta-viewport";

const aboutBrowser = useTemplateRef<HTMLDivElement>("aboutBrowser");

const { viewportContent } = useMetaViewport();

const viewportFitOverridden = ref(
  viewportContent.value.get("viewport-fit") === "cover",
);
watchEffect(() => {
  if (viewportFitOverridden.value) {
    viewportContent.value.set("viewport-fit", "cover");
  } else {
    viewportContent.value.delete("viewport-fit");
  }
});

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

const handleToggleFullscreen = async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else {
    await aboutBrowser.value!.requestFullscreen();
  }
};
</script>

<template>
  <div ref="aboutBrowser" class="about-browser-experiment">
    <span>User Agent</span>
    <span>{{ userAgent }}</span>
    <span>Inner Width</span>
    <span>{{ inner }}</span>
    <span>Outer Width</span>
    <span>{{ outer }}</span>
    <abbr title="Device Pixel Ratio" class="pv-mobile-abbr">DPR</abbr>
    <span>{{ dpr }}</span>

    <button type="button" @click="handleToggleFullscreen">
      Toggle Fullscreen
    </button>

    <div>
      <input
        id="viewport-fit-checkbox"
        v-model="viewportFitOverridden"
        type="checkbox"
      />
      <label for="viewport-fit-checkbox">Viewport Fit</label>
    </div>

    <MediaQueries class="media-queries"></MediaQueries>
  </div>
</template>

<style>
.about-browser-experiment {
  display: grid;
  width: 100%;
  justify-content: center;

  font-family: monospace;
  gap: 0.5em 2em;
  grid: auto-flow / auto auto;

  &:fullscreen {
    overflow: auto;
    height: 100vh;
    background-color: Canvas;
    color: CanvasText;
  }

  .media-queries {
    grid-column: 1 / -1;
  }
}
</style>
