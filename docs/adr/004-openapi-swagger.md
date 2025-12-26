# ADR: OpenAPI + Swagger UI

Date: 2025-12-25
Status: proposed

## Context
We need an explicit API contract that is easy to explore and can be used for
client generation. The repo already requires a centralized frontend client.

## Decision
Adopt OpenAPI via Swagger in the API:
- `@nestjs/swagger` generates OpenAPI documentation.
- Swagger UI is exposed at `/docs` (configurable).
- OpenAPI JSON is exposed at `/docs-json`.
- Frontend uses a single API client file that can be aligned with OpenAPI.

## Alternatives
- No OpenAPI: faster now but weaker contract visibility.
- External API gateway docs: adds infrastructure complexity.

## Consequences
- Requires DTO classes or explicit schema annotations in controllers.
- Adds a new dependency to the API.

## Links
- Decision log entry: docs/decision-log.md
- Contracts: docs/contracts.md
