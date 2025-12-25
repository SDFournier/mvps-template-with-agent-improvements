# Prompt 002 - Framework skeleton template

## Context
The repo should become a framework skeleton with no feature implementations.

## Objective
Remove feature modules and tests while keeping the minimal app bootstrap and
health check, and keep documentation and learning protocols.

## Constraints
- Keep health endpoint and app init.
- Keep docs and protocol infrastructure.
- No feature implementations or tests.

## Stage A - Plan
- What (observable result): feature modules removed, tests removed, minimal
  health-only runtime remains.
- Why (motivation + constraint): template should be clean and doc-driven.
- How (steps + modules): delete feature modules, update AppModule, remove web
  feature pages, strip shared DTOs, make cross-project test tolerant to no routes.
- Expected result (checklist):
  - app module compiles with health only.
  - web has only index page.
  - no feature tests remain.
  - shared DTOs removed.
  - cross-project test passes without feature routes.
- Scope and impact (risk, compatibility): removes feature functionality.
- Trade-offs (chosen vs discarded): keep health for baseline verification.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - apps/api/src/app.module.ts
  - apps/api/src/health/health.service.ts
  - apps/web/pages/index.tsx
  - packages/shared/src/index.ts
  - scripts/cross-project-contract-test.js
  - prompts/002-framework-skeleton.md
- Changes by block and rationale:
  - Removed feature modules and entities from AppModule.
  - Health DTO removed from shared; type kept local.
  - Web index stripped to a simple health view.
  - Cross-project test allows empty route sets.
- Observability signals (logs/metrics) if applicable:
  - Cross-project test prints skip message when no routes exist.

## Stage C - Validation
- Tests and commands:
  - node scripts/agent-finalize.js
- Manual checks:
  - None.
- Not validated and why:
  - Feature flows removed by design.

## Stage D - Pedagogical close
- Decision summary (what changed and why): removed feature implementations to
  make a framework skeleton, keeping only health and docs.
- How it works now (mental model, invariants): only health endpoint is active;
  docs and protocols define how to add new features.
- Before vs after: before had feature modules and tests; after is skeleton.
- Impact (performance, maintainability, risk, debt): less runtime surface, higher
  doc focus, loss of feature examples.
- Learnings and concepts (links to ADR or concept cards): none added.

## Artifacts created
- Prompt file: prompts/002-framework-skeleton.md
- ADR: none
- Concept card: none
- Flow doc: none
- Runbook: none
