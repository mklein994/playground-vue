<!-- Adapted from MDN -->
<template>
  <svg viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7.25" stroke="currentColor" stroke-width="1.5" />
    <mask
      id="a"
      style="mask-type: alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="16"
      height="16"
    >
      <circle
        cx="8"
        cy="8"
        r="7.25"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="1.5"
      />
    </mask>
    <g mask="url(#a)">
      <path fill="currentColor" d="M0 0h8v16H0z" />
    </g>
  </svg>
</template>
