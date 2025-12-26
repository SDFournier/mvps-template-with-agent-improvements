# DB-backed integration tests

## Definition
Integration tests that connect to the real MySQL instance to validate database
transactions and constraints.

## When to use it
- You need confidence in transaction semantics (locks, constraints).
- Unit tests do not cover DB behavior.

## Common mistakes
- Running DB tests by default in CI without infra.
- Not cleaning tables between tests.
- Assuming migrations ran without verifying.

## Example in this stack
- Tests guard on `RUN_DB_TESTS=1`.
- The test ensures the database exists, runs migrations, and truncates tables.

## Observability
- Log DB connection errors and migration failures.
- Track test runtime separately from unit tests.

## Links
- docs/testing.md
- docs/test-matrix.md
