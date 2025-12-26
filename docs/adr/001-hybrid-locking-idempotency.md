# ADR: Hybrid locking + idempotent redemption

Date: 2025-12-25
Status: proposed

## Context
Coupon assignment and redemption are high-contention operations that must be
safe under retries and concurrent requests. The repo standardizes on MySQL as
the source of truth and Redis as a cache/short-lived lock store.

## Decision
Adopt a hybrid approach:
- Redis provides short-lived locks for `code_id` to avoid concurrent in-flight
  redemptions on the same code.
- MySQL transactions with `SELECT ... FOR UPDATE` are the source of truth for
  assignment and redemption changes.
- Idempotency keys are stored and enforced with unique constraints to make
  retries safe.
- Code assignment uses a precomputed `rand_key` with a pivot query plus
  `SKIP LOCKED` to avoid `ORDER BY RAND()`.

## Alternatives
- DB-only locking: simpler but higher contention and slower under load.
- Redis-only locking: fast but not durable; risks double redemption if Redis
  is flushed or TTLs expire early.
- `ORDER BY RAND()` assignment: uniform but not scalable.
- Postgres partial indexes for uniqueness: not available in MySQL; replaced by
  generated columns or composite unique indexes.

## Consequences
- Requires Redis availability for the lock step, with best-effort unlocks.
- Adds operational complexity but improves correctness and latency.
- Requires MySQL 8 features for `SKIP LOCKED`.

## Links
- Decision log entry: docs/decision-log.md
- Concept card: docs/learning/001-idempotent-redemption-locking.md
- Flow: docs/flows/coupon-assignment-redemption.md
