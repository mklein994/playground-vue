import { ref, watch } from "vue";

const parseContent = (content: string): Map<string, string> =>
  new Map(
    content.split(/,\s*/).map((x) => x.split("=", 2) as [string, string]),
  );

const toContent = (content: Map<string, string>): string =>
  [...content].map((x) => x.join("=")).join(", ");

export const useMetaViewport = () => {
  const meta = document.head.querySelector<HTMLMetaElement>(
    "meta[name='viewport']",
  )!;

  const content = ref(parseContent(meta.content));

  watch(
    content,
    (newValue) => {
      meta.content = toContent(newValue);
    },
    { deep: true },
  );

  return {
    viewportContent: content,
  };
};
