# Prompt: Stage 3 assignment flow confirmation

## Context
- User requested Stage 3 (assignment flow) implementation.
- The assignment flow already exists in the repo.

## Objective
Confirm Stage 3 implementation, run the test suite (including DB tests), and
leave a prompt artifact for traceability.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.

## Stage A - Plan
- What (observable result): confirmation of Stage 3 implementation + tests run.
- Why (motivation + constraint): ensure per-user limits under concurrency are
  implemented and validated.
- How (steps + modules): verify assignment controller/service/module and run tests.
- Expected result (checklist):
  - Assignment endpoint exists.
  - Counter-row locking is used.
  - rand_key pivot selection is present.
  - Tests executed.
- Scope and impact (risk, compatibility): no runtime changes.
- Trade-offs (chosen vs discarded): n/a (confirmation only).
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - prompts/012-stage3-confirmation.md
- Changes by block and rationale:
  - Documented Stage 3 confirmation and validation.
- Observability signals (logs/metrics) if applicable: n/a.

## Stage C - Validation
- Tests and commands: `RUN_DB_TESTS=1 node scripts/agent-finalize.js`.
- Manual checks: n/a.
- Not validated and why: n/a.

## Stage D - Pedagogical close
- Decision summary (what changed and why): no code changes; validated Stage 3.
- How it works now (mental model, invariants): counter row locks guard per-user
  caps; rand_key pivot avoids full-table random scans.
- Before vs after: assignment flow already present; confirmed with tests.
- Impact (performance, maintainability, risk, debt): reinforced confidence only.
- Learnings and concepts (links to ADR or concept cards):
  - docs/learning/003-assignment-counter-locking.md

## Artifacts created
- Prompt file: prompts/012-stage3-confirmation.md
