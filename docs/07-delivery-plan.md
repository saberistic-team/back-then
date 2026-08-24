# Delivery plan

## Delivery strategy

Build vertical slices that end in user-visible value. Do not implement all tables, all screens, or all AI functions before testing the first-memory loop. Each milestone below has an acceptance gate; later work should not conceal a broken core loop.

## Milestone 0: decisions and foundation

Deliverables:

- Record architecture decisions for framework/hosting, jobs, email, AI providers, recording limits, and exports.
- Establish local, staging, and production environment separation.
- Create schema migration, seed, lint, test, and deployment workflows.
- Add fictional demo fixtures and feature-flag strategy.
- Define privacy/retention, minimum age, trial, cancellation, and upload policies.

Gate: a developer can create a clean local environment from documented steps; staging deploys without production credentials or data.

## Milestone 1: first written memory

Deliverables:

- Landing page and approved core copy
- Supabase authentication
- Minimal resumable onboarding
- Initial curated questions and first-question assignment
- Written draft and idempotent submit
- Memory result, list, and detail
- Baseline RLS and private-by-default policies
- Activation analytics without content bodies

Gate: on a 320px-wide phone viewport, a new user can sign up and preserve the first written memory; a second user cannot access it through UI, API, or direct Supabase queries.

## Milestone 2: voice and photos

Deliverables:

- Accessible recorder with local interruption/retry behavior
- Signed direct upload and verified finalization
- Private playback URLs
- Asynchronous transcription with processing/failure states
- Raw transcript as an immutable revision
- Photo upload, validation, caption, ordering, and deletion

Gate: a recording is safe and playable even if transcription fails; retrying finalize/submit cannot duplicate a memory; unauthorized media reads fail.

## Milestone 3: interviewer assistance

Deliverables:

- Provider-neutral AI adapters and run metadata
- Explicitly requested light polish with side-by-side original
- Grounded title suggestion
- People candidates and confirmation
- One grounded, sensitivity-checked follow-up
- Fictional evaluation corpus, prompt versions, feature flags, and kill switches

Gate: evaluation tests find no accepted invented facts in the release corpus; all derived text is traceable to source revisions and can be disabled without breaking preservation.

## Milestone 4: recurring weekly loop

Deliverables:

- 100+ editorially reviewed questions with complete metadata
- Delivery preferences and sensitive-topic settings
- Deterministic eligibility/scoring and assignment history
- Idempotent scheduler and email delivery ledger
- Secure email deep link
- Skip reasons, save for later, and post-answer Today state
- Bounce/retry operational handling

Gate: simulated time-zone and retry tests produce exactly one weekly assignment and no duplicate sends; sensitive exclusions and skip feedback are honored.

## Milestone 5: archive value

Deliverables:

- Polished memory browsing on mobile and desktop
- Basic timeline with approximate/unknown dates
- Full-text search scoped by owner
- Confirmed people list/detail
- Gentle story statistics
- Random old-memory resurfacing when enough data exists

Gate: a seeded 30-memory account is pleasant to browse, search results never cross accounts, and unknown/approximate dates are never presented as exact.

## Milestone 6: business and ownership

Deliverables:

- Stripe annual Checkout, Billing Portal, verified webhooks, and entitlement rules
- Trial and post-cancellation experience
- Portable export with originals
- Memory/media/account deletion workflow
- Admin question editor with auditability and no casual memory access
- Privacy center and launch policy pages

Gate: billing state changes only from verified server sources; export and deletion isolation tests pass; admin roles cannot browse memory bodies by default.

## Milestone 7: production readiness

Deliverables:

- Accessibility and performance audit
- Rate limits, quotas, dependency/secret scans, and abuse controls
- Monitoring dashboards for weekly delivery, processing jobs, uploads, billing, and errors
- Backup restore exercise and incident runbooks
- Cross-browser/mobile test pass
- Demo mode and safe local billing bypass, impossible to enable in production

Gate: all criteria in [08-testing-and-observability.md](08-testing-and-observability.md) pass and a complete first/weekly-memory rehearsal succeeds in staging.

## Dependency order

```text
Auth + profile
  └─> questions + assignments
       └─> written memory ──> archive/search/timeline
       └─> media ownership ──> voice/photos ──> transcription
       └─> preferences ─────> scheduler/email

Immutable revisions ──> polish/entities/follow-up ──> future books
Stripe webhooks ──────> entitlement
Ownership model ──────> export/deletion/future sharing
```

## Phase 2 only after MVP validation

- Personalized question ranking using accumulated context
- Rich People and Places experiences
- Life-map topic coverage
- Contribution links and Stories About Me
- Family interview projects
- Semantic search
- Chapters and digital book generation with provenance
- Explicit memory sharing and revocation
- Gift memberships

## Phase 3

- Collaborative family archives
- Hardcover ordering and annual books
- Richer audio and video
- Photo-triggered prompts and imports
- Conversation-mode interviewing
- Family trees, multilingual storytelling, and trusted-person/legacy access

## Scope check for every ticket

Before accepting implementation work, answer:

1. Does it help someone remember, preserve, organize, or revisit a real story?
2. Is it required for the current milestone?
3. Does it preserve originals and uncertainty?
4. Is it private by default and ownership-scoped?
5. Can it fail without blocking the core memory-preservation path?
6. Is the added operational burden reasonable for a founder-maintained product?

