# Testing and observability

## Test strategy

Prioritize tests around irreversible trust failures: cross-user access, lost originals, fabricated text, duplicate billing/delivery, and incorrect deletion/export.

### Unit tests

- Question eligibility, sensitivity exclusions, scoring, variety, and skip feedback
- Date/age/life-period normalization without false precision
- Entitlement projection from Stripe event fixtures
- AI structured-output validation and grounding checks
- Analytics property allowlist that rejects memory text/transcripts
- Token hashing, expiry, and scope checks

### Database and policy tests

For every user-owned resource, test owner read/write, another user, unauthenticated, admin, and trusted worker behavior. Include indirect access through joins, RPCs, views, search documents, and storage metadata.

Test constraints for:

- One weekly assignment per user/period
- One memory per answered assignment
- Append-only original/raw transcript revisions
- Private default privacy status
- Valid state transitions for questions, jobs, and transcription

### Integration tests

- Auth callback → onboarding resume → first assignment
- Text submit transaction and duplicate retry
- Signed upload → validation → memory creation → signed playback
- Transcription success, delay, retry, permanent failure, and source deletion
- Polish consent and original preservation
- Weekly scheduling across DST/time zones and job retries
- Email link expiration and reauthentication
- Stripe signed webhook, replay, out-of-order delivery, cancellation, and renewal
- Export isolation and full account deletion

### End-to-end tests

Maintain a small critical suite:

1. New user preserves a written first memory.
2. New user preserves a voice memory while transcription is delayed.
3. Existing user opens weekly email, answers, and sees the next-delivery state.
4. User skips a sensitive prompt and selection honors the preference.
5. User searches and revisits a seeded old memory.
6. User starts subscription; verified webhook activates entitlement.
7. User exports and deletes their account.
8. Attacker account cannot open another account's memory or media URL.

Run at mobile and desktop breakpoints, keyboard-only, and with reduced motion. Test current Safari/iOS, Chrome/Android, and major desktop browsers supported by product policy.

### AI evaluation tests

Use the fictional corpus defined in [05-ai-and-question-engine.md](05-ai-and-question-engine.md). Prompt/model changes must pass regression thresholds before staged release. Manual review should focus on invented facts, uncertainty loss, name/date changes, and intrusive follow-ups.

## Performance budgets

The concrete budgets are recorded in [ADR 0016](adr/0016-answer-route-performance-budgets.md): LCP at most 2.5 seconds, INP at most 200 milliseconds, CLS at most 0.1, route-specific client JavaScript at most 150 KB compressed, authenticated question-read server response at most 800 milliseconds p95 in the initial region, and preservation acknowledgement at most two seconds p95 excluding media transfer.

Implementation guidance:

- Weekly question page should be server-rendered/cache-efficient and avoid loading archive data.
- Core page content should become usable on a mid-range phone over constrained mobile networking within a few seconds.
- Defer audio players, historical photos, timeline visualization, and book assets until requested/in view.
- Keep client JavaScript for the answer screen intentionally small.
- Upload/transcription progress must not block navigating back to a safely preserved memory.

Track Core Web Vitals at the 75th percentile without capturing page content.

## Product analytics

Allowed event names from the master prompt:

- `account_created`
- `onboarding_completed`
- `first_memory_started`
- `first_memory_completed`
- `voice_memory_completed`
- `weekly_question_opened`
- `weekly_question_answered`
- `question_skipped`
- `photo_added`
- `subscription_started`
- `subscription_cancelled`
- `export_created`
- Later: contribution and book events

Properties should be allowlisted and limited to items such as question category, answer medium, duration bucket, client type, trial/paid state, and safe error code. Never include questions, answers, transcripts, names extracted from stories, filenames, signed URLs, or raw search terms.

## Operational telemetry

Monitor counts, rates, latency percentiles, and safe error codes for:

- Authentication callback failures
- Active weekly assignment creation and duplicates prevented
- Email queued/sent/delivered/bounced/complained
- Upload/finalization failures and rejected sizes/types
- Transcription/AI queue depth, latency, retries, failures, and cost
- Memory submission success and idempotent replay
- Search errors/latency
- Stripe webhook verification, lag, replay, and projection failure
- Export/deletion queue age and failure
- Database/storage availability and backup freshness

Logs should use request/job correlation IDs and resource IDs that are safe for operations. Redact session tokens, email-link tokens, Stripe payload details, signed URLs, and all memory content.

## Alerts and runbooks

Create actionable alerts for:

- Weekly assignments or emails below/above expected range
- Queue age exceeding service objectives
- Sustained transcription or upload failure spikes
- Stripe webhook backlog or signature failures
- Authorization/RLS denials that change sharply
- Export/deletion jobs stuck past objective
- Backup failure or restore verification overdue
- Unusual service-role/bulk access

Each alert needs an owner, severity, user impact, immediate containment steps, safe diagnostic queries, and recovery verification. Never instruct responders to paste private memory bodies into tickets or chat.

## Release checklist

- Acceptance gate for the current delivery milestone passes.
- Schema migration and rollback/roll-forward plan rehearsed on staging.
- RLS and storage isolation suite passes.
- Critical end-to-end suite passes at mobile and desktop sizes.
- Accessibility checks include automated scan plus manual keyboard/recorder review.
- AI regression suite passes for changed models/prompts.
- No secrets or private content appear in build artifacts, logs, traces, or analytics samples.
- Dashboards and alerts cover new jobs/integrations.
- Feature flag or rollback path exists for risky derived features.
- First-memory and weekly-email flows are manually rehearsed in staging.
