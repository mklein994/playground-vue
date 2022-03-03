<script setup lang="ts">
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

<template>
  <strong>Fruit:</strong>
  <pre>{{ fruits }}</pre>

  <strong>Stores:</strong>
  <pre>{{ stores }}</pre>

  <Highlightjs
    language="ts"
    :code="getStores.toString()"
    style="white-space: pre-wrap"
  />
</template>

<style>
@import "highlight.js/styles/github-dark-dimmed.css";
</style>
