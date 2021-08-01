import { defineComponent, h } from "vue";
import { RouteRecordRaw } from "vue-router";

const modules = import.meta.glob("./components/*.vue");

const NotFound = defineComponent({
  name: "NotFound",
  render: () => h("h1", "404 Not Found"),
});

const Empty = defineComponent({
  name: "Empty",
});

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
