import { defineComponent, h } from "vue";
import { RouteRecordRaw } from "vue-router";

import Home from "./components/Home.vue";

const NotFound = defineComponent({
  name: "NotFound",
  render: () => h("h1", "404 Not Found"),
});

export const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/:pathMatch(.*)*", component: NotFound },
];
