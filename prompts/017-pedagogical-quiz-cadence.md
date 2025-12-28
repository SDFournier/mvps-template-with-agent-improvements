# Prompt: Pedagogical quiz cadence documentation

## Context
- The repo already includes learning cards and a recap command.
- The user wants a recurring, advanced quiz mechanism tied to recent prompts.

## Objective
Document a quiz cadence: every four prompts, generate advanced quizzes,
provide feedback, and consolidate questions in a shared quiz bank.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep changes documentation-only.

## Stage A - Plan
- What (observable result): quiz cadence documented with a quiz bank.
- Why (motivation + constraint): improve learning retention with structured
  follow-ups; avoid ad-hoc or inconsistent pedagogy.
- How (steps + modules): add learning card, add quiz bank doc, update
  learning README and good practices.
- Expected result (checklist):
  - Quiz cadence documented as a concept.
  - Central quiz bank exists with advanced examples.
  - Good practices reference the cadence.
- Scope and impact (risk, compatibility): documentation-only; no runtime change.
- Trade-offs (chosen vs discarded): centralized quiz bank vs scattered prompts.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/good-practices.md
  - docs/learning/010-pedagogical-quiz-cadence.md
  - docs/learning/quiz-bank.md
  - docs/learning/README.md
  - prompts/017-pedagogical-quiz-cadence.md
- Changes by block and rationale:
  - Added cadence requirement to good practices.
  - Added a concept card to define quiz cadence.
  - Added a quiz bank with structured, advanced examples.
  - Updated learning README to reference the quiz bank.
- Observability signals (logs/metrics) if applicable: quiz bank updated
  every four prompts.

## Stage C - Validation
- Tests and commands: not applicable (docs-only change).
- Manual checks: none.
- Not validated and why: no runtime behavior to validate.

## Stage D - Pedagogical close
- Decision summary (what changed and why): documented a repeatable quiz
  cadence to improve concept retention.
- How it works now (mental model, invariants): every four prompts,
  questions are generated and consolidated in a shared quiz bank.
- Before vs after: ad-hoc quizzes -> structured cadence + bank.
- Impact (performance, maintainability, risk, debt): improved learning
  consistency; low maintenance overhead.
- Learnings and concepts (links to ADR or concept cards):
  - docs/learning/010-pedagogical-quiz-cadence.md

## Artifacts created
- Prompt file: prompts/017-pedagogical-quiz-cadence.md
