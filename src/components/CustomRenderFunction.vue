<script lang="ts">
import { defineComponent, h, ref } from "vue";

export default defineComponent(function CustomRenderFunction() {
  const foo = ref(5);

  return () =>
    h("div", [
      h("p", "Hello, world! (from render function)"),
      h("button", { onClick: () => foo.value-- }, "Remove"),
      h("output", { class: "render-output" }, foo.value),
      h("button", { onClick: () => foo.value++ }, "Add"),
      h("p", "How are you today?"),
    ]);
});
</script>

<!-- Scoped styles are not supported with SFC render functions -->
<style>
.custom-render-function-output {
  padding-inline: 1em;
}
</style>
