<script setup lang="ts">
import { ref } from "vue";

const background = ref("#ffa500");
const color = ref("#000");
</script>

<template>
  <!-- https://blog.rolandtoth.hu/css-diagonal-corner-text-stripe/ -->
  <div class="self-adjusting-sash-experiment">
    <div class="card">
      <div class="sash">
        <span class="sash-text" contenteditable="true">Change Me</span>
      </div>

      <p class="card-text">
        Lorem accusamus ipsum distinctio nobis quo Modi sed ratione sunt dolorum
        atque, consequuntur? Praesentium eum nesciunt expedita assumenda ratione
        ipsa Harum corrupti facilis quae amet quaerat Odio non enim nam?
      </p>

      <form class="settings" @submit.prevent>
        <h1 class="settings-heading">Settings</h1>

        <label for="color">Color</label>
        <input id="color" v-model="color" type="color" />

        <label for="background">Background</label>
        <input id="background" v-model="background" type="color" />
      </form>
    </div>
  </div>
</template>

<style>
.self-adjusting-sash-experiment {
  display: grid;
  height: 100vh;
  place-items: center;

  .card {
    position: relative;
    overflow: hidden;
    width: min(20em, 100vw);
    padding: 1rem;
    border-radius: 1rem;
    background: var(--pv-base-color-stone-200);
    color: var(--pv-base-color-stone-800);
    color-scheme: light;
  }

  .card-text {
    margin: 0;
  }

  .sash {
    position: absolute;
    z-index: 1;
    inset-block-start: 0;
    inset-inline-end: 0;
    transform: translateX(50%) translateY(-50%) rotate(45deg);
    transform-origin: center;

    &::before {
      display: block;
      height: 0;
      content: "";
      padding-block-start: 100%;
    }
  }

  .sash-text {
    display: inline-block;
    padding: 0.25em 2em;
    background: v-bind("background");
    color: v-bind("color");
    font-family: sans-serif;
    text-align: center;
    text-transform: uppercase;
    transform: translateY(-50%);
    white-space: nowrap;
  }

  .settings {
    display: grid;
    justify-content: start;
    padding: 1rem 0.5em 0;
    gap: 0.25em 1em;
    grid-template-columns: auto auto;
  }

  .settings-heading {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
    grid-column: 1 / -1;
  }
}
</style>
