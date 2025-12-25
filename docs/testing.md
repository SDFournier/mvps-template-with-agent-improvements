# Testing strategy (unit, smoke, e2e, contract)

## Purpose
Testing enforces the documented decisions and prevents regressions. Each new
feature should add or update tests that validate the intended behavior.

## Test types and when to use them
- Unit tests: validate services, guards, and pure helpers.
- Smoke tests: compile modules to catch wiring errors at runtime.
- E2E API tests: validate full HTTP flows against the real app.
- Contract checks: assert response shapes and shared DTO expectations.
- Cross-project contract: web API client paths must match API controllers.

## Validation rules
- Follow the Test Matrix for required coverage per playbook.
- Use the Change Checklist for process gates.
- Use AGENTS for mandatory execution rules.

## How to run
- Run the full suite with `pnpm agent:finalize`.
- If PowerShell blocks pnpm scripts, run `node scripts/agent-finalize.js`.

## Notes
- E2E API tests run with an in-memory SQL engine and a mocked cache client.
- Keep tests deterministic and avoid relying on external services beyond infra.
- When queues are introduced, add contract and consumer tests for events.
