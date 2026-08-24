# ADR 0001: Next.js, TypeScript, and Vercel

- **Status:** Accepted
- **Date:** 2026-08-23

## Context

BackThen needs a mobile-first web application, fast public and authenticated pages, secure server endpoints, and a deployment model manageable by a small team. The master prompt does not mandate a web framework or host.

## Decision

Build the initial application with the current stable Next.js release and TypeScript. Use the App Router, server-render public/read-heavy pages where appropriate, and keep protected mutations in explicit server-side domain endpoints. Deploy the initial application to Vercel.

Pin exact framework and runtime versions in the repository at scaffolding time rather than in this ADR.

## Consequences

- One codebase can provide responsive UI, server rendering, and integration endpoints.
- TypeScript gives shared domain and validation types.
- Vercel provides a low-operations path for previews and production deployment.
- Runtime limits and platform-specific behavior must be considered for recordings, exports, and long AI tasks.
- Domain services must not depend directly on Vercel APIs so hosting remains replaceable.

## Revisit when

Long-running work, cost, regional requirements, or platform limits materially harm reliability or privacy.

