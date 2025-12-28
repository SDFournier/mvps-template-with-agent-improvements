# Environment standards

## Purpose
Keep development, testing, and production aligned to prevent drift.

## Use when
- You need to add or document env vars.
- You are validating infra parity across environments.

## Required services
- Database: source of truth for persistent data.
- Cache: optional accelerator; app must work without it.
- Queue: optional async processing; events follow the Events Contract.

## Environment parity rules
- Every new env var must be documented.
- Defaults must be defined for local development.
- Tests must specify which services are real vs mocked.

## Logging levels
- LOG_DETAIL_LEVEL controls API logging detail:
  - 1: normal logs.
  - 2: step logs (flow order).
  - 3: step + explanation + memory snapshots.

## API documentation
- SWAGGER_ENABLED toggles Swagger UI and OpenAPI JSON (1 enabled, 0 disabled).
- SWAGGER_PATH defines the Swagger UI path (default: docs).

## Local development
- Provide a repeatable way to start required services.
- Ensure ports do not conflict with common local services.

## Testing
- Unit tests should not require external services.
- E2E tests may use in-memory or isolated instances.
- If real infra is required, document it explicitly.
