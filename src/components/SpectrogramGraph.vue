<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import type { WaveSurferOptions } from "wavesurfer.js";
import WaveSurfer from "wavesurfer.js";
import type { SpectrogramPluginOptions } from "wavesurfer.js/dist/plugins/spectrogram.js";
import SpectrogramPlugin from "wavesurfer.js/dist/plugins/spectrogram.js";

import { useColorMap } from "@/use/colorMap";

const props = defineProps<{
  src: string;
  vocalRange?: boolean;
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

  const spectrogramOptions: SpectrogramPluginOptions = {
    container: spectrogramBox.value,
    windowFunc: "hann",
    fftSamples: freq,
    colorMap: colors,
    labels: true,
    // noverlap: (2 ** 13) * 0.875,
    // noverlap: freq * 0.875,
  };

  if (props.vocalRange) {
    spectrogramOptions.frequencyMin = 40;
    spectrogramOptions.frequencyMax = 1.5 * 1000;
  }

  return {
    container: waveBox.value,
    url: props.src,

    // minPxPerSec: 5,
    minPxPerSec: 10,
    // minPxPerSec: 30,
    // minPxPerSec: 50,
    // minPxPerSec: 100,
    interact: false,

    plugins: [SpectrogramPlugin.create(spectrogramOptions)],
  };
};

const setupWaveSurfer = () => {
  if (!waveBox.value) {
    throw new Error("missing wave surfer refs");
  }

  if (wave.value) {
    wave.value.destroy();
  }

  wave.value = WaveSurfer.create(getOptions());
  wave.value.getMediaElement().controls = true;
  audioBox.value?.replaceChildren(wave.value.getMediaElement());
};

onMounted(async () => {
  await nextTick();
  setupWaveSurfer();
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

watch(
  () => props.vocalRange,
  () => setupWaveSurfer(),
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

<style>
.audio-box {
  z-index: 10; /* arbitrary */
  display: grid;
  width: 100%;

  > * {
    display: grid;
    height: min-content;
    padding: 0;
    margin: 0;
  }

  .spectrogram {
    padding-top: 1em;
  }
}
</style>
