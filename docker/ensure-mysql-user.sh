#!/bin/bash
set -euo pipefail

script_dir="$(cd "$(dirname -- "${BASH_SOURCE[0]:-$0}")" && pwd)"
compose_file="$script_dir/docker-compose.yml"

docker compose -f "$compose_file" exec -T mysql mysql -uroot -proot -e "\
CREATE DATABASE IF NOT EXISTS coupons; \
FLUSH PRIVILEGES;"
