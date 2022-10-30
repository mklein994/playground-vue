<script lang="ts">
import { defineComponent, h, ref } from "vue";

export default defineComponent(function CustomRenderFunction() {
  const foo = ref(5);
  const sourceText =
    import.meta.env.MODE === "test" ? "" : " (from render function)";

  return () =>
    h("div", [
      h("p", `Hello, world!${sourceText}`),
      h("button", { class: "decrement", onClick: () => foo.value-- }, "Remove"),
      h("output", { class: "render-output" }, foo.value),
      h("button", { class: "increment", onClick: () => foo.value++ }, "Add"),
    ]);
});
</script>

<!-- Scoped styles are not supported with SFC render functions -->
<style>
.custom-render-function-output {
  padding-inline: 1em;
}
</style>
