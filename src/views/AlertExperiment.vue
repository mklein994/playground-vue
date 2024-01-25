<script setup lang="ts">
import { computed } from 'vue';

const openAlert = () => {
  alert("Hey there!");
};

const hasPermission = computed(() => Notification.permission === "granted");

const openNotification = async () => {
  if (!hasPermission.value) {
    await Notification.requestPermission();
  }

  new Notification("Title", {
    body: "Body",
  });
};
</script>

<template>
  <button type="button" @click="openAlert">Open Alert</button>
  <button type="button" @click="openNotification">Open Notification</button>
</template>
