<script setup lang="ts">
import { ref } from "vue";

const dialog = ref<HTMLDialogElement>();

const openDialog = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  if (typeof dialog.value?.showModal === "function") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    dialog.value?.showModal();
  } else {
    alert("Your browser doesn't support HTMLDialogElement.showModal().");
  }
};

const closeDialog = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  if (typeof dialog.value?.close === "function") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    dialog.value?.close();
  } else {
    alert("Your browser doesn't support HTMLDialogElement.close().");
  }
};
</script>

<template>
  <p>
    The <code>&lt;dialog&gt;</code> element will be added to Firefox 98. (<a
      href="https://www.mozilla.org/en-US/firefox/98.0beta/releasenotes/"
      target="_blank"
      >Firefox 98 beta release notes</a
    >)
  </p>

  <button @click="openDialog">Open Dialog</button>

  <dialog ref="dialog" class="dialog">
    <form action="dialog">
      Hey! You're seeing this in a <code>&lt;dialog&gt;</code> element.

      <button type="button" @click="closeDialog">Close</button>
    </form>
  </dialog>
</template>

<style scoped>
.dialog::backdrop {
  background: #282828;
}
</style>
