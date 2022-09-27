<script setup lang="ts">
import { injectStrict, tailwindEnabledKey } from "@/injectionKeys";

const debugInfo = {
  versionString: import.meta.env.VITE_VERSION_STRING ?? "(undefined)",
  commit: import.meta.env.VITE_COMMIT_HASH ?? "(undefined)",
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  SSR: import.meta.env.SSR,
  PROD: import.meta.env.PROD,
  BASE_URL: import.meta.env.BASE_URL,
  URL: import.meta.url,
  HOT: import.meta.hot ?? "(undefined)",
  VITEST: import.meta.vitest ?? "(undefined)",
};

const tailwindEnabled = injectStrict(tailwindEnabledKey);
const meta = import.meta;
</script>

<template>
  <div class="debug-info">
    <pre>{{ debugInfo }}</pre>
    <pre>Tailwind enabled: {{ tailwindEnabled }}</pre>
    <details>
      <summary>
        <code>import.meta</code>
      </summary>
      <pre>{{ meta }}</pre>
    </details>
  </div>
</template>

<style scoped>
.debug-info pre {
  white-space: pre-wrap;
}
</style>
