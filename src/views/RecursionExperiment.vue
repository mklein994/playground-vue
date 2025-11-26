<script setup lang="ts">
import { computed, ref } from "vue";

import RecursionComponent from "@/components/RecursionComponent.vue";

const sourceText = ref<string>();
const parseStyle = ref<"object" | "map">("object");
const splitCharText = ref<string>();
const keepSplitChar = ref(true);
const hasValues = ref(false);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
const escapeRegExp = (input: string) =>
  input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string

const splitFunc = (char: string) => {
  const c = escapeRegExp(char);
  return new RegExp(`${c}[^${char}]+`, "g");
};

const source = computed(() => {
  const charText = splitCharText.value;
  const text = sourceText.value?.trim().split(/\n/);
  const re = charText ? new RegExp(`^${escapeRegExp(charText)}*`) : undefined;

  if (!text) {
    return undefined;
  }

  const mapKey = (key: string) =>
    re && keepSplitChar.value ? key.replace(re, charText!) : key;

  // Split the list into key-value pairs
  if (hasValues.value) {
    return text
      .map((line) => line.split(/: /))
      .map(([key, value]) => [mapKey(key), value]) as [
      key: string,
      value: string,
    ][];
  }

  return text.map(mapKey);
});

const split = computed(() => {
  const char = splitCharText.value;
  if (!keepSplitChar.value) {
    return (word: string) => (char ? word.split(char) : [word]);
  }

  return char
    ? (word: string) => word.match(splitFunc(char)) ?? []
    : (word: string) => [word];
});
</script>

<template>
  <div class="recursion-experiment">
    <div class="inputs">
      <label for="source">Source</label>
      <textarea
        id="source"
        v-model="sourceText"
        name="source"
        cols="30"
        rows="10"
        placeholder="Enter a newline separated list to parse."
      ></textarea>

      <fieldset>
        <input
          id="parse-style-object"
          v-model="parseStyle"
          type="radio"
          name="parseStyle"
          value="object"
        />
        <label for="parse-style-object">Object</label>

        <input
          id="parse-style-map"
          v-model="parseStyle"
          type="radio"
          name="parseStyle"
          value="map"
        />
        <label for="parse-style-map">Map</label>

        <label for="keep-split-char">Keep Split Character</label>
        <input id="keep-split-char" v-model="keepSplitChar" type="checkbox" />

        <label for="has-values">Has Values</label>
        <input id="has-values" v-model="hasValues" type="checkbox" />
      </fieldset>

      <label for="split-char">Split Character</label>
      <input
        id="split-char"
        v-model="splitCharText"
        type="text"
        minlength="1"
        maxlength="1"
      />
    </div>

    <RecursionComponent
      :source="source"
      :parse-style="parseStyle"
      :split="split"
    ></RecursionComponent>
  </div>
</template>

<style>
.recursion-experiment {
  display: grid;

  .inputs {
    display: grid;
  }
}
</style>
