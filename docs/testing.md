# Testing strategy (unit, smoke, e2e, contract)

## Purpose
Testing enforces the documented decisions and prevents regressions. Each new
feature should add or update tests that validate the intended behavior.

## Use when
- You need how to run tests or apply the Test Matrix.
- You are deciding which test types to add.

## Canonical rule ownership
Do not define rules here. Required coverage and process gates live in:
- docs/test-matrix.md
- docs/change-checklist.md
This doc is for how to run tests and apply those rules.

## Test types and when to use them
- Unit tests: validate services, guards, and pure helpers.
- Smoke tests: compile modules to catch wiring errors at runtime.
- E2E API tests: validate full HTTP flows against the real app.
- Contract checks: assert response shapes and shared DTO expectations.
- Cross-project contract: web API client paths must match API controllers.

## Apply the matrix
- Use docs/test-matrix.md for required coverage per playbook.
- Use docs/change-checklist.md for process gates.
- Use AGENTS for mandatory execution rules.

## Stage manual validation
- Each stage must include a concrete manual test path for the programmer.
- Document steps in the relevant flow doc or runbook with inputs, outputs,
  and expected log signals.
- Use LOG_DETAIL_LEVEL 2 or 3 to inspect step logs and explanations.
- Manual validation complements automated tests; it does not replace them.

## How to run
- Run the full suite with `pnpm agent:finalize`.
- If PowerShell blocks pnpm scripts, run `pnpm.cmd install` and then
  `node scripts/agent-finalize.js`.
- To include DB-backed integration tests, ensure MySQL is running and set
  `RUN_DB_TESTS=1` before running the suite.

## Notes
- E2E API tests run with an in-memory SQL engine and a mocked cache client.
- Keep tests deterministic and avoid relying on external services beyond infra.
- When queues are introduced, add contract and consumer tests for events.
