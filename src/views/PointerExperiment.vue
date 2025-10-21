<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from "vue";

const canvas = useTemplateRef("canvas");
const pointer = ref({});

const prev = ref<{ x: number; y: number } | null>(null);

const pointerHandler = (e: PointerEvent) => {
  pointer.value = {
    altitudeAngle: e.altitudeAngle,
    azimuthAngle: e.azimuthAngle,
    pointerId: e.pointerId,
    width: e.width,
    height: e.height,
    pressure: e.pressure,
    tangentialPressure: e.tangentialPressure,
    tiltX: e.tiltX,
    tiltY: e.tiltY,
    twist: e.twist,
    pointerType: e.pointerType,
    isPrimary: e.isPrimary,
  };

  const c = (canvas.value as HTMLCanvasElement).getContext("2d")!;

  if (e.pressure > 0) {
    c.beginPath();
    c.strokeStyle = "#663399bf"; // rebeccapurple at 75% opacity
    if (prev.value != null) {
      c.moveTo(prev.value.x, prev.value.y);
    }
    const pressure =
      e.pressure < 0.1 && e.pressure > 0.4 ? e.pressure : e.pressure * 20;
    c.lineWidth = pressure;
    const min = Math.min(window.outerWidth, window.outerHeight);
    const x = (e.clientX / min) * canvas.value!.width;
    const y = (e.clientY / min) * canvas.value!.height;
    c.lineTo(x, y);
    c.stroke();
    prev.value = { x, y };
  }
};

const pointerUpHandler = () => {
  prev.value = null;
};

onMounted(() => {
  document.addEventListener("pointermove", pointerHandler);
  document.addEventListener("pointerup", pointerUpHandler);
});

onUnmounted(() => {
  document.removeEventListener("pointermove", pointerHandler);
  document.removeEventListener("pointerup", pointerUpHandler);
});

const handleClear = (e: PointerEvent) => {
  e.preventDefault();
  const c = canvas.value as HTMLCanvasElement;
  c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
  prev.value = null;
};
</script>

<template>
  <div class="pointer-experiment">
    <div class="pointer"></div>
    <canvas id="canvas" ref="canvas" width="1024" height="1024"></canvas>
    <div class="info">
      <button type="reset" @click="handleClear">Clear</button>
      <pre>{{ pointer }}</pre>
    </div>
  </div>
</template>

<style scoped>
.pointer-experiment {
  display: flex;
  max-width: 100vw;
  max-height: 100svh;
  flex-wrap: wrap;
  user-select: none;
}

#canvas {
  max-width: min(calc(100vw - 2px), 1024px);
  max-height: min(calc(100svh - 2px), 1024px);
  border: 1px solid hotpink;
  aspect-ratio: 1;
}
</style>
