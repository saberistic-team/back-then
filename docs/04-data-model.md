# Data model

## Modeling principles

- `auth.users.id` is the identity root; application-owned data references it through `profiles.user_id` or a direct `user_id` where useful for RLS and query performance.
- Original user content and derived AI content are separate, versioned records.
- User-question assignment is a durable entity, not a computed UI state.
- Media metadata lives in Postgres; media bytes live in private storage.
- Extracted people, places, and topics remain candidates until confirmed.
- Prefer archival/soft deletion for user mistakes and controlled hard deletion for privacy requests.
- Add `created_at` and `updated_at` consistently using database defaults/triggers.

## MVP tables

### `profiles`

`id`, `user_id unique`, `first_name`, `birth_year`, `birth_date optional`, `childhood_location`, `onboarding_completed_at`, `created_at`, `updated_at`

### `user_preferences`

`user_id primary key`, `preservation_interests text[]`, `delivery_day`, `delivery_window`, `timezone`, `sensitive_topics text[]`, `created_at`, `updated_at`

Store an IANA time-zone name, not only a UTC offset.

### `subscriptions`

`user_id primary key`, `stripe_customer_id unique`, `stripe_subscription_id unique`, `status`, `price_id`, `current_period_start`, `current_period_end`, `cancel_at_period_end`, `created_at`, `updated_at`

This is a projection of Stripe state. Keep processed webhook events separately.

### `questions`

`id`, `question_text`, `category`, `life_stage`, `age_min`, `age_max`, `generation_tags`, `relationship_tags`, `location_tags`, `depth`, `emotional_intensity`, `sensitivity_level`, `sensitive_topics`, `supports_follow_up`, `suitable_contexts`, `active`, `version`, `created_by`, `created_at`, `updated_at`, `archived_at`

Question text changes should increment version or create a revision so past memories retain the wording actually asked.

### `user_questions`

`id`, `user_id`, `question_id`, `question_text_snapshot`, `question_version`, `delivery_period`, `scheduled_for`, `activated_at`, `status`, `skipped_reason`, `answered_memory_id`, `parent_memory_id optional`, `created_at`, `updated_at`

Statuses: `scheduled`, `active`, `answered`, `skipped`, `saved_for_later`, `expired`.

Constraints:

- Unique `(user_id, delivery_period)` for standard weekly assignments.
- `answered_memory_id` unique when non-null.
- Status-specific check constraints for answered/skipped fields.

### `memories`

`id`, `user_id`, `user_question_id optional`, `title`, `display_revision_id optional`, `memory_date_type`, `memory_date optional`, `approximate_year optional`, `approximate_age optional`, `life_period optional`, `privacy_status`, `processing_status`, `created_at`, `updated_at`, `deleted_at optional`

Date type values: `exact_date`, `year`, `approximate_year`, `age`, `life_period`, `unknown`.

Privacy status should default to `private`; MVP may only permit `private` until explicit sharing is built.

### `memory_revisions`

`id`, `memory_id`, `revision_type`, `text`, `source_revision_id optional`, `created_by_type`, `ai_run_id optional`, `created_at`

Revision types: `original_text`, `raw_transcript`, `user_edit`, `polished`. Original and raw-transcript revisions are append-only. `display_revision_id` chooses presentation without destroying history.

### `recordings`

`id`, `memory_id`, `storage_object_id`, `duration_seconds`, `mime_type`, `byte_size`, `transcription_status`, `created_at`, `deleted_at optional`

### `memory_photos`

`id`, `memory_id`, `storage_object_id`, `caption`, `date_type optional`, `approximate_date optional`, `sort_order`, `created_at`, `deleted_at optional`

### `storage_objects`

`id`, `owner_user_id`, `bucket`, `object_path unique`, `kind`, `mime_type`, `byte_size`, `sha256 optional`, `status`, `created_at`, `verified_at`, `deleted_at optional`

Centralizing ownership makes upload finalization, signed access, export, and erasure auditable.

### `people`

`id`, `user_id`, `name`, `relationship`, `notes`, `created_at`, `updated_at`, `deleted_at optional`

### `memory_people`

`memory_id`, `person_id optional`, `candidate_name`, `confidence`, `confirmation_status`, `created_at`, `confirmed_at optional`

