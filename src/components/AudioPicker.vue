<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

const props = defineProps<{
  modelValue: string | undefined;
}>();

const emit = defineEmits<{
  "update:modelValue": [url: string | undefined];
}>();

const fileUrl = ref<string | undefined>(props.modelValue);

const audioUrl = computed({
  get() {
    return fileUrl.value;
  },
  set(value: File | undefined) {
    if (fileUrl.value) {
      URL.revokeObjectURL(fileUrl.value);
    }
    fileUrl.value = value ? URL.createObjectURL(value) : undefined;
    emit("update:modelValue", fileUrl.value);
  },
});

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.item(0);
  audioUrl.value = file;
};

onBeforeUnmount(() => {
  if (fileUrl.value) {
    URL.revokeObjectURL(fileUrl.value);
  }
});
</script>

<template>
  <input type="file" @change="handleFileChange" />
</template>
