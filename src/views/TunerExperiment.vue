<script setup lang="ts">
import { ref } from "vue";

import ChromaticTuner from "@/components/chromatic-tuner/ChromaticTuner.vue";

import { useTuner } from "@/use/use-tuner";

const referenceHz = ref(440);
const { power, pitchCents, pitchName } = useTuner(referenceHz);
</script>

<template>
  <div class="tuner-experiment">
    <ChromaticTuner
      v-model:is-on="power"
      v-model:reference-hz="referenceHz"
      :pitch-cents="pitchCents"
      :pitch-name="pitchName"
      class="chromatic-tuner"
    ></ChromaticTuner>
  </div>
</template>

<style>
.tuner-experiment {
  height: 100dvh;
  align-content: center;
  padding: 1rem;

  .chromatic-tuner {
    max-width: var(--pv-b-container-3xl);
    max-height: calc(100dvh - 2rem);
    margin-inline: auto;
  }
}
</style>
