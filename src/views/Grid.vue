<template>
  <div class="grid-component">
    <div v-for="fruit in fruits" :key="fruit" class="item">{{ fruit }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const fruits = ref(["apple", "banana", "cherry"]);
</script>

<style lang="scss">
.grid-component {
  display: grid;
  gap: 1rem;
  margin: 1rem;
  padding: 1rem;
  background: lightcoral;
}

.grid-component > {
  .item {
    border: 1px solid black;
  }
}
</style>
