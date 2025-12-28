# Prompt: Quiz rules update and documentation summary

## Context
- The user reinforced quiz rules: every prompt can seed a quiz, and every four prompts require three questions from the quiz bank.
- They requested a summary of doc groupings, purpose, and anti-duplication guidance.

## Objective
Update quiz rules in docs and expand the quiz bank with new formats and
questions, then provide a doc grouping summary in the response.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep changes documentation-only.

## Stage A - Plan
- What (observable result): quiz rules updated, quiz bank expanded, doc grouping summary delivered.
- Why (motivation + constraint): enforce quiz cadence and reduce doc repetition.
- How (steps + modules): update quiz cadence, good practices, quiz bank.
- Expected result (checklist):
  - Quiz cadence includes three-question rule and non-MCQ formats.
  - Quiz bank includes new entries from recent prompts.
  - Summary of doc groupings is provided to the user.
- Scope and impact (risk, compatibility): documentation-only.
- Trade-offs (chosen vs discarded): update existing docs vs creating new policy doc.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - docs/good-practices.md
  - docs/learning/010-pedagogical-quiz-cadence.md
  - docs/learning/quiz-bank.md
  - prompts/031-quiz-rules-and-doc-summary.md
- Changes by block and rationale:
  - Added explicit three-question rule and quiz format guidance.
  - Added quiz entries tied to recent decisions.
- Observability signals (logs/metrics) if applicable: not applicable.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`.
- Manual checks: none.
- Not validated and why: documentation-only.

## Stage D - Pedagogical close
- Decision summary (what changed and why): quiz rules formalized; quiz bank expanded.
- How it works now (mental model, invariants): every four prompts ask three questions sourced from quiz bank.
- Before vs after: implicit cadence -> explicit rule with formats.
- Impact (performance, maintainability, risk, debt): documentation clarity only.
- Learnings and concepts (links to ADR or concept cards):
  - docs/learning/010-pedagogical-quiz-cadence.md
  - docs/learning/quiz-bank.md

## Artifacts created
- Prompt file: prompts/031-quiz-rules-and-doc-summary.md
