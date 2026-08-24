# ADR 0004: Resend for transactional email

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

Weekly email is part of the core loop: users should open a question and reach the answer experience directly. The service also needs authentication and operational messages with reliable delivery feedback.

## Decision

Use Resend as the initial transactional email provider. Send weekly questions from versioned templates and record a delivery ledger with provider message IDs and safe status metadata.

Authenticate the sending domain with SPF, DKIM, and DMARC before production. Secure answer links through the application's short-lived authentication/deep-link flow; the email provider must not determine authorization.

## Consequences

- Email integration and delivery events use Resend's API and webhook format.
- Templates must remain testable outside provider-specific tooling.
- Bounce, complaint, unsubscribe, and retry handling are required before broad delivery.
- An adapter boundary should keep a provider migration practical.

## Revisit when

Deliverability, regional requirements, pricing, feature needs, or provider reliability falls below the product's operating targets.

