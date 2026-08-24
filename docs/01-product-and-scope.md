# Product and scope

## Product promise

BackThen acts like a patient biographical interviewer. It asks a specific memory-triggering question, accepts a short or long response, preserves the original, and gradually organizes the responses into a personal history.

The recurring loop is **question → remember → answer → preserve**. Scarcity is intentional: one excellent weekly question is the primary habit. Extra prompts may be available, but the interface must never feel like a backlog demanding completion.

## Audience and jobs to be done

Primary user:

- Wants to preserve life stories without maintaining a journaling habit.
- May prefer speaking over typing, especially on a phone.
- Values privacy, ownership, and the ability to export originals.
- Wants a meaningful archive for themselves or family over years.

Core jobs:

1. Help me remember a concrete story I would not have recalled unaided.
2. Let me capture it in the easiest medium available.
3. Preserve my words and media without silently changing their meaning.
4. Make the collection more valuable and navigable over time.
5. Let me retrieve or remove my data without lock-in.

## Non-negotiable product rules

- Never present the product as a journal, diary, mood tracker, or habit tracker.
- Never start with a blank “what's on your mind?” page.
- Never invent biographical facts, dates, dialogue, emotions, or motivations.
- Never overwrite or discard original text, transcript, audio, or photos during AI processing.
- Never make memories public by default.
- Never use streak-loss anxiety, leaderboards, XP, likes, public follower counts, or a social feed.
- Never expose private memory content to third-party analytics.
- Never trust client-provided ownership identifiers.
- Never surprise users with highly sensitive prompts.

## Required MVP capabilities

### Acquisition and activation

- Simple marketing page using the approved headline, value proposition, annual-price framing, and “Start My Story” CTA.
- Supabase authentication with email and Google; magic link is preferred over forcing password creation.
- Approximately 60-second onboarding: first name, birth year, optional childhood location, preservation interests, then the first question.
- Immediate first-memory payoff before a strong subscription ask.
- Seeded demo mode showing the product after approximately 30 memories.

### Weekly loop

- Curated library containing at least 100 high-quality questions with selection metadata.
- One active weekly question per user, with skip and save-for-later handling.
- User-selected delivery day and time window; default Sunday morning.
- Weekly email that deep-links securely into the answer experience.
- Idempotent scheduling so retries do not create duplicate weekly assignments or emails.

### Capture and preservation

- Written answer with drafts, submit, optional photo, approximate date, and people tags.
- First-class mobile voice recorder with upload, secure original storage, transcription, and review.
- Immutable original plus optional, explicitly requested polished version.
- User choice to keep the polished version, transcript, recording, or all of them.
- One grounded optional follow-up, with answer-now and save-for-later choices.

### Archive and retrieval

- Readable memory list and detail page.
- Basic chronology supporting exact, year, approximate year, age, life period, and unknown dates.
- People extraction as unconfirmed suggestions, followed by user confirmation.
- Full-text search across the authenticated user's permitted memory text.
- Export of text/data and associated original media in a portable format.

### Business and operations

- One Stripe plan billed at $12/year and displayed as $1/month, with server-verified entitlement.
- Admin question management without routine access to private memories.
- Private storage, Row Level Security, signed URLs, authorization checks, and validated webhooks.
- Product analytics limited to events and non-sensitive metadata.

## Explicitly deferred

Do not let these delay the core weekly loop:

- Contribution links and “Stories About Me”
- Family interview projects or collaborative archives
- Advanced personalized selection and semantic search
- Places and life-map coverage
- Chapters, book generation, sharing, gifts, and printed books
- Video, conversational interviewer mode, family trees, or multilingual storytelling

The data model may leave clean extension points for deferred features, but MVP screens and services should not implement them prematurely.

## Pricing and entitlement policy

- Public display: **$1/month · $12 billed annually**.
- Actual billing cadence: annual only.
- Let users experience at least their first preserved memory before the paywall becomes prominent.
- Trial entitlement includes the first preserved memory and up to three starter questions, followed by subscription for future weekly delivery.
- Cancellation stops renewal; it must not immediately remove access to owned memories or export.
- After a paid period ends, read, export, and delete access continue while weekly delivery and paid processing pause.

## Success measures

North-star qualitative moment: a user revisits a memory and thinks, “I had completely forgotten about that.”

Initial funnel metrics:

- Landing CTA → account created
- Account created → onboarding completed
- Onboarding completed → first memory started
- First memory started → first memory preserved
- Weekly email delivered → question opened → memory preserved
- First preserved memory → trial conversion
- Four-week and twelve-week preserved-memory retention
- Revisit rate for memories older than 30 days

Measure voice completion separately from written completion. Do not optimize engagement by sending more questions or creating anxiety.

The billing and trial policy is recorded in [ADR 0003](adr/0003-stripe-annual-plan-and-entitlements.md).

The initial United States and age-18 launch boundary is recorded in [ADR 0009](adr/0009-us-launch-and-adult-eligibility.md). Deletion and export retention are recorded in [ADR 0010](adr/0010-deletion-recovery-and-export-expiry.md), media limits in [ADR 0011](adr/0011-mvp-media-formats-and-quotas.md), AI data handling in [ADR 0012](adr/0012-ai-provider-data-handling.md), and post-submission editing in [ADR 0013](adr/0013-immutable-submissions-and-user-edits.md).

## Open product decisions

Resolve these before their dependent milestone:

1. Whether approximate age can derive a suggested year from birth year, with explicit user confirmation.

The initial portable export format is fixed by [ADR 0008](adr/0008-portable-zip-export.md).
