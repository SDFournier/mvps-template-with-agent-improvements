# Prompt: Wayfinding headers and canonical refs

## Context
- The user requested implementation of wayfinding changes 4 and 5.
- These include canonical refs and standardized Purpose/Use when headers.

## Objective
Add Purpose/Use when headers to canonical docs and add canonical refs to
architecture and good practices.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep changes documentation-only.

## Stage A - Plan
- What (observable result): canonical docs include Purpose/Use when; architecture and good practices include canonical refs.
- Why (motivation + constraint): reduce entrypoint ambiguity and improve agent navigation.
- How (steps + modules): update canonical docs with headers and reference sections.
- Expected result (checklist):
  - Purpose/Use when added to canonical docs.
  - Canonical refs added to docs/architecture.md and docs/good-practices.md.
- Scope and impact (risk, compatibility): documentation-only.
- Trade-offs (chosen vs discarded): small header additions vs a larger doc refactor.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/00-overview.md
  - docs/architecture.md
  - docs/good-practices.md
  - docs/change-checklist.md
  - docs/feature-playbooks.md
  - docs/contracts.md
  - docs/testing.md
  - docs/test-matrix.md
  - docs/decision-log.md
  - docs/flows/README.md
  - docs/environment-standards.md
  - docs/adr/README.md
  - prompts/033-wayfinding-doc-headers.md
- Changes by block and rationale:
  - Added Purpose/Use when headers for quick entrypoint clarity.
  - Added canonical refs where agents commonly start.
- Observability signals (logs/metrics) if applicable: not applicable.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: documentation-only.

## Stage D - Pedagogical close
- Decision summary (what changed and why): standardized entrypoint headers for canonical docs.
- How it works now (mental model, invariants): docs declare purpose and correct usage.
- Before vs after: implicit entrypoints -> explicit headers.
- Impact (performance, maintainability, risk, debt): doc clarity only.
- Learnings and concepts (links to ADR or concept cards):
  - docs/00-overview.md

## Artifacts created
- Prompt file: prompts/033-wayfinding-doc-headers.md
