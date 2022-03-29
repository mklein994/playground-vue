#!/bin/bash

echo 'setup rust with wasm32-unknown-unknown'
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- --target wasm32-unknown-unknown -y

echo 'add rust to PATH'
source "${HOME}/.cargo/env"

echo 'setup wasm-pack'
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

echo 'clone sunrise-cli repo'
git -c protocol.version=2 clone --no-tags --no-recurse-submodules --depth=1 https://github.com/mklein994/sunrise-cli ../sunrise-cli

echo 'build wasm'
wasm-pack build --target web ../sunrise-cli

echo 'build vue project'
export VITE_SENTRY_RELEASE="${CF_PAGES_COMMIT_SHA}"
corepack enable pnpm
pnpm run coverage
pnpm run build -- --sourcemap false
