#!/bin/bash

pnpm run build:tokens -p json >&2

comm -13 <(jq -r 'keys[] | "--\(.)"' src/assets/generated/variables.json | sort -u) \
  <(git grep --untracked --no-heading -h --only-matching \
    --perl-regexp -e '--pv-base-\w[-\w]+' \
    ':/**/*.scss' \
    ':/**/*.css' \
    ':/**/*.vue' |
    sort -u)
