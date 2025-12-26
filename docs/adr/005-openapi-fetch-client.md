# ADR: OpenAPI Fetch client

Date: 2025-12-25
Status: proposed

## Context
The frontend should consume APIs through a single client. With OpenAPI now
available, we can use a typed client to reduce drift between API and UI.

## Decision
Adopt `openapi-fetch` in the web app and generate path types from the OpenAPI
schema using `openapi-typescript`.

## Alternatives
- Handwritten fetch wrappers: simpler but less type safety.
- Full SDK generation: more tooling and heavier build steps.

## Consequences
- Requires regenerating types when API contracts change.
- Adds dev dependency and script in the web package.

## Links
- Decision log entry: docs/decision-log.md
- Contracts: docs/contracts.md
