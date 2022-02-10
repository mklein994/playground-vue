<template>
  <EventCallbacksHelper @stuff="handleDoStuff" :success="success" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import EventCallbacksHelper from "../components/EventCallbacksHelper.vue";

const success = ref();

const handleDoStuff = async () => {
  console.log("waiting...");

  await new Promise(x => setTimeout(x, 1000));

  console.log("made it");
  success.value = true;
};
</script>
