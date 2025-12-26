# ADR: Explanatory logging levels

Date: 2025-12-25
Status: proposed

## Context
We need a repeatable way to understand request flow, validation, and business
logic without adding ad-hoc debug statements. The team wants multi-level logs
to explain intent and reasoning.

## Decision
Introduce LOG_DETAIL_LEVEL with three tiers:
- Level 1: normal request logs.
- Level 2: step logs in execution order.
- Level 3: step + explanation logs (why/what) and memory snapshots.

Domain services should emit step/explain logs for critical flows.

## Alternatives
- Single verbose mode: too noisy for everyday use.
- Tracing only: harder to map logic and intent without narrative logs.

## Consequences
- More logging code in critical flows.
- Developers must avoid sensitive data in logs.
- Allows deep learning mode without changing code.

## Links
- Decision log entry: docs/decision-log.md
- Good practices: docs/good-practices.md
