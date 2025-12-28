# Layered data access (repository/adapters)

Date: 2025-12-27
Status: accepted

## Context
Services mixed business rules with persistence details (transactions, locks,
SQL hints, Redis operations). This makes the code harder to test and to adapt
when the storage technology changes. We need clearer separation of concerns
without overengineering simple MVP endpoints.

## Decision
Introduce a data access layer in the API:
- Services own business rules and orchestration.
- Repositories/adapters encapsulate DB/Redis specifics, including transactions,
  row locks, and unique constraint handling.
- Controllers remain HTTP boundaries only.

## Alternatives
- Keep all persistence logic inside services for speed.
- Add a full repository + unit of work framework for every module.
- Use a different ORM abstraction layer.

## Consequences
- More files per domain module (service + repository).
- Clearer boundaries for tests: unit tests for services, integration tests for
  repositories.
- Easier migration if MySQL/Redis details change.

## Links
- docs/decision-log.md
