# Prompt: Layered data access separation

## Context
- The user asked to respect separation of concerns and document it.
- Coupon services mixed business rules with DB/Redis details.

## Objective
Move persistence details into repositories/adapters, document the layering,
and keep services focused on business rules.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Update ADR + decision log for architectural change.

## Stage A - Plan
- What (observable result): services orchestrate flows; repositories encapsulate DB/Redis.
- Why (motivation + constraint): reduce infra coupling while keeping MVP velocity.
- How (steps + modules): add repositories + lock service, refactor services, update docs.
- Expected result (checklist):
  - Repositories handle transactions and queries.
  - Services only apply business rules and orchestration.
  - ADR + decision log updated.
- Scope and impact (risk, compatibility): internal API refactor; behavior preserved.
- Trade-offs (chosen vs discarded): repository layer vs direct DB calls in services.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - apps/api/src/coupons/coupon-assignments.repository.ts
  - apps/api/src/coupons/coupon-redemptions.repository.ts
  - apps/api/src/coupons/coupon-code-lock.service.ts
  - apps/api/src/coupons/coupon-assignments.service.ts
  - apps/api/src/coupons/coupon-redemptions.service.ts
  - apps/api/src/coupons/coupons.module.ts
  - apps/api/src/coupons/coupon-assignments.db.test.ts
  - apps/api/src/coupons/coupon-redemptions.db.test.ts
  - docs/architecture.md
  - docs/good-practices.md
  - docs/adr/007-layered-data-access.md
  - docs/decision-log.md
  - docs/learning/012-layered-data-access.md
  - prompts/028-layered-data-access.md
- Changes by block and rationale:
  - Added repositories/adapters to isolate persistence logic.
  - Refactored services to focus on business rules.
  - Documented the layering decision and concept.
- Observability signals (logs/metrics) if applicable: repository query logs at LOG_DETAIL_LEVEL 2.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: refactor preserves behavior.

## Stage D - Pedagogical close
- Decision summary (what changed and why): layered data access to enforce separation of concerns.
- How it works now (mental model, invariants): services orchestrate, repositories persist.
- Before vs after: services with DB/Redis specifics -> repositories for persistence.
- Impact (performance, maintainability, risk, debt): small wiring cost, clearer boundaries.
- Learnings and concepts (links to ADR or concept cards):
  - docs/adr/007-layered-data-access.md
  - docs/learning/012-layered-data-access.md

## Artifacts created
- Prompt file: prompts/028-layered-data-access.md
