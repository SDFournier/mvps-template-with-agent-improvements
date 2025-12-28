# Prompt: Seed data and manual trigger guidance

## Context
- The user wants seeds executed and manual test steps via the prompt.
- They do not want additional manual validation sections added to docs.

## Objective
Create a repeatable seed script and run it, then provide manual trigger
steps for assignment and redemption with explanations.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Avoid adding new manual validation content to docs.

## Stage A - Plan
- What (observable result): seed script available and attempted, manual steps provided.
- Why (motivation + constraint): enable hands-on testing without doc edits.
- How (steps + modules): add a seed script and run it against local DB.
- Expected result (checklist):
  - Script inserts a coupon book and available codes.
  - Manual API steps reference seeded ids and expected logs.
  - Execution errors documented if infra is missing.
- Scope and impact (risk, compatibility): local dev data only.
- Trade-offs (chosen vs discarded): script + prompt steps vs flow doc updates.
- Questions (only if blocking or decision changing): infra availability to run seeds.

## Stage B - Implementation
- Files touched or created:
  - apps/api/scripts/seed-coupon-assignment.js
  - docs/friction-log.md
  - prompts/023-manual-seed-and-testing.md
- Changes by block and rationale:
  - Added a mysql2-based seed script to create deterministic data.
  - Logged infra/tooling friction in the friction log.
- Observability signals (logs/metrics) if applicable: seed script logs ids.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: seed script run via `node apps/api/scripts/seed-coupon-assignment.js`.
- Not validated and why: DB unavailable if infra is not running.

## Stage D - Pedagogical close
- Decision summary (what changed and why): seed script added to enable manual testing.
- How it works now (mental model, invariants): consistent ids enable repeatable flows.
- Before vs after: ad-hoc seeding -> scripted, repeatable setup.
- Impact (performance, maintainability, risk, debt): dev-only support script.
- Learnings and concepts (links to ADR or concept cards):
  - apps/api/scripts/seed-coupon-assignment.js
  - docs/friction-log.md

## Artifacts created
- Prompt file: prompts/023-manual-seed-and-testing.md
