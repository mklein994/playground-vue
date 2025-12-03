<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const fruits = [
  { id: "apple", name: "Apple", checked: false },
  { id: "banana", name: "Banana", checked: true },
  { id: "cherry", name: "Cherry", checked: false },
];

const selectedFruits = ref(fruits.filter((f) => f.checked).map((f) => f.id));
const selectedFruitRadio = ref(selectedFruits.value[0]);
const selectedFruitSelect = ref(selectedFruits.value[0]);

const color = ref("rebeccapurple");
const checkbox = ref<HTMLInputElement>();

const checked = ref(true);
const indeterminate = ref(false);
onMounted(() => {
  watch(indeterminate, (isIndeterminate) => {
    checkbox.value!.indeterminate = isIndeterminate;
  });

  watch(checked, () => {
    indeterminate.value = false;
  });
});
</script>

<template>
  <form class="accent-color-experiment" @submit.prevent>
    <div class="text">
      <label for="accent-color">Accent Color</label>
      <input
        id="accent-color"
        v-model="color"
        type="text"
        class="tw:form-input"
      />
    </div>

    <div class="checkbox">
      <input
        id="checkbox"
        ref="checkbox"
        v-model="checked"
        type="checkbox"
        class="input tw:form-checkbox"
      />
      <label for="checkbox">Checkbox</label>

      <input
        id="indeterminate"
        v-model="indeterminate"
        type="checkbox"
        class="input tw:form-checkbox"
      />
      <label for="indeterminate">(Indeterminate)</label>
    </div>

    <div v-for="{ id, name } of fruits" :key="id" class="radio">
      <input
        :id="id"
        v-model="selectedFruitRadio"
        type="radio"
        name="fruit"
        class="input tw:form-radio"
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

    <div class="select">
      <select
        id="select"
        v-model="selectedFruitSelect"
        name="select"
        class="tw:form-select input"
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
      <input id="text" type="text" class="tw:form-input" />

      <label for="textarea">textarea</label>
      <textarea id="textarea" class="tw:form-textarea"></textarea>

      <label for="tel">tel</label>
      <input id="tel" type="tel" class="tw:form-input" />

      <label for="email">email</label>
      <input id="email" type="email" class="tw:form-input" />

      <label for="url">url</label>
      <input id="url" type="url" class="tw:form-input" />

      <label for="number">number</label>
      <input id="number" type="number" class="tw:form-input" />

      <label for="date">date</label>
      <input id="date" type="date" class="tw:form-input" />

      <label for="time">time</label>
      <input id="time" type="time" class="tw:form-input" />

      <label for="datetime-local">datetime-local</label>
      <input id="datetime-local" type="datetime-local" class="tw:form-input" />

      <label for="week">week</label>
      <input id="week" type="week" class="tw:form-input" />

      <label for="month">month</label>
      <input id="month" type="month" class="tw:form-input" />

      <label for="color">color</label>
      <input id="color" type="color" />

      <label for="password">password</label>
      <input
        id="password"
        type="password"
        autocomplete="off"
        class="tw:form-input"
      />

      <label for="submit-input">submit (input)</label>
      <input id="submit-input" type="submit" @click.prevent />

      <label for="submit-button">submit (button)</label>
      <button id="submit-button" type="submit" @click.prevent>Submit</button>

      <label for="search">search</label>
      <input id="search" type="search" class="tw:form-input" />

      <label for="button-input">button (input)</label>
      <input id="button-input" type="button" value="button" />

      <label for="button-button">button (button)</label>
      <button id="button-button" type="button">button</button>

      <label for="reset-input">reset (input)</label>
      <input id="reset-input" type="reset" @click.prevent />

      <label for="reset-button">reset (button)</label>
      <button id="reset-button" type="reset" @click.prevent>Reset</button>

      <label for="file">file</label>
      <input id="file" type="file" />
    </div>
  </form>
</template>

<style>
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

  @supports (accent-color: red) {
    .input,
    .regular-fields > :not(label) {
      accent-color: v-bind("color");
    }
  }
}
</style>
