<template>
  <div v-if="menuOpen" class="background" @click="toggleMenu"></div>
  <div class="home" :class="[{ 'menu-open': menuOpen }, menuPositionClasses]">
    <template v-if="menuOpen">
      <nav class="links">
        <ul class="links-list">
          <li
            v-for="link of links"
            :key="link.path"
            class="link"
            :class="{ active: route.path === link.path }"
          >
            <RouterLink :to="link.path" @click="toggleMenu">{{
              link.name
            }}</RouterLink>
          </li>
        </ul>
      </nav>

      <div class="enable-tailwind">
        <input
          id="tailwind"
          v-model="tailwindEnabled"
          type="checkbox"
          class="tailwind-checkbox"
          :value="tailwindEnabled"
          :disabled="tailwindLocked"
          @input="toggleTailwind"
        />
        <label for="tailwind">Enable Tailwind</label>

        <div v-if="tailwindLocked" class="reset-message">
          (refresh to reset)
        </div>
      </div>

      <div class="menu-positions">
        <div v-for="[id] of menuPositions" :key="id" class="menu-position">
          <input
            :id="`menu-position-${id}`"
            v-model="menuPosition"
            type="radio"
            name="menu-position"
            :value="id"
          />
          <label :for="`menu-position-${id}`">{{ id }}</label>
        </div>
      </div>
    </template>

    <div
      class="nav-button-wrapper"
      :class="menuPositionClasses"
      @click="toggleMenu"
    >
      <button v-if="menuOpen" @click.stop="toggleExpand">
        <Component :is="getChevronIcon" class="icon" />
      </button>

      <RouteInfo v-if="expanded" class="route-info" />

      <XIcon v-if="menuOpen" class="icon" />
      <MenuIcon v-else class="icon" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/vue/solid/esm";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import RouteInfo from "./RouteInfo.vue";

const route = useRoute();
const router = useRouter();
const links = computed(() =>
  router.getRoutes().filter((x) => x.name !== undefined)
);

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const menuPositions = new Map<string, { top: boolean; left: boolean }>([
  ["top-left", { top: true, left: true }],
  ["top-right", { top: true, left: false }],
  ["bottom-left", { top: false, left: true }],
  ["bottom-right", { top: false, left: false }],
]);

const menuPosition = ref("bottom-right");

const menuPositionClasses = computed(() => {
  const position = menuPositions.get(menuPosition.value);
  if (!position) {
    throw new Error(`navigation: unknown position: ${position}`);
  }

  return {
    top: position.top,
    left: position.left,
    right: !position.left,
    bottom: !position.top,
  };
});

const expanded = ref(true);

// Use right icon if menu is also expanded, otherwise use left icon.
const getChevronIcon = computed(() =>
  menuPositionClasses.value.right === expanded.value
    ? ChevronRightIcon
    : ChevronLeftIcon
);

const toggleExpand = () => {
  expanded.value = !expanded.value;
};

const tailwindEnabled = ref(false);
const tailwindLocked = computed(
  () => import.meta.env.DEV && tailwindEnabled.value
);

const toggleTailwind = async (event: Event) => {
  const value = (event.target as HTMLInputElement).checked;

  if (import.meta.env.DEV) {
    await import("./tailwind.css");
    tailwindEnabled.value = value;
    return;
  }

  tailwindEnabled.value = value;

  const link = document.head.querySelector<HTMLLinkElement>(
    "link[title='tailwind']"
  );

  if (link == null) {
    throw new Error(
      "tailwind style <link title='tailwind'> not found. This is only available on production builds."
    );
  }

  link.disabled = !tailwindEnabled.value;
};
</script>

<style scoped>
.background {
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.25);
  z-index: 10;
}

.home {
  box-sizing: border-box; /* Make max-height work without Tailwind */
  position: fixed;
  /* Allow the menu tk resize based on the current
   * viewport (minus UA chrome)
   */
  max-height: calc(100vh - (100vh - 100%));
  background-color: #f9fafbee;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  padding: 1rem 1.5rem;
  justify-content: space-between;
  z-index: 11;
  border: 1px solid theme("colors.gray.300");
  --border-radius: 0.5rem;
}

@supports not (inset: 0) {
  .home.bottom.right {
    bottom: 0;
    right: 0;
  }
}

.menu-open {
  box-shadow: inset var(--shadow-x) var(--shadow-y) 20px rgb(0 0 0 / 10%);
}

/**
 * Reminder: In a language like English:
 *
 * block-start:  top
 * block-end:    bottom
 *
 * inline-start: left
 * inline-end:   right
 */

.top {
  inset-block-start: 0;
}

.bottom {
  inset-block-end: 0;
}

.left {
  inset-inline-start: 0;
}

.right {
  inset-inline-end: 0;
}

.top.left {
  border-end-end-radius: var(--border-radius);
  border-block-start: none;
  border-inline-start: none;
}

.top.right {
  border-end-start-radius: var(--border-radius);
  border-block-start: none;
  border-inline-end: none;
}

.bottom.left {
  border-start-end-radius: var(--border-radius);
  border-block-end: none;
  border-inline-start: none;
}

.bottom.right {
  border-start-start-radius: var(--border-radius);
  border-block-end: none;
  border-inline-end: none;
}

.menu-open.bottom {
  --shadow-y: 10px;
}

.menu-open.right {
  --shadow-x: 10px;
}

.menu-open.left {
  --shadow-x: -10px;
}

.menu-open.top {
  --shadow-y: -10px;
}

.menu-open.top {
  flex-flow: column-reverse;
}

.menu-positions {
  display: grid;
  grid-template-columns: repeat(v-bind("expanded ? 2 : 1"), 1fr);
  gap: 0.5em;
}

.menu-position {
  flex: 1;
  display: flex;
  align-items: center;
  column-gap: 0.5em;
}

.nav-button-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1em;

  cursor: pointer;
}

.left .nav-button-wrapper {
  flex-direction: row-reverse;
}

.route-info {
  flex: 1;
  text-align: center;
  margin-block: -0.25em;
}

.links {
  /* scroll the links when there's not enough space */
  overflow-y: auto;
  /* TODO: figure out how to make this less janky on
   * browsers that can hide the toolbar on scroll (i.e.
   * Firefox Android)
   */
}

.links-list {
  margin: 0 0 0 1em;
  padding: 0;
  list-style-type: circle;
}

.link {
  text-transform: capitalize;
}

.active {
  list-style-type: disc;
  color: green;
}

.icon {
  height: 1.5rem;
  width: 1.5rem;
}

.enable-tailwind {
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: start;
  align-items: center;
  column-gap: 0.5em;
}

.tailwind-checkbox:disabled {
  color: gray;
  outline-color: gray;
}

.tailwind-checkbox:disabled ~ * {
  color: gray;
}

.reset-message {
  grid-column-end: -1;

  /* @apply tw-text-sm; */
  font-size: 0.875rem;
  line-height: 1.25rem;

  color: gray;
}
</style>
