# Prompt: Annotated flow diagram with commentary

## Context
- The flow doc documents assignment + redemption.
- The user requested diagrams with commentary at each step.

## Objective
Add an annotated diagram and step commentary to make the flow easier to
learn and discuss.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep changes documentation-only.

## Stage A - Plan
- What (observable result): annotated diagram + step commentary in the flow doc.
- Why (motivation + constraint): improve pedagogical clarity and traceability.
- How (steps + modules): update the flow diagram and add a numbered legend.
- Expected result (checklist):
  - Diagram labels steps with numbers.
  - Commentary explains each step.
- Scope and impact (risk, compatibility): documentation-only.
- Trade-offs (chosen vs discarded): inline annotations vs separate diagram.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/flows/coupon-assignment-redemption.md
  - prompts/018-annotated-flow-diagram.md
- Changes by block and rationale:
  - Added step numbers to the Mermaid diagram.
  - Added a step commentary section to explain each action.
- Observability signals (logs/metrics) if applicable: not applicable.

## Stage C - Validation
- Tests and commands: `node scripts/agent-finalize.js`.
- Manual checks: none.
- Not validated and why: no runtime behavior.

## Stage D - Pedagogical close
- Decision summary (what changed and why): added annotations to clarify the flow.
- How it works now (mental model, invariants): a numbered map ties diagram to
  the textual steps.
- Before vs after: unannotated diagram -> numbered diagram with commentary.
- Impact (performance, maintainability, risk, debt): improved learning clarity;
  no runtime impact.
- Learnings and concepts (links to ADR or concept cards):
  - docs/flows/coupon-assignment-redemption.md

## Artifacts created
- Prompt file: prompts/018-annotated-flow-diagram.md
