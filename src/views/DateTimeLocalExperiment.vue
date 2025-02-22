<script setup lang="ts">
import { ref } from "vue";

const value = ref("");

const step = ref("");
</script>

<template>
  <div class="date-time-local-experiment">
    <div class="date-input">
      <label for="date-time-local">Input</label>
      <input
        id="date-time-local"
        v-model="value"
        type="datetime-local"
        :step="step"
      />
    </div>

    <div class="output">
      <label for="output">Output</label>
      <output id="output">{{ value }}</output>
    </div>

    <form class="settings" @submit.prevent>
      <label for="step">Step</label>
      <input v-model="step" type="number" />
    </form>
  </div>
</template>

<style scoped>
.date-time-local-experiment {
  display: grid;
  align-items: start;
  justify-content: start;
  margin: 1rem;
  gap: 1rem;
  grid-template-columns: auto auto;
}

.date-input,
.output {
  display: grid;
  justify-content: start;
  row-gap: 0.5rem;
}
</style>
