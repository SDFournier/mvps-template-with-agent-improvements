# Architecture map

## Purpose
Provide the system layer map, core responsibilities, and extension guidance.

## Use when
- You need to understand module boundaries and cross-cutting concerns.
- You are adding a new domain module or data store.

## Core layers
- Web UI: screens and view state, with data access in hooks or helpers.
- API: domain modules with controllers and services.
- Data access: repositories or adapters that isolate DB/Redis specifics.
- Shared contracts: DTOs used by both web and API.
- Data stores: MySQL as source of truth, Redis as cache.

## Cross cutting concerns
- Auth uses sessions; guards enforce access.
- Errors follow the shared error contract.
- Caching is explicit with TTL and invalidation.
- Uploads keep file content separate from metadata.
- Logging captures requests without leaking sensitive data.
- OpenAPI/Swagger documents API contracts.

## How to extend
- Pick a feature playbook and follow its steps.
- Update shared contracts before wiring new endpoints.
- Add or adjust tests based on the test matrix.
- If the change is architectural, add an ADR and summarize it in the decision log.

## Canonical refs
- docs/good-practices.md
- docs/feature-playbooks.md
- docs/contracts.md
- docs/testing.md
