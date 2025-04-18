<script lang="ts">
interface Coord {
  lat: number;
  lon: number;
}
</script>

<script setup lang="ts">
import { getSolarEvents } from "@sunrise-cli/pkg/sunrise_cli";
import { computed } from "vue";

import { zip } from "@/helpers/zip";

export type SolarEvent =
  | `${"dawn" | "dusk"}-${"astronomical" | "nautical" | "civil"}`
  | "sunrise"
  | "sunset";

const props = defineProps<{
  coords: Coord;
  date: string;
  events: SolarEvent[];
}>();

const fullDateFormat = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "medium",
  timeStyle: "medium",
});

const solarEvents = (coords: Coord, date: string, events: string[]) => {
  const [year, month, day] = date.split("-").map((x) => Number.parseInt(x, 10));
  const times = Array.from(
    getSolarEvents(coords.lat, coords.lon, year, month, day, events),
    (timestamp) =>
      fullDateFormat.format(Number.parseInt(timestamp.toString(10), 10) * 1000),
  );

  return Object.fromEntries(
    zip(
      events.map((x) =>
        x
          .split("-")
          .map((x) => x.replace(/^\w/, (x) => x.toUpperCase()))
          .join(" "),
      ),
      times,
    ),
  );
};

const output = computed(() =>
  solarEvents(props.coords, props.date, props.events),
);
</script>

<template>
  <output>
    <pre>{{ output }}</pre>
  </output>
</template>
