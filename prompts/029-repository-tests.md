# Prompt: Repository DB tests for layered data access

## Context
- Layered data access was introduced for coupon flows.
- Next steps called for repository coverage to validate persistence behavior.

## Objective
Add DB-backed tests for coupon repositories to validate transactions and
unique constraint handling.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep tests aligned with existing DB test setup.

## Stage A - Plan
- What (observable result): repository DB tests cover counter locks and redemption inserts.
- Why (motivation + constraint): verify data-layer behavior independently of services.
- How (steps + modules): add new db tests in coupons module.
- Expected result (checklist):
  - Counter row creation/update test passes.
  - Idempotency and success-key duplicate handling tests pass.
- Scope and impact (risk, compatibility): test-only changes.
- Trade-offs (chosen vs discarded): DB tests vs pure mocks.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - apps/api/src/coupons/coupon-assignments.repository.db.test.ts
  - apps/api/src/coupons/coupon-redemptions.repository.db.test.ts
  - prompts/029-repository-tests.md
- Changes by block and rationale:
  - Added DB tests for repository transaction and unique constraint behavior.
- Observability signals (logs/metrics) if applicable: test output only.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: DB tests gated by RUN_DB_TESTS.

## Stage D - Pedagogical close
- Decision summary (what changed and why): repository DB tests added to validate layering.
- How it works now (mental model, invariants): repository behavior verified independent of services.
- Before vs after: service-only DB tests -> service + repository coverage.
- Impact (performance, maintainability, risk, debt): extra tests improve confidence.
- Learnings and concepts (links to ADR or concept cards):
  - docs/learning/012-layered-data-access.md

## Artifacts created
- Prompt file: prompts/029-repository-tests.md
