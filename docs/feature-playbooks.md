# Feature playbooks

These playbooks define repeatable, strict patterns for common features.
They describe what to build, how to validate it, and which tests are required.
They do not reference specific files so they remain stable even if code moves.

## Global rules
- Follow Contracts, Good Practices, and the Change Checklist.
- Use the iteration loop described in the Overview.
- Required tests are defined in the Test Matrix.

## Playbook: Auth (sessions)
Purpose:
- Provide simple MVP authentication with session tokens.

Required components:
- User identity model (email, role).
- Session model (token, expiration, user reference).
- Auth service (register, login, validate, logout).
- Auth controller endpoints: register, login, me, logout.
- Auth guard that reads Authorization header and resolves user context.

Implementation steps:
1) Validate email format and minimum password length.
2) Normalize email to lower-case before storing.
3) Hash passwords with a per-user salt.
4) Create a session token with expiration.
5) Expose a "me" endpoint that returns the current user.
6) Logout deletes the session token.

Validation rules:
- Never return password or password hash.
- Use the standard error contract on failures.
- Unauthorized (missing/invalid token) vs forbidden (role mismatch) must differ.

Required tests:
- Unit: auth service (invalid credentials, session expiration).
- Unit: guard (missing token, invalid token).
- Smoke: module compiles with guard dependencies.
- E2E: register -> login -> me -> logout.
- Contract: response shapes for register/login/me/logout.

## Playbook: CRUD list + pagination (backend)
Purpose:
- Standard list and CRUD endpoints with pagination.

Required components:
- Entity model.
- Service (list, get by id, create, update, delete).
- Controller with endpoints for list and CRUD.

Implementation steps:
1) Accept page and pageSize in list endpoints.
2) Enforce max pageSize in the controller.
3) Return a pagination object in every list response.
4) Validate required fields on create and update.

Validation rules:
- page >= 1, pageSize >= 1, pageSize <= max.
- Return the standard error contract for invalid input.

Required tests:
- Unit: service list and CRUD behavior.
- Smoke: module compiles with dependencies.
- E2E: create -> list -> update -> delete.
- Contract: list response shape with pagination.

## Playbook: Table + pagination (frontend)
Purpose:
- Reusable list UI with pagination controls.

Required components:
- Data hook for list fetching, paging, and errors.
- Table component for rendering rows.
- Pagination component for page controls.

Implementation steps:
1) Keep data fetching outside the UI component.
2) Render loading and error states explicitly.
3) Wire pagination controls to the data hook.

Validation rules:
- The UI should not call the API directly.
- Table and pagination are reusable for other lists.

Required tests:
- UI: renders list rows with data.
- UI: handles unauthenticated state.

## Playbook: Uploads
Purpose:
- Accept file content, persist metadata, and allow download.

Required components:
- Upload model with metadata (original name, stored name, size, mime type).
- Uploads service (create, find, read file).
- Uploads controller endpoints: create, metadata read, file download.

Implementation steps:
1) Validate filename and base64 content.
2) Enforce a max size limit.
3) Store file using a generated name.
4) Persist metadata and return it in the response.

Validation rules:
- Reject invalid base64 or oversized payloads.
- Require authentication for upload and download.

Required tests:
- Unit: upload service stores metadata and rejects large files.
- Smoke: module compiles with auth dependencies.
- E2E: upload -> metadata -> download.
- Contract: upload response shape.

## Playbook: Cache
Purpose:
- Reduce load by caching list queries.

Required components:
- Cache service with get/set and TTL.
- Clear-by-prefix or invalidation strategy.

Implementation steps:
1) Build cache keys from list parameters.
2) Return cached data if available.
3) Invalidate cache on create/update/delete.

Validation rules:
- Cache always has a TTL.
- Invalidation happens on writes.

Required tests:
- Unit: cache service read/write.
- Unit: list uses cache and invalidates on write.

## Playbook: Roles
Purpose:
- Restrict sensitive endpoints by role.

Required components:
- Role field on user identity.
- Roles decorator and roles guard.
- Admin or privileged endpoint for validation.

Implementation steps:
1) Assign default role on registration.
2) Optionally elevate role based on configuration.
3) Guard sensitive endpoints using role metadata.

Validation rules:
- Authorization is enforced on the server only.
- UI may hide, but does not replace server enforcement.

Required tests:
- Unit: roles guard rejects invalid role.
- E2E: non-admin forbidden, admin allowed.
- Contract: admin response shape.

## Playbook: Logging
Purpose:
- Basic observability for MVP diagnostics.

Required components:
- Request logging middleware.

Implementation steps:
1) Log method, path, status, duration.
2) Include request id if present.
3) For domain flows, add step logs and explanations gated by LOG_DETAIL_LEVEL.

Validation rules:
- Do not log sensitive payloads or tokens.
- Level 1: normal request logs.
- Level 2: step logs in execution order.
- Level 3: step + explanation logs (what/why) and optional memory snapshots.

Required tests:
- Unit: middleware registers finish handler and calls next.

## Playbook: Queues and async events
Purpose:
- Process work asynchronously and decouple producers from consumers.

Required components:
- Producer that emits events with a documented schema.
- Consumer that validates and handles the event.

Implementation steps:
1) Define an event schema and required fields in the Contracts document.
2) Emit events with correlation id and version.
3) Validate event shape before processing.

Validation rules:
- Event payloads must match the Events Contract.
- Consumers must handle unknown versions safely.

Required tests:
- Contract: event shape validation.
- Unit: consumer rejects invalid payloads.
