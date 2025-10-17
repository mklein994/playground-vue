<script setup lang="ts">
import { ref } from "vue";

const fruits = [
  { id: "apple", name: "Apple" },
  { id: "banana", name: "Banana" },
  { id: "cherry", name: "Cherry" },
];

const selectedFruits = ref<string[]>([]);
</script>

<template>
  <div class="multiple-checkboxes">
    <div class="checkboxes">
      <template v-for="fruit of fruits" :key="fruit.id">
        <input
          :id="fruit.id"
          v-model="selectedFruits"
          type="checkbox"
          :value="fruit.id"
          class="tw:form-checkbox checkbox"
        />

        <label :for="fruit.id" class="label">{{ fruit.name }}</label>
      </template>
    </div>

    <pre>{{ selectedFruits }}</pre>
  </div>
</template>

<style scoped>
.multiple-checkboxes {
  padding: 1em;
}

.checkboxes {
  display: grid;
  gap: 0.25em 0.125em;
  grid: auto / auto 1fr;
}
</style>
