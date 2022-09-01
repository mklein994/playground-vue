import type { RouteRecordRaw } from "vue-router";

import { extractNameAndPath } from "@/helpers/componentName";

import HomeView from "./HomeView.vue";
import NotFound from "./NotFound.vue";

/* c8 ignore next */
const modules = import.meta.glob("./views/*.vue");

const componentRoutes: RouteRecordRaw[] = [];

for (const path in modules) {
  const { wordCase, kebabCase } = extractNameAndPath(path, {
    stripSuffix: /-?experiment$/,
  });

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

/* c8 ignore start */
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

    it("checks that routes are in the correct order", () => {
      expect(routes[0]).toStrictEqual({
        path: "/",
        name: "home",
        component: HomeView,
      });
      expect(routes.at(-1)).toStrictEqual({
        path: "/:pathMatch(.*)*",
        component: NotFound,
      });
    });
  });
}
