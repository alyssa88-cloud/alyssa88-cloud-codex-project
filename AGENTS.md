# AGENTS.md

## Project

This repository is for an AI-powered customer acquisition platform. The product helps small businesses and manufacturers discover potential B2B customers, qualify leads, organize prospects, draft personalized outreach, and track follow-ups.

## Product principles

- Focus on practical B2B customer acquisition and measurable outcomes.
- Prefer compliant, permission-aware lead sourcing and outreach.
- Never design features that facilitate spam, credential theft, impersonation, or bypassing platform restrictions.
- Protect personal data and business contact data. Collect only what is necessary, document the source, and provide deletion/export paths where appropriate.
- Human review should be available before automated outreach is sent.
- Keep provider integrations replaceable through clear interfaces.

## Engineering principles

- Use TypeScript for web/application code unless a strong reason requires another language.
- Prefer a modular architecture with clear separation between UI, application services, data access, AI orchestration, and external integrations.
- Keep secrets and API keys out of source control. Use environment variables and provide `.env.example` files.
- Validate all external input at API boundaries.
- Add tests for business-critical logic and integration adapters.
- Do not silently change public APIs or database schemas; document migrations.
- Keep functions small and code readable. Avoid unnecessary abstractions.
- Use structured logging and never log secrets or unnecessary personal data.

## AI behavior

- Treat model output as untrusted input. Validate structured output against schemas before using it.
- Keep prompts/versioned instructions separate from business logic where practical.
- AI-generated lead scoring or personalization must be explainable enough for a user to review.
- Do not invent company facts, contact details, product claims, or previous interactions.
- When source data is insufficient, explicitly mark the field as unknown.

## Lead workflow

The intended core workflow is:

1. Define an ideal customer profile (ICP).
2. Discover candidate companies from permitted data sources.
3. Normalize, deduplicate, and enrich company records.
4. Score and qualify leads against the ICP.
5. Generate a reviewable research summary and personalized outreach draft.
6. Let the user approve, edit, schedule, or reject outreach.
7. Record delivery/status and follow-up tasks.
8. Measure reply, meeting, and conversion outcomes.

## Definition of done

Before considering a feature complete:

- The happy path works end-to-end.
- Invalid inputs and provider failures are handled.
- Tests cover important business rules.
- No secrets or sensitive credentials are committed.
- Documentation is updated when setup, API, schema, or behavior changes.
- Changes are small and easy to review.

## Git workflow

- Use descriptive commits in imperative form, e.g. `feat: add lead scoring service`.
- Prefer feature branches and pull requests for substantial changes.
- Do not force-push or rewrite shared history unless explicitly requested.
