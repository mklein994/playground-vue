<script setup lang="ts">
import { range } from "d3";
import { computed, inject, ref } from "vue";

import FancyRange from "@/components/FancyRange.vue";

import { resolvedSchemeKey } from "@/injectionKeys";

const resolvedScheme = inject(resolvedSchemeKey);

const isDark = computed(() => resolvedScheme?.value === "dark");

const name = ref("home");

const fill = ref(0);
const weight = ref(400);
const grade = ref(isDark.value ? -25 : 0);
const opticalSize = ref(24);

const showLarge = ref(false);

const rangeSettings = {
  fill: [{ value: 0 }],
  weight: range(100, 800, 100).map((value) => ({ value })),
  grade: [{ value: isDark.value ? -25 : 0 }],
  opticalSize: [{ value: 24 }],
};

const fillChecked = ref(fill.value === 1);
const handleFillCheckToggle = (e: InputEvent) => {
  const checkbox = e.target as HTMLInputElement;
  fill.value = checkbox.checked ? 1 : 0;
};
</script>

<template>
  <div class="material-symbols-experiment">
    <div class="settings">
      <label for="name">Name</label>
      <div class="wrapper">
        <input id="name" v-model="name" type="text" />
      </div>

      <label for="fill">Fill</label>
      <div class="wrapper">
        <FancyRange :options="rangeSettings.fill">
          <template #default="{ list }">
            <input
              id="fill"
              v-model="fill"
              type="range"
              min="0"
              max="1"
              step="0.001"
              :list="list"
            />
          </template>
        </FancyRange>

        <div class="fill-input-wrapper">
          <input
            v-model="fill"
            type="number"
            min="0"
            max="1"
            step="0.001"
            class="text-input"
          />

          <input
            type="checkbox"
            :value="fillChecked"
            @input="handleFillCheckToggle"
          />
        </div>
      </div>

      <label for="weight">Weight</label>
      <div class="wrapper">
        <FancyRange :options="rangeSettings.weight">
          <template #default="{ list }">
            <input
              id="weight"
              v-model="weight"
              type="range"
              min="100"
              max="700"
              step="0.001"
              :list="list"
            />
          </template>
        </FancyRange>

        <input
          v-model="weight"
          type="number"
          min="100"
          max="700"
          step="0.001"
          class="text-output"
        />
      </div>

      <label for="grade">Grade</label>
      <div class="wrapper">
        <FancyRange :options="rangeSettings.grade">
          <template #default="{ list }">
            <input
              id="grade"
              v-model="grade"
              type="range"
              min="-50"
              max="200"
              step="0.001"
              :list="list"
            />
          </template>
        </FancyRange>

        <input
          v-model="grade"
          type="number"
          min="-50"
          max="200"
          step="0.001"
          class="text-input"
        />
      </div>

      <label for="optical-size">Optical Size</label>
      <div class="wrapper">
        <FancyRange :options="rangeSettings.opticalSize">
          <template #default="{ list }">
            <input
              id="optical-size"
              v-model="opticalSize"
              type="range"
              min="20"
              max="40"
              step="1"
              :list="list"
            />
          </template>
        </FancyRange>

        <input
          v-model="opticalSize"
          type="number"
          min="20"
          max="40"
          step="1"
          class="text-input"
        />
      </div>

      <div class="show-large-wrapper">
        <label for="show-large">Show Large</label>
        <input id="show-large" v-model="showLarge" type="checkbox" />
      </div>
    </div>

    <span class="material-symbols-outlined icon">{{ name }}</span>
  </div>
</template>

<style>
.material-symbols-experiment {
  .settings {
    display: grid;
    max-width: max-content;
    justify-content: start;
    gap: var(--pv-spacing-2);
    grid-template-columns: auto auto auto;
  }

  .wrapper {
    display: grid;
    gap: inherit;
    grid-column: 2 / -1;
    grid-template-columns: subgrid;
  }

  .fill-input-wrapper {
    display: grid;
    grid-template-columns: auto auto;
  }

  .text-input {
    font-family: monospace;
    text-align: end;
  }

  .show-large-wrapper {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: subgrid;
  }

  .icon {
    font-size: v-bind("showLarge ? '128px': `${opticalSize}px`");
    font-variation-settings:
      "FILL" v-bind("fill"),
      "wght" v-bind("weight"),
      "GRAD" v-bind("grade"),
      "opsz" v-bind("opticalSize");
  }
}
</style>
