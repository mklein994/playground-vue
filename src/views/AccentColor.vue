<template>
  <div class="accent-color">
    <div class="text">
      <label for="color">Accent Color</label>
      <input id="color" v-model="color" type="text" />
    </div>

    <div class="checkbox">
      <input id="checkbox" type="checkbox" class="input" indeterminate />
      <label for="checkbox">Checkbox</label>
    </div>

    <div class="radio">
      <input
        id="apple"
        type="radio"
        name="fruit"
        value="apple"
        class="input"
        checked
      />
      <label for="apple">Apple</label>
    </div>

    <div class="radio">
      <input
        id="banana"
        type="radio"
        name="fruit"
        value="banana"
        class="input"
      />
      <label for="banana">Banana</label>
    </div>

    <div class="radio">
      <input
        id="cherry"
        type="radio"
        name="fruit"
        value="cherry"
        class="input"
      />
      <label for="cherry">Apple</label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const color = ref("rebeccapurple");
</script>

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
