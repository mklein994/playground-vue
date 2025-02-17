import { defineAsyncComponent, h, Suspense } from "vue";

export const useAsyncComponent = (fn: () => Promise<typeof import("*.vue")>) =>
  h(Suspense, null, h(defineAsyncComponent(fn)));
