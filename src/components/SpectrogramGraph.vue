<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import { WaveSurfer, type WaveSurferOptions } from "wavesurfer.js";
import { SpectrogramPlugin } from "wavesurfer.js/dist/plugins/spectrogram";

import { useColorMap } from "@/use/colorMap";

const props = defineProps<{
  src: string;
}>();

const { colors } = useColorMap();

const loading = ref(false);
const audioBox = ref<HTMLAudioElement>();
const waveBox = ref<HTMLDivElement>();
const spectrogramBox = ref<HTMLDivElement>();

const wave = ref<WaveSurfer>();

const getOptions = (): WaveSurferOptions => {
  if (!waveBox.value || !spectrogramBox.value) {
    throw new Error("refs missing");
  }

  // const freq = 2 ** 9;
  const freq = 2 ** 10;
  // const freq = 2 ** 13;
  // const freq = 2 ** 14;
  // const freq = 2 ** 15;

  return {
    container: waveBox.value,
    url: props.src,

    // minPxPerSec: 5,
    minPxPerSec: 10,
    // minPxPerSec: 30,
    // minPxPerSec: 50,
    // minPxPerSec: 100,
    interact: false,

    plugins: [
      SpectrogramPlugin.create({
        container: spectrogramBox.value,
        windowFunc: "hann",
        fftSamples: freq,
        colorMap: colors,
        labels: true,
        frequencyMin: 40,
        frequencyMax: 1.5 * 1000,
        // noverlap: (2 ** 13) * 0.875,
        // noverlap: freq * 0.875,
      }),
    ],
  };
};

onMounted(async () => {
  await nextTick();
  if (!waveBox.value) {
    throw new Error("missing wave surfer refs");
  }

  wave.value = WaveSurfer.create(getOptions());
  wave.value.getMediaElement().controls = true;
  audioBox.value?.append(wave.value.getMediaElement());
});

watch(
  () => props.src,
  async (newSrc) => {
    if (!wave.value) {
      return;
    }
    loading.value = true;
    try {
      await wave.value.load(newSrc);
    } catch (err: unknown) {
      if (err instanceof TypeError) {
        console.log({
          name: err.name,
          cause: err.cause,
          stack: err.stack,
          message: err.message,
        });
      }
      console.warn(err);
    } finally {
      loading.value = false;
    }
  },
);
</script>

<template>
  <div class="spectrogram-graph">
    <div ref="audioBox" class="audio-box"></div>
    <div ref="waveBox" class="wave"></div>
    <div ref="spectrogramBox" class="spectrogram"></div>
    <span v-if="loading">Loading&hellip;</span>
  </div>
</template>

<style scoped>
.audio-box {
  z-index: 10; /* arbitrary */
  width: 100%;
  display: grid;
}

:global(.audio-box > *) {
  display: grid;
  margin: 0;
  padding: 0;
  height: min-content;
}

.spectrogram {
  padding-top: 1em;
}
</style>
