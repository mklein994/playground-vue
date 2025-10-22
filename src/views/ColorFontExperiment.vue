<template>
  <div class="color-font-experiment">
    <div
      class="welcome-container tw:dark:hover:text-shadow-lg tw:dark:hover:text-shadow-pink-500 tw:dark:transition-[text-shadow] tw:dark:ease-in-out tw:dark:duration-300"
    >
      <input type="checkbox" checked class="animate-toggle" />
      <h1 class="welcome">Welcome</h1>
    </div>
    <div class="settings">
      <p class="message stopped">Click the colored text to animate it.</p>
      <p class="message animating">
        Click the colored text to stop animating it.
      </p>
      <fieldset
        class="settings-inputs tw:border tw:p-[revert] tw:m-[revert] tw:b-[revert]"
      >
        <legend>Toggle individual animations</legend>
        <input
          id="animate-morph"
          type="checkbox"
          checked
          class="tw:form-checkbox"
        />
        <label for="animate-morph"
          >Animate morph state (<code class="pv-code">MORF</code>)</label
        >
        <input
          id="animate-shadow"
          type="checkbox"
          checked
          class="tw:form-checkbox"
        />
        <label for="animate-shadow"
          >Animate shadow length (<code class="pv-code">SHLN</code>)</label
        >
      </fieldset>
    </div>
  </div>
</template>

<style scoped>
.color-font-experiment {
  display: grid;
  height: 100vh;
  box-sizing: border-box; /* For when no resets are used */
  padding-bottom: 3.5rem;
  place-items: center;

  &:has(#animate-morph:checked) {
    --morph-state: running;
  }

  &:has(#animate-shadow:checked) {
    --shadow-state: running;
  }
}

.welcome-container {
  /* necessary to contain hidden checkbox */
  position: relative;
}

.welcome {
  position: relative;
  padding: 0;

  animation:
    morph-pulse calc(var(--morph-states) * 1s) var(--morph-easing) infinite
      alternate,
    shadow-pulse 5s var(--shadow-easing) infinite alternate;
  animation-play-state:
    var(--global-state, var(--morph-state, paused)),
    var(--global-state, var(--shadow-state, paused));

  font-family: "Honk", fantasy;
  font-size: var(--font-size);

  font-variation-settings:
    "MORF" var(--morph),
    "SHLN" var(--shadow);
  line-height: normal;

  /* reset default h1 CSS styles here */
  margin-block: 0;

  text-align: center;

  /* Don't let this go below a comfortable font size. */
  --min-font-size: 1rem;

  /* Based on the distance away from the edges on narrow screens. */
  --preferred-font-size: 15vw;

  /* Based on its proportions on super-wide screens. */
  --max-font-size: 40vh;

  --font-size: clamp(
    var(--min-font-size),
    var(--preferred-font-size),
    var(--max-font-size)
  );

  @media (prefers-color-scheme: dark) {
    padding: 1rem;
    border-radius: 8px;
    /* stylelint-disable declaration-property-value-no-unknown -- browsers support <system-color> here */
    background: oklch(from Canvas calc(l + 0.1) c h);
  }

  --shadow-easing: cubic-bezier(0.645, 0.045, 0.355, 1);

  --morph-states: 45;
  --morph-easing: linear;
}

.animate-toggle {
  position: absolute;
  z-index: 1;
  appearance: none;
  cursor: pointer;
  inset: 0;

  &:not(:checked) ~ .welcome {
    --global-state: paused;
  }
}

.message {
  /* resets */
  margin: 0;

  &.animating {
    display: none;
  }
}

.color-font-experiment:has(.animate-toggle:checked) .message {
  &.animating {
    display: unset;
  }

  &.stopped {
    display: none;
  }
}

.settings {
  display: grid;
  font-family: system-ui;
  gap: 1rem;
  justify-items: center;
}

.settings-inputs {
  display: grid;
  max-width: max-content;
  align-items: center;
  column-gap: 0.5rem;
  grid-template-columns: auto 1fr;
}

@property --shadow {
  inherits: false;
  initial-value: 0;
  syntax: "<number>";
}

@property --morph {
  inherits: false;
  initial-value: 15;
  syntax: "<integer>";
}

@keyframes shadow-pulse {
  from {
    --shadow: 0;
  }
  to {
    --shadow: 100;
  }
}

@keyframes morph-pulse {
  from {
    --morph: 0;
  }
  to {
    --morph: 45;
  }
}
</style>
