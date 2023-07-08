<script setup lang="ts">
import { ref } from "vue";

import AudioPicker from "@/components/AudioPicker.vue";
import SpectrogramGraph from "@/components/SpectrogramGraph.vue";
import { toColor, useColorMap } from "@/use/colorMap";

const { colors } = useColorMap();

const audioSource = ref<string>();
</script>

<template>
  <div class="spectrogram-experiment">
    <AudioPicker v-model="audioSource" />

    <div class="spectrogram-wrapper">
      <template v-if="audioSource">
        <SpectrogramGraph :src="audioSource" class="spectrogram" />
      </template>
    </div>
  </div>

  <div class="colors">
    <div
      v-for="color of colors"
      :key="color.join(',')"
      :style="{ backgroundColor: toColor(color) }"
      class="color"
    ></div>
  </div>
</template>

<style scoped>
.spectrogram-experiment {
  display: grid;
  padding-block-start: 1em;
}

.colors {
  --size: 2px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(var(--size), 1fr));
}

.color {
  height: var(--size);
}
</style>
