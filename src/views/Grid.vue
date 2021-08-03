<template>
  <div class="grid-component">
    <div v-for="fruit in fruits" :key="fruit" class="item">{{ fruit }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Grid",
  setup: () => {
    const fruits = ref(["apple", "banana", "cherry"]);

    return {
      fruits,
    };
  },
});
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
