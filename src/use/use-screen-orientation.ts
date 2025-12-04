import { computed, onBeforeMount, onBeforeUnmount, ref } from "vue";

export const useScreenOrientation = () => {
  const screenOrientation = ref(window.screen.orientation.type);

  const handleScreenOrientationChange = () => {
    screenOrientation.value = window.screen.orientation.type;
  };

  onBeforeMount(() => {
    window.screen.orientation.addEventListener(
      "change",
      handleScreenOrientationChange,
    );
  });

  onBeforeUnmount(() => {
    window.screen.orientation.removeEventListener(
      "change",
      handleScreenOrientationChange,
    );
  });

  return {
    screenOrientation: computed(() => screenOrientation.value),
  };
};
