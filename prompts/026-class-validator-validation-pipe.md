# Prompt: Class-validator adoption and controller cleanup

## Context
- DTO types were not enforcing runtime validation.
- The user asked to adopt class-validator and remove manual validation helpers.

## Objective
Enable DTO-based runtime validation across coupon APIs and clean up controller
validation blocks.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Update ADR + decision log for architectural changes.

## Stage A - Plan
- What (observable result): ValidationPipe enforces DTO decorators; controllers are slimmer.
- Why (motivation + constraint): centralize runtime validation and reduce duplication.
- How (steps + modules): add deps, add decorators, add param DTOs, add ValidationPipe, remove manual validation helpers.
- Expected result (checklist):
  - DTOs include validation decorators.
  - Global ValidationPipe maps errors to error contract.
  - Manual validation helpers removed.
  - ADR + decision log updated.
- Scope and impact (risk, compatibility): runtime validation behavior change.
- Trade-offs (chosen vs discarded): DTO decorators vs custom controller validation.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - apps/api/package.json
  - apps/api/src/main.ts
  - apps/api/src/coupons/dto/*.ts
  - apps/api/src/coupons/coupon-assignments.controller.ts
  - apps/api/src/coupons/coupon-redemptions.controller.ts
  - apps/api/src/common/validation.ts (removed)
  - docs/adr/006-class-validator-validation-pipe.md
  - docs/decision-log.md
  - docs/learning/011-request-validation-pipe.md
  - prompts/026-class-validator-validation-pipe.md
- Changes by block and rationale:
  - Added class-validator decorators for runtime enforcement.
  - Added ValidationPipe with error mapping to keep the contract stable.
  - Removed manual validation helper functions.
- Observability signals (logs/metrics) if applicable: validation errors return consistent error payloads.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: validation behavior change not exercised manually.

## Stage D - Pedagogical close
- Decision summary (what changed and why): DTO validation moved into class-validator + ValidationPipe.
- How it works now (mental model, invariants): requests are validated before controllers execute; errors map to contract.
- Before vs after: inline validation blocks -> centralized pipe + decorators.
- Impact (performance, maintainability, risk, debt): small overhead, cleaner controllers, stricter inputs.
- Learnings and concepts (links to ADR or concept cards):
  - docs/adr/006-class-validator-validation-pipe.md
  - docs/learning/011-request-validation-pipe.md

## Artifacts created
- Prompt file: prompts/026-class-validator-validation-pipe.md
