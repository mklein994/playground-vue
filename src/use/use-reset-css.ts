import { computed, onBeforeMount, onBeforeUnmount, ref } from "vue";

export const resetActive = ref(false);

const getResetLink = () =>
  document.head.querySelector<HTMLLinkElement>("link[title='reset']")!;

export const enableReset = () => {
  const reset = getResetLink();
  reset.disabled = false;
  resetActive.value = true;
};

export const disableReset = () => {
  const reset = getResetLink();
  reset.disabled = true;
  resetActive.value = false;
};

export const useResetCss = (startEnabled = true) => {
  if (startEnabled) {
    onBeforeMount(() => {
      enableReset();
    });
  }

  onBeforeUnmount(() => {
    disableReset();
  });

  const toggleReset = () => {
    if (resetActive.value) {
      disableReset();
    } else {
      enableReset();
    }
  };

  return {
    resetActive: computed(() => resetActive.value),
    toggleReset,
  };
};
