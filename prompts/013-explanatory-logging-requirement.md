# Prompt: Explanatory logging requirement

## Context
- User requested multi-level logs to understand validation, business logic, and persistence.
- Logs must support three levels and be configurable at startup.

## Objective
Introduce LOG_DETAIL_LEVEL and add explanatory logs to the assignment flow,
plus document the requirement in canonical docs.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Avoid logging sensitive data.

## Stage A - Plan
- What (observable result): configurable logging levels + documented requirement.
- Why (motivation + constraint): enable learning/debugging without code changes.
- How (steps + modules): add logger utility, instrument assignment flow,
  update docs/ADR/decision log.
- Expected result (checklist):
  - LOG_DETAIL_LEVEL wired in API config.
  - Step/explanation logs in assignment flow.
  - Docs updated with logging requirements.
- Scope and impact (risk, compatibility): logging only; no behavior changes.
- Trade-offs (chosen vs discarded): narrative logs vs always-on verbose logs.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - apps/api/src/common/explain-logger.ts
  - apps/api/src/coupons/coupon-assignments.controller.ts
  - apps/api/src/coupons/coupon-assignments.service.ts
  - apps/api/src/app.module.ts
  - .env.example
  - apps/api/.env.example
  - docs/good-practices.md
  - docs/feature-playbooks.md
  - docs/environment-standards.md
  - docs/adr/003-explanatory-logging-levels.md
  - docs/decision-log.md
  - docs/learning/007-explanatory-logging-levels.md
  - README.md
  - prompts/013-explanatory-logging-requirement.md
- Changes by block and rationale:
  - ExplainLogger provides step/explain logs.
  - Assignment flow instrumented for learning.
  - Docs define logging levels as a requirement.
- Observability signals (logs/metrics) if applicable: logging levels.

## Stage C - Validation
- Tests and commands: `node scripts/agent-finalize.js`.
- Manual checks: run API with LOG_DETAIL_LEVEL set.
- Not validated and why: n/a.

## Stage D - Pedagogical close
- Decision summary (what changed and why): multi-level explanatory logging added.
- How it works now (mental model, invariants): level 1/2/3 logs driven by env.
- Before vs after: no learning logs -> configurable explanation logs.
- Impact (performance, maintainability, risk, debt): clearer flows; more logs to manage.
- Learnings and concepts (links to ADR or concept cards):
  - docs/adr/003-explanatory-logging-levels.md
  - docs/learning/007-explanatory-logging-levels.md

## Artifacts created
- Prompt file: prompts/013-explanatory-logging-requirement.md
