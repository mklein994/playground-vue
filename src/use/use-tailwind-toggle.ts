import { computed, inject } from "vue";

import { tailwindEnabledKey } from "@/injectionKeys";

const tailwindSupported = __PLAYGROUND_VUE_TAILWIND_SUPPORTED__;

export const useTailwindToggle = () => {
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

  return {
    toggleTailwind,
    tailwindEnabled,
    tailwindLocked,
    tailwindSupported,
  };
};
