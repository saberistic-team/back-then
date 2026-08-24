# ADR 0009: United States launch and adult eligibility

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

BackThen needs an explicit initial market and age policy before accepting production users. Launch geography affects privacy, consumer, email, tax, and consent obligations. Supporting minors would require a reviewed parental-consent and data-handling design that the MVP does not yet have.

## Decision

Limit the initial production launch to the United States and require users to be at least 18 years old. Store delivery time zones as IANA time-zone names so daylight-saving changes and the United States' multiple time zones are handled correctly.

Present the age requirement during account creation and in the Terms. Do not knowingly accept accounts for minors until a later, legally reviewed consent design is accepted in a new ADR.

Before production launch, obtain appropriate legal review of the privacy policy, Terms, AI-processing disclosure, email practices, subscription presentation, and applicable federal and state requirements. This ADR is a product and engineering boundary, not legal advice or legal approval.

## Consequences

- Initial policy, support, and compliance work has a defined geographic scope.
- Delivery scheduling must use IANA zones rather than fixed UTC offsets.
- Users outside the United States and users under 18 are not eligible at launch.
- Country and age controls must be enforced server-side where they affect eligibility, not only expressed as interface copy.

## Revisit when

Legal review and operational readiness support another country or a safe, verifiable minors/parental-consent experience.
