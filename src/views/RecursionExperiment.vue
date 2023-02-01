<script setup lang="ts">
import { computed, ref } from "vue";

import {
  dataGet,
  dataGetObject,
  dataSet,
  dataSetObject,
  type RecursiveMap,
} from "@/helpers/dataSet";

const props = withDefaults(
  defineProps<{
    source?: string[];
    split?: (word: string) => string[];
    search?: string;
  }>(),
  {
    source: () => Object.keys(import.meta.glob("/src/**")),
    split: (word: string) => word.match(/\/[^/]+/g) ?? [],
    search: "/src/App.vue",
  }
);

const sourceInput = ref(props.search);
const sourceTree = props.source.reduce(
  (all, one) => dataSet(all, props.split(one), one),
  new Map() as RecursiveMap
);

const sourceFromTree = computed(
  () => dataGet(sourceTree, props.split(sourceInput.value)) ?? "(undefined)"
);
const sourceFromObject = computed(
  () =>
    dataGetObject(sourceObject, props.split(sourceInput.value)) ?? "(undefined)"
);

const sourceObject = props.source.reduce(
  (all, one) => dataSetObject(all, props.split(one), one),
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
