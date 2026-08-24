# ADR 0014: Defer AI provider and model selection to capability milestones

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

Milestone 0 must establish the AI boundary, but BackThen does not use transcription until Milestone 2 or language assistance until Milestone 3. Provider capabilities, privacy controls, model quality, retention terms, and pricing change frequently. Selecting models before the evaluation corpus and task-specific integration tests exist would create an untested dependency.

## Decision

Do not select or configure a production AI provider during Milestone 0. Keep AI credentials absent and all AI feature flags disabled in local, staging, and production defaults.

Select the transcription provider and exact model during Milestone 2 before voice integration. Select the polish, title, entity, and follow-up provider/model combinations during Milestone 3 after their structured contracts and fictional evaluation corpus are executable.

Every selection must satisfy ADR 0005 and ADR 0012, document model and API versions, pass task-specific quality and grounding evaluations, confirm retention/training settings, and include a kill switch. A new ADR is required if a selection materially couples domain behavior to one provider.

## Consequences

- Milestone 0 and staging require no AI secrets or private-content processor.
- Provider decisions are made with runnable evidence rather than current popularity.
- Milestone 2 and Milestone 3 cannot pass their gates until their provider selections and evaluations are recorded.
- Fictional development fixtures remain sufficient for foundation work.

## Revisit when

A provider must be selected earlier to validate a product or privacy assumption that cannot be tested through the neutral interfaces.
