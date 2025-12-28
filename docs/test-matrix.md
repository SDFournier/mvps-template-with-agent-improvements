# Test matrix

This matrix defines the required tests for each playbook.
All new implementations must satisfy these requirements.

## Purpose
Declare minimum test coverage per playbook.

## Use when
- You need to know which tests are required for a feature.
- You are verifying coverage before closing a change.

## Canonical coverage rules
This is the single source of truth for required coverage. Other docs should
link here rather than restating rules.

## Changing coverage rules
- Update this document when coverage requirements change.
- If a change affects architecture or contracts, add an ADR and update
  docs/decision-log.md.

## Cross-cutting
- Contract: error response shape for all endpoints.
- Contract: web API client paths must map to API controllers.

## Auth (sessions)
- Unit: service (register, login, validate, logout)
- Unit: guard (missing token, invalid token)
- Smoke: module wiring
- E2E: register -> login -> me -> logout
- Contract: auth response shapes

## CRUD list + pagination (backend)
- Unit: list with pagination
- Unit: create/update/delete
- Smoke: module wiring
- E2E: create -> list -> update -> delete
- Contract: pagination response shape

## Table + pagination (frontend)
- UI: renders list rows
- UI: handles unauthenticated state
- UI: pagination controls

## Uploads
- Unit: upload service stores metadata
- Unit: rejects oversized payload
- Smoke: module wiring
- E2E: upload -> metadata -> download
- Contract: upload response shape

## Cache
- Unit: cache service read/write
- Unit: invalidation on write
- Optional: integration coverage inside e2e flow

## Roles
- Unit: roles guard rejects invalid role
- E2E: non-admin forbidden, admin allowed
- Contract: admin response shape

## Logging
- Unit: request middleware registers finish handler and calls next

## Queues and async events
- Contract: event shape validation
- Unit: consumer handles invalid payloads

## Integration (DB)
- Optional: run DB-backed integration tests with `RUN_DB_TESTS=1`.
