# Prompt: DB-backed integration tests

## Context
- User requested DB-backed integration tests.
- Repo currently runs unit tests only.

## Objective
Add an integration test that uses a real MySQL connection for the assignment
flow, and document how to enable DB tests.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep unit tests free of external dependencies by default.

## Stage A - Plan
- What (observable result): DB integration test + docs updated.
- Why (motivation + constraint): validate DB transactions without breaking
  default unit test runs.
- How (steps + modules): add guarded test file; update testing docs and matrix.
- Expected result (checklist):
  - Integration test runs with `RUN_DB_TESTS=1`.
  - Docs describe how to run DB tests.
  - Concept card added for DB-backed tests.
- Scope and impact (risk, compatibility): adds optional test coverage only.
- Trade-offs (chosen vs discarded): guarded tests vs always-on DB tests.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - apps/api/src/coupons/coupon-assignments.db.test.ts
  - docs/testing.md
  - docs/test-matrix.md
  - docs/learning/005-db-integration-tests.md
  - prompts/010-db-integration-tests.md
- Changes by block and rationale:
  - DB test validates assignment behavior with real MySQL.
  - Docs explain how to enable DB tests.
- Observability signals (logs/metrics) if applicable: n/a.

## Stage C - Validation
- Tests and commands: `node scripts/agent-finalize.js` (default).
- Manual checks: `RUN_DB_TESTS=1 node scripts/agent-finalize.js` if DB is running.
- Not validated and why: DB-backed tests require local MySQL.

## Stage D - Pedagogical close
- Decision summary (what changed and why): added optional DB integration tests.
- How it works now (mental model, invariants): DB tests run only when enabled.
- Before vs after: no DB tests -> guarded DB integration coverage.
- Impact (performance, maintainability, risk, debt): more confidence with minimal
  default test overhead.
- Learnings and concepts (links to ADR or concept cards):
  - docs/learning/005-db-integration-tests.md

## Artifacts created
- Prompt file: prompts/010-db-integration-tests.md
