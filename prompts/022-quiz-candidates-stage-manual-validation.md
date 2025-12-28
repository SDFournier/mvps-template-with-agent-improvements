# Prompt: Quiz candidates and stage manual validation rule

## Context
- The repo tracks pedagogy and flow docs for each stage.
- The user requested that questions and incorrect assumptions feed quiz generation.
- The user wants every stage to have a concrete manual validation path using logs.

## Objective
Document the quiz-candidate rule and the stage manual validation expectation.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep changes documentation-only.

## Stage A - Plan
- What (observable result): docs mention quiz candidates and stage manual validation.
- Why (motivation + constraint): turn questions into quizzes and make stages manually testable.
- How (steps + modules): update good practices, quiz cadence, testing rules, and the flow doc.
- Expected result (checklist):
  - Quiz rule references user questions and incorrect assumptions.
  - Manual validation rule references logs and stage checkpoints.
  - Flow doc includes a concrete manual validation path.
- Scope and impact (risk, compatibility): documentation-only.
- Trade-offs (chosen vs discarded): update existing docs vs adding a new policy doc.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/good-practices.md
  - docs/learning/010-pedagogical-quiz-cadence.md
  - docs/testing.md
  - docs/flows/coupon-assignment-redemption.md
  - prompts/022-quiz-candidates-stage-manual-validation.md
- Changes by block and rationale:
  - Added quiz-candidate rule to good practices and quiz cadence.
  - Added stage manual validation requirement to testing rules.
  - Added manual validation checklist to the coupon flow.
- Observability signals (logs/metrics) if applicable: references LOG_DETAIL_LEVEL 2/3 in docs.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: documentation-only.

## Stage D - Pedagogical close
- Decision summary (what changed and why): formalized quiz candidates and manual validation rules.
- How it works now (mental model, invariants): every stage leaves a manual path with log checkpoints.
- Before vs after: implicit pedagogy rules -> explicit quiz sources and validation steps.
- Impact (performance, maintainability, risk, debt): documentation clarity only.
- Learnings and concepts (links to ADR or concept cards):
  - docs/learning/010-pedagogical-quiz-cadence.md
  - docs/testing.md
  - docs/flows/coupon-assignment-redemption.md

## Artifacts created
- Prompt file: prompts/022-quiz-candidates-stage-manual-validation.md
