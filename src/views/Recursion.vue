<template>
  <input v-model="srcFileInput" type="text" />
  <ul>
    <li v-for="file of srcFiles" :key="file">{{ file }}</li>
  </ul>
  <output>{{ srcFile }}</output>
  <pre>{{ srcFilesTree }}</pre>
  <pre>{{ srcFilesObject }}</pre>
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

const isRecord = (thing: unknown): thing is Record<string, unknown> => {
  return typeof thing === "object";
};

const dataSetObject = (
  source: Record<string, unknown>,
  path: string[],
  value: string
) => {
  if (path.length === 1) {
    source[path[0]] = value;
    return source;
  }

  const head = path.shift();
  if (head === undefined) {
    throw new Error("head is undefined, should be unreachable");
  }

  let newSource = source[head] ?? {};
  if (typeof newSource === "string") {
    const newValue = newSource;
    newSource = { "": newValue };
  }

  if (isRecord(newSource)) {
    source[head] = dataSetObject(newSource, path, value);
  }

  return source;
};

const srcFilesObject = srcFiles
  .map((x) => x.split(SEPARATOR))
  .reduce(
    (all, one) => dataSetObject(all, one, one.join(SEPARATOR)),
    {} as Record<string, unknown>
  );

const srcFileInput = ref<string>("");
const srcFile = computed(() =>
  dataGet(srcFilesTree, srcFileInput.value.split(SEPARATOR))
);
</script>
