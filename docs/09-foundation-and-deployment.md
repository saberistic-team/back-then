# Foundation and deployment

## Environment boundaries

| Environment | Identity | Supabase | Stripe | Email | Demo/billing bypass |
| --- | --- | --- | --- | --- | --- |
| Local | `backthen-local` | Docker-based local stack | Test or absent | Local log server | Permitted explicitly |
| Staging | `backthen-staging` | Dedicated staging project | Test only | Sandbox only | Rejected |
| Production | `backthen-production` | Dedicated production project | Live only | Live only | Rejected |

Committed environment files contain names and modes but no credentials:

- `.env.example`
- `config/environments/staging.env.example`
- `config/environments/production.env.example`

`pnpm env:verify-matrix` parses both hosted templates through the same runtime validator used by the application. It fails if application origins or Supabase project references overlap, if staging uses live Stripe/email modes, or if unsafe feature flags are enabled outside local development.

Hosted secrets belong in Vercel, Supabase, Stripe, Resend, and GitHub environment secret stores. Production data must never be copied into staging or local development; only the fictional fixture archive may be loaded outside production.

## Supabase workflow

The project-local Supabase CLI is pinned in `package.json`. Local configuration lives in `supabase/config.toml`, migrations in `supabase/migrations`, and repeatable SQL seeds in `supabase/seed.sql`.

```sh
pnpm db:start
pnpm db:setup
pnpm db:verify
```

The foundation migration creates a private, RLS-enabled `foundation` schema used only to prove migrations and fixture loading. It does not pre-build the Milestone 1 product schema. The TypeScript fixture loader refuses non-loopback database hosts.

For hosted projects, link and migrate staging and production separately. Always inspect the linked project reference and a migration dry run before applying a hosted migration. Never link a developer checkout to production for routine work.

## Vercel and GitHub environments

`vercel.json` identifies the Next.js framework, pinned install/build commands, and initial United States region. Two gated workflows are present:

- `.github/workflows/deploy-preview.yml` for pull-request previews
- `.github/workflows/deploy-staging.yml` for the persistent non-production deployment

Create separate GitHub environments named `preview` and `staging`, then add these secrets to each:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Configure the Vercel Preview environment with the staging environment values. Keep all feature flags off, `STRIPE_MODE=test`, and `EMAIL_DELIVERY_MODE=sandbox`. Weekly delivery is disabled, so staging cannot send a real scheduled question.

Enable automatic workflows only after their secrets and Vercel environment variables are present:

- Repository variable `VERCEL_PREVIEW_ENABLED=true`
- Repository variable `VERCEL_STAGING_ENABLED=true`

Until enabled, both workflows are safe no-ops on automatic events and remain available through manual dispatch.

## Staging proof

A staging release is acceptable only when all of the following are captured in the deployment record:

1. `pnpm env:verify-matrix` passes for committed templates.
2. The staging build receives `DEPLOYMENT_ENV=staging` and `ENVIRONMENT_ID=backthen-staging`.
3. The staging health response reports `environment: staging` and no credentials or feature-flag values.
4. The configured Supabase project reference is the dedicated staging reference.
5. Stripe uses a test key if configured; email uses sandbox mode; demo and billing bypass are false.
6. The deployed commit matches the commit that passed CI.

Production resources are defined by the matrix but do not need credentials during Milestone 0.

## Clean-clone acceptance exercise

Use a new temporary directory rather than the working copy:

```sh
git clone https://github.com/saberistic-team/back-then.git backthen-clean
cd backthen-clean
corepack enable
corepack install
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm env:check
pnpm fixtures:validate
pnpm env:verify-matrix
pnpm check
pnpm db:start
pnpm db:setup
pnpm db:verify
pnpm test:e2e
pnpm db:stop --no-backup
```

The exercise passes only if it uses fictional data, no production credential, and the commands succeed without undocumented manual file edits.
