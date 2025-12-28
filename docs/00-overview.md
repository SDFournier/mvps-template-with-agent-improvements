# Overview

## Purpose
This repo is a reusable MVP base and a learning system. Documentation is the
source of truth for decisions, patterns, and guardrails, so features can be
recreated even if implementations change.

## Use when
- You need the document map and entrypoints.
- You want to confirm which docs are canonical vs historical.

## Start here (fast paths)
- Making a change: docs/change-checklist.md -> docs/good-practices.md ->
  docs/feature-playbooks.md -> docs/testing.md + docs/test-matrix.md.
- Adding or changing API shapes: docs/contracts.md -> docs/decision-log.md/adr.
- Understanding system layout: docs/architecture.md -> docs/flows/README.md.
- Learning a concept: docs/learning/README.md -> docs/learning/quiz-bank.md.

## How to use this documentation
1) Start with the feature playbook that matches your change.
2) Read contracts and the test matrix to understand expected behavior.
3) Check the decision log and ADRs to understand why patterns exist.
4) Implement, then extract learnings and update docs.

## Documentation layers
- README: how to run the repo locally.
- Overview: learning goals and navigation.
- Architecture: high level module map and cross cutting concerns.
- Feature playbooks: step by step recipes for common features.
- Contracts: shared data and error shapes.
- Test matrix: required tests per change type.
- Decision log + ADRs: why key choices were made.
- Flows: end to end user flows with diagrams.
- Glossary: shared language for domain and architecture.
- Learning cards: focused lessons on a single concept.
- Runbooks: operations guides for incidents or failures.
- Labs: small, executable experiments for concepts.
- Friction log: ambiguities to resolve in future iterations.

## Documentation index (canonical vs historical vs templates)
Canonical (sources of truth):
- docs/good-practices.md
- docs/change-checklist.md
- docs/feature-playbooks.md
- docs/contracts.md
- docs/testing.md
- docs/test-matrix.md
- docs/decision-log.md and docs/adr/
- docs/architecture.md
- docs/flows/README.md
- docs/environment-standards.md

Historical (context only, no new rules):
- docs/iteration-1.md
- docs/iteration-2.md
- docs/documentation-improvements.md

Templates:
- docs/adr/000-adr-template.md
- docs/learning/000-concept-card-template.md
- docs/flows/README.md
- docs/runbooks/README.md
- docs/labs/README.md

## Doc map (use vs avoid)
| Doc | Use when | Avoid when |
| --- | --- | --- |
| docs/good-practices.md | You need baseline rules for any change. | You need step-by-step feature recipes. |
| docs/change-checklist.md | You want process gates and required steps. | You need detailed architecture rationale. |
| docs/feature-playbooks.md | You are implementing a known feature pattern. | You are looking for API shape contracts. |
| docs/contracts.md | You are changing request/response shapes or errors. | You need testing coverage rules. |
| docs/testing.md | You need how to run tests and validation rules. | You need what to build for a feature. |
| docs/test-matrix.md | You need required test coverage per playbook. | You need how to run the tests. |
| docs/decision-log.md | You need a summary of architectural decisions. | You need the full decision rationale. |
| docs/adr/ | You need the full rationale and trade-offs. | You need a quick summary index. |
| docs/architecture.md | You need the system layer map. | You need detailed flow steps. |
| docs/flows/README.md | You are documenting a new flow. | You need canonical rules or standards. |
| docs/learning/README.md | You want to add or read a concept card. | You need process gates for changes. |
| docs/environment-standards.md | You need env and infra expectations. | You need business rule details. |

## Source of truth rules
- Canonical guidance lives in: good-practices, contracts, feature playbooks,
  change checklist, test matrix, testing, and decision log/ADRs.
- Do not restate these rules in other docs; link to them instead.
- Avoid duplicating the same guidance in different languages.

## Documentation rules
- Avoid referencing specific files or line numbers.
- Explain why choices exist and when to revisit them.
- Keep decisions and standards centralized to avoid drift.
