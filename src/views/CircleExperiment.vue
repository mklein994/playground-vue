<script setup lang="ts">
import { useResetCss } from "@/use/use-reset-css";

useResetCss();

const toggleOn = (e: Event) => {
  const target = e.target as HTMLButtonElement;
  target.classList.toggle("on");
};
</script>

<template>
  <div class="circle-experiment">
    <div class="circle-group">
      <button class="circle green" @click="toggleOn"></button>
      <button class="circle red" @click="toggleOn"></button>
    </div>
  </div>
</template>

<style>
@property --circle-start-color {
  inherits: false;
  initial-value: black;
  syntax: "<color>";
}

@property --circle-end-color {
  inherits: false;
  initial-value: black;
  syntax: "<color>";
}

.circle-experiment {
  .circle-group {
    display: flex;
    aspect-ratio: 4;
    min-width: 100dvmin;
    min-height: 100dvmin;
  }

  .circle {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;

    background: radial-gradient(
      var(--circle-start-color),
      var(--circle-end-color)
    );
    filter: url("@/assets/filters.svg#light");

    transition-duration: 1s;
    transition-property: --circle-start-color, --circle-end-color;

    &.green {
      --circle-start-color: var(--pv-b-color-green-800);
      --circle-end-color: var(--pv-b-color-green-900);

      &.on {
        --circle-start-color: var(--pv-b-color-green-400);
        --circle-end-color: var(--pv-b-color-green-500);
      }
    }

    &.red {
      --circle-start-color: var(--pv-b-color-red-800);
      --circle-end-color: var(--pv-b-color-red-900);

      &.on {
        --circle-start-color: var(--pv-b-color-red-400);
        --circle-end-color: var(--pv-b-color-red-500);
      }
    }
  }
}
</style>
