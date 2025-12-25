# Environment standards

## Purpose
Keep development, testing, and production aligned to prevent drift.

## Required services
- Database: source of truth for persistent data.
- Cache: optional accelerator; app must work without it.
- Queue: optional async processing; events follow the Events Contract.

## Environment parity rules
- Every new env var must be documented.
- Defaults must be defined for local development.
- Tests must specify which services are real vs mocked.

## Local development
- Provide a repeatable way to start required services.
- Ensure ports do not conflict with common local services.

## Testing
- Unit tests should not require external services.
- E2E tests may use in-memory or isolated instances.
- If real infra is required, document it explicitly.
