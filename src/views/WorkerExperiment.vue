<script setup lang="ts">
import { ref } from "vue";

const worker = new Worker(
  new URL("../workers/my-first-worker", import.meta.url),
  { name: "MyFirstWorker" },
);

const number1 = ref(0);
const number2 = ref(0);
const result = ref("Result: 0");

const numberUpdated = () => {
  worker.postMessage([number1.value, number2.value]);
  console.log("Message posted to worker");
};

worker.onmessage = (e: MessageEvent<string>) => {
  result.value = e.data;
  console.log("Message received from worker");
};
</script>

<template>
  <input
    id="number1"
    v-model="number1"
    type="number"
    name="number1"
    @change="numberUpdated()"
  />
  <input
    id="number2"
    v-model="number2"
    type="number"
    name="number2"
    @change="numberUpdated()"
  />
  <output>
    <pre>{{ result }}</pre>
  </output>
</template>
