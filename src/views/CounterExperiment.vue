<script setup lang="ts">
const fruits = [
  "apple",
  "banana",
  "cherry",
  "placebit",
  "latine",
  "quid",
  "si",
  "nos",
  "non",
  "interpretum",
  "fungimur",
  "munere",
  "sed",
  "tuemur",
  "ea",
  "quae",
  "sint",
  "coniuncta",
  "explicabo",
  "brevi",
  "nullus",
  "in",
  "ipsis",
  "error",
  "est",
  "finibus",
  "bonorum",
  "et",
  "malorum",
  "fere",
  "a",
  "nobis",
  "philosophia",
];
</script>

<template>
  <ol class="fruit-list">
    <li v-for="fruit of fruits" :key="fruit">{{ fruit }}</li>
  </ol>
</template>

<style scoped>
@counter-style fruit-digits {
  suffix: " ";
  symbols: 🥇 🥈 🥉;
  system: fixed;
}

.fruit-list {
  padding-left: 1rem;
  margin-left: 1rem;
  counter-reset: fruit-digits;
  list-style: fruit-digits;
}
</style>
