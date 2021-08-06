<template>
  <div v-if="menuOpen" class="background" @click="toggleMenu"></div>
  <div class="home" :class="{ 'menu-shadow': menuOpen }">
    <button class="nav-button" @click="toggleMenu">
      <RouteInfo class="route-info" />
      <svg
        v-if="!menuOpen"
        class="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <title>Open Navigation Menu</title>
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg
        v-else
        class="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <nav v-if="menuOpen" class="links">
      <ul class="links-list">
        <li
          v-for="link of links"
          :key="link.path"
          class="link"
          :class="$route.path === link.path ? 'active' : ''"
        >
          <RouterLink :to="link.path">{{ link.name }}</RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import RouteInfo from "./RouteInfo.vue";

export default defineComponent({
  name: "Home",
  components: {
    RouteInfo,
  },
  setup: () => {
    const router = useRouter();
    const links = computed(() =>
      router.getRoutes().filter((x) => x.name !== undefined)
    );

    const menuOpen = ref(false);

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    return {
      links,
      menuOpen,
      toggleMenu,
    };
  },
});
</script>

<style scoped>
.background {
  position: fixed;
  inset: 0;
  background-color: rgba(0 0 0 / 0.25);
}

.home {
  position: fixed;
  inset-inline-end: 0;
  inset-block-end: 0;
  background-color: #f9fafbee;
  display: grid;
  padding: 1rem;
}

.menu-shadow {
  box-shadow: inset 10px 10px 20px 0 rgb(0 0 0 / 10%);
}

.nav-button {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
}

.links-list {
  text-align: end;
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
