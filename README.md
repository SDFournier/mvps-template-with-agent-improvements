# Monorepo Fullstack (Next + Nest)

## Requisitos
- Node 20 (ver `.nvmrc`)
- Corepack habilitado
- pnpm
- Docker Desktop (backend WSL2)

## Notas de entorno (Windows + WSL)
- Docker Compose corre en WSL (Docker Desktop con backend WSL2).
- MySQL y Redis se exponen en puertos no standard para evitar conflictos locales:
  - MySQL: `localhost:3307`
  - Redis: `localhost:6378`

## Pasos para levantar (orden recomendado)
1) WSL: `./docker/infra-up.sh` (o `docker compose -f docker/docker-compose.yml up -d`)
2) Windows PowerShell: `corepack enable`
3) Windows PowerShell: `pnpm install`
4) Windows PowerShell: `pnpm dev`

## Infra sin Node/PNPM (Windows)
Si queres levantar la infra desde PowerShell y Docker CLI esta disponible en Windows,
podes usar Docker directamente:
- `docker\\infra-up.cmd`
- `docker\\infra-down.cmd`

Tambien podes correr el comando directo:
- `docker compose -f docker/docker-compose.yml up -d`

## Infra sin Node/PNPM (WSL/Linux)
- `./docker/infra-up.sh`
- `./docker/infra-down.sh`

## URLs
- Web: http://localhost:3000
- API: http://localhost:3001/health

La web muestra el JSON de `/health` en pantalla.

## Documentacion de features
- `docs/00-overview.md`
- `docs/architecture.md`
- `docs/iteration-1.md`
- `docs/good-practices.md`
- `docs/iteration-2.md`
- `docs/testing.md`
- `docs/feature-playbooks.md`
- `docs/contracts.md`
- `docs/decision-log.md`
- `docs/adr/README.md`
- `docs/test-matrix.md`
- `docs/change-checklist.md`
- `docs/documentation-improvements.md`
- `docs/environment-standards.md`
- `docs/friction-log.md`
- `docs/flows/README.md`
- `docs/glossary.md`
- `docs/learning/README.md`
- `docs/labs/README.md`
- `docs/runbooks/README.md`
- `prompts/README.md`

## Troubleshooting
- Si MySQL/Redis dan `false` en `/health`, revisa que Docker este levantado (`pnpm dev:infra`).
- Si la API tarda en conectar a MySQL, espera unos segundos: TypeORM reintenta.
- Si aparece `Access denied for user 'root'`, asegura la base:
  - Windows: `docker\\ensure-mysql-user.cmd`
  - WSL/Linux: `./docker/ensure-mysql-user.sh`
- Si hay conflicto con MySQL/Redis locales, Docker usa `localhost:3307` y `localhost:6378`.
