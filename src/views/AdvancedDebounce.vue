<script setup lang="ts">
import { ref, shallowReactive, watch } from "vue";

import { debouncedRef } from "@/use/debouncedRef";

const wait = ref(250);
const leading = ref(false);
const trailing = ref(true);
const changed = ref(false);
watch(
  [wait, leading, trailing],
  ([newWait, newLeading, newTrailing], [oldWait, oldLeading, oldTrailing]) => {
    if (
      newWait !== oldWait
      || newLeading !== oldLeading
      || newTrailing !== oldTrailing
    ) {
      changed.value = true;
    }
  },
);
const nameRef = shallowReactive({
  name: debouncedRef("hello", wait.value, {
    leading: leading.value,
    trailing: trailing.value,
  }),
});

const handleSubmit = () => {
  nameRef.name = debouncedRef("hello", wait.value, {
    leading: leading.value,
    trailing: trailing.value,
  });
  changed.value = false;
};
</script>

<template>
  <div class="advanced-debounce-experiment">
    <form class="settings" @submit.prevent="handleSubmit">
      <label for="wait">Wait (ms)</label>
      <input id="wait" v-model="wait" type="number" />

      <label for="leading">Leading</label>
      <input id="leading" v-model="leading" type="checkbox" />

      <label for="trailing">Trailing</label>
      <input id="trailing" v-model="trailing" type="checkbox" />

      <button type="submit" :disabled="!changed">Submit</button>
    </form>
    <label for="name">Name</label>
    <input
      id="name"
      v-model="nameRef.name.value"
      type="text"
      :disabled="changed"
    />
    <pre>{{ nameRef.name }}</pre>
  </div>
</template>

<style>
.advanced-debounce-experiment {
  .settings {
    display: grid;
    max-width: max-content;
    justify-content: start;
    margin: 1rem;
    gap: 0.5rem;
    grid-template-columns: auto auto;
    justify-items: start;
  }
}
</style>
