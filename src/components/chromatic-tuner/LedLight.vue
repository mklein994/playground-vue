<script setup lang="ts">
import { computed } from "vue";

const { lightColor, powerPercentage } = defineProps<{
  lightColor: "green" | "red";
  powerPercentage: number;
}>();

const power = computed(() => `${powerPercentage * 100}%`);
</script>

<template>
  <div class="led-light" :class="lightColor"></div>
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

.led-light {
  border-radius: 50%;
  aspect-ratio: 1;
  background: radial-gradient(
    var(--circle-start-color),
    var(--circle-end-color)
  );
  filter: url("@/assets/filters.svg#light");
  /* transition-duration: 100ms; */
  /* transition-property: --circle-start-color, --circle-end-color; */

  --power: v-bind("power");

  &.green {
    --circle-start-color: color-mix(
      in oklch,
      var(--pv-b-color-green-400) var(--power),
      var(--pv-b-color-green-800)
    );
    --circle-end-color: color-mix(
      in oklch,
      var(--pv-b-color-green-500) var(--power),
      var(--pv-b-color-green-900)
    );
  }

  &.red {
    --circle-start-color: color-mix(
      in oklch,
      var(--pv-b-color-red-400) var(--power),
      var(--pv-b-color-red-800)
    );
    --circle-end-color: color-mix(
      in oklch,
      var(--pv-b-color-red-500) var(--power),
      var(--pv-b-color-red-900)
    );
  }
}
</style>
