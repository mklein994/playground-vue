<script setup lang="ts">
import colors from "tailwindcss/colors";
import { computed, inject, onMounted, ref } from "vue";

import { tailwindEnabledKey } from "@/injectionKeys";

const tailwindColors = ref<HTMLDivElement>();
const testColorElement = ref<HTMLElement>();

// This will generate a warning in the console, since `lightBlue` is deprecated,
// and that is caught by calling the `get()` function on it.
const colorsList = Object.entries(colors).reduce(
  (all, [name, group]: [string, string | Record<string, string>]) => {
    // console.log(name, group);
    if (typeof group === "object") {
      all.set(
        name,
        Object.entries(group).map(([color, hex]) => [
          `--tw-${name}-${color}`,
          `${hex}`,
        ]),
      );
    } else {
      const other = all.get("other") ?? [];
      other.push([`--tw-${name}`, `${group}`]);
      all.set("other", other);
    }
    return all;
  },
  new Map<string, string[][]>([["other", []]]),
);

const normalColors = computed(
  () => new Map([...colorsList].filter(([k, _]) => k !== "other")),
);

const longestText = computed(() =>
  [...normalColors.value.values()].flat().reduce(
    (all, one) => {
      all.key = Math.max(all.key, one[0].length);
      all.color = Math.max(all.color, one[1].length);
      return all;
    },
    { key: 0, color: 0 },
  ),
);

const tailwindEnabled = inject(tailwindEnabledKey)!;
const baseFontSize = ref(0);
const testColorFontSize = ref(0);
const codeFontSize = computed(() =>
  tailwindEnabled.value ? 1 : testColorFontSize.value / baseFontSize.value,
);

const longestKeyLength = computed(() =>
  Math.ceil((longestText.value.key + 1) * codeFontSize.value),
);
const longestColorLength = computed(() =>
  Math.ceil(longestText.value.color * codeFontSize.value),
);

const getTailwindColors = () => {
  const twc = tailwindColors.value;
  if (twc === undefined) {
    throw new Error("tailwind colors ref not found");
  }
  return twc;
};

onMounted(() => {
  if (!testColorElement.value) {
    return;
  }

  const root = document.querySelector(":root");
  if (!root) return;
  baseFontSize.value = Number.parseFloat(
    getComputedStyle(root).fontSize.replace(/px$/, ""),
  );
  testColorFontSize.value = Number.parseFloat(
    getComputedStyle(testColorElement.value).fontSize.replace(/px$/, ""),
  );

  const twc = getTailwindColors();
  for (const [name, color] of [...colorsList.values()].flat()) {
    twc.style.setProperty(name, color);
  }
});
</script>

<template>
  <div ref="tailwindColors" class="tailwind-colors-experiment">
    <p class="color-test">
      <code
        ref="testColorElement"
        class="color-test-code"
        style="color: var(--tw-sky-500)"
        >color: var(--tw-sky-500);</code
      >
    </p>

    <div class="colors">
      <div
        v-for="[name, groups] of colorsList"
        :key="name"
        class="card"
        :class="{ other: name === 'other' }"
      >
        <code class="color-heading">{{ name }}</code>
        <template v-for="[key, hex] of groups" :key="key">
          <code class="name">{{ key }}:</code><code>{{ hex }}</code
          ><span
            class="color"
            :style="{ backgroundColor: `var(${key})` }"
          ></span>
        </template>
      </div>
    </div>
  </div>
</template>

<style>
.tailwind-colors-experiment {
  .color-test {
    grid-column: 1 / -1;
  }

  .color-test-code {
    &::before,
    &::after {
      content: "`";
    }
  }

  .colors {
    --grid: minmax(calc(v-bind("longestKeyLength") * 1ch), min-content)
      minmax(calc(v-bind("longestColorLength") * 1ch), min-content)
      minmax(5em, min-content);

    display: grid;
    align-items: start;
    justify-content: space-around;
    gap: clamp(0.5em, 1vh, 1em);
    grid-template-columns: repeat(auto-fit, var(--grid));
  }

  .card {
    display: grid;
    column-gap: 1em;
    grid-column-end: span 3;
    white-space: nowrap;

    &.other {
      grid-template-columns:
        auto minmax(calc(v-bind("longestColorLength") * 1ch), min-content)
        1fr;
    }
  }

  .color-heading {
    grid-column-end: -1;
    padding-block-end: clamp(0.125em, 0.5vh, 0.5em);
    text-align: center;
    text-decoration: underline;
  }

  @supports (grid-template-columns: subgrid) {
    .card {
      grid-template-columns: subgrid;
    }
  }

  @supports not (grid-template-columns: subgrid) {
    .card {
      grid-template-columns: var(--grid);
    }
  }

  .name {
    text-align: end;
  }
}
</style>
