import type { MaybeRefOrGetter } from "vue";
import { ref, toValue, watch } from "vue";

export const useUnsavedChanges = (
  hasChanges: MaybeRefOrGetter<boolean>,
  message: string,
) => {
  const confirmed = ref(false);
  const listening = ref(false);

  const listener = (event: BeforeUnloadEvent) => {
    event.preventDefault();

    if (toValue(hasChanges)) {
      confirmed.value = confirm(message);
    }
  };

  watch(
    () => toValue(hasChanges),
    (changed) => {
      if (changed) {
        if (!listening.value) {
          window.addEventListener("beforeunload", listener);
          listening.value = true;
        }
      } else {
        if (listening.value) {
          window.removeEventListener("beforeunload", listener);
          listening.value = false;
        }
      }
    },
  );
};
