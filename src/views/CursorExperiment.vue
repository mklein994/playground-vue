<script setup lang="ts">
const cursors = [
  "auto",
  "default",
  "none",
  "context-menu",
  "help",
  "pointer",
  "progress",
  "wait",
  "cell",
  "crosshair",
  "text",
  "vertical-text",
  "alias",
  "copy",
  "move",
  "no-drop",
  "not-allowed",
  "grab",
  "grabbing",
  "all-scroll",
  "col-resize",
  "row-resize",
  "n-resize",
  "e-resize",
  "s-resize",
  "w-resize",
  "ne-resize",
  "nw-resize",
  "se-resize",
  "sw-resize",
  "ew-resize",
  "ns-resize",
  "nesw-resize",
  "nwse-resize",
  "zoom-in",
  "zoom-out",
];
</script>

<template>
  <div class="cursor-experiment">
    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/cursor"
      >https://developer.mozilla.org/en-US/docs/Web/CSS/cursor</a
    >
    <div class="cursors">
      <code
        v-for="cursor of cursors"
        :key="cursor"
        class="cursor"
        :style="{ cursor }"
        >cursor: {{ cursor }};</code
      >
    </div>
  </div>
</template>

<style>
.cursor-experiment {
  display: grid;
  padding: 1rem;
  gap: 1em;

  .cursors {
    display: grid;
  }

  .cursor {
    display: block;
    padding: 0.25em;
  }
}
</style>
