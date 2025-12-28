# Prompt: Quiz rotation and actionability updates

## Context
- The user requested a no-repeat rule for quiz delivery and a tracking note in
  the prompts log.
- They also requested actionability improvements for decision-time usage in
  feature-playbooks.md and change-checklist.md.

## Objective
Prevent consecutive quiz repeats, add lightweight tracking guidance, and make
playbooks and checklists more actionable at decision time.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Documentation-only changes.

## Stage A - Plan
- What (observable result): quiz cadence docs and bank include no-repeat rule,
  prompts log notes quiz id tracking, and playbooks/checklist include decision
  checkpoints for actionable planning.
- Why (motivation + constraint): reduce quiz repetition and improve decision
  readiness before coding.
- How (steps + modules): update docs/learning/010-pedagogical-quiz-cadence.md,
  docs/learning/quiz-bank.md, prompts/README.md, docs/change-checklist.md, and
  docs/feature-playbooks.md.
- Expected result (checklist):
  - Quiz cadence and bank mention no consecutive repeats.
  - Prompts log mentions quiz id tracking.
  - Change checklist includes a decision snapshot requirement.
  - Feature playbooks include decision checkpoints.
- Scope and impact (risk, compatibility): documentation-only; no runtime impact.
- Trade-offs (chosen vs discarded): small, targeted edits vs a full doc rewrite.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/learning/010-pedagogical-quiz-cadence.md
  - docs/learning/quiz-bank.md
  - prompts/README.md
  - docs/change-checklist.md
  - docs/feature-playbooks.md
  - prompts/036-quiz-rotation-and-actionability.md
- Changes by block and rationale:
  - Added no-repeat rule and observability note to quiz cadence.
  - Added rotation rule to quiz bank.
  - Added quiz id tracking note to prompts log.
  - Added decision snapshot requirement to change checklist.
  - Added decision-time checklist and per-playbook decision checkpoints.
- Observability signals (logs/metrics) if applicable: not applicable.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: documentation-only.

## Quiz tracking
- Quiz ids used in the response: 1, 2, 3.

## Stage D - Pedagogical close
- Decision summary (what changed and why): added quiz rotation guardrails and
  made playbooks/checklist more actionable at decision time.
- How it works now (mental model, invariants): quiz prompts rotate without
  consecutive repeats; decision checkpoints are captured before coding.
- Before vs after: implicit planning -> explicit decision-time checkpoints.
- Impact (performance, maintainability, risk, debt): improves doc clarity and
  reduces repetition risk.
- Learnings and concepts (links to ADR or concept cards):
  - docs/feature-playbooks.md

## Artifacts created
- Prompt file: prompts/036-quiz-rotation-and-actionability.md
