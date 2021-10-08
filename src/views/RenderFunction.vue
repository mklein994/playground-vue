<template>
  <div class="render-function">
    <p>This is from a render function:</p>

    <CustomRenderFunction />

    <pre class="code">{{ renderCode }}</pre>

    <p>
      This is from the equivalent <code>&lt;script setup&gt;</code> component:
    </p>

    <CustomRenderFunctionSetup />

    <pre class="code">{{ setupCode }}</pre>
  </div>
</template>

<script lang="ts" setup>
import CustomRenderFunction from "../components/CustomRenderFunction.vue";
import CustomRenderFunctionSetup from "../components/CustomRenderFunctionSetup.vue";

const renderCode = `${CustomRenderFunction.setup}`;
const setupCode = `${
  CustomRenderFunctionSetup.render ?? CustomRenderFunctionSetup.setup
}`;
</script>

<style scoped>
.code {
  white-space: pre-wrap;
}
</style>
