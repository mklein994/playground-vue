<script setup lang="ts">
import { onMounted, ref } from "vue";

function toOutput(value: unknown) {
  return `${JSON.stringify(value)} (${typeof value})`;
}

onMounted(() => {
  const nativeNumber = document.querySelector(
    "#native-number",
  ) as HTMLInputElement;

  nativeNumber.addEventListener("input", (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    const output = document.querySelector(
      "#native-number-output",
    ) as HTMLOutputElement;
    output.textContent = toOutput(value);
  });
});

const regularVueNumber = ref(20);
const regularVueNumberWithModifier = ref(30);
const numericVueNumber = ref(40);
</script>

<template>
  <input id="native-number" type="number" name="nativeNumber" value="10" />
  <pre><output id="native-number-output"></output></pre>

  <input v-model="regularVueNumber" />
  <pre><output>{{ toOutput(regularVueNumber) }}</output></pre>

  <input v-model.number="regularVueNumberWithModifier" />
  <pre><output>{{ toOutput(regularVueNumberWithModifier) }}</output></pre>

  <input v-model="numericVueNumber" type="number" />
  <pre><output>{{ toOutput(numericVueNumber) }}</output></pre>
</template>
