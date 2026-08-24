# Technical architecture

## Architecture goals

- Keep the weekly answer path fast and dependable.
- Isolate private user content by authenticated ownership and database policy.
- Preserve originals through append-only versions and private media objects.
- Run slow or failure-prone work asynchronously.
- Keep vendors replaceable, especially AI, email, and background jobs.
- Remain operable by a small team or one founder.

## Proposed system shape

```text
Browser / mobile web
        |
        v
Web application + server endpoints
   |       |        |         |
   v       v        v         v
Supabase  Stripe   Email    AI adapters
Auth/DB/  Billing  provider  transcription/text
Storage      |
   |         v
   +---- background jobs / scheduled workers ----+
```

The browser may use Supabase's authenticated client for narrowly permitted database reads, but sensitive mutations should flow through server endpoints or database functions that derive identity from the session. Stripe, AI, email, exports, question scheduling, and signed storage operations are server-only.

## Suggested application boundaries

### Identity and profiles

- Authentication callbacks and sessions
- Minimal onboarding profile
- Delivery and sensitive-topic preferences
- Admin role checks

### Questions

- Curated question content and metadata
- Eligibility and selection
- Per-user scheduling and status transitions
- Skip feedback and saved follow-ups

### Memories

- Drafts, submission, immutable original revisions, displayed version
- Dates and life periods
- Photos and recordings
- Search and timeline queries
- Soft deletion followed by controlled purge

### Media processing

- Signed upload intent
- Finalize/verify uploaded object
- Transcription job
- Retry and dead-letter handling
- Derived asset cleanup after source deletion

### AI assistance

- Provider-neutral request/response contracts
- Polish, title, entity candidates, and grounded follow-up
- Provenance, model/prompt version, consent, and safety checks

### Billing and entitlement

- Checkout session creation
- Webhook ingestion and idempotent subscription projection
- Billing Portal links
- Server-side entitlement lookup

### Delivery

- User-local scheduling
- Assignment creation before email send
- Signed/deep links and send-attempt ledger
- Bounce and complaint handling

### Administration

- Question CRUD/archive and metadata validation
- Feature flags and email template versions
- Aggregate metrics and restricted support workflows

## Synchronous versus asynchronous work

Keep synchronous:

- Authentication and onboarding
- Draft save and text-memory submission
- Signed upload creation and upload finalization
- Reading a memory, Today, search, and timeline
- Stripe Checkout/Portal session creation

Run asynchronously:

- Audio transcription
- AI polish/title/entity/follow-up generation when not immediately required
- Weekly assignment and email delivery
- Exports and future book generation
- Media metadata extraction and thumbnails
- Deletion purge after a recovery window

Every job needs a stable idempotency key, attempt count, next-attempt time, status, and last safe error. A user action must not wait on an AI response to be considered preserved.

## Key command flows

### Submit written memory

1. Authenticate and load the active `user_question`.
2. Validate that it belongs to the session user and is answerable.
3. In one transaction, create memory + original text revision and mark the assignment answered.
4. Enqueue optional title/entity/follow-up work.
5. Return the preserved memory immediately.

Use a unique relationship from `user_questions.answered_memory_id` so retries return the same result.

### Submit voice memory

1. Server creates a short-lived signed upload for a user-scoped private object key.
2. Browser records and uploads directly to private storage.
3. Server verifies object path, ownership, allowed media type, and size.
4. Transaction creates memory, recording, original media version, and answered assignment.
5. Transcription job writes a raw transcript revision; later AI work writes separate derived revisions.
6. UI polls or subscribes to a safe processing status.

### Assign weekly question

1. Scheduler selects users whose local delivery window is due and who lack an assignment for the period.
2. Selection filters active questions for age/life-stage applicability, sensitive preferences, history, and repetition.
3. Transaction inserts one `user_question` using a unique `(user_id, delivery_period)` key.
4. Delivery job sends the exact assigned question and records provider outcome.
5. Retries reuse the same assignment and delivery record.

### Stripe webhook

1. Verify the raw payload signature before parsing into domain events.
2. Insert Stripe event ID into an inbox table with a uniqueness constraint.
3. Project customer/subscription state using Stripe as billing source of truth.
4. Acknowledge quickly; process safely on retry.
5. Never grant access from a client redirect alone.

## API design guidelines

- Prefer domain commands (`submitMemory`, `skipQuestion`, `confirmPerson`) over generic table mutation endpoints.
- Derive current user from the authenticated server session.
- Use schema validation on all inputs and responses.
- Apply CSRF protection appropriate to the chosen session strategy.
- Return stable domain error codes suitable for accessible UI messages.
- Support an idempotency key for uploads, submissions, checkout creation, and exports.
- Do not log answer bodies, transcripts, signed URLs, tokens, or raw webhook secrets.

## Environment separation

Maintain separate local, preview/staging, and production Supabase/Stripe/email resources. Production data must never be cloned into development. Use fictional seed content.

Expected configuration groups:

- Public web origin and safe public Supabase identifiers
- Server-only Supabase service credentials
- Stripe secret, webhook secret, and annual price ID
- Email sender/domain and provider key
- AI provider credentials and selected model IDs
- Job/scheduler credentials
- Feature flags for billing bypass and demo data, hard-disabled in production

## Architecture decisions

Accepted foundation decisions are indexed in [adr/README.md](adr/README.md). They establish Next.js/TypeScript/Vercel, Supabase, Stripe entitlement policy, Resend, provider-neutral AI adapters, Vercel Cron with durable Postgres job state, a ten-minute recording limit, and a portable ZIP export.

Implementation details still requiring a decision:

1. Exact AI models/providers per capability
2. Upload byte limits, supported codecs, and browser recording format
3. Authenticated email-link/session mechanics
4. Soft-delete recovery period and full account-erasure workflow
