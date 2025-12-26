# OpenAPI fetch client

## Definition
Use `openapi-fetch` to call API endpoints with types generated from the OpenAPI
schema by `openapi-typescript`.

## When to use it
- You want type-safe API calls in the frontend.
- You want a single client to prevent API drift.

## Common mistakes
- Forgetting to regenerate types after API changes.
- Bypassing the client and calling fetch directly.

## Example in this stack
- Generate types: `pnpm --filter @repo/web api:types`.
- Client: `apps/web/lib/api.ts`.
- Types: `apps/web/lib/api-types.ts`.

## Observability
- If types are stale, TypeScript errors surface on client usage.

## Links
- docs/adr/005-openapi-fetch-client.md
- docs/contracts.md
