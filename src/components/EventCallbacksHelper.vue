<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = defineProps<{
  success?: boolean;
}>();

defineEmits<{
  stuff: [];
}>();

const result = ref("result before");

watchEffect(
  function () {
    if (props.success !== undefined) {
      return props.success ? console.log("success!") : console.warn("fail!");
    }
  },
  { flush: "sync" },
);

watchEffect(() => console.log(result.value));
</script>

<template>
  <button @click="$emit('stuff')">Do Stuff</button>
  <output
    :style="{
      color:
        success === true ? 'green' : success === undefined ? undefined : 'red',
    }"
    >{{ result }}</output
  >
</template>
