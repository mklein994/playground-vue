import { onBeforeUnmount, ref, watch } from "vue";

const parseContent = (content: string): Map<string, string> =>
  new Map(
    content.split(/,\s*/).map((x) => x.split("=", 2) as [string, string]),
  );

const toContent = (content: Map<string, string>): string =>
  [...content].map((x) => x.join("=")).join(", ");

export const useMetaViewport = (initial?: [string, string]) => {
  const meta = document.head.querySelector<HTMLMetaElement>(
    "meta[name='viewport']",
  )!;

  const originalMetaContent = meta.content;
  const content = ref(parseContent(originalMetaContent));

  watch(
    content,
    (newValue) => {
      meta.content = toContent(newValue);
    },
    { deep: true },
  );

  if (initial) {
    content.value.set(initial[0], initial[1]);
  }

  onBeforeUnmount(() => {
    meta.content = originalMetaContent;
  });

  return {
    viewportContent: content,
  };
};
