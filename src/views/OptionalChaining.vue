<template>
  <strong>Fruit:</strong>
  <pre>{{ fruits }}</pre>
  <strong>Stores:</strong>
  <pre>{{ stores }}</pre>
  <pre
    style="font-size: 0.8em; white-space: pre-wrap"
  ><code>{{ getStores }}</code></pre>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

const fruits = ref([
  { id: "apple", name: "Apple", store: { name: "Superstore" } },
  { id: "banana", name: "Banana" },
  { id: "cherry", name: "Cherry", store: { name: "Costco" } },
]);

const getStores = () =>
  fruits.value.map((fruit) => fruit.store?.name ?? "(unknown store)");

const stores = computed(getStores);
</script>
