import type { Plugin } from "vite";

export const separateTailwind = (timestamp: Date = new Date()): Plugin => ({
  name: "separate-tailwind",
  transformIndexHtml() {
    return [
      {
        tag: "link",
        attrs: {
          href: `/tailwind.min.css?t=${timestamp.valueOf()}`,
          rel: "stylesheet",
          title: "tailwind",
          disabled: "",
        },
        injectTo: "head",
      },
    ];
  },
});
