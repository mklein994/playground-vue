<script setup lang="ts">
import { computed, ref } from "vue";

import { type RecursiveMap, useDataSet } from "@/use/dataSet";

const props = withDefaults(
  defineProps<{
    source?: string[];
  }>(),
  {
    source: () => Object.keys(import.meta.glob("/src/**")),
  }
);

const { dataSet, dataGet, dataSetObject, dataGetObject } = useDataSet();

const SEPARATOR = /\/[^/]+/g;

const split = (word: string) => word.match(SEPARATOR) ?? [];

const sourceInput = ref<string>("/src/App.vue");
const sourceTree = props.source.reduce(
  (all, one) => dataSet(all, split(one), one),
  new Map() as RecursiveMap
);

const sourceFromTree = computed(
  () => dataGet(sourceTree, split(sourceInput.value)) ?? "(undefined)"
);
const sourceFromObject = computed(
  () => dataGetObject(sourceObject, split(sourceInput.value)) ?? "(undefined)"
);

const sourceObject = props.source.reduce(
  (all, one) => dataSetObject(all, split(one), one),
  {} as Record<string, unknown>
);
</script>

<template>
  <div class="recursion">
    <input v-model="sourceInput" type="text" />
    <output>{{ sourceFromTree }}</output>
    <output>{{ sourceFromObject }}</output>
  </div>
  <ul>
    <li v-for="file of source" :key="file">{{ file }}</li>
  </ul>
  <pre>{{ sourceTree }}</pre>
  <pre>{{ sourceObject }}</pre>
</template>

<style scoped>
.recursion {
  display: grid;
  max-width: max-content;
}
</style>
