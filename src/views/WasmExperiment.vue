<script setup lang="ts">
import {
  defineAsyncComponent,
  onMounted,
  reactive,
  ref,
  watchEffect,
} from "vue";

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
const highAccuracy = ref(false);

watchEffect(() => {
  if (coords.lat !== 0 && coords.lon !== 0) {
    localStorage.setItem(
      "coords",
      JSON.stringify({
        highAccuracy: highAccuracy.value,
        lat: coords.lat,
        lon: coords.lon,
      })
    );
  }
});

const getOldCoords = (): {
  highAccuracy: boolean;
  lat: number;
  lon: number;
} | null => {
  const c = localStorage.getItem("coords");
  return c ? JSON.parse(c) : null;
};

const getLocationAsync = (
  options?: PositionOptions
): Promise<GeolocationPosition> =>
  new Promise((success, failure) =>
    navigator.geolocation.getCurrentPosition(success, failure, options)
  );

const updateLocation = async () => {
  const pos = await getLocationAsync(
    highAccuracy.value ? { enableHighAccuracy: true } : undefined
  );
  coords.lat = pos.coords.latitude;
  coords.lon = pos.coords.longitude;
};

onMounted(async () => {
  const oldCoords = getOldCoords();
  if (oldCoords) {
    coords.lat = oldCoords.lat;
    coords.lon = oldCoords.lon;
    highAccuracy.value = oldCoords.highAccuracy;
  } else {
    await updateLocation();
  }
});
</script>

<template>
  <div class="wasm">
    <button @click="updateLocation">Update Location</button>
    <input
      id="high-accuracy"
      v-model="highAccuracy"
      type="checkbox"
      name="highAccuracy"
    />
    <input id="date" v-model="date" type="date" name="date" />
    <input
      id="lat"
      v-model="coords.lat"
      type="number"
      name="lat"
      step="0.0000001"
    />
    <input
      id="lon"
      v-model="coords.lon"
      type="number"
      name="lon"
      step="0.0000001"
    />
    <input id="azimuth" v-model="azimuth" type="text" name="azimuth" />
    <!--
    <select id="azimuth" v-model="azimuth" name="azimuth">
      <option
        v-for="name of ['Official', 'Civil', 'Nautical', 'Astronomical']"
        :key="name"
      >
        {{ name }}
      </option>
    </select>
    -->

    <Suspense>
      <SunriseSunset :coords="coords" :date="date" :azimuth="azimuth" />
    </Suspense>
  </div>
</template>

<style scoped>
.wasm {
  padding: 1rem;
}
</style>
