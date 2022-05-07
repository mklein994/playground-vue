#!/bin/bash

set -e

type corepack
command -v nvm
nvm --version
corepack enable pnpm

pnpm --version
pnpm install

exit 1
