# User experience

## Experience principles

- Mobile capture comes first; desktop browsing and organization come second.
- The interface should feel like a modern book, private photo album, and thoughtful interviewer—not SaaS administration software.
- Use warm, quiet, contemporary typography, generous whitespace, clear contrast, and limited motion.
- Prefer one clear action per state. Secondary actions must not compete with answering the weekly question.
- Show accumulation, not compliance. Say “37 memories preserved,” never “you lost your streak.”
- Use “memories,” “stories,” “questions,” “chapters,” “people,” “places,” and “moments”; avoid journal terminology.

## Information architecture

Primary navigation:

- **Today** — active question or post-answer state
- **My Story** — memories, timeline, chapters, places, and later “Stories About Me”
- **People** — confirmed people and related memories
- **Book** — meaningful empty state in MVP; generation is deferred
- **Profile** — delivery, sensitive topics, membership, privacy, export, and account controls

Admin navigation must be separate and role-gated.

## Journey 1: first memory

1. Landing page states the promise, demonstrates week 1 → week 52 accumulation, and shows annual billing clearly.
2. “Start My Story” opens minimal authentication.
3. Onboarding asks first name, birth year, optional childhood location, and preservation interests.
4. The first prompt is “What did your childhood bedroom look like?”
5. User chooses voice or writing; photo can support either path.
6. Submission creates an original memory and formats it as a readable story.
7. Confirmation says “Memory #1 preserved” and explains that the original is safe.
8. A single optional grounded follow-up may appear.
9. The subscription proposition becomes prominent only after this payoff.

Acceptance criteria:

- A user can reach the first question without completing irrelevant profile fields.
- Back navigation and refresh do not lose a saved draft or uploaded recording.
- Submit is idempotent and does not create duplicate memories.
- The result is readable without AI polish.

## Journey 2: weekly email to preserved memory

1. Scheduler assigns one eligible question in the user's configured local window.
2. Email subject is “A question for you” and contains the question plus a single answer CTA.
3. The link uses a short-lived, narrowly scoped authentication/deep-link flow.
4. The destination loads quickly and shows the question, voice, write, and skip actions on one phone screen.
5. The user records or writes, reviews if needed, and submits.
6. The preserved-memory state shows title, response, attached media, and the next delivery time.
7. Optional actions appear below: saved question, add photo, random memory, or later contribution features.

Failure states:

- Expired link: offer a fresh secure sign-in link without losing context.
- Offline/interrupted upload: retain local state, show retry, and do not imply preservation until server confirmation.
- Transcription delay: preserve the audio immediately and show “transcription processing.”
- Transcription failure: keep the audio playable and offer retry or manual text.
- Duplicate click/retry: return the existing active question or memory.

## Journey 3: written answer

- Prominent question, large plain-text field, no rich-text toolbar.
- Automatic local draft protection plus explicit save-draft action.
- Optional approximate date, people, and photo controls are secondary.
- Submission freezes an original revision.
- After submission, offer “Keep original” or “Lightly polish,” with a concise explanation.
- Show original and polished versions distinctly; the user chooses which is presented by default.

## Journey 4: voice answer

- Recording permission is requested only after the user taps record.
- Controls expose recording status, elapsed time, pause/resume if reliably supported, cancel, and finish.
- An accessible text status announces recording changes without relying on color.
- Upload progress and retry are explicit.
- The original audio is considered preserved once its database record and private object are durably committed.
- Raw transcript and optional polished narrative are separate fields/versions.
- Never block access to the recording while language processing is pending.

## Journey 5: skip

“Skip this question” is always available. The optional reason is one of:

- Doesn't apply to me
- Don't remember
- Too personal
- Not interested
- Ask me later

Skipping uses neutral language, makes the active state unambiguous, and informs later selection. “Ask me later” should reschedule rather than count as a content rejection.

## Journey 6: revisit and search

- Memory cards emphasize title, excerpt, approximate time, people, and media—not database metadata.
- Search starts with per-user full-text search and filters for date, people, and response medium where useful.
- Timeline groups known years and life periods while placing unknown-date memories in a clear “Date not added” group.
- Related-memory suggestions must be explainable through shared confirmed people, dates, or topics; semantic connections can come later.

## Screen/state inventory

### Public

- Landing
- Pricing explanation
- Sign in / callback / error
- Privacy and terms

### Authenticated

- Onboarding steps and resume state
- Today: active, answered, skipped, processing, and delivery-error states
- Text composer and voice recorder
- Memory preserved, list, detail, edit, and delete
- Timeline and search results
- People list, candidate confirmation, and person detail
- Delivery preferences, sensitive topics, membership, privacy/export/delete account

### Admin

- Question list, create/edit/archive, metadata validation, preview, and audit history
- Aggregate metrics and operational job status without memory bodies

## Empty-state copy

- No memories: “Every life starts with one story. Let's find yours.”
- No people: “People will appear here as they become part of your stories.”
- No book: “Your book grows from the stories you preserve.” Show the current memory count.
- No search results: suggest broader terms or browsing by time; do not imply the story is empty.

## Accessibility acceptance criteria

- All actions work by keyboard, and focus order follows visual order.
- Every field has a persistent label and actionable validation message.
- Buttons use descriptive names such as “Start voice recording,” not icon-only labels.
- Recording state is announced to assistive technology.
- Text/background and control contrast meet WCAG 2.2 AA.
- Touch targets are at least 44×44 CSS pixels.
- Layout works at 320 CSS pixels and at 200% text zoom.
- Reduced-motion preference disables decorative transitions.
- Dates, progress, and status never rely on color alone.

