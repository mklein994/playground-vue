<template>
  <strong>Fruit:</strong>
  <pre>{{ fruits }}</pre>
  <strong>Stores:</strong>
  <pre>{{ stores }}</pre>
  <pre
    style="font-size: 0.8em; white-space: pre-wrap"
  ><code>{{ getStores }}</code></pre>
  <Highlightjs
    language="ts"
    :code="getStores.toString()"
    style="white-space: pre-wrap"
  />
</template>

<script lang="ts" setup>
import hljsVuePlugin from "@highlightjs/vue-plugin";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import { computed, ref } from "vue";

hljs.registerLanguage("ts", typescript);

const Highlightjs = hljsVuePlugin.component;

const fruits = ref([
  { id: "apple", name: "Apple", store: { name: "Superstore" } },
  { id: "banana", name: "Banana" },
  { id: "cherry", name: "Cherry", store: { name: "Costco" } },
]);

const getStores = () =>
  fruits.value.map((fruit) => fruit.store?.name ?? "(unknown store)");

const stores = computed(getStores);
</script>

<style>
@import "highlight.js/styles/github-dark-dimmed.css";
</style>
