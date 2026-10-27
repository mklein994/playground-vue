<script setup lang="ts">
import { computed, ref } from "vue";

import { useTimeZoneChecker } from "@/use/use-time-zone-checker";

const userAgent = computed(() => navigator.userAgent);
const supportsTemporal = computed(() => typeof Temporal !== "undefined");
const implementationOptions = computed(() =>
  [
    { id: "temporal", name: "Temporal" },
    { id: "date", name: "Date" },
  ].map((impl) => ({
    ...impl,
    isDefault: (impl.id === "temporal") === supportsTemporal.value,
  })),
);
const implementation = ref<"temporal" | "date">(
  supportsTemporal.value ? "temporal" : "date",
);
const { checker } = useTimeZoneChecker(implementation);
</script>

<template>
  <div class="manitoba-standard-time-experiment">
    <div>
      User agent:
      <pre class="user-agent">{{ userAgent }}</pre>
    </div>

    <div>
      Supports <code class="pv-code">Temporal</code>: {{ supportsTemporal }}
    </div>

    <fieldset class="implementation-group">
      <legend>Implementation</legend>
      <div
        v-for="impl of implementationOptions"
        :key="impl.id"
        class="impl-option"
        :class="{ 'is-default': impl.isDefault }"
      >
        <input
          :id="`checker-implementation-${impl.id}`"
          v-model="implementation"
          type="radio"
          name="checker-implementation"
          :value="impl.id"
        />
        <label :for="`checker-implementation-${impl.id}`">{{
          impl.name
        }}</label>
      </div>
    </fieldset>

    <div v-if="checker" class="checker-table-wrapper">
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
              :class="`${checker.hasCorrectOffset()}`"
            >
              {{ checker.hasCorrectOffset() }}
            </td>
          </tr>
          <tr>
            <td class="label">date:</td>
            <td class="value">{{ checker }}</td>
          </tr>
          <tr>
            <td class="label">short:</td>
            <td class="value">{{ checker.formatShort() }}</td>
          </tr>
          <tr>
            <td class="label">shortOffset:</td>
            <td class="value">{{ checker.formatShortOffset() }}</td>
          </tr>
          <tr>
            <td class="label">long:</td>
            <td class="value">{{ checker.formatLong() }}</td>
          </tr>
          <tr>
            <td class="label">longOffset:</td>
            <td class="value">{{ checker.formatLongOffset() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.manitoba-standard-time-experiment {
  display: grid;
  gap: 1rem;
  place-content: start;
  padding: 1rem;

  .user-agent {
    white-space: pre-line;
  }

  .implementation-group {
    max-inline-size: max-content;
  }

  .impl-option.is-default::after {
    content: " (default)";
    color: oklch(from currentColor 0.75 c h);
  }

  .checker-table-wrapper {
    overflow-inline: auto;
  }

  .checker-table {
    font-family: monospace;
    font-size: 1rem;
    white-space: nowrap;

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
