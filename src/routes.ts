import type { RouteRecordRaw } from "vue-router";

import HomeView from "@/HomeView.vue";
import NotFound from "@/NotFound.vue";

/* c8 ignore next */
const modules = import.meta.glob([
  "@/views/*.vue",

  // TODO: Enable these once sass is working again. Currently, `pnpm sass
  // --version` is throwing an exception (even though `/usr/bin/sass --version`
  // is not).
  "!@/views/SassExperiment.vue",
  "!@/components/style-inheritance/*",
  "!@/views/StyleInheritance.vue",
]);

const componentRoutes: RouteRecordRaw[] = [];

for (const path in modules) {
  const wordCase = path
    .split("/")
    .pop()! // Since import.meta.glob will always return the path to a file, this is never possible.
    .replace(/(?:Experiment)?\.vue$/, "")
    .replaceAll(/\B([A-Z]|[0-9]+)/g, " $1");
  const kebabCase = wordCase.replaceAll(" ", "-").toLowerCase();

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
  const { expect, it } = import.meta.vitest;

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
}
