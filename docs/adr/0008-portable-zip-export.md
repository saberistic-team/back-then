# ADR 0008: Portable ZIP export

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

Users own their memories and must be able to retrieve original text, transcripts, recordings, and photos without proprietary lock-in. A single synchronous download is unlikely to remain reliable as archives grow.

## Decision

The initial complete export is an asynchronously generated ZIP containing:

- A documented JSON manifest with memory metadata and relationships
- Human-readable Markdown files for memories
- Original recordings and photos in their stored formats
- Raw transcripts and polished versions, clearly distinguished
- A README explaining the package structure and date/uncertainty fields

Store the completed archive privately, notify the user when ready, and provide a short-lived signed download URL. PDF is not required for the first complete export.

## Consequences

- The export is both machine-readable and understandable without BackThen.
- Generation requires background processing, storage quotas, expiry, and cleanup.
- Export tests must prove strict owner isolation and inclusion of originals.
- A polished PDF can be added later as a presentation format, not as the sole portability format.

## Revisit when

Archive size, regulatory portability needs, user demand, or book-generation work requires streaming, incremental, or additional formats.

