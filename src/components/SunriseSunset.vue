<script lang="ts">
interface Coord {
  lat: number;
  lon: number;
}
</script>

<script setup lang="ts">
import { getSunriseSunset } from "@sunrise-cli/pkg/sunrise_cli";
import { computed, type PropType } from "vue";

const props = defineProps({
  coords: {
    type: Object as PropType<Coord>,
    required: true,
  },
  date: {
    type: String,
    required: true,
    validator: (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value),
  },
  azimuth: {
    type: String,
    required: true,
    // validator: (value: string) =>
    // ["Official", "Civil", "Nautical", "Astronomical"].includes(value),
  },
});

const fullDateFormat = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "medium",
  timeStyle: "medium",
});

const sunriseSunset = (coords: Coord, date: string, azimuth: string) => {
  const [year, month, day] = date.split("-").map((x) => Number.parseInt(x, 10));

  const [sunrise, sunset] = Array.from(
    getSunriseSunset(coords.lat, coords.lon, year, month, day, azimuth),
    (timestamp) =>
      fullDateFormat.format(
        new Date(Number.parseInt(timestamp.toString(10), 10) * 1000),
      ),
  );

  return { sunrise, sunset };
};

const output = computed(() =>
  sunriseSunset(props.coords, props.date, props.azimuth),
);
</script>

<template>
  <output>
    <pre>{{ output }}</pre>
  </output>
</template>
