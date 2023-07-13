<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { type Test } from "@/components/TruthTable.vue";
import TruthTable from "@/components/TruthTable.vue";
import type { TestWithNulls } from "@/components/TruthTableWithNulls.vue";
import TruthTableWithNulls from "@/components/TruthTableWithNulls.vue";

const allowNulls = ref(true);
const headersText = ref("P\nQ\nR\nS");
const headers = computed({
  get() {
    return headersText.value
      .trim()
      .split("\n")
      .map((x) => x.trim());
  },
  set(h) {
    headersText.value = h.join("\n");
  },
});

const testExpressionsText = ref("return args[0] || args[1];");
const testExpressions = computed({
  get() {
    return testExpressionsText.value
      .trim()
      .split("\n")
      .map((x) => new Function("args", x)) as TestWithNulls[] | Test[];
  },
  set(expressions) {
    testExpressionsText.value = expressions.map((x) => x.toString()).join("\n");
  },
});

const tests = ref<Test[] | TestWithNulls[]>([]);

const testsHaveNulls = (_t: unknown): _t is TestWithNulls[] => allowNulls.value;

const refreshTable = () => {
  tests.value = testExpressions.value;
};

onMounted(() => refreshTable());
</script>

<template>
  <form class="truth-table-inputs" @submit.prevent>
    <div class="code-input-wrapper">
      <label for="headers">Headers</label>
      <textarea
        id="headers"
        v-model="headersText"
        name="headers"
        cols="30"
        rows="10"
      ></textarea>
    </div>

    <div class="code-input-wrapper">
      <label for="truth-table-test">Test Expression</label>
      <textarea
        id="truth-table-test"
        v-model="testExpressionsText"
        name="truthTableTest"
        cols="30"
        rows="10"
        placeholder="return args[0] || args[1];"
      />
    </div>

    <div class="allow-nulls">
      <input
        id="allow-nulls"
        v-model="allowNulls"
        name="allowNulls"
        type="checkbox"
      />
      <label for="allow-nulls"
        >Arguments may have <code>null</code> values</label
      >
    </div>

    <button type="submit" class="submit-button" @click="refreshTable">
      Submit
    </button>
  </form>

  <TruthTableWithNulls
    v-if="testsHaveNulls(tests)"
    :headers="headers"
    :tests="tests"
    class="truth-table"
  />
  <TruthTable v-else :headers="headers" :tests="tests" class="truth-table" />
</template>

<style scoped>
.truth-table {
  --true-text-color: #2d6c4e;
  --false-text-color: #c73224;

  --true-background-color: #b7e1cd;
  --false-background-color: #f4c7c3;
}

.truth-table-inputs {
  display: grid;
  max-width: max-content;
  padding: 1rem;
  gap: 1rem;
  grid: auto-flow / 1fr 1fr;
}

.code-input-wrapper {
  display: grid;
  gap: inherit;
}

.allow-nulls {
  display: flex;
  gap: 0.5em;
}

.submit-button {
  max-width: max-content;
}
</style>
