# Prompt: Rule duplication and drift - implement changes 4-5

## Context
- The user requested implementation of changes 4-5 from the rule duplication
  and drift analysis focused on testing and historical docs.

## Objective
Add explicit coverage-rule change guidance in the Test Matrix and clarify
testing ownership in the historical documentation improvements doc.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Documentation-only changes.

## Stage A - Plan
- What (observable result): test-matrix explains how to change coverage rules,
  and documentation-improvements distinguishes coverage vs execution docs.
- Why (motivation + constraint): reduce rule drift and clarify ownership.
- How (steps + modules): update docs/test-matrix.md and
  docs/documentation-improvements.md.
- Expected result (checklist):
  - Test matrix includes coverage rule change guidance.
  - Documentation improvements clarifies testing ownership split.
- Scope and impact (risk, compatibility): documentation-only; no runtime impact.
- Trade-offs (chosen vs discarded): small wording edits vs a larger doc rewrite.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/test-matrix.md
  - docs/documentation-improvements.md
  - prompts/035-rule-duplication-drift-implement-4-5.md
- Changes by block and rationale:
  - Added coverage rule change guidance to keep ownership centralized.
  - Split testing coverage vs execution ownership in historical doc to avoid
    duplication.
- Observability signals (logs/metrics) if applicable: not applicable.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: documentation-only.

## Stage D - Pedagogical close
- Decision summary (what changed and why): clarified rule change process and
  testing doc ownership to reduce drift.
- How it works now (mental model, invariants): coverage rules change in the
  matrix, execution guidance stays in testing docs.
- Before vs after: ambiguous ownership -> explicit separation.
- Impact (performance, maintainability, risk, debt): improves doc clarity and
  reduces drift risk.
- Learnings and concepts (links to ADR or concept cards):
  - docs/test-matrix.md

## Artifacts created
- Prompt file: prompts/035-rule-duplication-drift-implement-4-5.md
