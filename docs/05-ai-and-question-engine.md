# AI and question engine

## Role of AI

AI is a supporting interviewer and organizer, not the author of a user's life. The product must remain useful if an AI task is delayed or unavailable. A memory is preserved before polishing, title generation, entity extraction, or follow-up generation completes.

## Universal truthfulness contract

All AI tasks that transform personal content must:

- Use only supplied memory material and explicitly provided profile context.
- Preserve uncertainty, attribution, chronology, names, point of view, and meaningful tone.
- Never invent events, dates, dialogue, feelings, motivations, relationships, or locations.
- Never turn an estimate into a fact; “I think I was around eleven” must remain uncertain.
- Return structured output with source references where the task permits.
- Fail closed when the model cannot produce a grounded answer.
- Store task type, provider, model, prompt version, source revision IDs, and completion status.

## AI service contracts

### `transcribeMemory`

Input: authorized recording object, locale hint if known.

Output: raw transcript, optional timestamps/speaker labels, confidence/language metadata.

Rules: never delete audio; clearly distinguish inaudible/uncertain text; do not silently “correct” names.

### `polishMemory`

Input: one immutable text or raw-transcript revision and explicit user consent.

Output: polished text plus an optional list of uncertain edits/flags.

Rules: remove filler and repair readability lightly; retain first person and speaking style; do not create corporate prose; never alter facts. The original remains the default source of truth.

### `suggestMemoryTitle`

Input: source revision.

Output: concise grounded title, preferably concrete (“The Red Bicycle”).

Reject titles containing facts absent from the source.

### `extractEntities`

Input: source revision plus the user's existing confirmed people names when authorized.

Output: candidate people, places, time expressions, ages, events, and themes, each with a supporting excerpt/span and confidence.

Candidates remain suggestions. The user confirms people/relationships before permanent linking.

### `generateFollowUp`

Input: source revision, original question, sensitive-topic preferences, and recent offered follow-ups.

Output: zero or one concrete question with source grounding and sensitivity classification.

Rules: ask about a detail the user supplied; do not diagnose, speculate, or intensify emotional content; normally offer at most one after a memory and never more than two in a thread without explicit user choice.

### `selectWeeklyQuestion`

Input: eligible curated question IDs and limited selection features—not full free-form memories unless necessary and explicitly controlled.

Output: selected question ID plus reason codes.

The model may rank an already filtered set; it must not freely generate the normal weekly prompt.

## Curated question library

Seed at least 100 editorially reviewed questions across:

- Early childhood
- Family
- School
- Teenage years
- Firsts
- People
- Places
- Work
- Everyday life

“Everyday life” deserves deliberate representation because mundane details often become valuable later.

Question metadata should include category, life stage, age range, generation/location relevance, depth, emotional intensity, sensitive topics, contexts (self/parent/grandparent interview), and follow-up/photo suitability.

## MVP selection algorithm

Use deterministic filtering and scoring before considering AI ranking:

1. Exclude inactive, already answered, recently skipped, and recently asked questions.
2. Exclude questions outside declared sensitive-topic preferences.
3. Exclude clearly inapplicable age/life-stage questions.
4. Prefer preservation interests and underrepresented safe categories.
5. Apply variety rules so adjacent weeks do not feel repetitive.
6. Apply skip feedback: “too personal” strongly suppresses similar sensitivity; “ask later” temporarily defers only that question.
7. Choose from the highest safe scoring set using a stable, auditable tie-breaker.

Store selection reason codes and algorithm version. The first production release does not need an LLM for selection.

## Sensitive-content guardrails

- Default weekly pool should favor broadly safe questions.
- Tag questions about grief, relationships, family conflict, health, finances, religion, sexuality, and trauma.
- Never infer that a user wants deeper prompts merely because a memory contains sensitive material.
- Follow-ups must respect the same preferences and should be discarded when classification is uncertain.
- Provide an easy way to skip and update preferences without explanation.

## Evaluation suite

Before enabling an AI task in production, maintain a fictional test corpus containing:

- Uncertain dates and ages
- Similar names and family titles
- Code-switching and colloquial speech
- Contradictory memories
- Inaudible transcript sections
- Sensitive but non-graphic material
- Very short and very long responses
- Adversarial instructions inside memory text

Evaluate:

- Unsupported-fact rate (target: zero accepted hallucinations)
- Preservation of uncertainty and first-person voice
- Name/date alteration rate
- Readability improvement without meaning change
- Follow-up grounding, specificity, sensitivity, and repetition
- Structured-output validity and safe failure behavior
- Latency and cost by task/model version

Use human review on sampled fictional or expressly authorized test data. Never route real memory bodies to evaluation/analytics datasets by default.

## Prompt/version operations

- Version every system prompt and structured schema.
- Roll out material prompt/model changes behind a feature flag.
- Record model and prompt version on every AI output.
- Make jobs replayable from immutable source revisions without overwriting prior output.
- Provide a kill switch per AI capability.
- Surface processing failure honestly while keeping the original usable.

