<script setup lang="ts">
import { reactive, ref } from "vue";

const custom = reactive({
  capture: false,
  accept: false,
});

const capturePrefs: (boolean | "user" | "environment" | undefined)[] = [
  true,
  false,
  "user",
  "environment",
  undefined,
];
const acceptPrefs = [
  ".jpg",
  ".mp3",
  "image/*",
  "image/jpeg,.jpg,.jpeg",
  "audio/*,.mp3",
  ".mp4",
  "video/mp4",
  undefined,
];

const capturePref = ref(capturePrefs.at(-1));
const acceptPref = ref(acceptPrefs.at(-1));

const picture = ref();

function handlePictureUpload(event: Event) {
  console.log(event);
}
</script>

<template>
  <form class="grid" @submit.stop>
    <label for="capture">capture</label>
    <input
      id="custom-capture"
      v-model="custom.capture"
      type="checkbox"
      name="customCapture"
    />
    <label for="custom-capture">(custom)</label>
    <input
      v-if="custom.capture"
      id="capture"
      v-model="capturePref"
      type="text"
      name="capture"
    />
    <select v-else id="capture" v-model="capturePref" name="capture">
      <option v-for="(pref, id) in capturePrefs" :key="id">{{ pref }}</option>
    </select>

    <label for="accept">accept</label>
    <input
      id="custom-accept"
      v-model="custom.accept"
      type="checkbox"
      name="customAccept"
    />
    <label for="custom-accept">(custom)</label>
    <input
      v-if="custom.accept"
      id="accept"
      v-model="acceptPref"
      type="text"
      name="accept"
    />
    <select v-else id="accept" v-model="acceptPref" name="accept">
      <option v-for="(pref, id) in acceptPrefs" :key="id">{{ pref }}</option>
    </select>
  </form>

  <label for="picture">Upload a picture:</label>
  <input
    id="picture"
    type="file"
    :capture="capturePref"
    name="picture"
    :accept="acceptPref"
    @input="handlePictureUpload"
  />

  <pre>{{ picture }}</pre>
</template>

<style scoped>
.grid {
  display: grid;
  justify-content: start;
  margin: 1em;
  gap: 1em;
  grid: auto-flow / repeat(4, auto);
}
</style>
