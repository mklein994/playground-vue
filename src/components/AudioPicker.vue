<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

const props = defineProps<{
  modelValue: string | undefined;
}>();

const emit = defineEmits<{
  "update:modelValue": [url: string | undefined];
}>();

const file = ref<File | null>();

// NOTE: this does not react when the prop changes, since
// props are not reactive. That should be fine for now
// though, since this component is where we get the URL
// from, not the caller. It just makes it simpler to use
// v-model instead of using a custom event.
const url = ref<string | undefined>(props.modelValue);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  file.value = target.files?.item(0);

  if (url.value) {
    URL.revokeObjectURL(url.value);
  }

  if (file.value) {
    url.value = URL.createObjectURL(file.value);
  } else {
    url.value = undefined;
  }

  emit("update:modelValue", url.value);
};

onBeforeUnmount(() => {
  if (url.value) {
    URL.revokeObjectURL(url.value);
    emit("update:modelValue", undefined);
  }
});
</script>

<template>
  <input
    type="file"
    accept="audio/*"
    class="tw-form-input"
    @change="handleFileChange"
  />
</template>
