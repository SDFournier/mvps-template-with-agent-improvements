# Prompt: Coupon Book locking/idempotency architecture analysis

## Context
- Repo: couponbook-locking-idempotency-assignment-redemption (Nest + Next, MySQL + Redis).
- Goal: analyze strategy, architecture, design choices, and stack trade-offs for coupon assignment/redemption with idempotency and locking.

## Objective
Provide a crisp architecture analysis that fits repo conventions (MySQL source of truth, Redis for short-lived locks), and document the idempotent redemption/locking pattern.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- If a new pattern appears (idempotency/locking), create or update a concept card.
- No code implementation in this prompt.

## Stage A - Plan
- What (observable result): analysis response plus documented concept card and prompt artifact.
- Why (motivation + constraint): align the proposed design with repo conventions (MySQL + Redis) while clarifying concurrency and idempotency decisions.
- How (steps + modules): read docs; capture design trade-offs; write prompt artifact and concept card in docs/learning.
- Expected result (checklist):
  - Response includes strategy, architecture, and trade-offs.
  - New prompt artifact in prompts/.
  - New concept card in docs/learning/.
- Scope and impact (risk, compatibility): documentation-only change; no runtime impact.
- Trade-offs (chosen vs discarded): hybrid Redis + DB locking; MySQL alignment vs Postgres-only plan.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - prompts/004-couponbook-strategy-analysis.md
  - docs/learning/001-idempotent-redemption-locking.md
  - docs/friction-log.md
  - pnpm-lock.yaml
- Changes by block and rationale:
  - Prompt artifact documents analysis intent and constraints.
  - Concept card captures the idempotent locking pattern for reuse.
- Observability signals (logs/metrics) if applicable: documented in the concept card.

## Stage C - Validation
- Tests and commands: pnpm agent:finalize (per AGENTS.md) via node scripts/agent-finalize.js.
- Manual checks: n/a.
- Not validated and why: no runtime changes.

## Stage D - Pedagogical close
- Decision summary (what changed and why): documentation added to codify idempotent redemption/locking.
- How it works now (mental model, invariants): hybrid Redis lock + MySQL transaction + unique constraints.
- Before vs after: no docs describing this pattern → concept card added.
- Impact (performance, maintainability, risk, debt): clarity improved, no runtime impact.
- Learnings and concepts (links to ADR or concept cards): docs/learning/001-idempotent-redemption-locking.md.

## Artifacts created
- Prompt file: prompts/004-couponbook-strategy-analysis.md
- ADR: n/a
- Concept card: docs/learning/001-idempotent-redemption-locking.md
- Flow doc: n/a
- Runbook: n/a
- Friction log: docs/friction-log.md
