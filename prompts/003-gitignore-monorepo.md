# Prompt: Add monorepo gitignore

## Context
- Repo: base-proyect-MVPs
- Monorepo with two apps in `apps/`
- Existing `.gitignore` was minimal

## Objective
- Add a comprehensive `.gitignore` suitable for a Node.js monorepo with two apps.

## Constraints
- Keep patterns general and safe for the repo structure.
- Do not ignore `*.env.example`.

## Stage A - Plan
- What (observable result): Updated `.gitignore` with monorepo-appropriate ignore rules.
- Why (motivation + constraint): Prevent accidental commits of build outputs, caches, logs, and env files while preserving examples.
- How (steps + modules): Replace `.gitignore` content at repo root with structured sections.
- Expected result (checklist):
  - Root `.gitignore` includes build outputs for web/api.
  - Common caches and logs are ignored.
  - `.env.example` remains tracked.
- Scope and impact (risk, compatibility): Low risk; affects only git tracking of generated artifacts.
- Trade-offs (chosen vs discarded): Chose a conservative Node/PNPM-focused list over tool-specific IDE ignores.
- Questions (only if blocking or decision changing): None.

## Stage B - Implementation
- Files touched or created:
  - `.gitignore`
- Changes by block and rationale:
  - Added sections for dependencies, build outputs, caches, logs, env, and OS files.
  - Added negation for `.env.example`.
- Observability signals (logs/metrics) if applicable: Not applicable.

## Stage C - Validation
- Tests and commands: `pnpm agent:finalize`
- Manual checks: None.
- Not validated and why: Pending command outcome.

## Stage D - Pedagogical close
- Decision summary (what changed and why): Expanded `.gitignore` to cover monorepo build artifacts and secrets.
- How it works now (mental model, invariants): Any matching files are ignored at any depth; `.env.example` is explicitly kept.
- Before vs after: Minimal ignore list -> structured, monorepo-appropriate list.
- Impact (performance, maintainability, risk, debt): Reduces accidental commits of generated files.
- Learnings and concepts (links to ADR or concept cards): Not applicable.

## Artifacts created
- Prompt file: `prompts/003-gitignore-monorepo.md`
- ADR: Not required.
- Concept card: Not required.
- Flow doc: Not required.
- Runbook: Not required.
