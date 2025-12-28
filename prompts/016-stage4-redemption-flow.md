# Prompt: Stage 4 redemption flow implementation

## Context
- Stage 4 adds lock + redeem endpoints with Redis + MySQL idempotency.
- Assignment flow and shared DTOs already exist.

## Objective
Implement the redemption flow (lock + redeem), enforce idempotency and per-user
limits, and add DB integration tests.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Avoid logging sensitive tokens in explanatory logs.

## Stage A - Plan
- What (observable result): redemption endpoints + lock handling + tests.
- Why (motivation + constraint): prevent double redemption under concurrency.
- How (steps + modules): add controller/service/DTOs, wire Redis, add tests.
- Expected result (checklist):
  - Lock endpoint uses Redis NX + DB row lock.
  - Redeem endpoint inserts idempotent redemption.
  - Code state transitions are correct.
  - DB tests cover redemption flow.
- Scope and impact (risk, compatibility): new API behavior and Redis dependency.
- Trade-offs (chosen vs discarded): hybrid locking vs DB-only or Redis-only.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - apps/api/src/coupons/coupon-redemptions.service.ts
  - apps/api/src/coupons/coupon-redemptions.controller.ts
  - apps/api/src/coupons/dto/lock-coupon-code.dto.ts
  - apps/api/src/coupons/dto/redeem-coupon-code.dto.ts
  - apps/api/src/coupons/coupons.module.ts
  - packages/shared/src/coupons.ts
  - apps/web/lib/api-types.ts
  - apps/web/lib/api.ts
  - apps/api/src/coupons/coupon-redemptions.db.test.ts
  - prompts/016-stage4-redemption-flow.md
- Changes by block and rationale:
  - Service enforces lock and idempotent redemption.
  - Controller validates inputs and exposes endpoints.
  - DTOs document Swagger/OpenAPI shapes.
  - Tests validate redemption flow with real DB.
- Observability signals (logs/metrics) if applicable: uses ExplainLogger.

## Stage C - Validation
- Tests and commands: `node scripts/agent-finalize.js`.
- Manual checks: `RUN_DB_TESTS=1 node scripts/agent-finalize.js` for DB flow.
- Not validated and why: Redis lock path needs Redis running.

## Stage D - Pedagogical close
- Decision summary (what changed and why): added redemption flow with locks.
- How it works now (mental model, invariants): Redis prevents concurrency;
  MySQL transaction + unique keys enforce correctness.
- Before vs after: no redeem endpoints -> lock + redeem endpoints.
- Impact (performance, maintainability, risk, debt): safe concurrency, more moving parts.
- Learnings and concepts (links to ADR or concept cards):
  - docs/learning/001-idempotent-redemption-locking.md

## Artifacts created
- Prompt file: prompts/016-stage4-redemption-flow.md
