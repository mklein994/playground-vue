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
  <div class="accent-color-experiment">
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
        class="tw:form-multiselect input"
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

    <div class="regular-fields">
      <label for="range">range</label>
      <input id="range" type="range" />

      <label for="progress">progress</label>
      <progress id="progress" max="100" value="70">70%</progress>

      <label for="text">text</label>
      <input id="text" type="text" />

      <label for="tel">tel</label>
      <input id="tel" type="tel" />

      <label for="email">email</label>
      <input id="email" type="email" />

      <label for="url">url</label>
      <input id="url" type="url" />

      <label for="number">number</label>
      <input id="number" type="number" />

      <label for="date">date</label>
      <input id="date" type="date" />

      <label for="time">time</label>
      <input id="time" type="time" />

      <label for="datetime-local">datetime-local</label>
      <input id="datetime-local" type="datetime-local" />

      <label for="week">week</label>
      <input id="week" type="week" />

      <label for="month">month</label>
      <input id="month" type="month" />

      <label for="color">color</label>
      <input id="color" type="color" />

      <label for="password">password</label>
      <input id="password" type="password" autocomplete="off" />

      <label for="submit">submit</label>
      <input id="submit" type="submit" @click.prevent />

      <label for="search">search</label>
      <input id="search" type="search" />

      <label for="button">button</label>
      <input id="button" type="button" value="button" />

      <label for="reset">reset</label>
      <input id="reset" type="reset" @click.prevent />

      <label for="file">file</label>
      <input id="file" type="file" />
    </div>
  </div>
</template>

<style scoped>
.accent-color-experiment {
  display: flex;
  flex-wrap: wrap;
  margin: 1em;

  font-family: system-ui;
  gap: 1em;

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

  .regular-fields {
    display: grid;
    gap: 0.5em;
    grid: auto-flow / repeat(2, auto);
    justify-items: start;
  }

  @supports (accent-color: rebeccapurple) {
    .input,
    .regular-fields > :not(label) {
      accent-color: v-bind("color");
    }
  }
}
</style>
