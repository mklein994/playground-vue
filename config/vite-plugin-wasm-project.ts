import type { Plugin } from "vite";

export const wasmProject = (
  wasmSupported: boolean,
  relativePath: string,
  alias: { [aka: string]: string },
) => {
  return {
    name: "wasm-project",
    config(config) {
      const conf = {
        resolve: {
          alias: {
            ...alias,
            ...(config.resolve?.alias ?? {}),
          },
        },
      } as typeof config;

      if (wasmSupported) {
        conf.server ??= config.server ?? {};
        conf.server.fs ??= {};
        conf.server.fs.allow = [
          ...(config.server?.fs?.allow ?? []),
          relativePath,
        ];
      }

      return conf;
    },
  } satisfies Plugin;
};
