<template>
  <input v-model="srcFileInput" type="text" />
  <output>{{ srcFile }}</output>
  <pre>{{ srcFilesTree }}</pre>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

type RecursiveMap = Map<string, RecursiveMap | string>;

const SEPARATOR = "/";
const srcFiles = Object.keys(import.meta.glob("/src/**"));

const dataSet = (source: RecursiveMap, path: string[], value: string) => {
  if (path.length === 1) {
    source.set(path[0], value);
    return source;
  }

  const head = path.shift();
  if (head === undefined) {
    throw new Error("head is undefined, should be unreachable");
  }

  let newSource = source.get(head) ?? new Map();
  if (typeof newSource === "string") {
    const newValue = newSource;
    newSource = new Map([["", newValue]]);
  }

  source.set(head, dataSet(newSource, path, value));

  return source;
};

const dataGet = (
  source: RecursiveMap,
  path: string[]
): RecursiveMap | string | undefined => {
  if (path.length === 1) {
    const candidate = source.get(path[0]);
    return typeof candidate === "string" ? candidate : candidate?.get("");
  }

  const head = path.shift();
  if (head === undefined) {
    throw new Error("head is undefined, should be unreachable");
  }

  const newSource = source.get(head);
  return newSource === undefined || typeof newSource === "string"
    ? newSource
    : dataGet(newSource, path);
};

const srcFilesTree = srcFiles
  .map((x) => x.split(SEPARATOR))
  .reduce(
    (all, one) => dataSet(all, one, one.join(SEPARATOR)),
    new Map() as RecursiveMap
  );

const srcFileInput = ref<string>("");
const srcFile = computed(() =>
  dataGet(srcFilesTree, srcFileInput.value.split(SEPARATOR))
);
</script>
