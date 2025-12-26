# TypeORM migrations in this repo

## Definition
Use TypeORM migration files to version schema changes instead of relying on
automatic `synchronize` updates.

## When to use it
- Any schema change (tables, columns, indexes) is introduced.
- You need repeatable schema history across environments.

## Common mistakes
- Forgetting to add a migration after changing entities.
- Running with `synchronize` enabled and migrations disabled.
- Using non-idempotent SQL in migrations.

## Example in this stack
- Migrations live in `apps/api/src/migrations`.
- Startup runs migrations via `migrationsRun: true`.
- Manual run: `pnpm.cmd --filter @repo/api migrate`.

## Observability
- Log migration failures on startup.
- Track migration runtime for large schema updates.

## Links
- docs/adr/002-typeorm-migrations.md
