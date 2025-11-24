<script setup lang="ts">
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  useTemplateRef,
} from "vue";

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

const play = async () => {
  await (selfie.value as HTMLVideoElement | null)?.play();
};

const cameras = ref<MediaDeviceInfo[]>([]);
onBeforeMount(async () => {
  cameras.value = (await navigator.mediaDevices.enumerateDevices()).filter(
    (x) => x.kind === "videoinput",
  );
});

onBeforeUnmount(() => {
  stream.value?.getTracks().forEach((track) => {
    track.stop();
  });
});
</script>

<template>
  <div class="selfie-cam-experiment">
    <div v-if="mediaDevicesAvailable && !error" class="video-wrapper">
      <video ref="selfie" autoplay muted class="selfie"></video>
      <div class="controls">
        <button @click="pause">Pause</button>
        <button @click="play">Play</button>
      </div>
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
