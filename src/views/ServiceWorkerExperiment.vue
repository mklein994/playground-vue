<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref } from "vue";

const worker = ref<ServiceWorker | null | undefined>();
const workerStatus = ref("");
const workerUrl = ref(
  new URL("../workers/my-first-service-worker.ts", import.meta.url)
);

const registerServiceWorker = async () => {
  try {
    const registration = await navigator.serviceWorker.register(
      workerUrl.value
    );

    if (registration.installing) {
      worker.value = registration.installing;
      workerStatus.value = "installing";
    } else if (registration.waiting) {
      worker.value = registration.waiting;
      workerStatus.value = "waiting";
    } else if (registration.active) {
      worker.value = registration.active;
      workerStatus.value = "active";
    }

    if (worker.value) {
      console.log(worker.value.state);
      worker.value.addEventListener("statechange", (e) => {
        const target = e.target as ServiceWorker;
        console.log(target.state);
      });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(
        "Something happened while registering the service worker:",
        { cause: err }
      );
    }
  }
};

const removeServiceWorker = async () => {
  const registration = await navigator.serviceWorker.getRegistration(
    workerUrl.value
  );
  if (registration) {
    registration.unregister();
    worker.value = null;
  }
};

const unregisterServiceWorker = async () => {
  if (!worker.value) {
    return;
  }

  await removeServiceWorker();
};

onBeforeMount(async () => {
  const registration = await navigator.serviceWorker.getRegistration(
    workerUrl.value
  );
  worker.value =
    registration?.installing ?? registration?.waiting ?? registration?.active;
});
onUnmounted(() => console.log("unmounted"));
</script>

<template>
  <button :disabled="!!worker" @click="registerServiceWorker()">
    Register Service Worker
  </button>

  <button :disabled="!worker" @click="unregisterServiceWorker()">
    Unregister Service Worker
  </button>
</template>
