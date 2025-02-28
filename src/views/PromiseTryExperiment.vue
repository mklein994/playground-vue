<script setup lang="ts">
import { ref } from "vue";

const message = ref("");
const text = ref("");
const useAsync = ref(false);

const sleepAsync = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const setMessage = (input: string) => {
  text.value = input;
};

const setMessageAsync = async (input: string) => {
  await sleepAsync(250);
  text.value = input;
};

const handleSubmit = async () => {
  await Promise.try(
    useAsync.value ? setMessageAsync : setMessage,
    message.value,
  );
};
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <label for="message">Message</label>
    <input id="message" v-model="message" type="text" />
    <input id="use-async" v-model="useAsync" type="checkbox" />
    <label for="use-async">Use Async</label>
    <button type="submit">Submit</button>
  </form>

  <output>{{ text }}</output>
</template>
