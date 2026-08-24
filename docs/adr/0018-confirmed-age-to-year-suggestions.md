# ADR 0018: Confirmed age-to-year suggestions retain uncertainty

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

A user may remember their approximate age but not the calendar year. Birth year can produce a useful suggestion, but automatically storing the calculation as an exact year would create false precision and could be wrong around birthdays.

## Decision

When both birth year and approximate age are available, BackThen may suggest `birth year + age` as an approximate calendar year. Label the result as a suggestion, explain that it may be off by one year, and require explicit user confirmation before storing it.

Store a confirmed result as `approximate_year`, retain the originally supplied approximate age, and record that the year was derived. Never promote the suggestion to an exact date or silently replace the age. If the values are implausible or incomplete, do not offer a suggestion.

## Consequences

- Timeline organization becomes easier without concealing uncertainty.
- The data model needs provenance for derived date suggestions.
- Interface and tests must handle the birthday-related one-year ambiguity.

## Revisit when

User research supports collecting a full birth date or a different date-confidence model.
