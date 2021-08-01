import { RouteRecordRaw } from "vue-router";

import Empty from "./Empty.vue";
import NotFound from "./NotFound.vue";

const modules = import.meta.glob("./views/*.vue");

const componentRoutes: RouteRecordRaw[] = [];

for (const key in modules) {
  const basename = key.replace(/^.*\/([^/]+)\.vue$/, "$1");
  const snakeCase = basename.replace(/\B([A-Z])/g, "-$1").toLowerCase();
  const titleCase = snakeCase.replace(/-/g, " ");

  componentRoutes.push({
    path: `/${snakeCase}`,
    name: titleCase,
    component: modules[key],
  });
}

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Empty },
  ...componentRoutes,
  { path: "/:pathMatch(.*)*", component: NotFound },
];
