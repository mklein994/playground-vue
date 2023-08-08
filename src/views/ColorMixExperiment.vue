<script setup lang="ts">
import { ref } from "vue";

import ColorMixGradient from "@/components/color-mix/ColorMixGradient.vue";
import { flatColorSpaces } from "@/use/colorMix";

const firstColor = ref("#ff0000");
const lastColor = ref("#00ff00");
</script>

<template>
  <div class="color-mix-experiment">
    <form class="color-mix-form" @submit.prevent>
      <label for="first-color">First Color</label>
      <input v-model="firstColor" type="text" class="tw-form-input" />
      <input v-model="firstColor" type="color" class="first-color" />

      <label for="last-color">Last Color</label>
      <input v-model="lastColor" type="text" class="tw-form-input" />
      <input v-model="lastColor" type="color" class="last-color" />

      <label for="result-color"></label>
      <output id="result-color" ref="resultColor" class="result-color"></output>
    </form>

    <div class="gradients">
      <template v-for="space of flatColorSpaces" :key="space">
        <div class="gradient-label">{{ space }}</div>
        <ColorMixGradient
          v-slot="{ dataColor }"
          :first-color="firstColor"
          :last-color="lastColor"
          :color-space="space"
          class="gradient"
        >
          <div class="gradient-content">
            {{ dataColor }}
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
  gap: 1em;
  grid: auto-flow / repeat(3, minmax(0, 1fr));
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
