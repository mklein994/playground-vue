<template>
  <div ref="tailwindColors" class="tailwind-colors">
    <p class="color-test">
      <code class="color-test-code" style="color: var(--tw-sky-500)"
        >color: var(--tw-sky-500);</code
      >
    </p>

    <div class="colors">
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
  </div>
</template>

<script lang="ts" setup>
import allColors from "tailwindcss/colors";
import { TailwindColorGroup } from "tailwindcss/tailwind-config";
import { onMounted, ref } from "vue";

const colors = allColors;

const tailwindColors = ref<HTMLDivElement>();

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

const getTailwindColors = () => {
  const twc = tailwindColors.value;
  if (twc === undefined) {
    throw new Error("tailwind colors ref not found");
  }
  return twc;
};

onMounted(() => {
  const twc = getTailwindColors();
  for (const [name, color] of colorsList.flat()) {
    twc.style.setProperty(name, color);
  }
});
</script>

<style scoped>
.color-test {
  grid-column: 1 / -1;
}

.color-test-code::before,
.color-test-code::after {
  content: "`";
}

.colors {
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
