<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  steps: number;
}>();

const color = defineModel<string>({ required: true });
const baseColor = computed(() => `hsl(from ${color.value} h s 50%)`);

// const style = useCssModule();
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
    <input v-model="color" type="color" class="color-input tw-shadow-lg" />
  </div>
</template>

<style scoped>
.color-wheel {
  --base-color: v-bind("baseColor");

  display: grid;
  width: 10rem;
  border-radius: 50%;
  aspect-ratio: 1;
  background: v-bind("gradient");
  place-items: center;

  &::before {
    width: 60%;
    border: 1px solid transparent;
    border-radius: 50%;
    aspect-ratio: 1;
    background: white;
    content: "";
    grid-area: 1 / 1 / 1 / 1;
  }
}

.color-input {
  width: 50%;
  height: 50%;
  border: 1px solid transparent;
  border-radius: 50%;
  grid-area: 1 / 1 / 1 / 1;
}
</style>
