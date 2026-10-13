#!/usr/bin/env bash
# Downloads the updated HQ Design System Foundations images into ./assets/hq-ds.
# Run from Terminal:  bash get-ds-images.sh
# The Figma asset links are temporary: generated 13 Oct 2026, they stop working around 20 Oct 2026.
set -u
cd "$(dirname "$0")/assets"
B=https://www.figma.com/api/mcp/asset/0429d240-aa73-46ce-b226-72d83fa6d7a1
get(){ mkdir -p "$(dirname "$2")"; curl -fsSL -o "$2.tmp" "$B/$1" && mv "$2.tmp" "$2" && echo "ok   $2" || { rm -f "$2.tmp"; echo "FAIL $2"; }; }
get 07f9c.png hq-ds/ds-foundations.png
get 442c3.png hq-ds/ds-tokens.png
