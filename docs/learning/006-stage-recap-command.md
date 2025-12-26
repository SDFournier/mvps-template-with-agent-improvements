# Stage recap command

## Definition
Generate a long-form recap of the last N implemented stages using prompt
artifacts, including links and code snippets for learning.

## When to use it
- You want a deep summary of recent stages.
- You need to learn the motivation and trade-offs behind implementations.

## Common mistakes
- Running without a stage prompt in `prompts/`.
- Expecting non-stage prompts to be included.
- Requesting too many stages and getting noisy output.

## Example in this stack
- Run `node scripts/recap-stages.js 2`.
- Or `pnpm recap:stages -- 2`.

## Observability
- Output includes the prompt file paths used for the recap.

## Links
- prompts/README.md
- docs/learning/README.md
