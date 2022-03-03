<script setup lang="ts">
const throwError = () => {
  throw new Error("Aha! You found me!");
};
</script>

<template>
  <button @click="throwError()">Throw an error</button>
</template>
