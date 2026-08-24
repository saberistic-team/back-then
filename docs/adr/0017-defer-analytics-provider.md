# ADR 0017: Defer the analytics provider and enforce a local event contract

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

Milestone 1 needs activation analytics, but Milestone 0 has no user journey to measure. Choosing a third-party service now would add a data recipient before event volume, operating needs, and privacy terms can be evaluated.

## Decision

Do not configure a third-party analytics provider during Milestone 0. Implement and test a provider-neutral event contract that accepts only approved event names and safe, allowlisted metadata. It must reject questions, answers, transcripts, extracted names, filenames, signed URLs, tokens, and raw search terms.

Keep the initial transport as a no-op/local development sink. Select and document a privacy-conscious production provider, hosting region, retention, access controls, and consent behavior before Milestone 1 activation analytics are enabled for production users.

## Consequences

- Foundation and staging send no user data to an analytics vendor.
- Milestone 1 instrumentation can target a stable contract instead of a vendor SDK.
- Provider selection remains a Milestone 1 gate rather than a Milestone 0 blocker.
- Tests must fail if private or unapproved properties are added.

## Revisit when

Milestone 1 instrumentation requirements are concrete or an operational telemetry provider can safely satisfy both product and service monitoring needs.
