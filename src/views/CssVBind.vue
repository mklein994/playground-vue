<script setup lang="ts">
import { ref } from "vue";

const color = ref("blue");
</script>

<template>
  <div class="text">hello</div>
  <input v-model="color" type="text" name="color" />
  <input v-model="color" type="color" name="color" />
</template>

<style scoped>
.text {
  /* can be a JavaScript expression, e.g. v-bind("color ?? 'blue'") */
  color: v-bind("color");
}
</style>
