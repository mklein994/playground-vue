<template>
  <div class="welcome-container">
    <h1 class="welcome">Welcome</h1>
  </div>
</template>

<style>
.welcome-container {
  display: grid;
  place-items: center;

  box-sizing: border-box; /* For when no resets are used */
  height: 100vh; /* assumes <body> has no margin */
  padding-bottom: 3.5rem;

  .welcome {
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

    margin-block: 0;
    font:
      700 var(--font-size) "Andada Pro",
      serif;
    text-align: center;
  }
}
</style>
