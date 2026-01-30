<script setup lang="ts">
import { ref } from "vue";

import { debounce } from "@/use/debounce";

const debounced = ref(0);

const bump = (amount: number) => {
  debounced.value += amount;
};

const handleClick = debounce((amount: number) => bump(amount), 500);
</script>

<template>
  <div class="debounce-experiment">
    <button @click="handleClick(1)">Click me</button>
    <pre>{{ debounced }}</pre>
  </div>
</template>

<style>
.debounce-experiment {
  display: flex;
  gap: 1rem;
  align-items: baseline;
  padding: 1rem;
}
</style>