Status: `suggested`, `confirmed`, `rejected`. A candidate does not require a permanent person row until confirmation.

### `ai_runs`

`id`, `user_id`, `memory_id optional`, `task_type`, `provider`, `model`, `prompt_version`, `input_revision_ids`, `status`, `safety_flags`, `started_at`, `completed_at`, `error_code optional`

Do not duplicate private prompt/response bodies into logs. Output belongs in the relevant revision/candidate table.

### `jobs`

`id`, `job_type`, `dedupe_key unique`, `subject_type`, `subject_id`, `status`, `attempt_count`, `available_at`, `locked_at`, `last_error_code`, `created_at`, `updated_at`

If a managed job system provides equivalent durability and visibility, this table may be replaced by that system.

### `email_deliveries`

`id`, `user_id`, `user_question_id`, `template_version`, `provider_message_id`, `status`, `attempt_count`, `scheduled_for`, `sent_at`, `created_at`, `updated_at`

### `stripe_events`

`stripe_event_id primary key`, `event_type`, `status`, `received_at`, `processed_at`, `error_code optional`

### `export_requests`

`id`, `user_id`, `status`, `format`, `storage_object_id optional`, `expires_at optional`, `created_at`, `completed_at optional`

### `analytics_events`

Prefer sending allowed events to a privacy-conscious event system. If retained locally: `id`, `user_id optional`, `session_id`, `event_name`, `properties jsonb`, `created_at`. Enforce an allowlist that rejects answer text and media identifiers.

## Deferred extension tables

Create only when their phase begins:

- `places`, `memory_places`
- `chapters`, `chapter_memories`
- `contribution_requests`, `contributed_memories`
- `interview_projects`, `interview_memories`
- `generated_books`, `book_sections`, `book_source_links`
- `memory_shares`
- `family_projects`, `project_members`

For generated books, paragraph/section records must link back to source memory revisions to maintain provenance.

## Important indexes

- All owner-scoped tables: `(user_id, created_at desc)` where relevant.
- `user_questions(user_id, status, scheduled_for)`.
- `memories(user_id, deleted_at, created_at desc)`.
- Timeline index on owner plus normalized sortable year/date.
- Unique lower-cased person name per user only if product behavior supports merging; otherwise allow duplicates and add merge tooling.
- Full-text GIN index on a user-safe search document derived from permitted display/original revisions.
- `jobs(status, available_at)` and delivery status indexes.

## RLS policy matrix

| Resource | Authenticated user | Admin | Anonymous/token user |
| --- | --- | --- | --- |
| Profile/preferences | Own rows only | Operational metadata only by default | None |
| Questions | Read active questions | Manage questions | None |
| User questions | Own rows only | Aggregate/operational access | Future narrowly scoped token only |
| Memories/revisions | Own rows only | No routine access | Future explicit share only |
| Media metadata | Own rows only | No routine access | Future explicit share/contribution only |
| Subscription | Read own projection | Billing operations | None |
| AI/jobs/delivery | Read safe status where needed | Operational fields | None |

Service-role operations must still perform explicit authorization and should be limited to trusted server code. “Service role bypasses RLS” is not an authorization design.

## Storage layout

Private buckets only, with non-guessable IDs and ownership verified from Postgres:

```text
recordings/{user_id}/{memory_id}/{recording_id}/original.{ext}
photos/{user_id}/{memory_id}/{photo_id}/original.{ext}
exports/{user_id}/{export_id}/archive.zip
book-assets/{user_id}/{book_id}/...
```

Do not accept an object path from the client as proof of ownership. Signed reads should be short-lived and issued only after an authorization check.

## Data lifecycle

- Draft: mutable and recoverable.
- Preserved original: append-only.
- Derived output: replaceable only by creating a new revision.
- User delete: hide immediately, revoke access, and queue object/data purge after the 30-day recovery period defined in [ADR 0010](adr/0010-deletion-recovery-and-export-expiry.md).
- Account delete: disable access, cancel/reconcile billing as appropriate, revoke tokens, queue complete relational and object erasure, and retain only legally required billing records.
- Export: snapshot the user's owned content and sources; generated archives and download access expire after seven days under [ADR 0010](adr/0010-deletion-recovery-and-export-expiry.md).
