<script setup lang="ts">
import { computed, ref } from "vue";

import { type ColorSpace, generateGradient } from "@/use/colorMix";

const props = withDefaults(
  defineProps<{
    colorSpace: ColorSpace;
    firstColor: string;
    lastColor: string;
    stops?: number;
  }>(),
  {
    stops: 10,
  },
);

const squareCount = computed(() => props.stops);

const colors = computed(() =>
  generateGradient(
    props.colorSpace,
    props.firstColor,
    props.lastColor,
    props.stops - 2,
  ),
);

const swatchSize = computed(() => 100 / squareCount.value);

const swatch = ref<HTMLDivElement[]>();

const computedColor = (index: number) => {
  const el = swatch.value?.find((el) => el.dataset.index === `${index}`);
  if (!el) {
    return undefined;
  }

  return getComputedStyle(el).backgroundColor;
};
</script>

<template>
  <div class="color-mix-gradient">
    <div
      v-for="(color, i) of colors"
      ref="swatch"
      :key="`${color}-${i}`"
      class="swatch"
      :style="{ backgroundColor: color }"
      :data-index="i"
    >
      <slot :data-color="computedColor(i)"></slot>
    </div>
  </div>
</template>

<style>
.color-mix-gradient {
  --size: calc(
    v-bind("swatchSize") * 1% - (var(--gap) * v-bind("squareCount"))
  );

  display: grid;
  gap: var(--gap);
  grid-template-columns: repeat(auto-fit, minmax(var(--size), 1fr));

  .swatch {
    aspect-ratio: var(--square);
  }
}
</style>
