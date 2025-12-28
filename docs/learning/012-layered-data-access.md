# Layered data access

## Definition
Separate business rules (services) from persistence details (repositories or
adapters) so storage changes do not leak into domain logic.

## When to use it
- Transactions, row locks, or unique constraints appear in services.
- Multiple data stores are involved (DB + cache/locks).
- You need unit tests for business rules without DB setup.
 - Simple CRUD can stay in services for MVP speed; complex flows should move.

## Common mistakes
- Putting HTTP or business rules inside repositories.
- Leaking ORM or SQL details into services.
- Skipping repository tests for complex queries.

## Example in this stack
- Services orchestrate flows and enforce limits.
- Repositories handle MySQL transactions and Redis locks.

## Observability
- Service logs describe steps and decisions.
- Repository logs capture queries and lock details at higher log levels.

## Validation points
- Controllers validate request shape (DTO validation).
- Services validate business rules and invariants.
- Repositories are verified with integration tests for transactions and locks.

## Links
- docs/adr/007-layered-data-access.md
- docs/architecture.md
