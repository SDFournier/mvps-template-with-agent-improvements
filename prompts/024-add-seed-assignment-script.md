# Prompt: Add seed:assignment script

## Context
- The user wants a single-command reset for coupon assignment seeds.

## Objective
Expose the seed script via pnpm in the API package.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep changes minimal.

## Stage A - Plan
- What (observable result): `pnpm --filter @repo/api seed:assignment` runs the seed script.
- Why (motivation + constraint): make manual testing resets consistent and fast.
- How (steps + modules): add a script entry to apps/api/package.json.
- Expected result (checklist):
  - Script wired to apps/api/scripts/seed-coupon-assignment.js.
  - Command works with pnpm filter usage.
- Scope and impact (risk, compatibility): dev-only script change.
- Trade-offs (chosen vs discarded): package script vs global script.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - apps/api/package.json
  - prompts/024-add-seed-assignment-script.md
- Changes by block and rationale:
  - Added seed:assignment script to expose the seed runner.
- Observability signals (logs/metrics) if applicable: seed script logs ids.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: not run.
- Not validated and why: doc-only wiring change.

## Stage D - Pedagogical close
- Decision summary (what changed and why): added a script shortcut for seeding.
- How it works now (mental model, invariants): pnpm filter routes to the API script.
- Before vs after: node invocation -> pnpm script.
- Impact (performance, maintainability, risk, debt): no runtime impact.
- Learnings and concepts (links to ADR or concept cards):
  - apps/api/scripts/seed-coupon-assignment.js

## Artifacts created
- Prompt file: prompts/024-add-seed-assignment-script.md
