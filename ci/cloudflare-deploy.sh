#!/bin/bash

echo 'setup node'
pnpm env use --global latest

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

echo 'setup sentry environment'
export VITE_SENTRY_RELEASE="${CF_PAGES_COMMIT_SHA}"

echo 'setup pnpm'
corepack enable pnpm

echo 'run tests and generate code coverage'
pnpm run coverage --isolate

# CloudFlare Pages messes up file names; it doesn't understand URLs with
# multiple dots in them: <https://example.com/foo.bar.html> redirects to
# <https://example.com/foo.bar>.
echo 'fixing file names in public/coverage/'
./ci/fix-filenames.sh spa ./public/coverage/

echo 'build vue project'
pnpm run build:all --sourcemap false

# Create a 404.html page:
# https://developers.cloudflare.com/pages/platform/serving-pages/#not-found-behavior
echo 'create 404.html page for coverage'
cat <<HTML >dist/coverage/404.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 - Not Found - Playground Vue</title>
  </head>
  <body>
    <h1>404 Not Found</h1>
  </body>
</html>
HTML
