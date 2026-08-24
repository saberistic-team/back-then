# ADR 0015: Backup retention and initial recovery objectives

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

BackThen promises durable preservation, but database backups and media recovery are different systems. [Supabase documents that managed database backups do not contain Storage object bytes](https://supabase.com/docs/guides/platform/backups). Recovery expectations must therefore cover relational data and original media separately and must be testable before production launch.

## Decision

Use a paid production Supabase plan with managed daily database backups retained for at least seven days. Set the initial production database objectives to a recovery point no older than 24 hours and restored service within eight hours of declaring a database-loss incident.

Before accepting production media, implement and test a separate encrypted recovery mechanism for original recordings and photos with a recovery point no older than 24 hours and recovery within 24 hours. Provider redundancy alone is not treated as a user-controlled backup. The exact secondary storage mechanism is an operational implementation choice, but it must preserve ownership boundaries, checksums, deletion state, and encryption.

After the 30-day recovery window in ADR 0010 ends, active data is purged. Database backup copies may persist for at most the additional managed seven-day backup window. Media recovery copies must be purged under a documented schedule consistent with the public retention disclosure and applicable erasure requirements.

Staging contains fictional data and may be rebuilt from migrations and fixtures rather than backed up. Exercise database and media restoration in a non-production environment before launch and at least quarterly after launch.

Legal and privacy review of the final backup, retention, and erasure disclosures remains required. This ADR is not legal advice.

## Consequences

- The initial database objective avoids the cost of point-in-time recovery while usage is small.
- A day of relational or media changes could be lost under the initial objective and must be disclosed internally as accepted risk.
- Media backup work remains a production-readiness requirement because managed database backups exclude object bytes.
- Growth, revenue, or recovery incidents may justify point-in-time recovery and tighter objectives.

## Revisit when

Archive size, paid usage, incident history, legal requirements, or improved platform economics justify tighter recovery targets or longer backup windows.
