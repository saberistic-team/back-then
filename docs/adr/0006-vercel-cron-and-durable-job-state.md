# ADR 0006: Vercel Cron and durable Postgres job state

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

Weekly assignments, email, transcription, AI work, exports, and deletion contain asynchronous steps. The initial system should minimize infrastructure while remaining safe under retries and execution limits.

## Decision

Use Vercel Cron to trigger initial scheduled work. Store durable job, assignment, delivery, attempt, and deduplication state in Postgres. Every task must be idempotent and resumable; the scheduler is only a trigger and never the source of truth.

Long work should be split into bounded steps. HTTP requests must not wait for transcription or AI completion before confirming that an original memory is preserved.

## Consequences

- The MVP avoids operating a separate queue immediately.
- Postgres state provides auditability and protection from duplicate cron invocations.
- Workers must implement locking, retries, backoff, timeouts, and dead-letter visibility.
- Execution duration or throughput limits may require a dedicated managed queue later.

## Revisit when

Queue depth, execution limits, retry complexity, concurrency, or operational reliability exceeds the simple Postgres-backed approach.

