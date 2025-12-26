# Prompt: OpenAPI + Swagger + frontend client

## Context
- User requested Swagger/OpenAPI for APIs and frontend consumption via a client.

## Objective
Expose Swagger/OpenAPI in the API, add DTO annotations for core endpoints, and
create a centralized frontend API client for consumption.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Add ADR and decision log for the new dependency.
- Leave a prompt artifact in prompts/.

## Stage A - Plan
- What (observable result): Swagger UI + OpenAPI JSON + frontend API client.
- Why (motivation + constraint): improve discoverability and align client calls.
- How (steps + modules): add Swagger setup, DTO annotations, client file, docs.
- Expected result (checklist):
  - Swagger UI at `/docs`, JSON at `/docs-json`.
  - Health and assignment endpoints documented.
  - Frontend uses `apps/web/lib/api.ts`.
  - ADR + learning doc added.
- Scope and impact (risk, compatibility): new dependency, no behavior change.
- Trade-offs (chosen vs discarded): Swagger vs no-contract docs.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - apps/api/src/main.ts
  - apps/api/src/coupons/dto/assign-coupon-codes.dto.ts
  - apps/api/src/coupons/coupon-assignments.controller.ts
  - apps/api/src/health/dto/health-response.dto.ts
  - apps/api/src/health/health.controller.ts
  - apps/api/package.json
  - apps/web/lib/api.ts
  - apps/web/pages/index.tsx
  - packages/shared/src/health.ts
  - packages/shared/src/index.ts
  - .env.example
  - apps/api/.env.example
  - docs/contracts.md
  - docs/environment-standards.md
  - README.md
  - docs/adr/004-openapi-swagger.md
  - docs/decision-log.md
  - docs/learning/008-openapi-swagger.md
  - prompts/014-openapi-swagger-client.md
- Changes by block and rationale:
  - Swagger setup + DTO annotations define the OpenAPI contract.
  - Frontend client centralizes API access.
  - Docs record dependency and usage.
- Observability signals (logs/metrics) if applicable: n/a.

## Stage C - Validation
- Tests and commands: `node scripts/agent-finalize.js`.
- Manual checks: open `/docs` with API running.
- Not validated and why: Swagger UI requires running API.

## Stage D - Pedagogical close
- Decision summary (what changed and why): Swagger/OpenAPI exposed and client centralized.
- How it works now (mental model, invariants): controllers annotate DTOs; UI serves docs.
- Before vs after: no API docs -> Swagger/OpenAPI + client.
- Impact (performance, maintainability, risk, debt): better discoverability; minimal runtime cost.
- Learnings and concepts (links to ADR or concept cards):
  - docs/adr/004-openapi-swagger.md
  - docs/learning/008-openapi-swagger.md

## Artifacts created
- Prompt file: prompts/014-openapi-swagger-client.md
