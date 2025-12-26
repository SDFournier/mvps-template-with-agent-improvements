# Prompt: Stage 3 assignment flow implementation

## Context
- Stage 3 implements coupon assignment (counter locking + random selection).
- Stage 2 provided shared DTOs and entities.

## Objective
Add the API module, controller, and service to assign coupon codes safely with
MySQL transactions and `SKIP LOCKED` selection.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- New behavior requires a documentation update.
- Leave a prompt artifact in prompts/.

## Stage A - Plan
- What (observable result): assignment endpoint implemented and documented.
- Why (motivation + constraint): enforce per-user caps safely under concurrency.
- How (steps + modules): add coupons module, service, controller; update docs.
- Expected result (checklist):
  - `POST /v1/coupon-books/:couponBookId/assignments` returns assigned codes.
  - Counter row locking prevents cap races.
  - `rand_key` pivot selection uses `SKIP LOCKED`.
  - Concept card added for counter locking.
- Scope and impact (risk, compatibility): adds new API behavior; no UI changes.
- Trade-offs (chosen vs discarded): DB transaction vs optimistic counting.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - apps/api/src/coupons/coupon-assignments.controller.ts
  - apps/api/src/coupons/coupon-assignments.service.ts
  - apps/api/src/coupons/coupons.module.ts
  - apps/api/src/app.module.ts
  - docs/learning/003-assignment-counter-locking.md
  - prompts/008-stage3-assignment-flow.md
- Changes by block and rationale:
  - Service enforces transactional locking and selection.
  - Controller validates input and delegates to service.
  - Module wiring to expose endpoint.
  - Concept card documents the locking pattern.
- Observability signals (logs/metrics) if applicable: n/a.

## Stage C - Validation
- Tests and commands: `node scripts/agent-finalize.js`.
- Manual checks: n/a.
- Not validated and why: n/a.

## Stage D - Pedagogical close
- Decision summary (what changed and why): implemented assignment flow with
  per-user cap enforcement.
- How it works now (mental model, invariants): counter row lock + pivot query.
- Before vs after: no assignment endpoint -> transactional assignment endpoint.
- Impact (performance, maintainability, risk, debt): scalable assignment path;
  introduces transactional dependency on MySQL locks.
- Learnings and concepts (links to ADR or concept cards):
  - docs/learning/003-assignment-counter-locking.md

## Artifacts created
- Prompt file: prompts/008-stage3-assignment-flow.md
