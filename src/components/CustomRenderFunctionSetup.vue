<script setup lang="ts">
import { ref } from "vue";

const foo = ref(5);
const sourceText =
  import.meta.env.MODE === "test" ? "" : " (from script setup)";
</script>

<template>
  <div>
    <p>Hello, world!{{ sourceText }}</p>
    <button class="decrement" @click="foo--">Remove</button>
    <output class="render-output">{{ foo }}</output>
    <button class="increment" @click="foo++">Add</button>
  </div>
</template>
