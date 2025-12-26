# Prompt: OpenAPI fetch client

## Context
- User asked to implement openapi-fetch for frontend API consumption.

## Objective
Add openapi-fetch to the web app, wire a typed client, and document the
generation flow for OpenAPI types.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Add ADR/decision log for the new dependency.
- Leave a prompt artifact in prompts/.

## Stage A - Plan
- What (observable result): openapi-fetch client + type generation script.
- Why (motivation + constraint): typed client reduces drift and centralizes calls.
- How (steps + modules): add dependencies, api-types file, update client.
- Expected result (checklist):
  - openapi-fetch in web dependencies.
  - `api:types` script available.
  - Client uses openapi-fetch with typed paths.
  - Docs updated with usage and ADR.
- Scope and impact (risk, compatibility): frontend client refactor only.
- Trade-offs (chosen vs discarded): openapi-fetch vs full SDK generator.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - apps/web/lib/api-types.ts
  - apps/web/lib/api.ts
  - apps/web/package.json
  - docs/contracts.md
  - docs/learning/008-openapi-swagger.md
  - docs/adr/005-openapi-fetch-client.md
  - docs/decision-log.md
  - docs/learning/009-openapi-fetch-client.md
  - README.md
  - prompts/015-openapi-fetch-client.md
- Changes by block and rationale:
  - openapi-fetch client centralizes calls with OpenAPI types.
  - openapi-typescript script regenerates types from `/docs-json`.
  - Docs updated to enforce client usage.
- Observability signals (logs/metrics) if applicable: n/a.

## Stage C - Validation
- Tests and commands: `node scripts/agent-finalize.js`.
- Manual checks: `pnpm --filter @repo/web api:types` when API is running.
- Not validated and why: type generation needs live `/docs-json`.

## Stage D - Pedagogical close
- Decision summary (what changed and why): added openapi-fetch client and type generation.
- How it works now (mental model, invariants): API calls go through typed client.
- Before vs after: fetch wrapper -> openapi-fetch with paths types.
- Impact (performance, maintainability, risk, debt): improved type safety, small tooling step.
- Learnings and concepts (links to ADR or concept cards):
  - docs/adr/005-openapi-fetch-client.md
  - docs/learning/009-openapi-fetch-client.md

## Artifacts created
- Prompt file: prompts/015-openapi-fetch-client.md
