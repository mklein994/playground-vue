<script setup lang="ts">
import { computed, inject, onBeforeMount } from "vue";

import { tailwindEnabledKey } from "@/injectionKeys";

const tailwindSupported = __PLAYGROUND_VUE_TAILWIND_SUPPORTED__;

const tailwindEnabled = inject(tailwindEnabledKey)!;
const tailwindLocked = computed(
  () => !tailwindSupported || (import.meta.env.DEV && tailwindEnabled.value),
);

const toggleTailwind = async (enable: boolean) => {
  if (import.meta.env.DEV) {
    await import("@/tailwind.css");
    tailwindEnabled.value = enable;
    return;
  }

  tailwindEnabled.value = enable;

  const link = document.head.querySelector<HTMLLinkElement>(
    "link[title='tailwind']",
  );

  if (link == null) {
    throw new Error(
      "tailwind style <link title='tailwind'> not found. This is only available on production builds.",
    );
  }

  link.disabled = !tailwindEnabled.value;
};

const handleToggleTailwindClick = async (event: Event) => {
  const value = (event.target as HTMLInputElement).checked;

  await toggleTailwind(value);
};

onBeforeMount(async () => {
  if (import.meta.env.VITE_TAILWIND_ENABLED) {
    await toggleTailwind(true);
  }
});
</script>

<template>
  <div class="enable-tailwind">
    <input
      id="tailwind"
      v-model="tailwindEnabled"
      type="checkbox"
      class="tw:form-checkbox tailwind-checkbox"
      :value="tailwindEnabled"
      :disabled="tailwindLocked"
      @input="handleToggleTailwindClick"
    />
    <label for="tailwind">Enable Tailwind</label>

    <div v-if="tailwindLocked" class="reset-message">
      <template v-if="tailwindSupported">(refresh to reset)</template>
      <template v-else>(not supported)</template>
    </div>
  </div>
</template>

<style scoped>
.enable-tailwind {
  display: grid;
  align-items: center;
  justify-content: start;
  column-gap: 0.5em;
  grid-template-columns: repeat(2, auto);
}

.tailwind-checkbox:disabled {
  color: GrayText;
  outline-color: GrayText;
}

.tailwind-checkbox:disabled ~ * {
  color: GrayText;
}

.reset-message {
  /* @apply tw:text-sm; */
  font-size: 0.875rem;
  grid-column-end: -1;
  line-height: 1.25rem;
}
</style>
