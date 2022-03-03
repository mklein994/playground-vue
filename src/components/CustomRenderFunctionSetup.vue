<script setup lang="ts">
import { ref } from "vue";

const foo = ref(5);
</script>

<template>
  <div>
    <p>Hello, world! (from script setup)</p>
    <button @click="foo--">Remove</button>
    <output class="render-output">{{ foo }}</output>
    <button @click="foo++">Add</button>
  </div>
</template>
