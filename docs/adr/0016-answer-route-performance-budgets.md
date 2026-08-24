# ADR 0016: Answer-route performance budgets

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

The weekly question must become usable quickly on a mid-range phone over constrained mobile networking. Concrete budgets are needed during foundation work so archive data, media tooling, and analytics do not gradually burden the capture path.

## Decision

Apply these initial budgets to the weekly answer route at the 75th percentile for production traffic:

- Largest Contentful Paint: at most 2.5 seconds.
- Interaction to Next Paint: at most 200 milliseconds.
- Cumulative Layout Shift: at most 0.1.
- Initial route-specific client JavaScript: at most 150 KB compressed.
- Server response time for an authenticated question read: at most 800 milliseconds at the 95th percentile within the initial United States region.
- Preservation acknowledgement after a completed text submission or media finalization request: at most two seconds at the 95th percentile, excluding media transfer time.

Keep recorder code, audio players, archive queries, historical photos, and derived-AI interfaces out of the initial answer-route bundle until requested. Track field Core Web Vitals without recording page content, question text, answers, or search terms.

CI must keep a production build check. Add automated bundle and synthetic performance enforcement when the Milestone 1 answer route exists; before then, review the build output as the foundation baseline.

## Consequences

- Feature work that exceeds a budget needs optimization or an explicit ADR update.
- Lazy loading and server rendering are architectural constraints for the answer path.
- Field measurements remain privacy-safe and cannot include private memory content.

## Revisit when

Representative field data shows a budget is either too lenient to protect the experience or impractical on supported devices and networks.
