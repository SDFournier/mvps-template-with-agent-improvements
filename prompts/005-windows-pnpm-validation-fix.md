# Prompt: Windows pnpm validation fix

## Context
- Repo en Windows bloquea pnpm.ps1 por PowerShell policy.
- Validacion obligatoria requiere `pnpm agent:finalize`.

## Objective
Documentar el flujo correcto en Windows para instalar deps y correr tests,
y cerrar la friccion registrada.

## Constraints
- Seguir docs/good-practices.md y docs/change-checklist.md.
- Actualizar friccion en docs/friction-log.md.
- No cambios de runtime.

## Stage A - Plan
- What (observable result): docs actualizados con el workaround de Windows.
- Why (motivation + constraint): las validaciones obligatorias fallan sin deps.
- How (steps + modules): editar AGENTS.md, docs/testing.md, docs/friction-log.md.
- Expected result (checklist):
  - AGENTS incluye pnpm.cmd install como fallback.
  - testing.md incluye pasos de Windows.
  - Friccion marcada como resuelta.
- Scope and impact (risk, compatibility): solo documentacion.
- Trade-offs (chosen vs discarded): documentar workaround vs cambiar politica.
- Questions (only if blocking or decision changing): none.

## Stage B - Implementation
- Files touched or created:
  - AGENTS.md
  - docs/testing.md
  - docs/friction-log.md
  - prompts/005-windows-pnpm-validation-fix.md
- Changes by block and rationale:
  - Instrucciones claras para instalar deps y correr tests en Windows.
  - Friccion marcada como resuelta.
- Observability signals (logs/metrics) if applicable: n/a.

## Stage C - Validation
- Tests and commands: `node scripts/agent-finalize.js`.
- Manual checks: n/a.
- Not validated and why: n/a.

## Stage D - Pedagogical close
- Decision summary (what changed and why): se documento el workaround de pnpm en Windows.
- How it works now (mental model, invariants): deps instaladas con pnpm.cmd y tests via node.
- Before vs after: falta de instrucciones -> pasos explicitos.
- Impact (performance, maintainability, risk, debt): reduce fallas de validacion.
- Learnings and concepts (links to ADR or concept cards): docs/testing.md, AGENTS.md.

## Artifacts created
- Prompt file: prompts/005-windows-pnpm-validation-fix.md
- ADR: n/a
- Concept card: n/a
- Flow doc: n/a
- Runbook: n/a
