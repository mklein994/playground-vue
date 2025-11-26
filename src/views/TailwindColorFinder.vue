<script setup lang="ts">
import chroma from "chroma-js";
import tailwindColors from "tailwindcss/colors";
import { computed, ref } from "vue";

const colors = computed(() =>
  Object.entries(tailwindColors)
    .filter(([_, v]) => typeof v === "object")
    .flatMap(([name, group]) =>
      Object.entries(group).map(
        ([k, v]) => [`${name}.${k}`, v] satisfies [unknown, unknown],
      ),
    ),
);

const searchColor = ref("");

const sortedColors = computed(() => {
  if (!chroma.valid(searchColor.value)) {
    return colors.value;
  }

  return colors.value
    .map(
      (x) =>
        [...x, chroma.distance(x[1], searchColor.value, "oklab")] satisfies [
          unknown,
          unknown,
          unknown,
        ],
    )
    .toSorted((a, b) => {
      const diff = a[2] - b[2];
      if (diff === 0) {
        const nameScore = (name: string): number =>
          name.startsWith("neutral.") ? -1 : 1;
        return nameScore(a[0]) - nameScore(b[0]);
      }
      return diff;
    })
    .map(
      ([name, color, score]) =>
        [name, color, score, chroma(color).css()] satisfies [
          unknown,
          unknown,
          unknown,
          unknown,
        ],
    );
});
</script>

<template>
  <div class="tailwind-color-finder">
    <label for="search-color">Color</label>
    <input
      id="search-color"
      v-model="searchColor"
      type="text"
      placeholder="Search"
      class="tw:form-input"
    />
    <span class="swatch" :style="{ backgroundColor: searchColor }"></span>

    <div class="colors">
      <template v-for="color of sortedColors" :key="color[0]">
        <code class="color-name">{{ color[0] }}</code
        ><span class="swatch" :style="{ backgroundColor: color[1] }"></span
        ><code>{{ color[1] }}</code
        ><code>{{ color[2] }}</code>
      </template>
    </div>
  </div>
</template>

<style>
.tailwind-color-finder {
  .colors {
    display: grid;
    max-width: max-content;
    justify-content: start;
    column-gap: 0.5rem;
    grid-template-columns: 1fr auto auto auto;
  }

  .color-name {
    text-align: end;
  }

  .swatch {
    display: inline-block;
    width: 1rem;
    height: 1rem;
  }
}
</style>
