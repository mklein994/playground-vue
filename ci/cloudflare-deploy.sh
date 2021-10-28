#/bin/bash

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- --target wasm32-unknown-unknown -y
source "${HOME}/.cargo/env"
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
git clone https://github.com/mklein994/sunrise-cli ../sunrise-cli
wasm-pack build --target web ../sunrise-cli
corepack pnpm run build
