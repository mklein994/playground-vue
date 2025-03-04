<script setup lang="ts">
import {
  Bars3Icon as MenuIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import {
  computed,
  inject,
  onBeforeMount,
  onBeforeUnmount,
  ref,
  watchEffect,
} from "vue";
import { useRoute, useRouter } from "vue-router";

import RouteInfo from "@/RouteInfo.vue";

import { tailwindEnabledKey } from "@/injectionKeys";

const route = useRoute();
const router = useRouter();
const links = computed(() =>
  router.getRoutes().filter((x) => x.name !== undefined),
);

const coverageExists = __PLAYGROUND_VUE_COVERAGE_EXISTS__;

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const openMenu = () => {
  if (menuOpen.value) {
    throw new Error("Tried opening an already opened menu");
  }

  menuOpen.value = true;
};

const closeMenu = () => {
  if (!menuOpen.value) {
    throw new Error("Tried closing an already closed menu");
  }

  menuOpen.value = false;
};

const menuPositions = new Map<string, { top: boolean; left: boolean }>([
  ["top-left", { top: true, left: true }],
  ["top-right", { top: true, left: false }],
  ["bottom-left", { top: false, left: true }],
  ["bottom-right", { top: false, left: false }],
]);

const menuPosition = ref(
  localStorage.getItem("playground-vue-menu-position") ?? "bottom-right",
);

const menuPositionClasses = computed(() => {
  const position = menuPositions.get(menuPosition.value);
  if (!position) {
    throw new Error(`navigation: unknown position: ${menuPosition.value}`);
  }

  return {
    top: position.top,
    left: position.left,
    right: !position.left,
    bottom: !position.top,
  };
});

watchEffect(() => {
  localStorage.setItem("playground-vue-menu-position", menuPosition.value);
});

const expanded = ref(true);

// Use right icon if menu is also expanded, otherwise use left icon.
const getChevronIcon = computed(() =>
  menuPositionClasses.value.right === expanded.value
    ? ChevronRightIcon
    : ChevronLeftIcon,
);

const toggleExpand = () => {
  expanded.value = !expanded.value;
};

const commitHash = import.meta.env.VITE_COMMIT_HASH;
const versionString = import.meta.env.VITE_VERSION_STRING;
const versionDisplay = computed(
  () =>
    (expanded.value ? versionString : commitHash?.slice(0, 7))
    ?? "(unknown commit)",
);

const tailwindEnabled = inject(tailwindEnabledKey)!;
const tailwindLocked = computed(
  () => import.meta.env.DEV && tailwindEnabled.value,
);

const toggleTailwind = async (enable: boolean) => {
  if (import.meta.env.DEV) {
    await import("@/tailwind.css");
    tailwindEnabled.value = enable;
    return;
  }

  tailwindEnabled.value = enable;

  const link = document.head.querySelector<HTMLLinkElement>(
    "link[title='tailwind']",
  );

  if (link == null) {
    throw new Error(
      "tailwind style <link title='tailwind'> not found. This is only available on production builds.",
    );
  }

  link.disabled = !tailwindEnabled.value;
};

const handleToggleTailwindClick = async (event: Event) => {
  const value = (event.target as HTMLInputElement).checked;

  await toggleTailwind(value);
};

const handleMenuKeydown = (e: Event) => {
  if (!(e instanceof KeyboardEvent)) {
    throw new Error(
      "keydown event handler must be attached to @keydown events",
    );
  }

  if (e.key !== "Escape" || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey) {
    return;
  }

  toggleMenu();
};

onBeforeMount(async () => {
  if (import.meta.env.VITE_TAILWIND_ENABLED) {
    await toggleTailwind(true);
  }
});

const searchQuery = ref("");
const filteredLinks = computed(() =>
  searchQuery.value === ""
    ? links.value
    : links.value.filter((x) =>
        (x.name as string)
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()),
      ),
);

const vFocus = {
  mounted: (element: HTMLInputElement) => {
    element.focus();
    element.select();
  },
};

const handleSearchSubmit = async (e: Event) => {
  e.preventDefault();

  const topLink = filteredLinks.value.at(0);
  if (!topLink) {
    return;
  }

  await router.push(topLink);
  toggleMenu();
};

// TODO: change this when using the Popover API
const closeOnEscape = (e: KeyboardEvent) => {
  if (
    e.key === "Escape"
    && !(e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)
  ) {
    if (!e.defaultPrevented) {
      e.preventDefault();

      closeMenu();
    }
  }
};

const openOnCtrlK = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === "k") {
    if (!e.defaultPrevented) {
      e.preventDefault();

      openMenu();
    }
  }
};

const handleGlobalShortcuts = (e: Event) => {
  if (!(e instanceof KeyboardEvent)) {
    return;
  }

  if (menuOpen.value) {
    closeOnEscape(e);
  } else {
    openOnCtrlK(e);
  }
};

onBeforeMount(() => {
  document.addEventListener("keydown", handleGlobalShortcuts);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleGlobalShortcuts);
});
</script>

