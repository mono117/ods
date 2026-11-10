#!/usr/bin/env sh
# Construye dist/ con solo los archivos que sirve el sitio.
# Cloudflare Pages: build command "sh build.sh", output "dist".
set -eu
cd "$(dirname "$0")"

rm -rf dist
mkdir -p dist
cp index.html dist/
cp -r css js dist/

printf 'dist listo: %s\n' "$(du -sh dist | cut -f1)"
