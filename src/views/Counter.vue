<template>
  <ol class="fruit-list">
    <li v-for="fruit of fruits" :key="fruit">{{ fruit }}</li>
  </ol>
</template>

<script lang="ts" setup>
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

<style scoped>
@counter-style fruit-digits {
  system: fixed;
  symbols: 🥇 🥈 🥉;
  suffix: " ";
}

.fruit-list {
  margin-left: 1rem;
  padding-left: 1rem;
  list-style: fruit-digits;
  counter-reset: fruit-digits;
}
</style>
