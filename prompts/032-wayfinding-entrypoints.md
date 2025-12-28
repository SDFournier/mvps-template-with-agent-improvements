# Prompt: Wayfinding entrypoints (start here, doc map, historical banners)

## Context
- The user asked to implement wayfinding improvements (items 1-3).

## Objective
Add a Start Here block, a doc map, and historical doc banners to reduce
wayfinding confusion.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep changes documentation-only.

## Stage A - Plan
- What (observable result): overview has a Start Here block and doc map; historical docs include a banner.
- Why (motivation + constraint): reduce first-answer time and avoid historical docs as sources of truth.
- How (steps + modules): update docs/00-overview.md and historical docs.
- Expected result (checklist):
  - Start Here block added.
  - Doc map added with use/avoid guidance.
  - Historical docs labeled as context only.
- Scope and impact (risk, compatibility): documentation-only.
- Trade-offs (chosen vs discarded): central index vs repeating guidance elsewhere.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/00-overview.md
  - docs/iteration-1.md
  - docs/iteration-2.md
  - docs/documentation-improvements.md
  - prompts/032-wayfinding-entrypoints.md
- Changes by block and rationale:
  - Added Start Here and doc map to the overview.
  - Added historical banners to legacy docs.
- Observability signals (logs/metrics) if applicable: not applicable.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: documentation-only.

## Stage D - Pedagogical close
- Decision summary (what changed and why): wayfinding shortcuts added to reduce confusion.
- How it works now (mental model, invariants): overview is the entry point, historical docs are read-only context.
- Before vs after: scattered entrypoints -> explicit navigation.
- Impact (performance, maintainability, risk, debt): doc clarity only.
- Learnings and concepts (links to ADR or concept cards):
  - docs/00-overview.md

## Artifacts created
- Prompt file: prompts/032-wayfinding-entrypoints.md
