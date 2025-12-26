# Idempotent redemption with hybrid locks

## Definition
Use Redis for short-lived contention control and MySQL transactions + unique constraints as the source of truth for redemption and assignment rules, with idempotency keys to make retries safe.

## When to use it
- High contention on the same coupon code or user/book pair.
- Client retries are expected (mobile networks, flaky checkouts).
- You must prevent double redemption while keeping low latency.

## Common mistakes
- Treating Redis locks as the source of truth instead of MySQL.
- Releasing locks without comparing the lock token (race window).
- Missing unique constraints for successful redemptions.
- Using ORDER BY RAND() for code assignment at scale.
- Updating counters without locking the (book_id, user_id) row.

## Example in this stack
- Redis: `SET lock:code:{codeId} {token} NX EX {ttl}` to acquire, compare-and-delete to release.
- MySQL: transaction with `SELECT ... FOR UPDATE` on the code row, validate lock token/user, insert redemption with a unique idempotency key.
- MySQL: unique index for business rules (per-code or per-user/per-book) when `reusable_per_user=false`.
- Nest service: orchestration; controllers validate inputs and enforce error contract.

## Observability
- Metrics: lock acquisition failures, idempotency conflicts, redemption latency p95, stale lock cleanup count.
- Logs: lock token mismatch, idempotency key hit, constraint violation mapping.

## Links
- docs/architecture.md
- docs/contracts.md
- docs/feature-playbooks.md
