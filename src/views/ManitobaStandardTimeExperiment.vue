<script setup lang="ts">
import { computed, ref } from "vue";

import { useTimeZoneChecker } from "@/use/use-time-zone-checker";

const supportsTemporal = computed(() => typeof Temporal !== "undefined");
const implementation = ref<"temporal" | "date">(
  supportsTemporal.value ? "temporal" : "date",
);
const { checker } = useTimeZoneChecker(implementation);
</script>

<template>
  <div class="manitoba-standard-time-experiment">
    <div>
      Supports <code class="pv-code">Temporal</code>: {{ supportsTemporal }}
    </div>
    <fieldset class="implementation-group">
      <legend>Implementation</legend>
      <input
        id="checker-implementation-temporal"
        v-model="implementation"
        type="radio"
        name="checker-implementation"
        value="temporal"
      />
      <label for="checker-implementation-temporal">Temporal</label>
      <input
        id="checker-implementation-date"
        v-model="implementation"
        type="radio"
        name="checker-implementation"
        value="date"
      />
      <label for="checker-implementation-date">Date</label>
    </fieldset>
    <table class="checker-table">
      <thead>
        <tr>
          <th class="label">Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="label">hasCorrectOffset:</td>
          <td
            class="value correct-offset"
            :class="`${checker!.hasCorrectOffset()}`"
          >
            {{ checker!.hasCorrectOffset() }}
          </td>
        </tr>
        <tr>
          <td class="label">date:</td>
          <td class="value">{{ checker }}</td>
        </tr>
        <tr>
          <td class="label">short:</td>
          <td class="value">{{ checker!.formatShort() }}</td>
        </tr>
        <tr>
          <td class="label">shortOffset:</td>
          <td class="value">{{ checker!.formatShortOffset() }}</td>
        </tr>
        <tr>
          <td class="label">long:</td>
          <td class="value">{{ checker!.formatLong() }}</td>
        </tr>
        <tr>
          <td class="label">longOffset:</td>
          <td class="value">{{ checker!.formatLongOffset() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.manitoba-standard-time-experiment {
  display: grid;
  gap: 1rem;
  place-content: start;
  padding: 1rem;

  .implementation-group {
    max-inline-size: max-content;
  }

  .checker-table {
    font-family: monospace;
    font-size: 1rem;

    .value {
      padding-inline-start: 1em;
      text-align: start;

      &.correct-offset {
        &.true {
          color: var(--pv-yes);

          &::after {
            content: " ✓";
          }
        }

        &.false {
          color: var(--pv-no);

          &::after {
            content: " ✗";
          }
        }
      }
    }
  }
}
</style>
