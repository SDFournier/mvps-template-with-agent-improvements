# Explanatory logging levels

## Definition
Three log detail levels to explain what the system is doing and why.

## When to use it
- When you need a guided explanation of request flow.
- When learning or debugging business logic.

## Common mistakes
- Logging sensitive values at higher levels.
- Leaving Level 3 enabled in noisy environments.

## Example in this stack
- LOG_DETAIL_LEVEL=1: request logs only.
- LOG_DETAIL_LEVEL=2: step logs in order.
- LOG_DETAIL_LEVEL=3: step + explanation + memory snapshots.

## Observability
- Use Level 2 to trace flow order.
- Use Level 3 to understand intent and invariants.

## Links
- docs/adr/003-explanatory-logging-levels.md
- docs/feature-playbooks.md
