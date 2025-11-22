<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

type ComboType = (string | number | boolean)[][];
const combos = (categories: ComboType): ComboType => {
  if (categories.length === 0) {
    return [[]] as ComboType;
  }

  const [firstCategory, ...remaining] = categories;
  const remainingCombos = combos(remaining);

  const newCombos: ComboType = [];
  for (const item of firstCategory) {
    for (const combo of remainingCombos) {
      newCombos.push([item, ...combo]);
    }
  }

  return newCombos;
};

const queries = computed(() =>
  [
    combos([
      ["pointer", "any-pointer"],
      ["none", "coarse", "fine"],
    ]),
    combos([["color-gamut"], ["srgb", "p3", "rec2020"]]),
    combos([
      ["display-mode"],
      [
        "browser",
        "fullscreen",
        "minimal-ui",
        "picture-in-picture",
        "standalone",
        "window-controls-overlay",
      ],
    ]),
    combos([["dynamic-range"], ["standard", "high"]]),
    combos([["forced-colors"], ["none", "active"]]),
    combos([["hover"], ["none", "hover"]]),
    combos([["inverted-colors"], ["none", "inverted"]]),
    combos([["orientation"], ["portrait", "landscape"]]),
    combos([["overflow-block"], ["none", "scroll", "optional-paged", "paged"]]),
    combos([["overflow-inline"], ["none", "scroll"]]),
    combos([["pointer"], ["none", "coarse", "fine"]]),
    combos([["prefers-color-scheme"], ["light", "dark"]]),
    combos([["prefers-contrast"], ["no-preference", "more", "less", "custom"]]),
    combos([["prefers-reduced-motion"], ["no-preference", "reduce"]]),
    combos([["scripting"], ["none", "initial-only", "enabled"]]),
    combos([["update"], ["none", "slow", "fast"]]),
    combos([["video-dynamic-range"], ["standard", "high"]]),
  ]
    .flat()
    .map(([k, v]) => `(${k}: ${v})`),
);
const mediaQueries = ref<Map<string, MediaQueryList>>(new Map());

const mediaQueryValues = ref<Map<string, boolean | null>>(new Map());
const onlyTrue = ref(false);
const filteredValues = computed(() =>
  [...mediaQueryValues.value.entries()].filter(
    ([_k, v]) => !onlyTrue.value || v,
  ),
);

const listeners = ref<Map<string, (x: MediaQueryListEvent) => void>>(new Map());

onMounted(() => {
  queries.value.forEach((query) => {
    const media = window.matchMedia(query);
    mediaQueries.value.set(query, media);
    mediaQueryValues.value.set(query, media.matches);
    const listener = (x: MediaQueryListEvent) => {
      mediaQueryValues.value.set(query, x.matches);
    };
    media.addEventListener("change", listener);
    listeners.value.set(query, listener);
  });
});

onUnmounted(() => {
  [...listeners.value.entries()].map(([query, listener]) => {
    mediaQueries.value.get(query)!.removeEventListener("change", listener);
  });
});
</script>

<template>
  <div class="media-queries">
    <input
      id="only-true"
      v-model="onlyTrue"
      type="checkbox"
      name="onlyTrue"
      class="tw:form-checkbox"
    />
    <label for="only-true">Only True</label>
    <table>
      <thead>
        <tr>
          <th>Matches</th>
          <th>Media</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[query, matches] of filteredValues" :key="query">
          <td class="cell-matches" :data-matches="matches">{{ matches }}</td>
          <td class="cell-media">{{ query }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.cell-matches {
  text-align: end;

  &[data-matches="true"] {
    color: var(--pv-yes);
  }

  &[data-matches="false"] {
    color: var(--pv-no);

    & + .cell-media {
      color: var(--pv-na);
    }
  }
}
</style>
