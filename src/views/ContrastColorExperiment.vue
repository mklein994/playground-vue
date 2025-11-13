<script setup lang="ts">
import { ref } from "vue";

const color = ref("red");
</script>

<template>
  <div class="contrast-color-experiment">
    <form class="form" @submit.prevent>
      <input v-model="color" type="color" />
      <input id="color" v-model="color" type="text" />
      <label for="color">Color</label>
    </form>

    <p class="sample-text pv-contrast-color">Hello world!</p>
  </div>
</template>

<style>
.contrast-color-experiment {
  .sample-text {
    --color: v-bind("color");
    background-color: var(--color);
    color: var(--pv-contrast-color);
  }
}
</style>
