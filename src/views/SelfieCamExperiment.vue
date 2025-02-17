<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref, useTemplateRef } from "vue";

const selfie = useTemplateRef("selfie");
const stream = ref<MediaStream>();
const error = ref<string>();

const mediaDevicesAvailable = computed(() => "mediaDevices" in navigator);

if (mediaDevicesAvailable.value) {
  onMounted(async () => {
    if (!selfie.value) {
      throw new Error("Can't find selfie <video> element");
    }

    try {
      stream.value = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      selfie.value.srcObject = stream.value;
    } catch {
      error.value = "Failed to get video";
    }
  });
} else {
  console.warn("navigator.mediaDevices is undefined");
}

const pause = () => {
  (selfie.value as HTMLVideoElement | null)?.pause();
};

const cameras = ref();
onBeforeMount(async () => {
  cameras.value = (await navigator.mediaDevices.enumerateDevices()).filter(
    (x) => x.kind === "videoinput",
  );
});
</script>

<template>
  <div class="selfie-cam-experiment">
    <div v-if="mediaDevicesAvailable && !error" class="video-wrapper">
      <video ref="selfie" autoplay muted class="selfie"></video>
      <div class="controls"><button @click="pause">Pause</button></div>
      <pre>{{ cameras }}</pre>
    </div>
    <div v-else class="error-message">
      <p v-if="error">{{ error }}</p>
      <p v-else>
        Failed to access video camera: <code>navigator.mediaDevices</code> is
        <code>undefined</code>. Are you accessing this page from a secure
        context?
      </p>
    </div>
  </div>
</template>

<style scoped>
.error-message {
  padding: 1rem;

  & code {
    font-size: 1rem;
  }
}

.selfie {
  display: block;
  width: 100vmin;
}
</style>
