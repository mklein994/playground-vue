<script setup lang="ts">
import { ref } from "vue";

import ColorMixGradient from "@/components/color-mix/ColorMixGradient.vue";
import { flatColorSpaces } from "@/use/colorMix";

const firstColor = ref("#ff0000");
const secondColor = ref("#00ff00");
const colorLabel = (text: string) => text.replace(/^\s*rgb\((.*)\)\s*$/, "$1");
</script>

<template>
  <div class="color-mix-experiment">
    <form class="color-mix-form" @submit.prevent>
      <label for="first-color">First Color</label>
      <input v-model="firstColor" type="text" class="tw-form-input" />
      <div class="first-color"></div>

      <label for="second-color">Second Color</label>
      <input v-model="secondColor" type="text" class="tw-form-input" />
      <div class="second-color"></div>

      <label for="result-color"></label>
      <output id="result-color" ref="resultColor" class="result-color"></output>
    </form>

    <div class="gradients">
      <template v-for="space of flatColorSpaces" :key="space">
        <span class="gradient-label">{{ space }}</span
        ><ColorMixGradient
          v-slot="{ dataColor }"
          :first-color="firstColor"
          :second-color="secondColor"
          :color-space="space"
          class="gradient"
        >
          <div class="gradient-content">
            {{ dataColor && colorLabel(dataColor) }}
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
.second-color {
  display: block;
  height: 100%;
  inline-size: 3em;
}

.first-color {
  background-color: v-bind("firstColor");
}

.second-color {
  background-color: v-bind("secondColor");
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
</style>
