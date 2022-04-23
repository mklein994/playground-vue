<script setup lang="ts">
import { computed, ref } from "vue";

import { type RecursiveMap, useDataSet } from "@/use/dataSet";

const { dataSet, dataGet, dataSetObject, dataGetObject } = useDataSet();

const SEPARATOR = /\/[^/]+/g;

const split = (word: string) => word.match(SEPARATOR) ?? [];

const srcFiles = Object.keys(import.meta.glob("/src/**"));

const srcFileInput = ref<string>("");
const srcFilesTree = srcFiles.reduce(
  (all, one) => dataSet(all, split(one), one),
  new Map() as RecursiveMap
);

const srcFileFromTree = computed(
  () => dataGet(srcFilesTree, split(srcFileInput.value)) ?? "(undefined)"
);
const srcFileFromObject = computed(
  () =>
    dataGetObject(srcFilesObject, split(srcFileInput.value)) ?? "(undefined)"
);

const srcFilesObject = srcFiles.reduce(
  (all, one) => dataSetObject(all, split(one), one),
  {} as Record<string, unknown>
);
</script>

<template>
  <div class="recursion">
    <input v-model="srcFileInput" type="text" />
    <output>{{ srcFileFromTree }}</output>
    <output>{{ srcFileFromObject }}</output>
  </div>
  <ul>
    <li v-for="file of srcFiles" :key="file">{{ file }}</li>
  </ul>
  <pre>{{ srcFilesTree }}</pre>
  <pre>{{ srcFilesObject }}</pre>
</template>

<style scoped>
.recursion {
  display: grid;
  max-width: max-content;
}
</style>
