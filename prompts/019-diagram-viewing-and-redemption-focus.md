# Prompt: Diagram viewing guidance and redemption focus diagram

## Context
- The flow diagram was annotated.
- The user requested a deeper redemption diagram and guidance on how to view it.

## Objective
Add a redemption-focused diagram with rationale and document how to view
Mermaid diagrams in the docs.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep changes documentation-only.

## Stage A - Plan
- What (observable result): new redemption diagram + viewing guidance.
- Why (motivation + constraint): improve pedagogical clarity and usability.
- How (steps + modules): update flow doc and flows README.
- Expected result (checklist):
  - Redemption-only diagram exists with commentary.
  - Flow README explains how to render Mermaid diagrams.
- Scope and impact (risk, compatibility): documentation-only.
- Trade-offs (chosen vs discarded): add to existing docs vs separate guide.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/flows/coupon-assignment-redemption.md
  - docs/flows/README.md
  - prompts/019-diagram-viewing-and-redemption-focus.md
- Changes by block and rationale:
  - Added a redemption-only diagram and rationale section.
  - Added viewing instructions for Mermaid diagrams.
- Observability signals (logs/metrics) if applicable: not applicable.

## Stage C - Validation
- Tests and commands: `node scripts/agent-finalize.js`.
- Manual checks: none.
- Not validated and why: no runtime behavior.

## Stage D - Pedagogical close
- Decision summary (what changed and why): expanded diagram clarity and
  documented how to visualize it.
- How it works now (mental model, invariants): redemption flow is mapped
  step-by-step with explicit rationale.
- Before vs after: single flow diagram -> added redemption focus + guidance.
- Impact (performance, maintainability, risk, debt): learning clarity only.
- Learnings and concepts (links to ADR or concept cards):
  - docs/flows/coupon-assignment-redemption.md

## Artifacts created
- Prompt file: prompts/019-diagram-viewing-and-redemption-focus.md
