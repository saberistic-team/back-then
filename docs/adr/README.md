# Architecture decision records

This directory records consequential BackThen product and engineering decisions. Each ADR captures the context, decision, consequences, and conditions that may justify revisiting it.

## Status definitions

- **Proposed:** under consideration and not yet binding.
- **Accepted:** the implementation default.
- **Superseded:** replaced by a later ADR; retained for history.
- **Deprecated:** should no longer be used, with migration still possible.

## Accepted decisions

| ADR | Decision |
| --- | --- |
| [0001](0001-nextjs-typescript-and-vercel.md) | Use Next.js, TypeScript, and Vercel for the initial web application |
| [0002](0002-supabase-platform.md) | Use Supabase for authentication, Postgres, and private object storage |
| [0003](0003-stripe-annual-plan-and-entitlements.md) | Use Stripe annual billing with a three-question trial and continued archive access after cancellation |
| [0004](0004-resend-for-transactional-email.md) | Use Resend for transactional and weekly-question email |
| [0005](0005-provider-neutral-ai-adapters.md) | Put transcription and language models behind server-side provider-neutral adapters |
| [0006](0006-vercel-cron-and-durable-job-state.md) | Start with Vercel Cron while keeping durable, idempotent job state in Postgres |
| [0007](0007-ten-minute-recording-limit.md) | Limit an individual MVP voice recording to ten minutes |
| [0008](0008-portable-zip-export.md) | Export a portable ZIP containing Markdown, JSON, and original media |
| [0009](0009-us-launch-and-adult-eligibility.md) | Launch initially in the United States for users age 18 and older |
| [0010](0010-deletion-recovery-and-export-expiry.md) | Use a 30-day deletion recovery window and seven-day export expiry |
| [0011](0011-mvp-media-formats-and-quotas.md) | Set initial media formats, per-file limits, and account quotas |
| [0012](0012-ai-provider-data-handling.md) | Prohibit provider training on customer content and minimize AI retention |
| [0013](0013-immutable-submissions-and-user-edits.md) | Preserve submitted originals and represent later edits as new revisions |

## ADR conventions

- Number records sequentially and use a descriptive filename.
- Do not edit an accepted decision to conceal a change. Add a new ADR and mark the earlier record superseded.
- Update affected implementation documentation when accepting or superseding a decision.
- Keep secrets, vendor account identifiers, and private operational data out of ADRs.
