<template>
  <div class="welcome-container">
    <h1 class="welcome">Welcome</h1>
  </div>
</template>

<style scoped>
.welcome-container {
  display: grid;
  place-items: center;

  height: 100vh;
  padding-bottom: 10vh;
}

.welcome {
  /* Don't let this go below a comfortable font size. */
  --min-font-size: 1rem;

  /* Based on the distance away from the edges on narrow screens. */
  --preferred-font-size: 15vw;

  /* Based on its proportions on super-wide screens. */
  --max-font-size: 40vh;

  font-size: clamp(
    var(--min-font-size),
    var(--preferred-font-size),
    var(--max-font-size)
  );

  font-family: "Andada Pro", serif;
  text-align: center;
}
</style>
