# Flows

Use this folder to document end to end user flows with diagrams.
Each flow should connect user intent, API endpoints, and data changes.

## Template
Title
- Goal
- Actors
- Preconditions
- Steps (bullets)
- Postconditions
- Related playbook
- Related contracts

## Diagram
Use Mermaid to describe the flow.

```
flowchart LR
  A["User"] -->|"action"| B["UI"]
  B -->|"request"| C["API"]
  C -->|"response"| B
```

## Change rule
If a flow changes, update the diagram and add a short before/after note.
