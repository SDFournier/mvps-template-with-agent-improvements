# Decision log

This document explains why key architectural choices were made.
It is the source of truth for recurring decisions and trade-offs.

## Purpose
Summarize architectural decisions and link to ADRs.

## Use when
- You need a quick rationale for an architectural choice.
- You are deciding whether to create a new ADR.

## ADR workflow
- New architectural decisions should be captured as ADRs.
- This log summarizes those ADRs and links to them.

## ADR index
- 001-hybrid-locking-idempotency.md (proposed)
- 002-typeorm-migrations.md (proposed)
- 003-explanatory-logging-levels.md (proposed)
- 004-openapi-swagger.md (proposed)
- 005-openapi-fetch-client.md (proposed)
- 006-class-validator-validation-pipe.md (accepted)
- 007-layered-data-access.md (accepted)

## Hybrid locking + idempotent redemption
Decision:
- Use Redis for short-lived code locks and MySQL transactions with
  idempotency keys + unique constraints for durable redemption rules.
- Assign codes via `rand_key` pivot queries with `SKIP LOCKED`.

Why:
- Redis lowers contention for in-flight redemptions.
- MySQL enforces business rules and makes retries safe.
- Pivot queries scale better than `ORDER BY RAND()`.

Trade-offs:
- Additional operational dependency on Redis.
- More moving parts to instrument and monitor.

When to revisit:
- If Redis becomes unavailable frequently.
- If assignment distribution proves skewed and requires a different strategy.

## TypeORM migrations
Decision:
- Use TypeORM migrations as the schema source of truth.
- Disable `synchronize` and run migrations on startup.

Why:
- Keeps schema changes explicit and reviewable.
- Avoids silent schema drift between environments.

Trade-offs:
- Requires migration files for each schema change.
- Adds a startup dependency on migration success.

When to revisit:
- If migration runtime becomes a bottleneck.
- If a different ORM or migration tool is adopted.

## Explanatory logging levels
Decision:
- Add LOG_DETAIL_LEVEL with three tiers for request flow visibility.

Why:
- Helps learning and debugging without changing code.
- Keeps normal logs lightweight while allowing deep detail when needed.

Trade-offs:
- More logging instrumentation in services.
- Risk of noisy logs if misused.

When to revisit:
- If structured tracing replaces narrative logs.

## OpenAPI + Swagger UI
Decision:
- Publish OpenAPI via Swagger UI at `/docs` and JSON at `/docs-json`.
- Use a centralized frontend API client aligned with the spec.

Why:
- Improves discoverability and helps generate client types.

Trade-offs:
- Adds DTO annotation work in controllers.

When to revisit:
- If API gateway or external contract tooling is introduced.

## OpenAPI fetch client
Decision:
- Use `openapi-fetch` with `openapi-typescript` for typed frontend calls.

Why:
- Reduces client/server drift with low tooling overhead.

Trade-offs:
- Requires regenerating types when contracts change.

When to revisit:
- If a full SDK generator is adopted.

## Class-validator + ValidationPipe
Decision:
- Use `class-validator` on DTOs and a global NestJS `ValidationPipe` with
  whitelist + forbid rules.
- Map validation errors into the existing error contract shape.

Why:
- Centralizes runtime validation and reduces controller boilerplate.
- Keeps Swagger DTOs aligned with actual enforcement.

Trade-offs:
- Adds dependencies and DTO annotation overhead.
- Global validation can reject unexpected fields that were previously ignored.

When to revisit:
- If a different validation library becomes the standard across services.

## Layered data access
Decision:
- Introduce repositories/adapters for DB/Redis specifics.
- Keep services focused on business rules and orchestration.

Why:
- Reduces coupling between business logic and storage details.
- Improves testability of persistence and service rules.

Trade-offs:
- More files and wiring per domain module.
- Slightly more ceremony for MVP endpoints.

When to revisit:
- If the repo remains small and layers feel unnecessary.

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
