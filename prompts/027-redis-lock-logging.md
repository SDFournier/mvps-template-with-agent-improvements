# Prompt: Redis lock logging and validation guidance

## Context
- The user asked about DB-specific logic in services and requested more
  low-level Redis logging details.

## Objective
Add explanatory Redis lock logs that respect LOG_DETAIL_LEVEL and clarify
validation placement.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep logging changes low risk.

## Stage A - Plan
- What (observable result): redemption logs include Redis TTL and unlock strategy details.
- Why (motivation + constraint): expose how locks work without leaking tokens.
- How (steps + modules): add step/explain logs around Redis lock and unlock calls.
- Expected result (checklist):
  - Lock acquisition logs key + ttl.
  - Explain logs describe NX/EX and safe unlock script.
  - Log change documented in explanatory logging concept.
- Scope and impact (risk, compatibility): logging-only behavior change.
- Trade-offs (chosen vs discarded): keep logs in service vs a separate logger helper.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - apps/api/src/coupons/coupon-redemptions.service.ts
  - docs/learning/007-explanatory-logging-levels.md
  - prompts/027-redis-lock-logging.md
- Changes by block and rationale:
  - Added log steps for Redis lock acquisition and release.
  - Added explain logs describing TTL and unlock safety.
- Observability signals (logs/metrics) if applicable: LOG_DETAIL_LEVEL 2/3.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: logging-only change.

## Stage D - Pedagogical close
- Decision summary (what changed and why): added Redis lock detail logs at step/explain levels.
- How it works now (mental model, invariants): logs show NX/EX lock and token-checked unlock.
- Before vs after: generic lock log -> detailed TTL and unlock strategy logs.
- Impact (performance, maintainability, risk, debt): minimal overhead, improved clarity.
- Learnings and concepts (links to ADR or concept cards):
  - docs/learning/007-explanatory-logging-levels.md
  - apps/api/src/coupons/coupon-redemptions.service.ts

## Artifacts created
- Prompt file: prompts/027-redis-lock-logging.md
