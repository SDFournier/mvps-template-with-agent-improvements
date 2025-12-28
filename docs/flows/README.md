# Flows

Use this folder to document end to end user flows with diagrams.
Each flow should connect user intent, API endpoints, and data changes.

## Purpose
Document end-to-end flows and keep diagrams in sync with behavior.

## Use when
- You add or change a user journey or multi-step flow.
- You need to explain how APIs and data changes connect.

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

## Viewing diagrams
- VS Code: open the markdown file and use the Markdown Preview
  (Ctrl+Shift+V). Mermaid renders inline in the preview.
- GitHub: Mermaid diagrams render in the web UI preview.
- If Mermaid is not rendering locally, install a Mermaid-enabled Markdown
  preview extension and reopen the preview.

## Change rule
If a flow changes, update the diagram and add a short before/after note.
