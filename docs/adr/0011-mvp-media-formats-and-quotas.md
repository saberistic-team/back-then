# ADR 0011: MVP media formats and quotas

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

Voice and photos are first-class capture formats, but uploads, storage, transcription cost, mobile reliability, and abuse require explicit limits. The ten-minute recording duration is already fixed by ADR 0007.

## Decision

Apply these initial server-authoritative media limits:

- Trial accounts: 100 MB total uploaded media.
- Subscribed accounts: 1 GB total uploaded media.
- Voice recordings: ten minutes and 50 MB per recording.
- Voice formats: WebM with Opus and MP4 with AAC.
- Photos: 15 MB per photo.
- Photo formats: JPEG, PNG, and WebP.

Count preserved original recording and photo bytes toward the account quota. Derived transcripts and text do not count as media. Do not delete existing owned media merely because a subscription ends; cancellation pauses new paid capture/processing according to ADR 0003 while archive access continues.

Client-side checks may provide early feedback, but the server must verify authenticated ownership, declared type, file signature or magic bytes, actual byte size, duration where applicable, object path, and remaining quota before finalization. A client-selected file extension or MIME type is never sufficient proof.

## Consequences

- Initial storage and processing exposure is bounded.
- Recording support covers the primary MediaRecorder output families used by major browsers, but requires cross-browser testing and graceful capability detection.
- Unsupported files must fail with clear, accessible messages without losing an already preserved memory.
- Quota usage must be derived from trusted storage metadata and remain correct under retries and deletion recovery.

## Revisit when

Browser support, upload failures, transcription compatibility, storage economics, abuse patterns, or user research justify different formats or limits.
