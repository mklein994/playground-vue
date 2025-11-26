<script setup lang="ts">
import { ref } from "vue";

import { throttle } from "@/use/throttle";

const throttled = ref(0);

const bump = (amount: number) => {
  throttled.value += amount;
};

const handleClick = throttle((amount: number) => bump(amount), 500);
</script>

<template>
  <div class="throttle-experiment">
    <button @click="handleClick(1)">Click me</button>
    <pre>{{ throttled }}</pre>
  </div>
</template>

<style>
.throttle-experiment {
  display: flex;
  align-items: baseline;
  padding: 1rem;
  gap: 1rem;
}
</style>
