<script setup lang="ts">
import { provide, ref } from "vue";

import NavigationFragment from "@/NavigationFragment.vue";

import {
  resolvedSchemeKey,
  schemeKey,
  tailwindEnabledKey,
} from "@/injectionKeys";
import { useColorScheme } from "@/use/use-color-scheme";

const tailwindEnabled = ref(false);

provide(tailwindEnabledKey, tailwindEnabled);

const { scheme, resolvedScheme } = useColorScheme();
provide(schemeKey, scheme);
provide(resolvedSchemeKey, resolvedScheme);
</script>

<template>
  <NavigationFragment></NavigationFragment>
  <RouterView></RouterView>
</template>

<style>
@import "highlight.js/styles/github-dark-dimmed.min.css" layer(highlight-theme);
</style>
