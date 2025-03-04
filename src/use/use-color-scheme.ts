import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue";

export const useColorScheme = () => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = ref<boolean>(mediaQuery.matches);

  const handler = (event: MediaQueryListEvent) => {
    isDark.value = event.matches;
  };

  onMounted(() => {
    mediaQuery.addEventListener("change", handler);
  });

  onUnmounted(() => {
    mediaQuery.removeEventListener("change", handler);
  });

  const getDefaultScheme = (): "light" | "dark" | "os-default" => {
    const rawScheme = localStorage.getItem("pv-scheme");
    if (rawScheme == null || rawScheme === "os-default") {
      return "os-default";
    }
    if (rawScheme === "light" || rawScheme === "dark") {
      return rawScheme;
    }

    throw new Error(`Invalid color scheme: ${JSON.stringify(rawScheme)}`);
  };

  const scheme = ref(getDefaultScheme());
  watchEffect(() => {
    localStorage.setItem("pv-scheme", scheme.value);
  });

  const resolvedScheme = computed(() =>
    scheme.value === "os-default"
      ? isDark.value
        ? "dark"
        : "light"
      : scheme.value,
  );

  watchEffect(() => {
    const meta: HTMLMetaElement = document.head.querySelector(
      "meta[name='color-scheme']",
    ) as HTMLMetaElement;
    const metaContent = {
      "os-default": "light dark",
      light: "light",
      dark: "dark",
    }[scheme.value];

    if (metaContent === undefined) {
      throw new Error(`Invalid scheme value: ${JSON.stringify(scheme.value)}`);
    }

    meta.setAttribute("content", metaContent);
  });

  return {
    scheme,
    resolvedScheme,
  };
};
