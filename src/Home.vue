<template>
  <div class="home">
    <button class="nav-button" @click="toggleMenu">
      <svg
        v-if="!menuOpen"
        class="h-6 w-6"
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
        class="h-6 w-6"
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
      <RouteInfo class="route-info" />
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
.home {
  background-color: #f9fafbee;
  width: 100%;
  display: grid;
}

.nav-button {
  display: flex;
  justify-content: space-between;
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
</style>
