# ADR 0002: Supabase platform

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

The product requires authentication, relational data, private media storage, signed access, and strict per-user isolation. The master prompt explicitly requires Supabase Auth, Supabase/Postgres, and Supabase Storage.

## Decision

Use Supabase Auth for email/magic-link and Google authentication, Supabase Postgres for application data, and private Supabase Storage buckets for recordings, photos, and exports. Enforce ownership with Row Level Security and server-side authorization.

Use schema migrations for all database changes. Store original user content separately from AI-derived revisions. Never treat the service-role key as a substitute for authorization.

## Consequences

- Identity, database, and object storage share a coherent ownership model.
- RLS policies become a production security boundary and require integration tests.
- Media access requires short-lived signed URLs.
- Product code remains tied to Postgres semantics, while the higher-level domain layer should minimize dependence on Supabase-specific client behavior.

## Revisit when

Scale, compliance, data residency, recovery guarantees, or operational evidence requires separating one or more platform responsibilities.

