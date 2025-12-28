# Prompt: Rule duplication and drift - implement changes 1-3

## Context
- The user requested implementation of changes 1-3 from the rule duplication
  and drift analysis (testing.md, test-matrix.md, historical docs).

## Objective
Make test-matrix the single source of coverage rules, keep testing.md focused
on execution/apply guidance, and add canonical refs only footers to historical
docs.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Documentation-only changes.

## Stage A - Plan
- What (observable result): testing.md links to rule sources only, test-matrix
  is explicit about canonical coverage, and historical docs include canonical
  refs only footers.
- Why (motivation + constraint): reduce duplicated rules and prevent drift.
- How (steps + modules): update docs/testing.md, docs/test-matrix.md, and
  historical docs with explicit ownership wording.
- Expected result (checklist):
  - testing.md references rule sources without redefining them.
  - test-matrix.md states it is the canonical coverage source.
  - historical docs include "Canonical refs only" footers.
- Scope and impact (risk, compatibility): documentation-only; no runtime impact.
- Trade-offs (chosen vs discarded): minimal wording edits vs a larger doc
  restructuring.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/testing.md
  - docs/test-matrix.md
  - docs/iteration-1.md
  - docs/iteration-2.md
  - docs/documentation-improvements.md
  - prompts/034-rule-duplication-drift-implement-1-3.md
- Changes by block and rationale:
  - Clarified rule ownership and added "do not define rules here" banner in
    testing.md to avoid duplication.
  - Added canonical coverage note in test-matrix.md to declare source of truth.
  - Added "Canonical refs only" footers to historical docs to prevent drift.
- Observability signals (logs/metrics) if applicable: not applicable.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: documentation-only.

## Stage D - Pedagogical close
- Decision summary (what changed and why): centralized coverage rules and
  reduced duplication risk in docs.
- How it works now (mental model, invariants): required coverage lives in
  test-matrix; testing.md explains execution only; historical docs are context.
- Before vs after: duplicated rule hints -> explicit canonical ownership.
- Impact (performance, maintainability, risk, debt): improves doc clarity and
  reduces drift risk.
- Learnings and concepts (links to ADR or concept cards):
  - docs/test-matrix.md

## Artifacts created
- Prompt file: prompts/034-rule-duplication-drift-implement-1-3.md
