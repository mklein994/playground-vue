<script setup lang="ts">
import { provide, ref } from "vue";

import { tailwindEnabledKey } from "@/injectionKeys";

import NavigationFragment from "./NavigationFragment.vue";

const tailwindEnabled = ref(false);

provide(tailwindEnabledKey, tailwindEnabled);
</script>

<template>
  <NavigationFragment />
  <RouterView />
</template>
