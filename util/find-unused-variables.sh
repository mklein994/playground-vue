#!/bin/bash

comm -23 <(jq -r 'keys[] | "--\(.)"' src/assets/generated/variables.json | sort -u) \
  <(git grep --no-heading -h --only-matching \
    --perl-regexp -e '--pv-\w[-\w]+' \
    ':/**/*.scss' \
    ':/**/*.css' \
    ':/**/*.vue' |
    sort -u)
