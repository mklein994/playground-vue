<script setup lang="ts">
import hljsVuePlugin from "@highlightjs/vue-plugin";
import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";

import ColorWheelGenerator from "@/components/ColorWheelGenerator.vue";

hljs.registerLanguage("css", css);

const Highlightjs = hljsVuePlugin.component;

const code = `
@supports (color: rgb(from white r g b)) {
  .foo {
    color: rgb(from white r g b);
  }
}
`;
</script>

<template>
  <div class="relative-color-syntax">
    <p>Syntax goes like this:</p>
    <Highlightjs lang="css" :code="code" />

    <p>Demo:</p>

    <div class="demo">
      <h1>Demo</h1>

      <p class="outer">
        Elit perferendis dolor natus cupiditate unde! Distinctio assumenda
        aspernatur ad enim eligendi! <span class="inner">Foobar</span> Nihil
        molestias hic vitae soluta vel. Provident odio eum labore odit nobis Ad
        neque deserunt omnis porro hic.
      </p>
    </div>

    <ColorWheelGenerator></ColorWheelGenerator>
  </div>
</template>

<style>
.relative-color-syntax {
  .demo {
    --color: forestgreen;
    color: var(--color);
  }

  .outer {
    color: rgb(from var(--color) r g 128);
  }

  .inner {
    color: hsl(from var(--color) calc(h + 180) s calc(l * 2));
  }
}
</style>
