# OpenAPI contract and client

Stack-specific guidance for OpenAPI and the frontend client in this repo.

## OpenAPI + Swagger UI

### Definition
Expose an OpenAPI contract from the API and provide a Swagger UI for interactive
exploration. Use it to keep frontend client usage aligned with the API.

### When to use it
- You need clear, discoverable API contracts.
- You want to generate or validate client requests.

### Common mistakes
- Forgetting to annotate DTOs, resulting in incomplete schemas.
- Exposing Swagger in production unintentionally.
- Returning shapes that differ from documented responses.

### Example in this stack
- Swagger UI: `/docs` (configurable via `SWAGGER_PATH`).
- OpenAPI JSON: `/docs-json`.
- Frontend calls go through `apps/web/lib/api.ts`.
- Frontend types can be generated with `pnpm --filter @repo/web api:types`.

### Observability
- Confirm `/docs` loads and `/docs-json` returns a schema.
- Validate that endpoint responses match documented shapes.

## OpenAPI fetch client

### Definition
Use `openapi-fetch` to call API endpoints with types generated from the OpenAPI
schema by `openapi-typescript`.

### When to use it
- You want type-safe API calls in the frontend.
- You want a single client to prevent API drift.

### Common mistakes
- Forgetting to regenerate types after API changes.
- Bypassing the client and calling fetch directly.

### Example in this stack
- Generate types: `pnpm --filter @repo/web api:types`.
- Client: `apps/web/lib/api.ts`.
- Types: `apps/web/lib/api-types.ts`.

### Observability
- If types are stale, TypeScript errors surface on client usage.

## Links
- docs/adr/004-openapi-swagger.md
- docs/adr/005-openapi-fetch-client.md
- docs/contracts.md
