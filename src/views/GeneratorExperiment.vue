<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const GeneratorList = defineAsyncComponent(
  () => import("@/components/GeneratorList.vue"),
);
</script>

<template>
  <Suspense>
    <GeneratorList></GeneratorList>
  </Suspense>
</template>
