import type { Plugin } from "vite";

export default (): Plugin => {
  return {
    name: "vite-plugin-eruda",
    transformIndexHtml() {
      return [
        {
          tag: "script",
          attrs: {
            // src: "//cdn.jsdelivr.net/npm/eruda",
            src: "./node_modules/eruda",
          },
          injectTo: "body",
        },
        {
          tag: "script",
          children: "eruda.init();",
          injectTo: "body",
        },
      ];
    },
  };
};
