<script setup lang="ts">
import hljsVuePlugin from "@highlightjs/vue-plugin";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import { defineCustomElement } from "vue";

import CustomElement from "@/components/CustomElement.ce.vue";

hljs.registerLanguage("css", css);

const Highlightjs = hljsVuePlugin.component;

// TODO: Remove this if type definitions become more accurate
const styles = (CustomElement as unknown as { styles: string[] }).styles[0];

if (customElements.get("custom-element") === undefined) {
  customElements.define("custom-element", defineCustomElement(CustomElement));
}
</script>

<template>
  <custom-element></custom-element>
  <Highlightjs language="css" :code="styles" style="white-space: pre-wrap" />
</template>
