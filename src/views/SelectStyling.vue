<template>
  <div class="select-styling">
    <div
      v-for="classes of ['default', 'none']"
      :key="classes"
      class="select-wrapper"
    >
      <select class="tw:form-select select" :class="classes">
        <option disabled value="">Choose a fruit:</option>
        <option>Apple</option>
        <option>Banana</option>
        <option>Cherry</option>
      </select>
      <span>{{ classes }}</span>
    </div>
  </div>
</template>

<style>
.select-styling {
  background-color: rgb(25 25 0 / 0.1);

  .none {
    margin: 0;
    padding: 0;
    border: 0;

    appearance: none;
    background: none;
    outline: 0;
  }
}
</style>
