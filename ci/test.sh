#!/bin/bash

set -e

type corepack
corepack enable pnpm

pnpm --version
pnpm install

exit 1
