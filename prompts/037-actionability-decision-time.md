# Prompt: Actionability for decision-time steps

## Context
- The user asked for actionability analysis and implementation for
  docs/feature-playbooks.md and docs/change-checklist.md.
- They provided quiz answers and requested improvements to decision-time steps.

## Objective
Make decision-time steps more actionable by adding a definition of ready,
a decision snapshot template, and explicit decision checkpoints in playbooks.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Documentation-only changes.

## Stage A - Plan
- What (observable result): change checklist includes a definition of ready
  and decision snapshot template; playbooks include decision-time artifacts and
  manual validation checkpoints; duplicate checklists are removed.
- Why (motivation + constraint): improve decision-time clarity and reduce
  ambiguity before coding.
- How (steps + modules): update docs/change-checklist.md and
  docs/feature-playbooks.md with actionable decision-time guidance.
- Expected result (checklist):
  - Decision-time gate and template present in change checklist.
  - Playbooks include decision-time artifacts and manual validation checkpoints.
  - Duplicate decision-time checklist removed.
- Scope and impact (risk, compatibility): documentation-only; no runtime impact.
- Trade-offs (chosen vs discarded): focused edits vs full doc rewrite.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/change-checklist.md
  - docs/feature-playbooks.md
  - prompts/037-actionability-decision-time.md
- Changes by block and rationale:
  - Added definition-of-ready gate and decision snapshot template to make
    decision-time requirements concrete.
  - Added decision-time artifacts and manual validation checkpoints to each
    playbook to improve actionability.
  - Removed duplicate decision-time checklist to avoid confusion.
- Observability signals (logs/metrics) if applicable: not applicable.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: documentation-only.

## Stage D - Pedagogical close
- Decision summary (what changed and why): clarified decision-time artifacts
  and checkpoints so playbooks and checklist are actionable before coding.
- How it works now (mental model, invariants): change checklist defines ready
  state; playbooks call out specific decisions and validation entrypoints.
- Before vs after: ambiguous planning -> explicit decision-time checklist.
- Impact (performance, maintainability, risk, debt): improves doc clarity and
  reduces drift in decision-making.
- Learnings and concepts (links to ADR or concept cards):
  - docs/feature-playbooks.md

## Quiz tracking
- Quiz ids used in the response: none (feedback only).
- Last quiz ids used: 1, 2, 3.

## Artifacts created
- Prompt file: prompts/037-actionability-decision-time.md
