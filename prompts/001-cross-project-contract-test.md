# Prompt 001 - Cross-project contract test

## Context
We need a cross-project test that validates the web client only calls API routes
that exist in the backend.

## Objective
Add a cross-project contract test and wire it into the workspace test run.

## Constraints
- No new runtime dependencies.
- Must run with the existing test runner flow.

## Stage A - Plan
- What (observable result): A test that fails if web paths do not exist in API.
- Why (motivation + constraint): Catch contract drift without new deps.
- How (steps + modules): add a script, add a workspace package to run it,
  update testing docs.
- Expected result (checklist):
  - Script detects API routes and web paths.
  - Test runs via pnpm -r test.
  - Docs mention the cross-project contract test.
- Scope and impact (risk, compatibility): Read-only static check; no runtime impact.
- Trade-offs (chosen vs discarded): Static parsing instead of runtime HTTP tests.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - scripts/cross-project-contract-test.js
  - packages/cross-tests/package.json
  - docs/test-matrix.md
  - docs/testing.md
- Changes by block and rationale:
  - Script parses controller decorators and web paths to validate mapping.
  - New workspace package runs the script in pnpm -r test.
  - Docs updated to include the contract gate.
- Observability signals (logs/metrics) if applicable:
  - Script prints route counts and missing paths.

## Stage C - Validation
- Tests and commands:
  - node scripts/agent-finalize.js
- Manual checks:
  - None.
- Not validated and why:
  - Runtime HTTP integration not covered by this static check.

## Stage D - Pedagogical close
- Decision summary (what changed and why): Added a static contract test to keep
  web and API routes aligned without adding dependencies.
- How it works now (mental model, invariants): Web paths must match a controller
  route; missing routes fail the test.
- Before vs after: Before, drift was possible; now it is detected in tests.
- Impact (performance, maintainability, risk, debt): Low runtime cost, higher
  maintainability, low risk.
- Learnings and concepts (links to ADR or concept cards): None added.

## Artifacts created
- Prompt file: prompts/001-cross-project-contract-test.md
- ADR: none
- Concept card: none
- Flow doc: none
- Runbook: none
