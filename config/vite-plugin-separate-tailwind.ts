import type { Plugin } from "vite";

export const separateTailwind = (timestamp: number = Date.now()): Plugin => ({
  name: "separate-tailwind",
  transformIndexHtml() {
    return [
      {
        tag: "link",
        attrs: {
          href: `/tailwind.min.css?t=${timestamp}`,
          rel: "stylesheet",
          title: "tailwind",
          disabled: "",
        },
        injectTo: "head",
      },
    ];
  },
});
