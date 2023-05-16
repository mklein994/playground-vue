<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { type Test } from "@/components/TruthTable.vue";
import TruthTable from "@/components/TruthTable.vue";

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
      .map((x) => new Function("args", x) as Test);
  },
  set(expressions) {
    testExpressionsText.value = expressions.map((x) => x.toString()).join("\n");
  },
});

const tests = ref<((args: (boolean | null)[]) => boolean | null)[]>([]);

const refreshTable = () => {
  tests.value = testExpressions.value;
};

onMounted(() => refreshTable());
</script>

<template>
  <label for="headers">Headers</label>
  <textarea
    id="headers"
    v-model="headersText"
    name="headers"
    cols="30"
    rows="10"
  ></textarea>
  <label for="truth-table-test">Test Expression</label>
  <textarea
    id="truth-table-test"
    v-model="testExpressionsText"
    name="truthTableTest"
    cols="30"
    rows="10"
    placeholder="return args[0] || args[1];"
  />
  <button type="submit" @click="refreshTable">Submit</button>

  <TruthTable :headers="headers" :tests="tests" />
</template>
