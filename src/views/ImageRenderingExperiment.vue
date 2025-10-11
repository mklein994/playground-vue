<script setup lang="ts">
import { ref } from "vue";

// Chrome renders "crisp-edges" as if it were "smooth", so use "pixelated"
// instead as it renders the same as "crisp-edges" on other browsers.
const defaultImageRendering = ref<string>(
  "chrome" in window ? "pixelated" : "crisp-edges",
);

const imageRendering = ref<string>(defaultImageRendering.value);
</script>

<template>
  <div class="image-rendering-experiment">
    <form class="settings" @submit.prevent>
      <label for="image-rendering-picker" class="image-rendering-picker-label"
        >Rendering Style</label
      >
      <select
        id="image-rendering-picker"
        v-model="imageRendering"
        class="image-rendering-picker"
      >
        <option value="auto">Auto</option>
        <option value="smooth">Smooth</option>
        <option value="crisp-edges">Crisp Edges</option>
        <option value="pixelated">Pixelated</option>
      </select>
    </form>

    <p>
      Images come from the
      <a href="https://ghostty.org"
        ><img
          srcset="
            @/assets/ghostty_icon_16.png,
            @/assets/ghostty_icon_16@2x.png 2x
          "
          src="@/assets/ghostty_icon_16.png"
          alt="Ghostty Icon (original size)"
          class="link-image"
        />
        Ghostty project</a
      >.
    </p>

    <p>
      Docs for
      <code class="pv-code">image-rendering</code> on MDN:
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering"
        >image-rendering</a
      >.
    </p>

    <img
      srcset="@/assets/ghostty_icon_16.png, @/assets/ghostty_icon_16@2x.png 2x"
      src="@/assets/ghostty_icon_16.png"
      alt="Ghostty Icon"
      class="image"
      width="256"
      height="256"
    />

    <img
      srcset="
        @/assets/ghostty_icon_512.png,
        @/assets/ghostty_icon_512@2x.png 2x
      "
      src="@/assets/ghostty_icon_512.png"
      alt="Ghostty Icon (hi-res)"
      class="reference-image"
    />
  </div>
</template>

<style scoped>
.image-rendering-experiment {
  padding: 1rem;
}

.settings {
  display: grid;
  gap: 0.25rem;
  place-items: start;
}

.image {
  image-rendering: v-bind("imageRendering");
}
</style>
