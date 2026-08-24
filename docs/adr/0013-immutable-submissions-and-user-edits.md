# ADR 0013: Immutable submissions and user edits

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

Users need to correct or improve a submitted memory, while BackThen promises never to overwrite or discard their preserved original. Reverting an answered assignment to a mutable draft would blur whether preservation occurred and could damage provenance.

## Decision

A submitted original remains immutable and the associated question remains answered. The product does not unsubmit the original or return the assignment itself to draft.

When a user chooses to edit a submitted memory, create a mutable editing draft derived from the currently selected revision. Saving that edit creates a new `user_edit` revision linked to its source revision. The user may choose the new revision for display without deleting or overwriting the submitted original, raw transcript, or earlier revisions.

Interface copy should describe this action as editing the preserved memory, not undoing preservation. Deleting a memory follows ADR 0010 and is separate from editing it.

## Consequences

- Original provenance and the meaning of “preserved” remain stable.
- Editing requires revision history and an explicit display-revision pointer.
- Submission idempotency and one-memory-per-answered-assignment constraints remain intact.
- The interface can offer correction without exposing database-version terminology unnecessarily.

## Revisit when

User research demonstrates a distinct need to retract an answer without deleting the memory, or collaboration requires a broader editorial workflow.
