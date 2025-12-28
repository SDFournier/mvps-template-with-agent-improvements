# Class-validator + ValidationPipe for request validation

Date: 2025-12-27
Status: accepted

## Context
Controllers were performing manual validation with helper functions, which
duplicated rules and made it easy for endpoints to drift. We need consistent
runtime validation for DTOs, aligned with Swagger docs, while keeping the error
contract stable.

## Decision
Adopt `class-validator` decorators on request DTOs and enable a global NestJS
`ValidationPipe` with whitelist + forbid rules. Map validation errors into the
existing error contract shape (`message: "Validation failed"`, `errors` map).

## Alternatives
- Keep manual validation helpers per controller.
- Use per-route pipes only and skip global ValidationPipe.
- Use a different runtime schema library (Joi/Zod).

## Consequences
- New dependencies (`class-validator`, `class-transformer`).
- DTOs must declare validation rules explicitly.
- Extra fields are rejected to avoid silent input drift.
- Manual validation helpers are removed unless a rule is not expressible in
  decorators.

## Links
- docs/decision-log.md
