# BackThen

BackThen is a private, mobile-first service that asks one thoughtful question each week and turns voice, text, or photo responses into a lasting, organized life story.

The core loop is:

> Question → remember → answer → preserve

This repository contains the Milestone 0 application foundation. The product brief, architecture, data model, privacy requirements, delivery plan, and accepted architecture decisions are documented in [`docs/`](docs/README.md). The original product source of truth is [`master-prompt.md`](master-prompt.md).

## Product principles

- Preserve the user's original words and media.
- Keep memories private by default.
- Never invent biographical facts or erase uncertainty.
- Make voice and mobile capture first-class.
- Avoid streaks, social pressure, and blank-page journaling patterns.
- Keep user data portable through complete exports.

## Foundation stack

- Next.js 16 App Router, React, and strict TypeScript
- Node.js 24.18.0 and pnpm 11.23.0, pinned for reproducible installs
- Local Supabase Auth, Postgres, Storage, migrations, and seeds
- Vitest and Playwright test scaffolds
- Vercel preview/staging workflows
- Runtime-validated environments and server-side feature flags

## Local setup

Prerequisites:

- Node.js 24.18.0
- Corepack, included with the pinned Node.js release
- Docker Desktop or another Docker-compatible daemon

From a clean clone:

```sh
corepack enable
corepack install
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm env:check
pnpm db:start
pnpm db:setup
pnpm db:verify
pnpm dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). The safe health endpoint is available at `/api/health`, and Supabase Studio is available at [http://127.0.0.1:54323](http://127.0.0.1:54323).

Stop the local stack without creating a backup:

```sh
pnpm db:stop --no-backup
```

## Developer commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Run the application locally |
| `pnpm build` | Create a production build |
| `pnpm format` / `pnpm format:check` | Write or verify formatting |
| `pnpm lint` | Run ESLint with zero warnings allowed |
| `pnpm typecheck` | Run strict TypeScript checks |
| `pnpm test` / `pnpm test:coverage` | Run unit tests and coverage gates |
| `pnpm test:e2e` | Run mobile and desktop browser smoke tests |
| `pnpm env:verify-matrix` | Prove staging/production identities and modes are distinct |
| `pnpm fixtures:validate` | Validate the fictional 30-memory archive |
| `pnpm db:reset` | Rebuild local Postgres from migrations and SQL seeds |
| `pnpm db:fixtures` | Idempotently load the fictional demo archive |
| `pnpm db:setup` / `pnpm db:verify` | Load and verify the complete local foundation database |
| `pnpm check` | Run formatting, lint, types, unit coverage, and production build |

The database and browser checks run as separate CI jobs because they require Docker and installed browser binaries.

## Environments and deployment

Local, staging, and production have fixed environment identities and cannot share application origins or Supabase project references. Stripe is test-only and email is sandbox-only in staging. Demo data and billing bypass throw a runtime configuration error outside local development.

See [Foundation and deployment](docs/09-foundation-and-deployment.md) for the environment matrix, GitHub/Vercel setup, staging verification, and clean-clone acceptance exercise.

See the [delivery plan](docs/07-delivery-plan.md) for milestone definitions and acceptance gates, and the [ADR index](docs/adr/README.md) for accepted technical decisions.

## License

BackThen is available under the [MIT License](LICENSE).
