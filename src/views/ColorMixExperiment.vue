<script setup lang="ts">
import { computed, ref } from "vue";

import ColorMixGradient from "@/components/color-mix/ColorMixGradient.vue";

import { flatColorSpaces } from "@/use/colorMix";

const firstColor = ref("#ff0000");
const lastColor = ref("#00ff00");
const showColorLabel = ref(true);
const stops = ref(10);
const square = ref(true);
const squareAspectRatio = computed(() => (square.value ? "1 / 1" : "unset"));
</script>

<template>
  <div class="color-mix-experiment">
    <form class="color-mix-form" @submit.prevent>
      <label for="first-color">First Color</label>
      <input v-model="firstColor" type="text" class="tw:form-input" />
      <input v-model="firstColor" type="color" class="first-color" />

      <label for="last-color">Last Color</label>
      <input v-model="lastColor" type="text" class="tw:form-input" />
      <input v-model="lastColor" type="color" class="last-color" />

      <label for="stops">Stops</label>
      <input
        id="stops"
        v-model="stops"
        type="range"
        min="2"
        max="50"
        step="1"
        required
      />
      <input v-model="stops" type="number" min="2" max="50" step="1" required />

      <label for="show-color-label">Show Color Label</label>
      <input id="show-color-label" v-model="showColorLabel" type="checkbox" />

      <label for="square-aspect-ratio">Square Aspect Ratio</label>
      <input id="square-aspect-ratio" v-model="square" type="checkbox" />
    </form>

    <div class="gradients">
      <template v-for="space of flatColorSpaces" :key="space">
        <div class="gradient-label">{{ space }}</div>
        <ColorMixGradient
          v-slot="{ dataColor }"
          :first-color="firstColor"
          :last-color="lastColor"
          :color-space="space"
          :stops="stops"
          class="gradient"
        >
          <div class="gradient-content">
            <template v-if="showColorLabel">{{ dataColor }}</template>
          </div>
        </ColorMixGradient>
      </template>
    </div>
  </div>
</template>

<style scoped>
.color-mix-experiment {
  width: 100vw;
  padding: 1em;
}

.color-mix-form {
  display: grid;
  align-items: start;
  justify-content: start;
  gap: 1em;
  grid: auto-flow / repeat(3, minmax(0, auto));
  justify-items: start;

  > [for] {
    grid-column-start: 1;
  }
}

[for="stops"] ~ [type="number"] {
  max-width: 10ch;
}

.color-space-wrapper {
  display: flex;
  gap: 1em;
  grid-column: 1 / -1;
}

.first-color,
.last-color {
  display: block;
  height: 100%;
  inline-size: 3em;
}

.gradients {
  --gap: 1px;
  display: grid;
  gap: var(--gap);
  grid-template-columns: auto 1fr;
  --square: v-bind("squareAspectRatio");
}

.gradient-content {
  font-family: monospace;
  font-size: 0.2rem;
}

/* @media (min-width: theme("screens.md")) { */
@media (min-width: 768px) {
  .gradient-content {
    font-size: 0.75rem;
  }
}
</style>
