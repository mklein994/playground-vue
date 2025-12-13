#!/bin/bash

pnpm run build:tokens -p json >&2

comm -23 <(jq -r 'keys[] | "--\(.)"' src/assets/generated/variables.json | sort -u) \
  <(git grep --untracked --no-heading -h --only-matching \
    --perl-regexp -e '--pv-b-\w[-\w]+' \
    ':/**/*.scss' \
    ':/**/*.css' \
    ':/**/*.vue' |
    sort -u)
