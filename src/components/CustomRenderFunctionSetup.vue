<template>
  <div>
    <p>Hello, world! (from script setup)</p>
    <button @click="foo--">Remove</button>
    <output class="output">{{ foo }}</output>
    <button @click="foo++">Add</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const foo = ref(5);
</script>

<style scoped>
.output {
  padding-inline: 1em;
}
</style>
