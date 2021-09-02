<template>
  <div class="tailwind-colors">
    <div
      v-for="(groups, i) of colorsList"
      :key="`${groups[0][0]}-${i}`"
      class="card"
    >
      <template v-for="[key, hex] of groups" :key="key">
        <code class="name">{{ key }}:</code><code>{{ hex }}</code
        ><span class="color" :style="{ backgroundColor: '' + hex }"></span>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as allColors from "tailwindcss/colors";
import { TailwindColorGroup } from "tailwindcss/tailwind-config";

const colors = allColors;

/**
 * Check if the object passed in is a {@link TailwindColorGroup}.
 *
 * @param group The object to test
 */
function isTailwindColorGroup(group: unknown): group is TailwindColorGroup {
  return typeof group === "object" && group != null && "50" in group;
}

// This will generate a warning in the console, since `lightBlue` is deprecated,
// and that is caught by calling the `get()` function on it.
const colorsList = Object.entries(colors).map(([name, group]) =>
  isTailwindColorGroup(group)
    ? Object.entries(group).map(([color, hex]) => [
        `--tw-${name}-${color}`,
        `${hex}`,
      ])
    : [[`--tw-${name}`, `${group}`]]
);
</script>

<style scoped>
.tailwind-colors {
  --grid: minmax(auto, 19ch) minmax(auto, 7ch) minmax(5em, 1fr);

  display: grid;
  grid-template-columns: repeat(auto-fit, var(--grid));
  align-items: start;
  gap: 1em;
}

.card {
  grid-column-end: span 3;

  display: grid;
  grid-template-columns: var(--grid);
  column-gap: 1em;
  white-space: nowrap;
}

@supports (grid-template-columns: subgrid) {
  .card {
    grid-template-columns: subgrid;
  }
}

.name {
  text-align: end;
}

.color {
  min-width: 5em;
}
</style>
