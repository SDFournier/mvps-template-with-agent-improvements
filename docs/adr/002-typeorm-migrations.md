# ADR: Use TypeORM migrations for schema changes

Date: 2025-12-25
Status: proposed

## Context
The API currently uses TypeORM with `synchronize: true`. This is convenient for
local development but hides schema changes and is risky to keep long term. The
coupon system now has multiple tables and indexes that should be versioned.

## Decision
Adopt TypeORM migrations as the source of truth for schema changes.
- Disable `synchronize`.
- Run migrations automatically on startup with `migrationsRun: true`.
- Provide a manual migration runner for local workflows.

## Alternatives
- Keep `synchronize: true` only: faster for MVPs but no schema history.
- Use external migration tooling: more control but higher setup overhead.

## Consequences
- Developers must add migrations for schema changes.
- Startup runs migrations; errors surface early in dev.

## Links
- Decision log entry: docs/decision-log.md
