<script setup lang="ts">
import { computed, ref } from "vue";

const fruits = [
  { id: "apple", name: "Apple" },
  { id: "banana", name: "Banana" },
  { id: "cherry", name: "Cherry" },
];

const selectedFruitId = ref<string>();

const backgroundColor = computed(() => {
  let color = null;

  switch (selectedFruitId.value) {
    case "apple":
      color = "red";
      console.log(color);
      break;
    case "banana":
      color = "yellow";
      console.log(color);
      break;
    case "cherry":
      color = "darkred";
      console.log(color);
      break;
    default:
      color = "white";
      console.log(color);
      break;
  }

  return color;
});
</script>

<template>
  <div class="multi-line-switch-statement">
    <label for="fruit" class="label">Pick a fruit:</label>
    <select id="fruit" v-model="selectedFruitId" class="tw:form-select">
      <option value="" disabled>Pick a fruit:</option>
      <option v-for="fruit of fruits" :key="fruit.id" :value="fruit.id">
        {{ fruit.name }}
      </option>
    </select>

    <span class="fruit-color" :style="{ backgroundColor }"></span>
  </div>
</template>

<style scoped>
.multi-line-switch-statement {
  display: grid;
  width: max-content;
  margin: 1em;
  gap: 0.5em 1em;
  grid: repeat(2, 1fr) / auto-flow 1fr;
}

.fruit-color {
  display: block;
  width: 100%;
  min-width: 1em;
  height: 100%;
  min-height: 1em;
  align-self: center;
  border: 1px solid black;
  grid-row: 1 / -1;
}
</style>
