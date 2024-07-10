<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  steps: number;
}>();

const color = defineModel<string>({ required: true });
const baseColor = computed(() => `hsl(from ${color.value} h s 50%)`);

const gradient = computed(() => {
  const slices: string[] = [];
  for (let i = 0; i < props.steps; i++) {
    const startDegrees = (i / props.steps) * 360;
    const stopDegrees = ((i + 1) / props.steps) * 360;
    slices.push(
      `hsl(from var(--base-color) h s ${((i + 1) / props.steps) * 100}%) ${startDegrees}deg`,
    );
    slices.push(
      `hsl(from var(--base-color) h s ${((i + 1) / props.steps) * 100}%) ${stopDegrees}deg`,
    );
  }
  return `conic-gradient(${slices.join(", ")})`;
});
</script>

<template>
  <div class="color-wheel before:tw-shadow tw-shadow">
    <input v-model="color" type="color" class="color-input" />
  </div>
</template>

<style scoped>
.color-wheel {
  --base-color: v-bind("baseColor");

  /* prettier-ignore */
  --box-shadow:
    rgba(0, 0, 0, 0.1) 0 1px 3px 0,
    rgba(0, 0, 0, 0.1) 0 1px 2px -1px;

  /* prettier-ignore */
  --box-shadow-lg:
    rgba(0, 0, 0, 0.1) 0 10px 15px -3px,
    rgba(0, 0, 0, 0.1) 0 4px 6px -4px;

  display: grid;
  width: 10rem;
  border-radius: 50%;
  aspect-ratio: 1;
  background: v-bind("gradient");
  place-items: center;

  &::before {
    width: 70%;
    border: 1px solid transparent;
    border-radius: 50%;
    aspect-ratio: 1;
    background: white;
    box-shadow: var(--box-shadow-lg);
    content: "";
    grid-area: 1 / 1 / 1 / 1;
  }
}

.color-input {
  width: 65%;
  height: 65%;
  padding: 0;
  border: none;
  border-radius: 50%;
  box-shadow: var(--box-shadow);
  grid-area: 1 / 1 / 1 / 1;

  /* Hacks for <input type="color"> */
  &::-moz-color-swatch {
    border-width: 0;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border-width: 0;
    border-radius: 50%;
  }
}
</style>
