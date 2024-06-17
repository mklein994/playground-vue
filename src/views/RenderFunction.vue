<script setup lang="ts">
import hljsVuePlugin from "@highlightjs/vue-plugin";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";

import CustomRenderFunction from "@/components/CustomRenderFunction.vue";
import CustomRenderFunctionSetup from "@/components/CustomRenderFunctionSetup.vue";

hljs.registerLanguage("ts", typescript);

const Highlightjs = hljsVuePlugin.component;

const renderCode =
  "setup" in CustomRenderFunction &&
  typeof CustomRenderFunction.setup === "function"
    ? CustomRenderFunction.setup.toString()
    : "";
const setupCode = import.meta.env.PROD
  ? `${CustomRenderFunctionSetup.setup}`
  : `// setup()
${CustomRenderFunctionSetup.setup}

// render()
${CustomRenderFunctionSetup.render}`;

const codeStyle = import.meta.env.PROD
  ? {
      "white-space": "pre-wrap",
      "word-break": "break-all",
    }
  : {};
</script>

<template>
  <div class="render-function">
    <p>This is from a render function:</p>

    <CustomRenderFunction></CustomRenderFunction>

    <Highlightjs
      language="ts"
      :code="renderCode"
      :style="codeStyle"
    ></Highlightjs>

    <p>
      This is from the equivalent <code>&lt;script setup&gt;</code> component:
    </p>

    <CustomRenderFunctionSetup></CustomRenderFunctionSetup>

    <Highlightjs
      language="ts"
      :code="setupCode"
      :style="codeStyle"
    ></Highlightjs>
  </div>
</template>

<style>
.render-output {
  padding-inline: 0.5em;
}
</style>
