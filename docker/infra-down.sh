#!/bin/bash
script_dir="$(cd "$(dirname -- "${BASH_SOURCE[0]:-$0}")" && pwd)"
docker compose -f "$script_dir/docker-compose.yml" down
