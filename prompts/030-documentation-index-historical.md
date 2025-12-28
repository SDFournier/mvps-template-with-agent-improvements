# Prompt: Documentation index and historical references

## Context
- The user wants historical docs clearly marked and referenced to reduce repetition.

## Objective
Add a documentation index and mark historical docs with references to it.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep changes documentation-only.

## Stage A - Plan
- What (observable result): docs index lists canonical/historical/templates; historical docs reference it.
- Why (motivation + constraint): reduce duplication and clarify sources of truth.
- How (steps + modules): update overview and add references in historical docs.
- Expected result (checklist):
  - Documentation index added to docs/00-overview.md.
  - Historical docs point to the index.
  - Good practices references the overview index.
- Scope and impact (risk, compatibility): documentation-only.
- Trade-offs (chosen vs discarded): central index vs repeating rules.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/00-overview.md
  - docs/iteration-1.md
  - docs/iteration-2.md
  - docs/documentation-improvements.md
  - docs/good-practices.md
  - prompts/030-documentation-index-historical.md
- Changes by block and rationale:
  - Added a documentation index and cross-referenced historical docs.
- Observability signals (logs/metrics) if applicable: not applicable.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: documentation-only.

## Stage D - Pedagogical close
- Decision summary (what changed and why): centralized the doc map to reduce repetition.
- How it works now (mental model, invariants): overview is the entry point; historical docs remain read-only.
- Before vs after: scattered historical notes -> explicit index and references.
- Impact (performance, maintainability, risk, debt): doc clarity only.
- Learnings and concepts (links to ADR or concept cards):
  - docs/00-overview.md

## Artifacts created
- Prompt file: prompts/030-documentation-index-historical.md
