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
            <RouterLink :to="link.path">{{ link.name }}</RouterLink>
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

    <button class="nav-button" @click="toggleMenu">
      <RouteInfo class="route-info" />
      <MenuIcon v-if="!menuOpen" class="icon" />
      <XIcon v-else class="icon" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { MenuIcon, XIcon } from "@heroicons/vue/solid/esm";
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
</script>

<style scoped>
.background {
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.25);
}

.home {
  position: fixed;
  background-color: #f9fafbee;
  display: grid;
  gap: 1rem;
  padding: 1rem 1.5rem;
  min-width: 30ch;
  z-index: 1;
}

.menu-open {
  --shadow-x: 10px;
  --shadow-y: 10px;
  box-shadow: inset var(--shadow-x) var(--shadow-y) 20px 0 rgb(0 0 0 / 10%);
}

.menu-open.bottom-left {
  --shadow-x: -10px;
}

.menu-open.top-left {
  --shadow-x: -10px;
  --shadow-y: -10px;
}

.menu-open.top-right {
  --shadow-y: -10px;
}

.menu-positions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5em;
}

.menu-position {
  flex: 1;
  display: flex;
  align-items: center;
  column-gap: 0.5em;
}

.nav-button {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
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
