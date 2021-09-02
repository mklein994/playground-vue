<template>
  <div class="tailwind-colors">
    <template v-for="[key, background] of colorsList" :key="key">
      <code class="name">{{ key }}:</code><code>{{ background }}</code
      ><span class="color" :style="{ background }"></span>
    </template>
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
const colorsList = Object.entries(colors).flatMap(([name, group]) =>
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
  display: grid;
  grid-template-columns: repeat(2, auto) 1fr;
  column-gap: 1em;
}

.name {
  text-align: end;
}

.color {
  min-width: 5em;
}
</style>
