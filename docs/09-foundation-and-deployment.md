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

The foundation migration creates a private, RLS-enabled `foundation` schema used only to prove migrations and fixture loading. A separate idempotent migration provisions the private `recordings` and `photos` Storage buckets with the MIME allowlists and byte limits from ADR 0011. It does not pre-build the Milestone 1 product schema. The TypeScript fixture loader refuses non-loopback database hosts.

For hosted projects, link and migrate staging and production separately. Always inspect the linked project reference and a migration dry run before applying a hosted migration. Never link a developer checkout to production for routine work. Provision and verify staging repeatably with:

```sh
pnpm exec supabase link --project-ref "$SUPABASE_PROJECT_REF"
pnpm exec supabase db push --linked --dry-run
pnpm exec supabase db push --linked
DEPLOYMENT_ENV=staging \
  SUPABASE_PROJECT_REF="$SUPABASE_PROJECT_REF" \
  SUPABASE_DB_PASSWORD="$SUPABASE_DB_PASSWORD" \
  pnpm db:verify:staging-storage
```

`SUPABASE_DB_PASSWORD` is a staging-only secret and must never be committed or configured in Vercel. The read-only verification command pins the public `yzzmfeqivsanztuaztdf` staging project reference and its pooler identity, so it cannot be redirected to local or production resources through environment configuration. Local `pnpm db:verify` enforces the same bucket contract after every reset and in CI. The protected staging deployment runs the hosted check before building or publishing a release.

## Vercel and GitHub environments

`vercel.json` identifies the Next.js framework, pinned install/build commands, and initial United States region. Vercel's native GitHub integration creates pull-request previews with Git Fork Protection enabled, so pull-request code never receives a Vercel account token from GitHub Actions.

Automatic Git-based deployment is disabled for `main`; the CI-gated `.github/workflows/deploy-staging.yml` workflow owns the persistent non-production deployment. Other branches remain eligible for native Vercel Preview deployments.

The persistent staging address is [https://backthen-staging-saberistics-projects.vercel.app](https://backthen-staging-saberistics-projects.vercel.app). Each successful release moves only this alias, while retaining the immutable deployment URL for diagnosis and rollback.

Create a GitHub environment named `staging`, then add these secrets:

- `SUPABASE_DB_PASSWORD`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Configure Vercel's Preview environment with the staging environment values. Keep all feature flags off, `STRIPE_MODE=test`, and `EMAIL_DELIVERY_MODE=sandbox`. Do not add service-role, Stripe, Resend, AI, or other private credentials to the shared Preview environment. Weekly delivery is disabled, so preview code cannot send a real scheduled question.

Enable automatic staging only after its secrets and Vercel environment variables are present:

- Repository variable `VERCEL_STAGING_ENABLED=true`

Until enabled, the staging workflow is a safe no-op. Staging has no manual deployment bypass: it runs only after the `CI` workflow succeeds for a `main` push from this repository and checks out the exact commit that CI tested.

Protect `main` with strict, up-to-date required checks for `Quality and build`, `Migrations and fixtures`, `Browser scaffold`, and `Secret scan`. Apply the checks to administrators, reject force pushes and deletion, require conversation resolution, and restrict the GitHub `staging` environment to protected branches.

## Staging proof

A staging release is acceptable only when all of the following are captured in the deployment record:

1. `pnpm env:verify-matrix` passes for committed templates.
2. The staging build receives `DEPLOYMENT_ENV=staging` and `ENVIRONMENT_ID=backthen-staging`.
3. The staging health response reports `environment: staging` and no credentials or feature-flag values.
4. The configured Supabase project reference is the dedicated staging reference.
5. Stripe uses a test key if configured; email uses sandbox mode; demo and billing bypass are false.
6. The deployed commit matches the commit that passed CI.

The staging workflow enforces this record automatically. Before moving the stable alias, it verifies both Vercel's detected GitHub SHA and explicit tested-SHA metadata, requires the candidate deployment to be ready, and checks its protected `/api/health` endpoint. It then publishes the stable alias as the GitHub `staging` environment URL, confirms that the alias resolves to the verified deployment ID, checks health again through the alias, rejects any health payload beyond the four safe fields, and writes the stable URL, immutable URL, deployment ID, tested commit, and health result to the GitHub job summary.

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
