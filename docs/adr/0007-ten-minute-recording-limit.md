# ADR 0007: Ten-minute voice recording limit

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

The core interaction is intended to take roughly 30 seconds to ten minutes. Voice must feel first-class, while uploads, transcription cost, mobile reliability, and abuse need predictable bounds.

## Decision

Limit each MVP voice recording to ten minutes. Show the limit before recording, display elapsed and remaining time accessibly, warn near the limit, and finish the recording safely when the limit is reached.

The exact allowed codecs, maximum byte size, and client recording format will be chosen and tested during media implementation. Server validation remains authoritative.

## Consequences

- Upload and transcription costs are bounded per recording.
- Most intended weekly stories fit the product's promised interaction length.
- Longer interviews must be split into multiple memories until a later interview mode is designed.
- Client and server limits must agree without discarding an already captured recording.

## Revisit when

User research shows meaningful stories are routinely truncated or later family-interview requirements justify a separate recording policy.

