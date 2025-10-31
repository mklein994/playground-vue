<script setup lang="ts">
import { provide, ref, watchEffect } from "vue";

import NavigationFragment from "@/NavigationFragment.vue";

import {
  resolvedSchemeKey,
  schemeKey,
  tailwindEnabledKey,
} from "@/injectionKeys";
import { useColorScheme } from "@/use/use-color-scheme";

const tailwindEnabled = ref(!!import.meta.env.VITE_TAILWIND_ENABLED);

provide(tailwindEnabledKey, tailwindEnabled);

const { scheme, resolvedScheme } = useColorScheme();
provide(schemeKey, scheme);
provide(resolvedSchemeKey, resolvedScheme);

const darkLink = document.head.querySelector<HTMLLinkElement>(
  'link[title="code-dark"]',
)!;
const lightLink = document.head.querySelector<HTMLLinkElement>(
  'link[title="code-light"]',
)!;

watchEffect(() => {
  const isDark = resolvedScheme.value === "dark";

  darkLink.disabled = !isDark;
  lightLink.disabled = isDark;
});
</script>

<template>
  <NavigationFragment></NavigationFragment>
  <RouterView></RouterView>
</template>
