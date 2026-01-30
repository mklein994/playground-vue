<script setup lang="ts">
import { ref } from "vue";

const fruits = ref([
  "apple",
  "avocado",
  "banana",
  "blueberry",
  "cherry",
  "coconut",
  "honeydew",
  "kiwi",
  "lemon",
  "lime",
  "mango",
  "nectarine",
  "orange",
  "pear",
  "plum",
  "pomegranate",
  "raspberry",
  "strawberry",
  "tangerine",
  "tomato",
  "watermelon",
]);

const gridDefinition = ref("auto-flow / repeat(3, 1fr)");
const gridStyle = ref("gap: 0.25em");
const itemStyle = ref("outline: 1px solid teal");
</script>

<template>
  <div class="grid-experiment">
    <div class="input-group">
      <label for="grid-definition">Grid definition</label>
      <textarea id="grid-definition" v-model="gridDefinition"></textarea>

      <label for="grid-style">Grid style</label>
      <textarea id="grid-style" v-model="gridStyle"></textarea>

      <label for="item-style">Item style</label>
      <textarea id="item-style" v-model="itemStyle"></textarea>
    </div>

    <div class="grid-component" :style="gridStyle">
      <div v-for="fruit in fruits" :key="fruit" class="item" :style="itemStyle">
        {{ fruit }}
      </div>
    </div>
  </div>
</template>

<style>
.grid-experiment {
  .input-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5em;
  }

  .grid-component {
    display: grid;
    grid: v-bind("gridDefinition");
  }
}
</style>
