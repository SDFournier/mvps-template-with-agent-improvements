@echo off
set "COMPOSE_FILE=%~dp0docker-compose.yml"
docker compose -f "%COMPOSE_FILE%" exec -T mysql mysql -uroot -proot -e "CREATE DATABASE IF NOT EXISTS coupons; FLUSH PRIVILEGES;"
