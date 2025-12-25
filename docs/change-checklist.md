# Change checklist (mandatory)

Use this checklist for every change proposal and implementation.
This keeps responsibilities and contracts consistent across iterations.

## Pre-change
- Review Contracts, Feature Playbooks, Test Matrix, and Decision Log.
- Identify which playbook applies.
- Confirm required tests for the playbook.
- Note any contracts that will change.
- Identify new infra dependencies (db, cache, queue) and required env vars.

## Implementation
- Maintain clear separation of responsibilities:
  - UI displays data and handles user interaction only.
  - Data access lives in a dedicated data layer.
  - Controllers orchestrate requests; services own business logic.
- Validate input at the boundary; do not defer validation to deeper layers.
- Use the standard error contract for all failures.
- Follow SOLID checks:
  - Single responsibility: one reason to change.
  - Dependency inversion: depend on abstractions, not concretions.
  - Interface segregation: keep interfaces minimal and purpose-specific.
- Avoid cross-feature coupling without explicit rationale.
- If introducing events/queues, document the event schema in Contracts.

## Post-change
- Update Contracts if response shapes changed.
- If a new architectural choice was made, add an ADR and update the Decision Log.
- Update Playbooks if a new pattern emerged.
- Add or update tests per Test Matrix.
- Run the full test suite and fix failures.
- Confirm env variables and infra expectations are documented.
- Log any frictions or ambiguities in the Friction Log.
- Ensure the agent response follows the mandatory output format and includes
  code references or snippets in the Pedagogy section.
