# Pedagogical quiz cadence

## Definition
Generate advanced quizzes every four prompts to reinforce concepts,
surface trade-offs, and correct misconceptions with targeted follow-ups.

## When to use it
- There have been four prompts since the last quiz update.
- New concepts, trade-offs, or flows were introduced in recent prompts.
- The user asks for deeper understanding or self-checks.

## Quiz candidates
- Any user question is a candidate for a quiz item.
- Any incorrect assumption is a candidate for a corrective quiz item.
- Capture the origin in the quiz bank entry for traceability.

## Quiz delivery rule
- Every four prompts, ask three quiz questions.
- The question wording must come from the quiz bank.
- Use varied formats (short answer, trace, ordering, or scenario), not just MCQ.
- Do not repeat the same quiz question consecutively.

## Common mistakes
- Repeating basic questions without tying them to recent changes.
- Skipping feedback loops (grading + follow-up questions).
- Failing to consolidate quizzes into the shared quiz bank.

## Example in this stack
- Create new questions based on the last four prompts.
- Merge related questions into existing topics in
  docs/learning/quiz-bank.md.
- Provide feedback, corrections, and new follow-up prompts to
  refine understanding.

## Observability
- Quiz bank updated with a new dated section every four prompts.
- Quiz bank entries note the originating question or assumption when applicable.
- Prompt artifacts mention which quizzes were generated or updated and note the
  last quiz ids used to avoid repeats.

## Links
- docs/learning/quiz-bank.md
- docs/good-practices.md
