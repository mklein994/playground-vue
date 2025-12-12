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
  useTemplateRef,
  watchEffect,
} from "vue";
import { useRoute, useRouter } from "vue-router";

import ColorSchemePicker from "./components/ColorSchemePicker.vue";
import TailwindToggle from "@/components/navigation/TailwindToggle.vue";
import RouteInfo from "@/RouteInfo.vue";

import { schemeKey } from "@/injectionKeys";
import { useMetaViewport } from "@/use/use-meta-viewport";

const route = useRoute();
const router = useRouter();
const links = computed(() =>
  router.getRoutes().filter((x) => x.name !== undefined),
);

const coverageExists = __PLAYGROUND_VUE_COVERAGE_EXISTS__;

const colorSchemes = [
  { id: "os-default", value: "os-default", name: "Default" },
  { id: "light", value: "light", name: "Light" },
  { id: "dark", value: "dark", name: "Dark" },
] as const;

const scheme = inject(schemeKey)!;
const selectedScheme = computed(
  () => colorSchemes.find((x) => x.id === scheme.value)!,
);
watchEffect(() => {
  scheme.value = selectedScheme.value.value;
});

const { viewportContent } = useMetaViewport();
const selectedInteractiveWidget = ref<string>(
  viewportContent.value.get("interactive-widget") ?? "",
);
const handleInteractiveWidgetChange = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value;
  const key = "interactive-widget";
  if (value === "") {
    viewportContent.value.delete(key);
  } else {
    viewportContent.value.set(key, value);
  }
  selectedInteractiveWidget.value = value;
};

const menu = useTemplateRef("menu");
const menuOpen = ref(false);

const toggleMenu = () => {
  if (menuOpen.value) {
    closeMenu();
  } else {
    openMenu();
  }
};

const openMenu = () => {
  if (menuOpen.value) {
    throw new Error("Tried opening an already opened menu");
  }

  menuOpen.value = true;
  (menu.value as HTMLDialogElement).showModal();
};

const closeMenu = () => {
  (menu.value as HTMLDialogElement).close();
};

const handleMenuClose = () => {
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
const versionDateRaw = import.meta.env.VITE_VERSION_DATE;
const versionDate = computed(() =>
  versionDateRaw == null ? null : new Date(versionDateRaw),
);
const versionDateDisplay = computed(
  () =>
    versionDate.value?.toLocaleString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }) ?? "(unknown build date)",
);
const versionDisplay = computed(
  () =>
    (expanded.value ? versionString : commitHash?.slice(0, 7))
    ?? "(unknown commit)",
);

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

const handleSearchSubmit = async (e: Event) => {
  e.preventDefault();

  const topLink = filteredLinks.value.at(0);
  if (!topLink) {
    return;
  }

  await router.push(topLink);
  toggleMenu();
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

  if (!menuOpen.value) {
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
  <dialog
    ref="menu"
    closedby="any"
    class="navigation-fragment"
    :class="menuPositionClasses"
    @close="handleMenuClose"
  >
    <nav class="links">
      <form @submit="handleSearchSubmit">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search&hellip;"
          autofocus
          class="search-query tw:form-input"
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

    <div class="menu-bottom">
      <TailwindToggle class="tailwind-toggle"></TailwindToggle>

      <div class="color-scheme-picker">
        <ColorSchemePicker v-model="scheme"></ColorSchemePicker>
      </div>

      <div>
        <select
          :value="selectedInteractiveWidget"
          class="tw:form-select"
          @change="handleInteractiveWidgetChange"
        >
          <option value="">Resizes Visual (default)</option>
          <option value="resizes-content">Resizes Content</option>
          <option value="overlays-content">Overlays Content</option>
        </select>
      </div>

      <code class="commit-hash" :title="commitHash">
        Version: {{ versionDisplay }}</code
      >
      <time
        class="build-date"
        :datetime="versionDateRaw"
        :title="versionDateRaw"
        >{{ versionDateDisplay }}</time
      >

      <div class="menu-positions">
        <div v-for="[id] of menuPositions" :key="id" class="menu-position">
          <input
            :id="`menu-position-${id}`"
            v-model="menuPosition"
            type="radio"
            name="menu-position"
            :value="id"
            class="tw:form-radio"
          />
          <label :for="`menu-position-${id}`">{{ id }}</label>
        </div>
      </div>
    </div>

    <button type="button" class="nav-button-wrapper" @click="toggleMenu">
      <button v-if="menuOpen" @click.stop="toggleExpand">
        <Component :is="getChevronIcon" class="nav-icon"></Component>
      </button>

      <RouteInfo v-if="expanded" class="route-info"></RouteInfo>

      <XMarkIcon v-if="menuOpen" class="nav-icon"></XMarkIcon>
      <MenuIcon v-else class="nav-icon"></MenuIcon>
    </button>
  </dialog>
</template>

<style>
.navigation-fragment {
  position: fixed;
  z-index: 1;
  display: flex;
  max-height: 100dvh;
  box-sizing: border-box; /* Make max-height work without Tailwind */
  flex-flow: column;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border: 1px solid
    light-dark(var(--pv-b-color-gray-300), var(--pv-b-color-gray-700));
  background-color: light-dark(
    var(--pv-b-color-gray-50),
    var(--pv-b-color-gray-950)
  );
  gap: 1rem;
  /** Allow us to position the menu button (which is inside the dialog) */
  inset: auto;
  --border-radius: 0.5rem;

  @supports not (inset: 0) {
    &.bottom.right {
      right: 0;
      bottom: 0;
    }
  }

  &::backdrop {
    background-color: rgb(0 0 0 / 0.25);
  }

  .links,
  .menu-bottom {
    display: none;
  }

  .menu-bottom {
    gap: 1rem;
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

  &.top {
    inset-block-start: 0;
  }

  &.bottom {
    inset-block-end: 0;
  }

  &.left {
    inset-inline-start: 0;
  }

  &.right {
    inset-inline-end: 0;
  }

  &.top.left {
    border-block-start: none;
    border-end-end-radius: var(--border-radius);
    border-inline-start: none;
  }

  &.top.right {
    border-block-start: none;
    border-end-start-radius: var(--border-radius);
    border-inline-end: none;
  }

  &.bottom.left {
    border-block-end: none;
    border-inline-start: none;
    border-start-end-radius: var(--border-radius);
  }

  &.bottom.right {
    border-block-end: none;
    border-inline-end: none;
    border-start-start-radius: var(--border-radius);
  }

  .links {
    min-height: 5rem;
    /* scroll the links when there's not enough space */
    overflow-y: auto;
    overscroll-behavior: contain;
    /* TODO: figure out how to make this less janky on
     * browsers that can hide the toolbar on scroll (i.e.
     * Firefox Android)
     */
  }

  &[open] {
    box-shadow: var(--shadow-x) var(--shadow-y) 20px rgb(0 0 0 / 10%);

    &.bottom {
      --shadow-y: 10px;
    }

    &.right {
      --shadow-x: 10px;
    }

    &.left {
      --shadow-x: -10px;
    }

    &.top {
      --shadow-y: -10px;
      flex-flow: column-reverse;
    }

    .links {
      display: unset;
    }

    .menu-bottom {
      display: grid;
    }
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
    color: light-dark(var(--pv-b-color-green-700), var(--pv-b-color-green-500));
    list-style-type: disc;
  }

  .nav-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .commit-hash {
    font-size: 1rem;
  }

  .build-date {
    font-size: 0.8em;
  }
}
</style>
