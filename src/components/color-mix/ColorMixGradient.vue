<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import type { ColorSpace } from "@/use/colorMix";

const props = withDefaults(
  defineProps<{
    colorSpace: ColorSpace;
    firstColor: string;
    secondColor: string;
    steps?: number;
  }>(),
  {
    steps: 9,
  },
);

const colors = computed(() => {
  const first = props.firstColor;
  const second = props.secondColor;

  const list: string[] = [];
  for (let i = 0; i <= props.steps; i++) {
    list.push(
      `color-mix(in ${props.colorSpace}, ${first} ${
        100 - (i * 100) / props.steps
      }%, ${second} ${(i * 100) / props.steps}%)`,
    );
  }

  return list;
});

const swatchSize = computed(() => 100 / props.steps);

const computedColors = ref<string[]>([]);

onMounted(() => {
  for (let i = 0; i < colors.value.length; i++) {
    const el = document.querySelector(`.swatch[data-index="${i}"]`);
    if (!el) {
      console.warn(
        `Failed to compute color for index ${i}/${
          colors.value.length - 1
        } (color space: ${props.colorSpace})`,
      );
      continue;
    }

    computedColors.value.push(getComputedStyle(el).backgroundColor);
  }
});
</script>

<template>
  <div class="color-mix-gradient">
    <div
      v-for="(color, i) of colors"
      :key="color"
      class="swatch"
      :style="{ backgroundColor: color }"
      :data-index="i"
    >
      <slot :data-color="computedColors[i]"></slot>
    </div>
  </div>
</template>

<style scoped>
.color-mix-gradient {
  --size: calc(v-bind("swatchSize") * 1% - (var(--gap) * v-bind("steps")));

  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(var(--size), 1fr));
}

.swatch {
  aspect-ratio: 1 / 1;
}
</style>
