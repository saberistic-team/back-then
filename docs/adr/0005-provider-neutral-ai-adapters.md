# ADR 0005: Provider-neutral AI adapters

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

BackThen needs transcription, light polish, title suggestions, entity candidates, and grounded follow-ups. Models and commercial terms change frequently, while the product's truthfulness and privacy contract must remain stable.

## Decision

Expose AI capabilities through server-side, provider-neutral interfaces such as `transcribeMemory`, `polishMemory`, `suggestMemoryTitle`, `extractEntities`, and `generateFollowUp`. No browser code calls an AI provider directly.

Record provider, model, prompt version, source revisions, and safe status for every run. Validate structured outputs and preserve all original content. Initial provider/model selection may vary by capability and is configuration, not domain logic.

## Consequences

- Providers can be replaced or split by task without rewriting user workflows.
- Adapter contracts and evaluation fixtures require upfront work.
- Lowest-common-denominator interfaces must not hide capability-specific safety metadata.
- AI failure cannot block the preservation of an original memory.

## Revisit when

A required capability cannot be represented safely by the shared contracts or a materially different deployment model, such as self-hosted inference, becomes necessary.

