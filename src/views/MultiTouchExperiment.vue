<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from "vue";

const scale = (
  n: number,
  min_i: number,
  max_i: number,
  min_f: number,
  max_f: number,
) => ((n - min_i) / (max_i - min_i)) * (max_f - min_f) + min_f;

const canvas = useTemplateRef("canvas");

const pressureOutput = ref<Record<string, number>>({
  force: 0,
  pageX: window.outerWidth / 2,
  pageY: window.outerHeight / 2,
  clientX: window.outerWidth / 2,
  clientY: window.outerHeight / 2,
  radiusX: 10,
  radiusY: 20,
  screenX: window.outerWidth / 2,
  screenY: window.outerHeight / 2,
  identifier: 0,
  rotationAngle: 0,
});

const touch = ref<{
  x: number;
  y: number;
  rx: number;
  ry: number;
  a: number;
}>({
  x: 0,
  y: 0,
  rx: 10,
  ry: 10,
  a: 0,
});

const prev = ref<{ x: number; y: number } | null>(null);

const maxForce = ref(0.25);

const touchHandler = (e: TouchEvent) => {
  const t = e.changedTouches.item(0)!;

  pressureOutput.value = {
    force: t.force,
    pageX: t.pageX,
    pageY: t.pageY,
    clientX: t.clientX,
    clientY: t.clientY,
    radiusX: t.radiusX,
    radiusY: t.radiusY,
    screenX: t.screenX,
    screenY: t.screenY,
    identifier: t.identifier,
    rotationAngle: t.rotationAngle,
  };

  touch.value = {
    x: t.screenX,
    y: t.screenY,
    rx: t.radiusX,
    ry: t.radiusY,
    a: t.rotationAngle,
  };

  maxForce.value = Math.max(maxForce.value, t.force);

  const c = (canvas.value as HTMLCanvasElement).getContext("2d")!;

  c.strokeStyle = "CanvasText";
  c.beginPath();
  if (prev.value != null) {
    c.moveTo(prev.value.x, prev.value.y);
  }
  const min = Math.min(t.force, 0.15);
  c.lineWidth = scale(t.force, min, maxForce.value, 0, 25);
  const x = (t.screenX / window.outerWidth) * 1024;
  const y = (t.screenY / window.outerHeight) * 2048;
  c.lineTo(x, y);
  c.stroke();

  prev.value = { x, y };
};

const touchEndHandler = () => {
  prev.value = null;
};

onMounted(() => {
  document.addEventListener("touchmove", touchHandler);
  document.addEventListener("touchend", touchEndHandler);
});

onUnmounted(() => {
  document.removeEventListener("touchmove", touchHandler);
  document.removeEventListener("touchend", touchEndHandler);
});

const clearCanvas = () => {
  const c = canvas.value as HTMLCanvasElement;
  c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
};
</script>

<template>
  <div class="multi-touch-experiment">
    <output class="info">
      <pre>{{ pressureOutput }}</pre>
      <pre>{{ touch }}</pre>
      <button type="button" @click="clearCanvas">Clear</button>
    </output>
    <div
      class="square"
      :data-x="touch.x"
      :data-y="touch.y"
      :data-rx="touch.rx"
      :data-ry="touch.ry"
      :data-a="touch.a"
    ></div>
    <canvas id="canvas" ref="canvas" width="1024" height="1024"></canvas>
  </div>
</template>

<style scoped>
.multi-touch-experiment {
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100svh;
}

.info {
  position: fixed;
}

#canvas {
  width: 100vmin;
  border: 1px solid hotpink;
  aspect-ratio: 1;
}
</style>
