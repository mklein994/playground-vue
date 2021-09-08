<template>
  <div v-if="menuOpen" class="background" @click="toggleMenu"></div>
  <div
    class="home"
    :class="[{ 'menu-open': menuOpen }, menuPosition]"
    :style="menuPositionStyle"
  >
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

    <div class="nav-button-wrapper" :class="menuPosition" @click="toggleMenu">
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

const menuPositions = new Map<string, Record<string, number>>([
  ["top-left", { insetBlockStart: 0, insetInlineStart: 0 }],
  ["top-right", { insetBlockStart: 0, insetInlineEnd: 0 }],
  ["bottom-left", { insetBlockEnd: 0, insetInlineStart: 0 }],
  ["bottom-right", { insetBlockEnd: 0, insetInlineEnd: 0 }],
]);

const menuPosition = ref("bottom-right");

const menuPositionStyle = computed(() => menuPositions.get(menuPosition.value));

const expanded = ref(true);

const getChevronIcon = computed(() => {
  if (["top-right", "bottom-right"].includes(menuPosition.value)) {
    return expanded.value ? ChevronRightIcon : ChevronLeftIcon;
  }

  // if left…
  return expanded.value ? ChevronLeftIcon : ChevronRightIcon;
});

const toggleExpand = () => {
  expanded.value = !expanded.value;
};
</script>

<style scoped>
.background {
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.25);
}

.home {
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
  z-index: 1;
  outline: 1px solid theme("colors.gray.300");
  --border-radius: 0.5rem;
}

.menu-open {
  box-shadow: inset var(--shadow-x) var(--shadow-y) 20px rgb(0 0 0 / 10%);
}

.bottom-right {
  border-start-start-radius: var(--border-radius);
}

.menu-open.bottom-right {
  --shadow-x: 10px;
  --shadow-y: 10px;
}

.bottom-left {
  border-start-end-radius: var(--border-radius);
}

.menu-open.bottom-left {
  --shadow-x: -10px;
  --shadow-y: 10px;
}

.top-left {
  border-end-end-radius: var(--border-radius);
}

.menu-open.top-left {
  --shadow-x: -10px;
  --shadow-y: -10px;
}

.top-right {
  border-end-start-radius: var(--border-radius);
}

.menu-open.top-right {
  --shadow-x: 10px;
  --shadow-y: -10px;
}

.menu-open.top-left,
.menu-open.top-right {
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

:where(.top-left, .bottom-left) .nav-button-wrapper {
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
  margin: 0;
  padding: 0;
  list-style-type: circle;
  list-style-position: inside;
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
</style>
