<script setup lang="ts">
import { computed, ref } from "vue";

import RecursionComponent from "@/components/RecursionComponent.vue";

const sourceText = ref<string>();
const parseStyle = ref<"object" | "map">("object");
const splitCharText = ref<string>();

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
const escapeRegExp = (input: string) =>
  input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string

const splitFunc = (char: string) => {
  const c = escapeRegExp(char);
  return new RegExp(c + "[^" + char + "]+", "g");
};

const source = computed(() => {
  const charText = splitCharText.value;
  const text = sourceText.value;
  const re = charText
    ? new RegExp("^" + escapeRegExp(charText) + "*")
    : undefined;
  return !text
    ? undefined
    : text
        .trim()
        .split(/\n/)
        .map((x) => (!re ? x : x.replace(re, charText!)));
});
const split = computed(() => {
  const char = splitCharText.value;
  return !char
    ? (word: string) => [word]
    : (word: string) => word.match(splitFunc(char)) ?? [];
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
    />
  </div>
</template>

<style scoped>
.recursion-experiment {
  display: grid;
}

.inputs {
  display: grid;
}
</style>
