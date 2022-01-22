<template>
  <button @click="throwError()">Throw an error</button>
</template>

<script lang="ts" setup>
const throwError = () => {
  throw new Error("Aha! You found me!");
};
</script>
