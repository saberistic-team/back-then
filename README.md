# BackThen

BackThen is a private, mobile-first service that asks one thoughtful question each week and turns voice, text, or photo responses into a lasting, organized life story.

The core loop is:

> Question → remember → answer → preserve

This repository is currently at the planning baseline immediately before Milestone 0. The product brief, architecture, data model, privacy requirements, delivery plan, and accepted architecture decisions are documented in [`docs/`](docs/README.md). The original product source of truth is [`master-prompt.md`](master-prompt.md).

## Product principles

- Preserve the user's original words and media.
- Keep memories private by default.
- Never invent biographical facts or erase uncertainty.
- Make voice and mobile capture first-class.
- Avoid streaks, social pressure, and blank-page journaling patterns.
- Keep user data portable through complete exports.

## Current status

Milestone 0 establishes the executable foundation: application scaffolding, isolated environments, migrations and seeds, quality and deployment workflows, fictional demo fixtures, feature flags, and foundational privacy and upload policies.

See the [delivery plan](docs/07-delivery-plan.md) for milestone definitions and acceptance gates, and the [ADR index](docs/adr/README.md) for accepted technical decisions.

## License

BackThen is available under the [MIT License](LICENSE).
