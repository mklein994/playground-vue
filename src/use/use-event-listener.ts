import { onBeforeMount, onBeforeUnmount } from "vue";

export const useEventListener = <K extends keyof DocumentEventMap>(
  type: K,
  listener: (e: DocumentEventMap[K]) => unknown,
) => {
  onBeforeMount(() => {
    document.addEventListener(type, listener);
  });

  onBeforeUnmount(() => {
    document.removeEventListener(type, listener);
  });
};
