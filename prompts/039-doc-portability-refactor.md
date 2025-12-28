# Prompt: Portability refactor for learning docs

## Context
- The user requested refactoring to group or unite docs that are unportable,
  recursive, or repetitive.
- Focused on learning cards and related references.

## Objective
Consolidate domain- and stack-specific learning cards into grouped docs, add
portability grouping in the learning README, and keep links consistent.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Documentation-only changes.

## Stage A - Plan
- What (observable result): domain coupon concepts live in one doc, OpenAPI
  concepts live in one doc, old files redirect, and learning README groups
  docs by portability.
- Why (motivation + constraint): reduce repetition and improve portability.
- How (steps + modules): add consolidated docs, replace old docs with redirects,
  update README and ADR link.
- Expected result (checklist):
  - Consolidated coupon patterns doc exists.
  - Consolidated OpenAPI doc exists.
  - Old learning docs redirect to new locations.
  - Learning README groups docs by portability.
  - ADR link updated.
- Scope and impact (risk, compatibility): documentation-only; link updates.
- Trade-offs (chosen vs discarded): focused consolidation vs broad doc rewrite.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/learning/domain/coupon-patterns.md
  - docs/learning/stack/openapi-contract-and-client.md
  - docs/learning/001-idempotent-redemption-locking.md
  - docs/learning/002-coupon-data-model.md
  - docs/learning/003-assignment-counter-locking.md
  - docs/learning/008-openapi-swagger.md
  - docs/learning/009-openapi-fetch-client.md
  - docs/learning/README.md
  - docs/adr/001-hybrid-locking-idempotency.md
  - prompts/039-doc-portability-refactor.md
- Changes by block and rationale:
  - Consolidated coupon-specific learning cards into a single domain doc.
  - Consolidated OpenAPI learning cards into one stack-specific doc.
  - Replaced old docs with redirect stubs to avoid duplication.
  - Grouped learning docs by portability in README.
  - Updated ADR link to the new consolidated doc.
- Observability signals (logs/metrics) if applicable: not applicable.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: documentation-only.

## Stage D - Pedagogical close
- Decision summary (what changed and why): grouped domain/stack learning docs
  to reduce repetition and improve portability.
- How it works now (mental model, invariants): domain-specific content is
  centralized; stack-specific OpenAPI guidance is unified; old files redirect.
- Before vs after: scattered cards -> consolidated docs with portability grouping.
- Impact (performance, maintainability, risk, debt): improves clarity and reduces
  doc drift; no runtime impact.
- Learnings and concepts (links to ADR or concept cards):
  - docs/learning/domain/coupon-patterns.md

## Quiz tracking
- Quiz ids used in the response: none.
- Last quiz ids used: 1, 2, 3.

## Artifacts created
- Prompt file: prompts/039-doc-portability-refactor.md
