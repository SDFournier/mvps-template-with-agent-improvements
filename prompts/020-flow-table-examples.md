# Prompt: Flow table examples and counter table explanation

## Context
- The flow doc explains assignment and redemption.
- The user asked what the counter table contains and requested row examples.

## Objective
Add a quick view of involved tables and before/after row examples to the
flow doc.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep changes documentation-only.

## Stage A - Plan
- What (observable result): table overview + row examples in the flow doc.
- Why (motivation + constraint): clarify how counters and code rows change.
- How (steps + modules): update the flow doc with table lists and examples.
- Expected result (checklist):
  - Counter table fields listed.
  - Coupon code and redemption tables listed.
  - Before/after row examples added.
- Scope and impact (risk, compatibility): documentation-only.
- Trade-offs (chosen vs discarded): inline examples vs separate appendix.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/flows/coupon-assignment-redemption.md
  - prompts/020-flow-table-examples.md
- Changes by block and rationale:
  - Added table quick view to explain the counter row contents.
  - Added before/after row examples for assignment and redemption.
- Observability signals (logs/metrics) if applicable: not applicable.

## Stage C - Validation
- Tests and commands: `node scripts/agent-finalize.js`.
- Manual checks: none.
- Not validated and why: no runtime behavior.

## Stage D - Pedagogical close
- Decision summary (what changed and why): clarified tables and row changes.
- How it works now (mental model, invariants): examples make state changes
  visible step-by-step.
- Before vs after: no row examples -> explicit before/after state.
- Impact (performance, maintainability, risk, debt): documentation clarity only.
- Learnings and concepts (links to ADR or concept cards):
  - docs/flows/coupon-assignment-redemption.md

## Artifacts created
- Prompt file: prompts/020-flow-table-examples.md
