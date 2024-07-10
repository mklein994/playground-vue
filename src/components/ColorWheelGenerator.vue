<!-- Inspired by the demo at https://www.stefanjudis.com/notes/new-in-css-relative-colors/ -->
<script setup lang="ts">
import { computed, ref } from "vue";

import ColorWheel from "@/components/ColorWheel.vue";

const steps = ref(5);
const initialColor = ref("#613583");
const baseColor = computed(() => `hsl(from ${initialColor.value} h s 50%)`);
</script>

<template>
  <div class="color-wheel-generator">
    <div class="steps-input">
      <label for="steps">Steps</label>
      <input
        id="steps"
        v-model.number="steps"
        type="range"
        name="steps"
        min="4"
        max="16"
        class="color-steps"
      />
      <output>{{ steps }}</output>
    </div>

    <ColorWheel v-model="initialColor" :steps="steps"></ColorWheel>
  </div>
</template>

<style scoped>
.steps-input {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.color-steps {
  accent-color: v-bind("baseColor");
}
</style>
