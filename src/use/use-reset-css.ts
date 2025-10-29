import { onBeforeMount, onUnmounted, ref } from "vue";

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

export const useResetCss = () => {
  onBeforeMount(() => {
    enableReset();
  });

  onUnmounted(() => {
    disableReset();
  });
};
