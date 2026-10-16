#!/usr/bin/env bash
# Downloads the new After screenshots for the Booking Experience into ./assets/booking/after.
# Run from Terminal:  bash get-images.sh
# The Figma asset links are temporary: generated 16 Oct 2026, they stop working around 23 Oct 2026.
set -u
cd "$(dirname "$0")/assets"
get(){ mkdir -p "$(dirname "$2")"; curl -fsSL -o "$2.tmp" "https://www.figma.com/api/mcp/asset/$1" && mv "$2.tmp" "$2" && echo "ok   $2" || { rm -f "$2.tmp"; echo "FAIL $2"; }; }
get 045a81bf-59be-4280-a71d-f7489c8d3275/1b614.png booking/after/passenger-info.png
get 44b71bf5-3f84-4948-a130-2c8a859c3d79/41671.png booking/after/date-and-location.png
get 9bc2751a-19b7-4355-9d5a-90e6ceb752af/6985c.png booking/after/car-and-payment.png
get 9234b149-f6f7-42de-9fa3-04dc470cf476/39d26.png booking/after/summary.png
