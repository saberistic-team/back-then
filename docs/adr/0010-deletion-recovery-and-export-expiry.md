# ADR 0010: Deletion recovery and export expiry

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

BackThen must balance recovery from accidental deletion with a clear erasure process. Generated exports contain a complete copy of a user's private archive and should not remain available indefinitely.

## Decision

When a user deletes a memory or media item, hide it immediately from normal reads and revoke active access links. Retain it in a restricted recovery state for 30 days, then purge the original, derived assets, search representations, and relational data in dependency order.

Apply the same 30-day recovery window to account deletion, while immediately revoking sessions and normal product access and reconciling billing. Honor a shorter or immediate erasure path when applicable law or an approved support process requires it.

Delete generated export archives seven days after generation completes and expire their download links no later than that deadline. Retain only the minimum safe request metadata needed for operations and audit.

Document the separate managed-backup retention and expiration schedule before production launch. Deleted data in backups must not be restored into normal service except as part of disaster recovery and must age out under the disclosed schedule.

Legal review of the deletion, retention, backup, and erasure disclosures is required before production launch. This ADR does not constitute legal advice.

## Consequences

- Accidental deletions are recoverable for a predictable period.
- Normal reads and signed URLs must honor deletion immediately, even before purge.
- Purge and export-cleanup jobs need durable, idempotent state and monitoring.
- Product copy must distinguish immediate removal from final purge.

## Revisit when

Legal requirements, user research, storage economics, or recovery incidents justify different recovery or export windows.
