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

<script lang="ts" setup>
import { computed, ref } from "vue";

type RecursiveMap = Map<string, RecursiveMap | string>;

const SEPARATOR = "/";
const srcFiles = Object.keys(import.meta.glob("/src/**"));

const dataSet = (source: RecursiveMap, path: string[], value: string) => {
  const head = path.shift();
  if (head === undefined) {
    throw new Error("head is undefined, should be unreachable");
  }

  if (path.length === 0) {
    source.set(head, value);
    return source;
  }

  let newSource: string | RecursiveMap = source.get(head) ?? new Map();
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
): string | RecursiveMap | undefined => {
  const head = path.shift();
  if (head === undefined) {
    throw new Error("head is undefined, should be unreachable");
  }

  if (path.length === 0) {
    const candidate = source.get(head);
    return typeof candidate === "string" ? candidate : candidate?.get("");
  }

  const newSource = source.get(head);
  return newSource === undefined || typeof newSource === "string"
    ? newSource
    : dataGet(newSource, path);
};

const srcFilesTree = srcFiles.reduce(
  (all, one) => dataSet(all, one.split(SEPARATOR), one),
  new Map() as RecursiveMap
);

const dataSetObject = (
  source: Record<string, unknown>,
  path: string[],
  value: string
) => {
  const head = path.shift();
  if (head === undefined) {
    throw new Error("head is undefined, should be unreachable");
  }

  if (path.length === 0) {
    source[head] = value;
    return source;
  }

  let newSource =
    (source[head] as string | Record<string, unknown> | undefined) ?? {};
  if (typeof newSource === "string") {
    const newValue = newSource;
    newSource = { "": newValue };
  }

  source[head] = dataSetObject(newSource, path, value);

  return source;
};

const dataGetObject = (
  source: Record<string, unknown>,
  path: string[]
): unknown => {
  const head = path.shift();
  if (head === undefined) {
    throw new Error("head is undefined, should be unreachable");
  }

  if (path.length === 0) {
    const candidate = source[head];
    return typeof candidate === "string"
      ? candidate
      : (candidate as Record<string, unknown> | undefined)?.[""];
  }

  const newSource = source[head];
  return newSource === undefined || typeof newSource === "string"
    ? newSource
    : dataGetObject(newSource as Record<string, unknown>, path);
};

const srcFilesObject = srcFiles.reduce(
  (all, one) => dataSetObject(all, one.split(SEPARATOR), one),
  {} as Record<string, unknown>
);

const srcFileInput = ref<string>("");
const srcFileFromTree = computed(() =>
  dataGet(srcFilesTree, srcFileInput.value.split(SEPARATOR))
);
const srcFileFromObject = computed(() =>
  dataGetObject(srcFilesObject, srcFileInput.value.split(SEPARATOR))
);
</script>

<style scoped>
.recursion {
  display: grid;
  max-width: max-content;
}
</style>
