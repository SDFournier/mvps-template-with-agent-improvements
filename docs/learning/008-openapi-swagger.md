# OpenAPI + Swagger UI

## Definition
Expose an OpenAPI contract from the API and provide a Swagger UI for interactive
exploration. Use it to keep frontend client usage aligned with the API.

## When to use it
- You need clear, discoverable API contracts.
- You want to generate or validate client requests.

## Common mistakes
- Forgetting to annotate DTOs, resulting in incomplete schemas.
- Exposing Swagger in production unintentionally.
- Returning shapes that differ from documented responses.

## Example in this stack
- Swagger UI: `/docs` (configurable via `SWAGGER_PATH`).
- OpenAPI JSON: `/docs-json`.
- Frontend calls go through `apps/web/lib/api.ts`.
- Frontend types can be generated with `pnpm --filter @repo/web api:types`.

## Observability
- Confirm `/docs` loads and `/docs-json` returns a schema.
- Validate that endpoint responses match documented shapes.

## Links
- docs/adr/004-openapi-swagger.md
- docs/contracts.md
