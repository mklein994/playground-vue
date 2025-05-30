<script setup lang="ts">
import { add, diff, duration, list_time_zones } from "@date-diff/pkg/date_diff";
import { computed, ref, watchEffect } from "vue";

import DateDiffOptions from "@/components/DateDiffOptions.vue";

import { useDateDiffOptions } from "@/use/date-diff-options";
import { useDateDiffPresets } from "@/use/date-diff-presets";

const timeZones = computed(() => list_time_zones());

const { availableOptions, optionsForm } = useDateDiffOptions();
const { presets, presetId, currentPreset } = useDateDiffPresets();

const updateOptionsToPreset = () => {
  optionsForm.value = { ...currentPreset.value!.options };
};

const toDate = (dateTime: Date): string => {
  const date = dateTime.toLocaleDateString("en-CA", { dateStyle: "short" });
  const time = dateTime.toLocaleTimeString("en-CA", {
    hour12: false,
    timeStyle: "short",
  });
  return `${date}T${time}`;
};

const start = ref(toDate(new Date()));
const initialEnd = new Date(start.value);
initialEnd.setDate(initialEnd.getDate() + 5);
initialEnd.setTime(initialEnd.getTime() + 1000 * 60);
const end = ref(toDate(initialEnd));
const initialTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const startTimeZone = ref(initialTimeZone);
const endTimeZone = ref(initialTimeZone);

const durationText = ref(`${1e9}s`);

const options = computed(
  () =>
    ({
      spacing: optionsForm.value.spacing,
      designator: optionsForm.value.designator,
      comma_after_designator: optionsForm.value.commaAfterDesignator,
      hours_minutes_seconds: optionsForm.value.hoursMinutesSeconds,
      fractional_unit:
        optionsForm.value.fractionalUnit === ""
          ? undefined
          : optionsForm.value.fractionalUnit,
      direction: optionsForm.value.direction,
      padding: optionsForm.value.padding,
      zero_unit: optionsForm.value.zeroUnit,
    }) satisfies Parameters<typeof diff>[4],
);

const difference = computed(() => {
  try {
    return diff(
      start.value,
      startTimeZone.value,
      end.value,
      endTimeZone.value,
      options.value,
    );
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
    return err?.toString();
  }
});

const relativeDateInput = ref(
  new Date().toLocaleDateString("en-CA", { dateStyle: "short" }),
);
const relativeDate = computed(() =>
  relativeDateInput.value === "" ? null : relativeDateInput.value,
);

const durationOutput = computed(() => {
  try {
    return duration(durationText.value, relativeDate.value, options.value);
  } catch (err) {
    if (err instanceof Error) {
      return err.message;
    }
    return err?.toString();
  }
});

const setStartToNow = () => {
  start.value = toDate(new Date());
};

const setEndToNow = () => {
  end.value = toDate(new Date());
};

const setRelativeDateToNow = () => {
  relativeDateInput.value = new Date().toLocaleDateString(["en-CA"], {
    dateStyle: "short",
  });
};

const setDateAddStartToNow = () => {
  dateAddStart.value = toDate(new Date());
};

const clearRelativeDate = () => {
  relativeDateInput.value = "";
};

const dateAddStart = ref(toDate(new Date()));
const dateAddStartTimeZone = ref(initialTimeZone);
const dateAddDuration = ref("1d");
const dateAddEndDateString = ref("");
const dateAddEndDate = ref<Date | null>(null);
watchEffect(() => {
  try {
    const endDate = add(
      dateAddStart.value,
      dateAddStartTimeZone.value,
      dateAddDuration.value,
    );
    dateAddEndDateString.value = endDate;
    dateAddEndDate.value = new Date(endDate);
  } catch (err: unknown) {
    if (err instanceof Error) {
      dateAddEndDateString.value = err.message;
      dateAddEndDate.value = null;
    } else {
      dateAddEndDateString.value = JSON.stringify(err);
    }
  }
});
</script>

<template>
  <div class="date-diff-experiment">
    <DateDiffOptions
      v-model="optionsForm"
      v-model:preset-id="presetId"
      :available-options="availableOptions"
      :presets="presets"
      @update:preset-id="updateOptionsToPreset"
    ></DateDiffOptions>

    <datalist id="time-zones">
      <option v-for="zone of timeZones" :key="zone" :value="zone"></option>
    </datalist>

    <details name="date-diff" open>
      <summary>Date Diff</summary>

      <form class="form" @submit.prevent>
        <label for="start" class="time-start">Start</label>
        <input
          id="start"
          v-model="start"
          type="datetime-local"
          class="start-date"
        />
        <button type="button" @click="setStartToNow">Now</button>
        <input v-model="start" type="text" class="start-text" />

        <label for="start-time-zone">Start Time Zone</label>
        <input
          id="start-time-zone"
          v-model="startTimeZone"
          type="text"
          list="time-zones"
        />

        <label for="end" class="time-end">End</label>
        <input id="end" v-model="end" type="datetime-local" class="end-date" />
        <button type="button" @click="setEndToNow">Now</button>
        <input v-model="end" type="text" class="end-text" />

        <label for="end-time-zone">End Time Zone</label>

        <input
          id="end-time-zone"
          v-model="endTimeZone"
          type="text"
          list="time-zones"
        />
      </form>

      <p>{{ difference ?? "invalid" }}</p>
    </details>

    <details name="date-diff">
      <summary>Duration</summary>

      <form class="form" @submit.prevent>
        <label for="duration-text">Duration</label>
        <input id="duration-text" v-model="durationText" type="text" />

        <input id="relative-date" v-model="relativeDateInput" type="date" />
        <label for="relative-date">Relative Date</label>
        <button type="button" @click="setRelativeDateToNow">Now</button>
        <button type="button" @click="clearRelativeDate">Clear</button>
      </form>

      <p>{{ durationOutput ?? "invalid" }}</p>
    </details>

    <details name="date-diff">
      <summary>Add</summary>

      <form @submit.prevent>
        <label for="date-add-start">Start</label>
        <input
          id="date-add-start"
          v-model="dateAddStart"
          type="datetime-local"
        />
        <button type="button" @click="setDateAddStartToNow">Now</button>
        <input
          id="date-add-start-text"
          v-model="dateAddStart"
          type="text"
          class="date-add-start-text"
        />

        <label for="date-add-start-time-zone">Start Time Zone</label>
        <input
          id="date-add-start-time-zone"
          v-model="dateAddStartTimeZone"
          type="text"
          list="time-zones"
        />

        <label for="date-add-duration">Duration</label>
        <input id="date-add-duration" v-model="dateAddDuration" type="text" />
        <div>
          <p>
            {{ dateAddEndDateString ?? "invalid" }}
          </p>
          <pre class="date-add-output">{{
            dateAddEndDate?.toLocaleString([], {
              dateStyle: "full",
              timeStyle: "full",
            }) ?? "invalid"
          }}</pre>
        </div>
      </form>
    </details>
  </div>
</template>

<style scoped>
.date-diff-experiment {
  display: grid;
  justify-content: start;
  margin: 1rem;
}

.form {
  display: grid;
  align-items: start;
  justify-content: start;
  gap: 1rem;
  grid-template-columns: repeat(6, auto);
}

.date-add-output {
  font-size: 1rem;
}
</style>
