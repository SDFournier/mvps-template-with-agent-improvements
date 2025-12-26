# Coupon data model constraints

## Definition
Schema patterns for coupon books, codes, counters, and redemptions that enforce
uniqueness and concurrency rules in MySQL.

## When to use it
- You need to enforce per-book code uniqueness and per-user limits.
- Redemptions must be idempotent and safe under retries.
- Assignment must be fast without `ORDER BY RAND()`.

## Common mistakes
- Relying on partial unique indexes (not supported in MySQL).
- Storing random keys as integers in JS without considering bigint precision.
- Missing composite indexes for assignment queries.

## Example in this stack
- `coupon_codes` uses `rand_key` and index
  `(coupon_book_id, state, rand_key)` to support pivot selection.
- `coupon_redemptions` uses `success_key` (nullable) with a unique index to
  emulate "only one successful redemption" rules.
- `coupon_book_user_counters` uses a composite primary key on
  `(coupon_book_id, user_id)` to lock per-user assignments.

## Observability
- Monitor duplicate key violations on idempotency and success key indexes.
- Track assignment latency and code pool depth per book.

## Links
- docs/adr/001-hybrid-locking-idempotency.md
- docs/flows/coupon-assignment-redemption.md
- docs/contracts.md
