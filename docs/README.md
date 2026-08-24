# BackThen implementation documentation

This folder translates [`master-prompt.md`](../master-prompt.md) into an actionable plan for building BackThen. The master prompt remains the product source of truth; these documents organize it for design, engineering, testing, and release work.

## Product in one sentence

BackThen is a private, mobile-first service that asks one thoughtful question each week and turns each voice, text, or photo response into a lasting, organized memory.

## Build principle

The essential loop is:

> Email arrives → user opens a question → remembers → speaks or writes → sees a beautiful preserved memory → leaves.

Every MVP decision should make that loop simpler, safer, or more emotionally rewarding. BackThen is not a journal, social network, generic AI chatbot, genealogy tool, or photo drive.

## Document map

| Document | Purpose |
| --- | --- |
| [01-product-and-scope.md](01-product-and-scope.md) | Product rules, audience, MVP scope, and success criteria |
| [02-user-experience.md](02-user-experience.md) | Primary journeys, screens, states, copy, and accessibility |
| [03-architecture.md](03-architecture.md) | Proposed technical architecture, modules, integrations, and background jobs |
| [04-data-model.md](04-data-model.md) | Postgres model, storage layout, RLS boundaries, and lifecycle rules |
| [05-ai-and-question-engine.md](05-ai-and-question-engine.md) | AI contracts, truthfulness guarantees, prompt selection, and evaluation |
| [06-security-privacy-and-durability.md](06-security-privacy-and-durability.md) | Threat model, privacy controls, retention, exports, and operational safeguards |
| [07-delivery-plan.md](07-delivery-plan.md) | Milestones, dependency order, acceptance gates, and deferred work |
| [08-testing-and-observability.md](08-testing-and-observability.md) | Test strategy, analytics, logging, and production readiness |
| [09-foundation-and-deployment.md](09-foundation-and-deployment.md) | Local setup, environment isolation, CI, deployment, and clean-clone verification |
| [adr/README.md](adr/README.md) | Accepted architecture and product-policy decisions |

## Requirement priorities

- **P0 — Core promise:** authenticate, onboard, deliver one question, answer with text or voice, preserve originals, revisit memories, and keep everything private.
- **P1 — Production MVP:** photos, AI polish, grounded follow-ups, timeline, people confirmation, search, weekly email, annual subscription, export, admin questions, and demo data.
- **P2 — After product-loop validation:** places, richer personalization, contributions, interviews, chapters, digital books, sharing, and gifts.
- **P3 — Future:** family archives, printed books, video, family trees, multilingual support, and trusted-person access.

## Accepted foundation

The master prompt mandates Supabase/Postgres, Supabase Auth and Storage, and Stripe. The remaining foundation choices have been accepted in the [ADR index](adr/README.md):

- Next.js with TypeScript for the responsive web app and server endpoints
- Supabase for Auth, Postgres, private object storage, and scheduled/database facilities
- Stripe Checkout, Billing Portal, and signed webhooks for the $12/year plan
- Resend for weekly question emails
- A provider-neutral server-side AI adapter for transcription and language tasks
- Vercel hosting and scheduled functions for the initial deployment
- A United States, age-18-and-older initial launch boundary
- Thirty-day deletion recovery and seven-day generated-export expiry
- Bounded trial/subscriber media quotas and cross-browser MVP media formats
- No AI-provider training on customer content, with minimized provider retention
- Immutable submitted originals with later edits stored as new revisions
- Task-specific AI and analytics provider selections deferred until executable milestone evidence exists
- Seven-day database backup retention with explicit database and media recovery objectives
- Concrete Core Web Vitals, bundle, server-response, and preservation performance budgets
- User-confirmed approximate-year suggestions that preserve the original approximate age

Do not couple domain logic to any one AI model or infrastructure vendor. Revisit an ADR when operational evidence invalidates its assumptions.

## Definition of MVP success

A new user can complete the first-memory journey on a phone in minutes, then receive and answer a future weekly question directly from email. Months later, the same user can find and read preserved memories. Original text, recordings, and transcripts remain available, and no private content is exposed without an explicit user action.
