# Prompt: Rename DB and enable migrations

## Context
- User requested DB name change to `coupons_mvp`.
- Ensure DB creation and migrations run, then execute tests.

## Objective
Update configuration to use `coupons_mvp`, wire MySQL creation scripts, add
TypeORM migrations support, and run the test suite with infra available.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Update ADR/decision log for architectural changes.
- Leave a prompt artifact in prompts/.

## Stage A - Plan
- What (observable result): DB name updated, migrations wired, docs updated.
- Why (motivation + constraint): keep schema explicit and align infra defaults.
- How (steps + modules): update configs/scripts; add migrations + runner; update ADR/log.
- Expected result (checklist):
  - DB defaults use `coupons_mvp`.
  - Docker and ensure scripts create `coupons_mvp`.
  - Migrations run via startup and manual command.
  - Tests executed.
- Scope and impact (risk, compatibility): schema workflow change; update docs.
- Trade-offs (chosen vs discarded): migrations vs synchronize.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docker/docker-compose.yml
  - docker/ensure-mysql-user.*
  - .env.example
  - apps/api/.env.example
  - apps/api/src/app.module.ts
  - apps/api/src/migrations/001-init-coupons.ts
  - apps/api/src/database/data-source.ts
  - apps/api/src/database/run-migrations.ts
  - apps/api/package.json
  - docs/adr/002-typeorm-migrations.md
  - docs/decision-log.md
  - docs/learning/004-typeorm-migrations.md
  - README.md
  - prompts/009-db-name-migrations.md
- Changes by block and rationale:
  - DB name aligned across infra and defaults.
  - Migrations added and run automatically on startup.
  - Manual migration runner for local workflows.
- Observability signals (logs/metrics) if applicable: n/a.

## Stage C - Validation
- Tests and commands: `node scripts/agent-finalize.js`.
- Manual checks: n/a.
- Not validated and why: DB connection validation is manual if Docker is unavailable.

## Stage D - Pedagogical close
- Decision summary (what changed and why): moved to migrations, renamed DB.
- How it works now (mental model, invariants): migrations are the schema source.
- Before vs after: auto sync -> migration-driven schema.
- Impact (performance, maintainability, risk, debt): more explicit schema control.
- Learnings and concepts (links to ADR or concept cards):
  - docs/adr/002-typeorm-migrations.md
  - docs/learning/004-typeorm-migrations.md

## Artifacts created
- Prompt file: prompts/009-db-name-migrations.md
- ADR: docs/adr/002-typeorm-migrations.md
- Concept card: docs/learning/004-typeorm-migrations.md
