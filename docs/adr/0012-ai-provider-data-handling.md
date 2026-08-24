# ADR 0012: AI provider data handling

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

Transcription and language assistance require sending private memory content to external processors. The product promise requires minimizing that disclosure and preventing customer memories from becoming provider training data.

## Decision

Use only AI provider configurations and contractual terms that do not train provider models on BackThen customer content. Select zero retention when a suitable provider offers it; otherwise use the shortest available retention compatible with the required capability and document the exact period before enabling that provider in production.

Send only the content required for the specific task, never unrelated memories for convenience. Record the provider, model, task, prompt version, and source revision identifiers internally without duplicating private prompt or response bodies into logs or analytics.

Document AI subprocessors, processing purpose, applicable data regions, retention behavior, and user-facing disclosures before production use. Complete privacy and legal review for each production provider. If a provider cannot meet the accepted training, retention, security, and disclosure requirements, that provider must not process production memories.

This ADR sets product and engineering requirements; it is not a legal determination.

## Consequences

- Provider/model selection remains configurable but is constrained by privacy requirements.
- Zero-retention availability may limit provider features or account tiers.
- Development and evaluation must use fictional content unless an approved production-processing path exists.
- AI features must fail without blocking preservation of the user's original memory.

## Revisit when

Provider terms, retention controls, legal requirements, deployment options, or a self-hosted model materially changes the privacy tradeoff.
