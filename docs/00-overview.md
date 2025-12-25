# Overview

## Purpose
This repo is a reusable MVP base and a learning system. Documentation is the
source of truth for decisions, patterns, and guardrails, so features can be
recreated even if implementations change.

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

## Source of truth rules
- Canonical guidance lives in: good-practices, contracts, feature playbooks,
  change checklist, test matrix, testing, and decision log/ADRs.
- Do not restate these rules in other docs; link to them instead.
- Avoid duplicating the same guidance in different languages.

## Documentation rules
- Avoid referencing specific files or line numbers.
- Explain why choices exist and when to revisit them.
- Keep decisions and standards centralized to avoid drift.
