# Request validation with ValidationPipe

## Definition
Use `class-validator` decorators on DTOs and a global NestJS `ValidationPipe`
to enforce runtime validation at the API boundary.

## When to use it
- You need consistent input validation across controllers.
- DTOs should be the single source of truth for request constraints.
- You want to reject unknown fields early.

## Common mistakes
- Assuming DTO types validate at runtime without decorators.
- Forgetting to validate route params by using DTOs in `@Param()`.
- Returning raw ValidationPipe errors that break the error contract.

## Example in this stack
- DTOs in `apps/api/src/coupons/dto` include `class-validator` rules.
- `apps/api/src/main.ts` registers a global ValidationPipe with a custom
  exceptionFactory to preserve the error contract.

## Observability
- Validation failures return `message: "Validation failed"` with an `errors`
  map in the API error response.

## Links
- docs/adr/006-class-validator-validation-pipe.md
- docs/contracts.md
