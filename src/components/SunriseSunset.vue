<template>
  <output>
    <pre>{{ output }}</pre>
  </output>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import init, { get_sunrise_sunset } from "../../../sunrise-cli/pkg/sunrise_cli";

interface Coord {
  lat: number;
  lon: number;
}

const props = defineProps<{
  coords: Coord;
  date: string;
  azimuth: string;
}>();

await init();

const fullDateFormat = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "medium",
  timeStyle: "medium",
});

const sunrise_sunset = (coords: Coord, date: string, azimuth: string) => {
  const [year, month, day] = date.split("-").map((x) => Number.parseInt(x, 10));

  const [sunrise, sunset] = Array.from(
    get_sunrise_sunset(coords.lat, coords.lon, year, month, day, azimuth),
    (timestamp) =>
      fullDateFormat.format(
        new Date(Number.parseInt(timestamp.toString(10), 10) * 1000)
      )
  );

  return { sunrise, sunset };
};

const output = computed(() =>
  sunrise_sunset(props.coords, props.date, props.azimuth)
);
</script>
