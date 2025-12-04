<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";

import { scale } from "@/helpers/scale";

interface Orientation {
  alpha: number;
  beta: number;
  gamma: number;
}

const listening = ref(false);

const orientation = ref<Orientation | null>(null);

const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
  if (e.alpha == null) {
    orientation.value = null;
  } else {
    orientation.value = {
      alpha: e.alpha,
      beta: e.beta!,
      gamma: e.gamma!,
    };
  }
};

watchEffect(() => {
  if (listening.value) {
    window.addEventListener("deviceorientation", handleDeviceOrientation);
  } else {
    window.removeEventListener("deviceorientation", handleDeviceOrientation);
  }
});

const clamp = (min: number, value: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getLevel = (value: number) =>
  scale(clamp(-90, value, 90), -90, 90, -1, 1);

const levelX = computed(() => getLevel(orientation.value?.gamma ?? 0));
const levelY = computed(() => getLevel(orientation.value?.beta ?? 0));
</script>

<template>
  <div class="device-orientation-experiment">
    <div class="settings">
      <input id="listening" v-model="listening" type="checkbox" />
      <label for="listening">Listening</label>
      <pre>{{ orientation }}</pre>
      <pre>{{ { levelX, levelY } }}</pre>
    </div>

    <div class="circle border">
      <div class="reference circle"></div>
      <div class="live circle"></div>
    </div>
  </div>
</template>

<style>
.device-orientation-experiment {
  height: 100svh;
  align-content: center;

  .settings {
    position: absolute;
    inset-block-start: 1rem;
    inset-inline-start: 1rem;
  }

  --container: 80vmin;
  --ref: 10vmin;
  --factor: calc(var(--container) / 2 - var(--ref) / 2);
  .circle {
    position: absolute;
    border: 1px solid var(--pv-base-color-neutral-500);
    border-radius: 50%;
    margin: auto;
    aspect-ratio: 1;
    inset: 0;
  }

  .border {
    position: relative;
    width: var(--container);
  }

  .reference {
    width: var(--ref);
  }

  .live {
    width: var(--ref);
    border-color: var(--pv-base-color-blue-500);
    --x: calc(v-bind("levelX") * var(--factor) * -1vmin);
    --y: calc(v-bind("levelY") * var(--factor) * -1vmin);
    transform: translate(var(--x), var(--y));
  }
}
</style>
