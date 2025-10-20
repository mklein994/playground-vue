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
    c.strokeStyle = "white";
    if (prev.value != null) {
      c.moveTo(prev.value.x, prev.value.y);
    }
    const pressure =
      e.pressure < 0.1 && e.pressure > 0.4 ? e.pressure : e.pressure * 20;
    c.lineWidth = pressure;
    c.lineTo(e.clientX, e.clientY);
    c.stroke();
    prev.value = { x: e.clientX, y: e.clientY };
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
  position: relative;
  overflow: hidden;
  /* aspect-ratio: 1; */
  width: 100vw;
  height: 100svh;
  user-select: none;
}

.info {
  position: fixed;
  inset-block-start: 0;
  inset-inline-start: 0;
}

#canvas {
  max-width: calc(100vw - 2px);
  max-height: calc(100svh - 2px);
  border: 1px solid hotpink;
  aspect-ratio: 1;
}
</style>
