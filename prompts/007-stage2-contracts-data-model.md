# Prompt: Stage 2 contracts + data model

## Context
- Stage 2 focuses on shared DTOs and MySQL data model alignment.
- Repo uses Nest + TypeORM with MySQL and shared DTOs in packages/shared.

## Objective
Define shared coupon DTOs and document contracts, then introduce TypeORM
entities that map the coupon book, code, counter, and redemption tables.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Update contracts for any new API shapes.
- Data model changes require a doc update (concept card or ADR).
- Leave a prompt artifact in prompts/.

## Stage A - Plan
- What (observable result): DTOs + entities + contracts + concept card.
- Why (motivation + constraint): align with MySQL/Redis architecture and prevent
  premature API implementation.
- How (steps + modules): add shared DTOs, add entities, update contracts,
  add concept card for MySQL constraints.
- Expected result (checklist):
  - Shared DTOs in packages/shared.
  - TypeORM entities registered in AppModule.
  - Contracts updated with coupon endpoints and shapes.
  - Concept card documenting MySQL constraints.
- Scope and impact (risk, compatibility): schema added; no API behavior yet.
- Trade-offs (chosen vs discarded): MySQL-friendly unique key strategy vs
  Postgres partial indexes.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - packages/shared/src/coupons.ts
  - packages/shared/src/index.ts
  - apps/api/src/coupons/entities/*.ts
  - apps/api/src/app.module.ts
  - docs/contracts.md
  - docs/learning/002-coupon-data-model.md
  - prompts/007-stage2-contracts-data-model.md
- Changes by block and rationale:
  - Shared DTOs define stable shapes.
  - Entities map MySQL tables and indexes.
  - Contracts updated for client/server alignment.
  - Concept card documents MySQL-specific constraints.
- Observability signals (logs/metrics) if applicable: n/a.

## Stage C - Validation
- Tests and commands: `node scripts/agent-finalize.js`.
- Manual checks: n/a.
- Not validated and why: n/a.

## Stage D - Pedagogical close
- Decision summary (what changed and why): Stage 2 artifacts added to align
  contracts and schema before endpoint implementation.
- How it works now (mental model, invariants): entities define schema, DTOs
  define contracts; MySQL uniqueness handled via nullable keys.
- Before vs after: no coupon schema/DTOs -> shared types + entities + docs.
- Impact (performance, maintainability, risk, debt): clearer future work,
  minimal runtime risk at this stage.
- Learnings and concepts (links to ADR or concept cards):
  - docs/learning/002-coupon-data-model.md

## Artifacts created
- Prompt file: prompts/007-stage2-contracts-data-model.md
- Concept card: docs/learning/002-coupon-data-model.md
