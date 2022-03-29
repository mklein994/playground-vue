import type { RouteRecordRaw } from "vue-router";

import HomeView from "./HomeView.vue";
import NotFound from "./NotFound.vue";

const modules = import.meta.glob("./views/*.vue");

const componentRoutes: RouteRecordRaw[] = [];

const extractNameAndPath = (path: string) => {
  const basename =
    // import.meta.glob and import.meta.globEager will always show paths that
    // contain a slash, since they are "absolute", i.e. relative to the project
    // root (location of vite.config.js).
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    path.split("/").pop()!.slice(0, -".vue".length);
  const kebabCase = basename
    .replace(/\B([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/-?experiment$/, "");
  const wordCase = kebabCase.replace(/-/g, " ");

  return { wordCase, kebabCase };
};

for (const path in modules) {
  const { wordCase, kebabCase } = extractNameAndPath(path);

  componentRoutes.push({
    path: `/${kebabCase}`,
    name: wordCase,
    component: modules[path],
  });
}

export const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomeView },
  ...componentRoutes,
  { path: "/:pathMatch(.*)*", component: NotFound },
];

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe.concurrent("extractNameAndPath", () => {
    it("converts case correctly", () => {
      expect(extractNameAndPath("./views/HelloWorld.vue")).toStrictEqual({
        wordCase: "hello world",
        kebabCase: "hello-world",
      });
    });

    it("strips off any 'Experiment' suffix", () => {
      expect(extractNameAndPath("./views/FooExperiment.vue")).toStrictEqual({
        wordCase: "foo",
        kebabCase: "foo",
      });
    });
  });
}
