<template>
  <Suspense>
    <ForAwaitList />
  </Suspense>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

const ForAwaitList = defineAsyncComponent(
  () => import("../components/ForAwaitList.vue")
);
</script>
