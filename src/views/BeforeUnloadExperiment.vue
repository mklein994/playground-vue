<script setup lang="ts">
import { computed, ref } from "vue";

import { useUnsavedChanges } from "@/use/unsaved-changes";

const name = ref<string>("Bob");
const age = ref<number>(1234);

interface Form {
  name: string;
  age: number;
}

const form = ref<Form>({
  name: name.value,
  age: age.value,
});

const hasChanges = computed(
  () => form.value.name !== name.value || form.value.age !== age.value,
);

useUnsavedChanges(hasChanges, "Are ya sure ya want to leave?");

const saved = ref(false);
const submitForm = () => {
  form.value.name = name.value;
  form.value.age = age.value;
  saved.value = true;
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <label for="name">Name</label>
    <input id="name" v-model="name" type="text" />
    <label for="age">Age</label>
    <input id="age" v-model="age" type="number" />

    <button type="submit">Submit</button>
  </form>
  <pre>name: {{ name }}</pre>
  <pre>age: {{ JSON.stringify(age) }}</pre>
  <pre>form: {{ form }}</pre>
  <pre>hasChanges: {{ hasChanges }}</pre>
  <pre>saved: {{ saved }}</pre>
</template>
