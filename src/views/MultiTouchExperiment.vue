<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";

const scale = (
  n: number,
  min_i: number,
  max_i: number,
  min_f: number,
  max_f: number,
) => ((n - min_i) / (max_i - min_i)) * (max_f - min_f) + min_f;

const INITIAL_CANVAS_SIZE =
  Math.min(window.innerWidth, window.innerHeight) * window.devicePixelRatio;

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

const canvasSize = ref({
  width: 0,
  height: 0,
});

onMounted(() => {
  const size = (canvas.value as HTMLCanvasElement).getBoundingClientRect();
  canvasSize.value = {
    width: size.width,
    height: size.height,
  };
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

  c.beginPath();
  if (prev.value != null) {
    c.moveTo(prev.value.x, prev.value.y);
  }
  c.lineWidth = scale(t.force, 0, maxForce.value, 0, 50);
  const force = scale(t.force, 0, maxForce.value, 0, 1);
  const redPortion = scale(force, 0, 1, 50, 100);
  const canvasOpacity = scale(force, 0, 1, 0.25, 1);
  c.strokeStyle = `color-mix(in srgb, red ${redPortion}%, rgb(from CanvasText r g b / ${canvasOpacity}))`;
  c.lineCap = "round";
  const x = (t.clientX / canvasSize.value.width) * INITIAL_CANVAS_SIZE;
  const y = (t.clientY / canvasSize.value.height) * INITIAL_CANVAS_SIZE;
  c.lineTo(x, y);
  c.stroke();

  prev.value = { x, y };
};

const touchEndHandler = () => {
  prev.value = null;
};

const clearCanvas = () => {
  const c = canvas.value as HTMLCanvasElement;
  c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
};
</script>

<template>
  <div class="multi-touch-experiment">
    <canvas
      id="canvas"
      ref="canvas"
      :width="INITIAL_CANVAS_SIZE"
      :height="INITIAL_CANVAS_SIZE"
      @touchmove="touchHandler"
      @touchend="touchEndHandler"
    ></canvas>
    <p>CANVAS_SIZE: {{ INITIAL_CANVAS_SIZE }}</p>
    <button type="button" @click="clearCanvas">Clear</button>
    <output class="info">
      <pre>{{ pressureOutput }}</pre>
      <pre>{{ touch }}</pre>
    </output>
  </div>
</template>

<style>
.multi-touch-experiment {
  position: relative;

  display: flex;
  flex-wrap: wrap;
  align-content: start;
  align-items: start;

  height: 100svh;

  .info {
    pointer-events: none;
    position: fixed;
  }

  #canvas {
    aspect-ratio: 1;
    width: 100svmin;
    border-block-end: 1px solid hotpink;
  }

  @media (orientation: landscape) {
    #canvas {
      border: none;
      border-inline-end: 1px solid hotpink;
    }
  }
}
</style>
