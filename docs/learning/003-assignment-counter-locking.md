# Assignment counter locking

## Definition
Lock a per-(coupon_book_id, user_id) counter row in MySQL to enforce the maximum
assigned codes per user without race conditions.

## When to use it
- You have a per-user cap on assigned coupon codes.
- Assignment requests can arrive concurrently for the same user/book.

## Common mistakes
- Incrementing counters without row locks.
- Counting assignments on every request instead of using a counter row.
- Forgetting to create the counter row before locking.

## Example in this stack
- `coupon_book_user_counters` has a composite primary key.
- The assignment transaction runs `INSERT ... ON DUPLICATE KEY UPDATE` then
  `SELECT ... FOR UPDATE` to lock the row before incrementing.

## Observability
- Track conflicts from "max codes per user exceeded" responses.
- Monitor transaction time for assignment flow.

## Links
- docs/flows/coupon-assignment-redemption.md
- docs/learning/002-coupon-data-model.md
