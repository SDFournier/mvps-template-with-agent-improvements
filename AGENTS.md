# AGENTS

## Purpose
This repo is a base for MVPs. Keep changes fast, predictable, and aligned with the
monorepo structure so prompts can map features to the right place.

## Prompt protocol (mandatory)
Every prompt is a unit of engineering + a unit of learning. Use this flow:

Stage A - Plan
- What: observable result.
- Why: motivation + main constraint.
- How: steps and modules affected.
- Expected result: verifiable checklist.
- Scope and impact: risk, compatibility, migration.
- Trade-offs: chosen vs discarded options.
- Questions: only if they block or change the decision.

Stage B - Implementation
- Concrete changes: files touched or created.
- Justification per block.
- Minimal observability signals (logs/metrics) when applicable.

Stage C - Validation
- What was validated (tests, scripts, queries, manual flows).
- Reproducible evidence (exact commands).
- What was not validated and why.

Stage D - Pedagogical close
- Decision summary: what changed and why.
- How it works now (mental model, invariants).
- Before vs after result.
- Impact: performance, maintainability, risk, debt.
- Learnings and concepts (link ADR or concept cards).

## Output format (mandatory)
Always include these sections in responses:
- Summary: what, why, how, expected result.
- Decisions: chosen vs discarded, trade-offs, impact.
- Validation: commands run, manual checks, gaps.
- Pedagogy: concepts, ADRs, what to know to understand it, and code references
  (file paths or short snippets) that explain how the change works.

Compliance gate: if any required section is missing or incomplete, the response
is not done and must be revised before considering the task complete.

## Prompt artifacts (mandatory)
Each prompt must leave a versioned artifact in `prompts/`.
If the prompt changes behavior, update at least one doc:
- ADR for architectural decisions.
- Concept card for new or non-obvious concepts.
- Flow doc if a flow changes.
- Runbook if operational risk is introduced.

## Pedagogy triggers (mandatory)
Create or update docs if any of the following happens:
- New pattern (idempotency, outbox, sagas, caching, retries).
- New important dependency.
- Data model change or migration.
- API contract change.
- Error flow change.
- Any trade-off that is not obvious.
- "I did this because..." explanations.

## Question policy
- If you can proceed safely, state assumptions and move on.
- If a decision changes architecture, contract, or data model, ask.
- If the question is minor (naming, small detail), decide and justify.

## Setup and run (one-liners)
- Infra (WSL/Linux): `./docker/infra-up.sh`
- Infra (Windows): `docker\\infra-up.cmd`
- Install: `corepack enable` then `pnpm install`
- Run: `pnpm dev`
- Tests: `pnpm agent:finalize` (or `node scripts/agent-finalize.js`)

## Mandatory validation
- Every change must align with the Good Practices document in this repo.
- After each prompt, run `pnpm agent:finalize` and fix failing tests.
- If pnpm is blocked by PowerShell policy, run `node scripts/agent-finalize.js`.

## Architecture quick map
- Web: screens and UI state, data access via hooks/helpers.
- API: domain modules with controller + service + entity.
- Shared: DTOs and contracts used by web and API.
- Data: MySQL source of truth, Redis cache.
- Cross cutting: auth sessions, error format, logging, caching, uploads.

## Guardrails (do not break)
- Workspace boundaries and package layout are fixed.
- Shared alias configuration must stay consistent.
- The dev entrypoint must keep starting both front and back together.
- Auto-generated Next.js typing artifacts should not be edited manually.
- Infra definitions (compose + scripts) should remain compatible with the local ports.
- Architectural changes require an ADR and a decision log update.

## Where to put things
- Backend features: domain modules with controller + service + entity/DTO.
- Register backend modules in the root application module.
- Shared DTOs and contracts: shared package consumed by front and back.
- Frontend pages: screen-level UI with logic extracted to hooks/helpers.

## Feature recipe (API + Web)
1) Define or update shared DTOs.
2) Implement backend module with controller + service + entity.
3) Register the module in the root backend module.
4) Expose endpoints and consume them via the frontend API client.

## Definition of done (agents)
- Plan, implementation, validation, and pedagogical close completed.
- Response follows the mandatory output format with all required sections.
- Updated docs for new patterns, constraints, or contracts.
- Tests executed and failures fixed.
- Frictions or ambiguities logged.

## Documentation map
- Overview and architecture: docs/00-overview.md, docs/architecture.md
- Standards: docs/good-practices.md, docs/change-checklist.md
- Features and contracts: docs/feature-playbooks.md, docs/contracts.md
- Tests: docs/test-matrix.md, docs/testing.md
- Decisions: docs/decision-log.md and docs/adr/
- Friction: docs/friction-log.md

## Env defaults (local)
- MySQL: `localhost:3307` (db `coupons`)
- Redis: `localhost:6378`
- API base: `http://localhost:3001`
- CORS: `CORS_ORIGIN=http://localhost:3000`
