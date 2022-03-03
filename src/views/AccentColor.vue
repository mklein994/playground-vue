<script setup lang="ts">
import { onMounted, ref } from "vue";

const fruits = [
  { id: "apple", name: "Apple", checked: false },
  { id: "banana", name: "Banana", checked: true },
  { id: "cherry", name: "Cherry", checked: false },
];

const selectedFruits = ref(fruits.filter((f) => f.checked).map((f) => f.id));
const selectedFruit = ref(selectedFruits.value[0]);

const color = ref("rebeccapurple");
const checkbox = ref<HTMLInputElement>();

onMounted(() => {
  if (checkbox.value !== undefined) {
    checkbox.value.indeterminate = true;
  }
});
</script>

<template>
  <div class="accent-color">
    <div class="text">
      <label for="color">Accent Color</label>
      <input id="color" v-model="color" type="text" />
    </div>

    <div class="checkbox">
      <input id="checkbox" ref="checkbox" type="checkbox" class="input" />
      <label for="checkbox">Checkbox</label>
    </div>

    <div v-for="{ id, name } of fruits" :key="id" class="radio">
      <input
        :id="id"
        v-model="selectedFruit"
        type="radio"
        name="fruit"
        class="input"
        :value="id"
      />
      <label :for="id">{{ name }}</label>
    </div>

    <div class="multiselect">
      <select
        id="multiselect"
        v-model="selectedFruits"
        name="multiselect"
        multiple
        class="input"
      >
        <option
          v-for="{ id, name } of fruits"
          :key="id"
          :value="id"
          class="input"
        >
          {{ name }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.accent-color {
  margin: 1em;
  display: flex;
  flex-wrap: wrap;
  gap: 1em;

  font-family: system-ui;
}

.text,
.checkbox,
.radio {
  display: flex;
  align-items: baseline;
  column-gap: 0.5em;
}

.text,
.checkbox {
  flex: 1 100%;
}

@supports (accent-color: rebeccapurple) {
  .input {
    accent-color: v-bind("color");
  }
}
</style>
