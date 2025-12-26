# Prompt: Stage recap command

## Context
- User requested a special command to recap the last N stages in depth.
- Recap should include reasons, trade-offs, links, and code snippets.

## Objective
Add a script that produces a long-form recap for recent stages and document
how to run it.

## Constraints
- Follow docs/good-practices.md and docs/change-checklist.md.
- Leave a prompt artifact in prompts/.
- Keep output driven by prompt artifacts.

## Stage A - Plan
- What (observable result): new recap command + documentation.
- Why (motivation + constraint): improve learning and traceability of decisions.
- How (steps + modules): add script, add npm script, update README, add concept card.
- Expected result (checklist):
  - `node scripts/recap-stages.js <n>` works.
  - `pnpm recap:stages -- <n>` works.
  - README documents the command.
  - Concept card added for the command.
- Scope and impact (risk, compatibility): tooling only.
- Trade-offs (chosen vs discarded): stage-only prompts vs all prompts.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - scripts/recap-stages.js
  - package.json
  - README.md
  - docs/learning/006-stage-recap-command.md
  - prompts/011-stage-recap-command.md
- Changes by block and rationale:
  - Script parses prompt artifacts and prints a structured recap.
  - README exposes usage.
  - Concept card documents how and when to use it.
- Observability signals (logs/metrics) if applicable: n/a.

## Stage C - Validation
- Tests and commands: `node scripts/agent-finalize.js`.
- Manual checks: `node scripts/recap-stages.js 2`.
- Not validated and why: n/a.

## Stage D - Pedagogical close
- Decision summary (what changed and why): added recap command for learning.
- How it works now (mental model, invariants): script scans stage prompt files
  and renders long-form summaries with snippets.
- Before vs after: no recap tool -> dedicated recap command.
- Impact (performance, maintainability, risk, debt): low risk, higher clarity.
- Learnings and concepts (links to ADR or concept cards):
  - docs/learning/006-stage-recap-command.md

## Artifacts created
- Prompt file: prompts/011-stage-recap-command.md
