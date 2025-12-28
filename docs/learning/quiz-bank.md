# Quiz bank

This document centralizes quizzes by topic. Every four prompts, add or
refine questions based on recent changes and discussions.

## Format
Each quiz entry should include:
- Context and scenario
- Question (format can be MCQ, short answer, trace, ordering, or scenario)
- Answer or expected outcome
- Explanation and follow-up prompts

## Rotation rule
- Do not repeat the same quiz question in consecutive quiz deliveries.

## Concurrency and locking

### Quiz 1: Counter-row locking under parallel assignment
Context: max_codes_per_user = 1, two parallel assignment requests for the
same user and book.

Options:
A) Both requests can safely proceed if each counts assigned codes after
   assigning because the count will differ.
B) The second request must wait on a row lock so it reads the updated
   assigned_count before validating the limit.
C) It is enough to use Redis NX without any DB locks.
D) SKIP LOCKED should be used on the counter row to avoid blocking.

Correct answer: B
Explanation: The counter row lock serializes validation and updates for
the same (bookId, userId). Without it, both requests can read the same
count and exceed the limit.
Follow-up prompts:
- What goes wrong if you only count assigned codes after the update?
- Why is SKIP LOCKED inappropriate for the counter row?

### Quiz 2: SKIP LOCKED and assignment vs redemption
Context: assignment can choose any available code; redemption targets a
specific assigned code.

Options:
A) SKIP LOCKED should be used for redemption to avoid blocking.
B) SKIP LOCKED is useful for assignment because it can skip busy rows and
   pick another available code.
C) SKIP LOCKED should be used only with Redis locks, not DB locks.
D) SKIP LOCKED guarantees uniqueness without any other constraints.

Correct answer: B
Explanation: Assignment can select a different code, redemption cannot.
Follow-up prompts:
- What happens if redemption skips the locked row?
- How does SKIP LOCKED interact with a rand_key pivot query?

## Idempotency and uniqueness

### Quiz 3: Idempotency vs business-rule uniqueness
Context: reusable_per_user = false, redemption is idempotent.

Options:
A) Idempotency-key uniqueness alone guarantees policy rules.
B) A unique success constraint enforces the policy, while the idempotency
   key ensures retries return the same result.
C) Redis locks guarantee both idempotency and policy enforcement.
D) Only application code checks are needed if you lock the row.

Correct answer: B
Explanation: Idempotency and policy enforcement solve different problems.
Follow-up prompts:
- What failure mode does the unique success constraint prevent?
- What happens if Redis is unavailable?

## Observability and tail latency

### Quiz 4: Tail latency diagnosis
Context: average latency is stable, p99 latency spikes during traffic
bursts.

Options:
A) This always indicates a bug in application code.
B) It can be caused by lock contention, slow DB queries, or queueing
   effects; metrics and traces are needed to pinpoint the cause.
C) It is irrelevant if p50 is healthy.
D) It only happens in Redis, not in the DB.

Correct answer: B
Explanation: Tail latency reflects worst-case paths and contention.
Follow-up prompts:
- Which metrics would you inspect first?
- How would you correlate a spike with specific endpoints or queries?

## Validation and separation of concerns

### Quiz 5: DTO validation vs business rules (short answer)
Context: Requests are validated with a global ValidationPipe and DTO decorators.
Question: Which validations belong in DTOs, and which must remain in services?
Answer: DTOs validate shape and basic constraints; services enforce business
rules and invariants tied to domain logic.
Explanation: DTO validation runs at the boundary; services own policy rules.
Follow-up prompts:
- Give one example of a DTO constraint and one service invariant.
- What breaks if business rules move into DTO validation?

### Quiz 6: Layered data access (ordering)
Context: A redemption flow uses repositories and a Redis lock service.
Question: Order the layers that should execute during a redemption:
1) Controller, 2) Service, 3) Repository, 4) Redis lock adapter.
Answer: 1) Controller, 2) Service, 4) Redis lock adapter, 3) Repository.
Explanation: Controllers validate, services orchestrate, adapters handle locks,
and repositories persist transactional data.
Follow-up prompts:
- Where should idempotency checks live and why?
- What changes if Redis is replaced with another lock provider?

### Quiz 7: Documentation sources of truth (scenario)
Context: A rule change is proposed for testing requirements.
Question: Where should the rule be updated, and which docs should only reference it?
Answer: Update docs/testing.md and docs/test-matrix.md, and reference them from
overview or historical docs without restating the rule.
Explanation: Canonical docs own rules; historical docs provide context only.
Follow-up prompts:
- What risks appear if historical docs duplicate rules?
- How would you link the change to an ADR if architectural?
