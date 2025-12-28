# Prompt: Portability analysis (architecture, flows, learning cards)

## Context
- The user requested an analysis of portability: which docs are generic vs
  domain-specific and how well they scale to other projects.

## Objective
Assess portability across docs/architecture.md, docs/flows/*, and learning
cards without making content changes.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Analysis-only response; no documentation edits.

## Stage A - Plan
- What (observable result): a categorized portability analysis with notes on
  generic vs stack-specific vs domain-specific scope and scalability.
- Why (motivation + constraint): improve reuse across projects while avoiding
  domain coupling in shared docs.
- How (steps + modules): review architecture, flows, and learning cards and
  categorize portability.
- Expected result (checklist):
  - Portability classification per doc group.
  - Notes on scaling risks and reuse boundaries.
- Scope and impact (risk, compatibility): analysis-only.
- Trade-offs (chosen vs discarded): analysis instead of refactoring docs.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - prompts/038-portability-analysis.md
- Changes by block and rationale:
  - Created prompt artifact to record analysis scope.
- Observability signals (logs/metrics) if applicable: not applicable.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: analysis-only change.

## Stage D - Pedagogical close
- Decision summary (what changed and why): recorded analysis scope and artifacts.
- How it works now (mental model, invariants): no doc changes, only analysis.
- Before vs after: no behavioral change.
- Impact (performance, maintainability, risk, debt): none.
- Learnings and concepts (links to ADR or concept cards):
  - docs/architecture.md

## Quiz tracking
- Quiz ids used in the response: none (analysis only).
- Last quiz ids used: 1, 2, 3.

## Artifacts created
- Prompt file: prompts/038-portability-analysis.md
