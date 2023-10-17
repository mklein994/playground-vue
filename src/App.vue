<script setup lang="ts">
import { provide, ref } from "vue";

import NavigationFragment from "@/NavigationFragment.vue";

import { tailwindEnabledKey } from "@/injectionKeys";

const tailwindEnabled = ref(false);

provide(tailwindEnabledKey, tailwindEnabled);
</script>

<template>
  <NavigationFragment />
  <RouterView />
</template>

<style>
@import "highlight.js/styles/github-dark-dimmed.min.css" layer(highlight-theme);
</style>
