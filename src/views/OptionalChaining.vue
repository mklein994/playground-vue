<template>
  <strong>Fruit:</strong>
  <pre>{{ fruits }}</pre>
  <strong>Stores:</strong>
  <pre>{{ stores }}</pre>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

const fruits = ref([
  { id: "apple", name: "Apple", store: { name: "Superstore" } },
  { id: "banana", name: "Banana" },
  { id: "cherry", name: "Cherry", store: { name: "Costco" } },
]);

const stores = computed(() =>
  fruits.value.map((x) => x.store?.name ?? "(unknown store)")
);
</script>