<template>
  <div v-if="menuOpen" class="background" @click="toggleMenu"></div>
  <div class="home" :class="[{ 'menu-open': menuOpen }, menuPositionClasses]">
    <template v-if="menuOpen">
      <nav class="links">
        <form @submit="handleSearchSubmit">
          <input
            v-model="searchQuery"
            v-focus
            type="search"
            placeholder="Search&hellip;"
            class="search-query"
          />

          <div v-if="filteredLinks.length === 0">No Results</div>
          <ul v-else class="links-list">
            <li
              v-for="link of filteredLinks"
              :key="link.path"
              class="link"
              :class="{ active: route.path === link.path }"
            >
              <RouterLink :to="link.path" @click="toggleMenu">{{
                link.name
              }}</RouterLink>
            </li>
            <hr />
            <li class="link">
              <a v-if="coverageExists" href="/coverage/index.html">Coverage</a
              ><span v-else>Coverage (Not Found)</span>
            </li>
          </ul>
        </form>
      </nav>

      <div class="enable-tailwind">
        <input
          id="tailwind"
          v-model="tailwindEnabled"
          type="checkbox"
          class="tw-form-checkbox tailwind-checkbox"
          :value="tailwindEnabled"
          :disabled="tailwindLocked"
          @input="handleToggleTailwindClick"
        />
        <label for="tailwind">Enable Tailwind</label>

        <div v-if="tailwindLocked" class="reset-message">
          (refresh to reset)
        </div>
      </div>

      <code class="commit-hash" :title="commitHash">
        Version: {{ versionDisplay }}</code
      >

      <div class="menu-positions">
        <div v-for="[id] of menuPositions" :key="id" class="menu-position">
          <input
            :id="`menu-position-${id}`"
            v-model="menuPosition"
            type="radio"
            name="menu-position"
            :value="id"
            class="tw-form-radio"
          />
          <label :for="`menu-position-${id}`">{{ id }}</label>
        </div>
      </div>
    </template>

    <button
      class="nav-button-wrapper"
      :class="menuPositionClasses"
      @click="toggleMenu"
      @keydown="handleMenuKeydown"
    >
      <button v-if="menuOpen" @click.stop="toggleExpand">
        <Component :is="getChevronIcon" class="icon"></Component>
      </button>

      <RouteInfo v-if="expanded" class="route-info"></RouteInfo>

      <XMarkIcon v-if="menuOpen" class="icon"></XMarkIcon>
      <MenuIcon v-else class="icon"></MenuIcon>
    </button>
  </div>
</template>

<style scoped>
.background {
  position: fixed;
  z-index: 10;
  background-color: rgb(0 0 0 / 0.25);
  inset: 0;
}

.home {
  position: fixed;
  z-index: 11;
  display: flex;
  /* Allow the menu to resize based on the current
   * viewport (minus UA chrome)
   */
  max-height: calc(100vh - (100vh - 100%));
  box-sizing: border-box; /* Make max-height work without Tailwind */
  flex-flow: column;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border: 1px solid light-dark(var(--pv-gray-300), var(--pv-gray-700));
  background-color: light-dark(var(--pv-gray-50), var(--pv-gray-950));
  gap: 1rem;
  --border-radius: 0.5rem;

  @supports not (inset: 0) {
    &.bottom.right {
      right: 0;
      bottom: 0;
    }
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
  border-block-start: none;
  border-end-end-radius: var(--border-radius);
  border-inline-start: none;
}

.top.right {
  border-block-start: none;
  border-end-start-radius: var(--border-radius);
  border-inline-end: none;
}

.bottom.left {
  border-block-end: none;
  border-inline-start: none;
  border-start-end-radius: var(--border-radius);
}

.bottom.right {
  border-block-end: none;
  border-inline-end: none;
  border-start-start-radius: var(--border-radius);
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
  flex-flow: column-reverse;
}

.menu-positions {
  display: grid;
  gap: 0.5em;
  grid-template-columns: repeat(v-bind("expanded ? 2 : 1"), 1fr);
}

.menu-position {
  display: flex;
  flex: 1;
  align-items: center;
  column-gap: 0.5em;
}

.nav-button-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
  gap: 1em;
}

.left .nav-button-wrapper {
  flex-direction: row-reverse;
}

.route-info {
  flex: 1;
  margin-block: -0.25em;
  text-align: center;
}

.links {
  /* scroll the links when there's not enough space */
  overflow-y: auto;
  overscroll-behavior: contain;
  /* TODO: figure out how to make this less janky on
   * browsers that can hide the toolbar on scroll (i.e.
   * Firefox Android)
   */
}

.site-search {
  position: sticky;
  inset-block-start: 0;
}

.links-list {
  padding: 0;
  margin: 0 0 0 1em;
  list-style-type: circle;
}

.link {
  text-transform: capitalize;
}

.active {
  color: light-dark(var(--pv-green-700), var(--pv-green-500));
  list-style-type: disc;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}

.enable-tailwind {
  display: grid;
  align-items: center;
  justify-content: start;
  column-gap: 0.5em;
  grid-template-columns: repeat(2, auto);
}

.tailwind-checkbox:disabled {
  color: gray;
  outline-color: gray;
}

.tailwind-checkbox:disabled ~ * {
  color: gray;
}

.reset-message {
  color: gray;

  /* @apply tw-text-sm; */
  font-size: 0.875rem;
  grid-column-end: -1;
  line-height: 1.25rem;
}

.commit-hash {
  font-size: 1rem;
}
</style>
