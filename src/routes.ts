import type { RouteRecordRaw } from "vue-router";

import HomeView from "./HomeView.vue";
import NotFound from "./NotFound.vue";

const globEager = import.meta.env.VITE_GLOB_EAGER;
const modules = globEager
  ? import.meta.globEager("./views/*.vue")
  : import.meta.glob("./views/*.vue");

const componentRoutes: RouteRecordRaw[] = [];

for (const path in modules) {
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
  const titleCase = kebabCase.replace(/-/g, " ");

  componentRoutes.push({
    path: `/${kebabCase}`,
    name: titleCase,
    component: globEager ? modules[path].default : modules[path],
  });
}

export const routes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: HomeView },
  ...componentRoutes,
  { path: "/:pathMatch(.*)*", component: NotFound },
];
