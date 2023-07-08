<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const ForAwaitList = defineAsyncComponent(
  () => import("../components/ForAwaitList.vue"),
);
</script>

<template>
  <Suspense>
    <ForAwaitList />
  </Suspense>
</template>
