<template>
  <div class="wasm">
    <input id="date" v-model="date" type="date" name="date" />
    <input id="lat" v-model="coords.lat" type="number" name="lat" />
    <input id="lon" v-model="coords.lon" type="number" name="lon" />
    <select id="azimuth" v-model="azimuth" name="azimuth">
      <option
        v-for="name of ['Official', 'Civil', 'Nautical', 'Astronomical']"
        :key="name"
      >
        {{ name }}
      </option>
    </select>

    <Suspense>
      <SunriseSunset :coords="coords" :date="date" :azimuth="azimuth" />
    </Suspense>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, reactive, ref } from "vue";

const SunriseSunset = defineAsyncComponent(
  () => import("../components/SunriseSunset.vue")
);

const dateFormat = new Intl.DateTimeFormat("en-CA", { dateStyle: "short" });

const date = ref(dateFormat.format(new Date()));
const coords = reactive({
  lat: 0,
  lon: 0,
});
const azimuth = ref("Official");
</script>

<style scoped>
.wasm {
  padding: 1rem;
}
</style>
