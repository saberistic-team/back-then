# Security, privacy, and durability

## Trust promise

BackThen holds unusually personal, long-lived data. Privacy and retrievability are product features, not only compliance work:

- Memories are private by default.
- Stories are not sold or used as public content.
- Nothing becomes public without a specific user action.
- Users can export and delete their data.
- Original text, recordings, transcripts, and photos survive AI transformations.

Any public wording must match actual system behavior.

## Principal threats

- Cross-account access caused by missing authorization or incorrect RLS.
- Public or long-lived media URLs exposing photos/audio.
- Guessable or over-broad magic, contribution, export, or share links.
- Client tampering with `user_id`, subscription status, storage paths, or memory ownership.
- Forged/replayed Stripe webhooks or duplicate background work.
- Sensitive memory bodies leaking through logs, analytics, traces, support tools, or AI vendor retention.
- Stored XSS through rendered memory text or captions.
- Abuse of recording/upload/transcription endpoints for storage or cost attacks.
- Accidental loss caused by overwrite, partial upload, migration, or deletion bugs.
- Excessive administrator access to private content.

## Required controls

### Authentication and authorization

- Use Supabase Auth and secure, HTTP-only session handling where supported by the chosen framework.
- Derive user identity server-side and scope every protected operation to it.
- Enable RLS on every user-owned table before production data exists.
- Test policies for owner, other user, unauthenticated user, admin, and service worker roles.
- Keep admin roles out of editable profile metadata; use trusted claims/role tables.
- Require recent reauthentication for destructive account and security actions.

### Media and links

- Use private buckets only and short-lived signed read/write URLs.
- Verify final object path, owner, content type, signature/magic bytes, and size before creating a durable record.
- Use cryptographically random, hashed-at-rest tokens for future shares/contributions.
- Scope tokens to a single action/resource, set expiry where appropriate, support revocation, and rate-limit attempts.
- Do not put private content, raw tokens, or signed URLs into analytics or logs.

### Server and integration boundaries

- Keep Stripe, Supabase service-role, AI, email, and job credentials server-only.
- Verify Stripe signatures from the raw request body and deduplicate by event ID.
- Validate inputs and sanitize rendered user content; do not render AI/user HTML directly.
- Apply rate and quota limits by user/IP to auth, recording, uploads, AI, exports, and token endpoints.
- Protect state-changing cookie-authenticated requests from CSRF.
- Restrict outbound fetches to prevent SSRF if remote imports are introduced later.

### AI privacy

- Send the minimum content required for each task.
- Configure vendor retention/training settings to meet the product promise.
- Document subprocessors and data regions before launch.
- Never allow instructions embedded in a user's memory to override task rules or request secrets/tools.
- Do not include unrelated memories in a prompt merely to improve personalization.

## Privacy controls

The Privacy area must support:

- Explain private-by-default behavior in plain language.
- Export request and status.
- Per-memory, recording, and photo deletion.
- Future share/contribution-link revocation.
- Account deletion with clear consequences and confirmation.
- Sensitive-topic preferences.
- A contact path for privacy/support requests.

Define a privacy policy, terms, AI-processing disclosure, minimum-age policy, and retention schedule before accepting production users. Legal review depends on launch regions and is not replaced by this document.

## Administrative access

- Admins may manage question content and view aggregate operational metrics without reading memories.
- If support access to private content becomes necessary, require explicit user initiation/consent, time-bound elevation, reason entry, and immutable audit records.
- Separate billing/support/question-editor privileges.
- Alert on unusual service-role or bulk access patterns.

## Durability strategy

- Store media and relational metadata separately, linked by immutable identifiers.
- Use checksums where practical and verify uploads before marking them preserved.
- Never destructively update original revisions or media.
- Use transactional database writes for memory + assignment status.
- Configure managed Postgres backups and point-in-time recovery appropriate to the promise.
- Use storage redundancy/versioning where available and document provider guarantees.
- Test restoration, not only backup creation.
- Keep schema migrations forward-safe and rehearse rollback/roll-forward procedures on staging.

Suggested objectives to decide before launch:

- Database recovery point objective and recovery time objective
- Media recovery expectations
- Maximum acceptable transcription/job delay
- Export generation time
- Incident notification and status communication process

## Deletion model

1. User delete immediately removes content from normal reads and revokes links.
2. A documented recovery window permits accidental-delete recovery, unless the user requests immediate erasure where required/supported.
3. Purge job deletes derived assets, originals, search indexes, and relational records in dependency order.
4. Account deletion reconciles subscription state, revokes sessions/tokens, and purges owned content.
5. Audit/billing records retain only minimal fields required for security or law and never retain memory bodies.
6. Backups age out according to the disclosed retention schedule.

## Security release gate

- RLS integration tests pass for every user-owned table.
- Storage objects cannot be listed/read without authorization.
- Signed URLs expire and cannot cross users.
- Upload validation and quotas work for malformed/oversized input.
- Stripe webhook verification and replay tests pass.
- Stored-XSS and CSRF tests pass.
- Logs/traces/analytics are sampled and contain no private bodies or secrets.
- Export contains only the requester's records; deletion removes the correct scope.
- Dependency and secret scans pass.
- Backup restore has been exercised in a non-production environment.

