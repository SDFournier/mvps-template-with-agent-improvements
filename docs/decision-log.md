# Decision log

This document explains why key architectural choices were made.
It is the source of truth for recurring decisions and trade-offs.

## ADR workflow
- New architectural decisions should be captured as ADRs.
- This log summarizes those ADRs and links to them.

## ADR index
- (add entries here)

## Sessions vs JWT
Decision:
- Use server-side sessions for MVP authentication.

Why:
- Simpler to implement and revoke.
- Easier to evolve without breaking client contracts.
- Reduces token leakage risk in early stages.

Trade-offs:
- Requires storage and cleanup of sessions.
- Not stateless; scaling requires shared session store.

When to revisit:
- When multiple services need stateless auth.
- When scaling demands token-based auth.

## SQL.js for API e2e tests
Decision:
- Use an in-memory SQL engine for API e2e tests.

Why:
- Tests run without external infrastructure.
- Faster feedback loops in CI and local runs.

Trade-offs:
- SQL.js is not identical to MySQL.
- Some SQL differences may not be caught.

When to revisit:
- If MySQL-specific behaviors become critical.
- When full parity is required in CI.

## Cache strategy
Decision:
- Cache list queries in the service layer with TTL and invalidation.

Why:
- Standardized place to add caching without duplicating in controllers.
- Invalidation on writes avoids stale data issues.

Trade-offs:
- Requires a clear invalidation strategy.
- Cache key design must remain stable.

When to revisit:
- If caching needs to be applied at repository level.
- If distributed cache metrics become necessary.

## Upload storage
Decision:
- Store uploads on local disk with metadata in the database.

Why:
- Simplest MVP approach.
- Clear separation between file content and metadata.

Trade-offs:
- Not suitable for multi-instance deployments without shared storage.

When to revisit:
- When moving to object storage (S3, GCS, etc.).

## Role model
Decision:
- Use a small, fixed role set (user, admin).

Why:
- Keeps authorization simple and auditable.
- Prevents premature complexity.

Trade-offs:
- Limited granularity for complex permissions.

When to revisit:
- When more fine-grained permissions are needed.

## Queues and async events
Decision:
- Not adopted by default; introduce only when async processing is required.

Why:
- Avoids complexity until there is a clear need.
- Keeps MVP scope smaller and easier to iterate.

Trade-offs:
- Some workflows remain synchronous.

When to revisit:
- When long-running tasks or integrations require async processing.
