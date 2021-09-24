<template>
  <custom-element></custom-element>
  <Highlightjs language="css" :code="styles" style="white-space: pre-wrap" />
</template>

<script lang="ts">
import hljsVuePlugin from "@highlightjs/vue-plugin";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import { defineComponent, defineCustomElement } from "vue";

import CustomElement from "../components/CustomElement.ce.vue";

hljs.registerLanguage("css", css);

const Highlightjs = hljsVuePlugin.component;

const styles = CustomElement.styles[0];

customElements.define("custom-element", defineCustomElement(CustomElement));

export default defineComponent({
  name: "CustomElement",
  components: { Highlightjs },
  setup: () => {
    return {
      styles,
    };
  },
});
</script>

<style>
@import "highlight.js/styles/github-dark-dimmed.css";
</style>
