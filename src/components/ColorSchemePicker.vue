<script setup lang="ts">
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";

import HalfCircleIcon from "@/components/HalfCircleIcon.vue";

const scheme = defineModel<"light" | "dark" | "os-default">();

const cycleScheme = () => {
  if (scheme.value === "os-default") {
    scheme.value = "dark";
  } else if (scheme.value === "dark") {
    scheme.value = "light";
  } else if (scheme.value === "light") {
    scheme.value = "os-default";
  } else {
    throw new Error(`Invalid scheme: ${JSON.stringify(scheme.value)}`);
  }
};
</script>

<template>
  <button
    type="button"
    :title="`Current: ${scheme}`"
    class="switcher-button"
    @click="cycleScheme"
  >
    <SunIcon v-if="scheme === 'light'" class="icon"></SunIcon>
    <MoonIcon v-else-if="scheme === 'dark'" class="icon"></MoonIcon>
    <HalfCircleIcon v-else class="icon"></HalfCircleIcon>
    Toggle Theme
  </button>
</template>

<style>
.switcher-button {
  display: flex;
  gap: 0.5rem;
  place-items: center;

  .icon {
    width: 1rem;
  }
}
</style>
