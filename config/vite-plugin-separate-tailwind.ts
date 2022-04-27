import type { Plugin } from "vite";

export const separateTailwind = (): Plugin => ({
  name: "separate-tailwind",
  transformIndexHtml() {
    return [
      {
        tag: "link",
        attrs: {
          href: `/tailwind.min.css?t=${new Date().valueOf()}`,
          rel: "stylesheet",
          title: "tailwind",
          disabled: "",
        },
        injectTo: "head",
      },
    ];
  },
});
