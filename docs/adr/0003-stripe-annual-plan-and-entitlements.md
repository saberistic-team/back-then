# ADR 0003: Stripe annual plan and entitlement policy

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

BackThen is marketed as $1/month, but processing a $1 monthly charge is inefficient. Users should experience emotional value before payment, and cancellation must not hold their memories hostage.

## Decision

Use Stripe Checkout and Billing Portal for one plan billed at $12 annually and displayed as **$1/month · $12 billed annually**.

The initial trial permits the first preserved memory plus up to three starter questions before subscription is required for future weekly delivery. A cancelled or expired account retains read, export, and delete access to its archive; new weekly delivery and paid processing features pause at the end of the paid period.

Stripe webhooks are the billing source of truth. Client redirects never grant entitlement.

## Consequences

- Pricing remains simple and processing costs remain proportionate.
- Trial enforcement needs server-side usage and entitlement checks.
- Archive reads and exports must not be coupled to an active subscription.
- Storage cost may continue after cancellation; retention economics should be monitored without weakening ownership promises.

## Revisit when

Conversion data, abuse, storage economics, tax requirements, or user research supports a different trial or archive policy.

