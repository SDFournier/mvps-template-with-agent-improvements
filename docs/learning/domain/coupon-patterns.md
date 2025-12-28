# Coupon domain patterns

Domain-specific concepts for coupon assignment and redemption. These patterns
are tied to this domain and should be adapted if reused elsewhere.

## Idempotent redemption with hybrid locks

### Definition
Use Redis for short-lived contention control and MySQL transactions + unique
constraints as the source of truth for redemption and assignment rules, with
idempotency keys to make retries safe.

### When to use it
- High contention on the same coupon code or user/book pair.
- Client retries are expected (mobile networks, flaky checkouts).
- You must prevent double redemption while keeping low latency.

### Common mistakes
- Treating Redis locks as the source of truth instead of MySQL.
- Releasing locks without comparing the lock token (race window).
- Missing unique constraints for successful redemptions.
- Using ORDER BY RAND() for code assignment at scale.
- Updating counters without locking the (book_id, user_id) row.

### Example in this stack
- Redis: `SET lock:code:{codeId} {token} NX EX {ttl}` to acquire,
  compare-and-delete to release.
- MySQL: transaction with `SELECT ... FOR UPDATE` on the code row, validate
  lock token/user, insert redemption with a unique idempotency key.
- MySQL: unique index for business rules (per-code or per-user/per-book) when
  `reusable_per_user=false`.
- Nest service: orchestration; controllers validate inputs and enforce the
  error contract.

### Observability
- Metrics: lock acquisition failures, idempotency conflicts, redemption
  latency p95, stale lock cleanup count.
- Logs: lock token mismatch, idempotency key hit, constraint violation mapping.

## Coupon data model constraints

### Definition
Schema patterns for coupon books, codes, counters, and redemptions that enforce
uniqueness and concurrency rules in MySQL.

### When to use it
- You need to enforce per-book code uniqueness and per-user limits.
- Redemptions must be idempotent and safe under retries.
- Assignment must be fast without `ORDER BY RAND()`.

### Common mistakes
- Relying on partial unique indexes (not supported in MySQL).
- Storing random keys as integers in JS without considering bigint precision.
- Missing composite indexes for assignment queries.

### Example in this stack
- `coupon_codes` uses `rand_key` and index
  `(coupon_book_id, state, rand_key)` to support pivot selection.
- `coupon_redemptions` uses `success_key` (nullable) with a unique index to
  emulate "only one successful redemption" rules.
- `coupon_book_user_counters` uses a composite primary key on
  `(coupon_book_id, user_id)` to lock per-user assignments.

### Observability
- Monitor duplicate key violations on idempotency and success key indexes.
- Track assignment latency and code pool depth per book.

## Assignment counter locking

### Definition
Lock a per-(coupon_book_id, user_id) counter row in MySQL to enforce the
maximum assigned codes per user without race conditions.

### When to use it
- You have a per-user cap on assigned coupon codes.
- Assignment requests can arrive concurrently for the same user/book.

### Common mistakes
- Incrementing counters without row locks.
- Counting assignments on every request instead of using a counter row.
- Forgetting to create the counter row before locking.

### Example in this stack
- `coupon_book_user_counters` has a composite primary key.
- The assignment transaction runs `INSERT ... ON DUPLICATE KEY UPDATE` then
  `SELECT ... FOR UPDATE` to lock the row before incrementing.

### Observability
- Track conflicts from "max codes per user exceeded" responses.
- Monitor transaction time for assignment flow.

## Links
- docs/flows/coupon-assignment-redemption.md
- docs/learning/012-layered-data-access.md
- docs/contracts.md
