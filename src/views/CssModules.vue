<template>
  <div :class="$style.foo">
    Ipsum rem optio quia sequi minus! Voluptatibus dolorem deleniti repellat
    adipisci ab optio doloremque Culpa facere enim voluptatum quia ad? Odit enim
    in quis beatae recusandae Enim porro commodi iusto?
  </div>
  <pre>{{ foo }}</pre>
</template>

<script lang="ts" setup>
import { ref, useCssModule } from "vue";

const css = useCssModule();

const foo = ref<string>(css.foo);
</script>

<style module>
.foo {
  color: red;
}
</style>
