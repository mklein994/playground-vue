<template>
  <div class="tailwind-colors">
    <template v-for="[key, value] in Object.entries(colorsObject)" :key="key">
      <code class="name">{{ key }}:</code><code>{{ value }}</code
      ><span class="color" :style="{ background: '' + value }"></span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import * as allColors from "tailwindcss/colors";
import { TailwindColorGroup } from "tailwindcss/tailwind-config";

const colors = allColors;

const colorsList: string[][] = [];

function isTailwindColor(thing: unknown): thing is TailwindColorGroup {
  return typeof thing === "object" && thing != null && "50" in thing;
}

Object.entries(colors).map(([key, value]) => {
  const c = value;
  if (isTailwindColor(c)) {
    for (const f in c) {
      colorsList.push([`--${key}-${f}`, c[f]]);
    }
  }
});

const colorsObject = Object.fromEntries(colorsList);
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
