# Prompt: Local validation helper for coupon assignments

## Context
- The user asked to encapsulate assignment validation logic.

## Objective
Extract the validation block into a local helper for readability.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep logic unchanged.

## Stage A - Plan
- What (observable result): controller uses a helper for validation.
- Why (motivation + constraint): improve readability without moving logic out of the file.
- How (steps + modules): add a private helper in the controller.
- Expected result (checklist):
  - Validation flow preserved.
  - Controller reads cleaner.
- Scope and impact (risk, compatibility): no behavior change.
- Trade-offs (chosen vs discarded): local helper vs shared module.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - apps/api/src/coupons/coupon-assignments.controller.ts
  - prompts/025-local-validation-helper.md
- Changes by block and rationale:
  - Wrapped validation block in a private method to keep endpoint logic concise.
- Observability signals (logs/metrics) if applicable: unchanged logging.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: behavior unchanged.

## Stage D - Pedagogical close
- Decision summary (what changed and why): validation moved into local helper.
- How it works now (mental model, invariants): helper validates params and quantity, then returns normalized values.
- Before vs after: inline block -> private helper.
- Impact (performance, maintainability, risk, debt): readability only.
- Learnings and concepts (links to ADR or concept cards):
  - apps/api/src/coupons/coupon-assignments.controller.ts

## Artifacts created
- Prompt file: prompts/025-local-validation-helper.md
