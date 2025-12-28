# Prompt: Assignment timeline box with lock release note

## Context
- The flow doc explains assignment + redemption.
- The user requested a timeline box to clarify ordering and lock release.

## Objective
Add an assignment timeline section that shows lock order and when locks
release.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep changes documentation-only.

## Stage A - Plan
- What (observable result): timeline steps in the flow doc.
- Why (motivation + constraint): clarify when the counter is updated and
  when locks end.
- How (steps + modules): add a numbered timeline block.
- Expected result (checklist):
  - Timeline lists transaction start, validation, assignment, counter update.
  - Timeline states commit releases DB locks.
- Scope and impact (risk, compatibility): documentation-only.
- Trade-offs (chosen vs discarded): inline timeline vs separate appendix.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/flows/coupon-assignment-redemption.md
  - prompts/021-flow-timeline-box.md
- Changes by block and rationale:
  - Added an assignment timeline with lock ordering and commit note.
- Observability signals (logs/metrics) if applicable: not applicable.

## Stage C - Validation
- Tests and commands: `node scripts/agent-finalize.js`.
- Manual checks: none.
- Not validated and why: no runtime behavior.

## Stage D - Pedagogical close
- Decision summary (what changed and why): timeline clarifies ordering and
  lock release.
- How it works now (mental model, invariants): the counter update and lock
  release are explicit in the flow.
- Before vs after: implicit ordering -> explicit timeline.
- Impact (performance, maintainability, risk, debt): documentation clarity only.
- Learnings and concepts (links to ADR or concept cards):
  - docs/flows/coupon-assignment-redemption.md

## Artifacts created
- Prompt file: prompts/021-flow-timeline-box.md
