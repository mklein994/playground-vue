<script setup lang="ts">
import { computed } from "vue";

import { dataSet, dataSetObject, type RecursiveMap } from "@/helpers/dataSet";

// Props make this easier to test
const props = withDefaults(
  defineProps<{
    source?: string[] | [key: string, value: string][];
    split?: (word: string) => string[];
    parseStyle?: "map" | "object";
  }>(),
  {
    source: () => __PLAYGROUND_VUE_FILES_LIST__,
    split: (word: string) => word.match(/\/[^/]+/g) ?? [],
    parseStyle: "object",
  },
);

const checkHasValues = (
  value: unknown,
): value is [key: string, value: string][] => {
  return (
    Array.isArray(value)
    && value.some((x) => Array.isArray(x) && x.length === 2)
  );
};

const sourceTree = computed(() =>
  checkHasValues(props.source)
    ? props.source.reduce(
        (all, [key, value]) => dataSet(all, props.split(key), value),
        new Map() as RecursiveMap,
      )
    : props.source.reduce(
        (all, one) => dataSet(all, props.split(one), one),
        new Map() as RecursiveMap,
      ),
);

const sourceObject = computed(() =>
  checkHasValues(props.source)
    ? props.source.reduce(
        (all, [key, value]) => dataSetObject(all, props.split(key), value),
        {} as Record<string, unknown>,
      )
    : props.source.reduce(
        (all, one) => dataSetObject(all, props.split(one), one),
        {} as Record<string, unknown>,
      ),
);
</script>

<template>
  <div class="recursion">
    <pre v-if="parseStyle === 'map'">{{ sourceTree }}</pre>
    <pre v-else>{{ sourceObject }}</pre>
  </div>
</template>

<style scoped>
.recursion {
  display: grid;
  max-width: max-content;
}
</style>
