# MVP Architecture

## Layers

```text
Web UI
  ↓
Application/API
  ↓
Domain services
  ├── ICP
  ├── Lead discovery
  ├── Qualification
  ├── Research
  ├── Outreach
  └── Analytics
  ↓
Data access
  ↓
PostgreSQL

External adapters sit beside the domain services:
- AI provider
- Lead/data providers
- Email provider
- Optional CRM providers
```

## Design rules

1. Domain services must not depend directly on a specific provider SDK.
2. Provider adapters implement small interfaces and translate provider errors into application errors.
3. AI output is validated before persistence or downstream actions.
4. Long-running discovery/research jobs should be asynchronous.
5. Lead records must retain source metadata and timestamps.
6. Outreach sending is an explicit action with idempotency protection.
7. User-facing pages should expose the evidence behind AI recommendations.

## Initial modules

- `apps/web`: Next.js application and API routes
- `packages/ai`: prompts, schemas, model gateway, AI workflows
- `packages/leads`: discovery, normalization, qualification, scoring
- `packages/database`: Prisma client and repositories
- `packages/integrations`: external provider adapters

## Data model direction

Core entities:

- Workspace
- User
- ICPProfile
- SearchJob
- Company
- Contact
- Lead
- LeadEvidence
- OutreachSequence
- OutreachMessage
- Activity

Use IDs, timestamps, status enums, and source metadata consistently. Keep provider-specific identifiers in integration fields rather than making them the domain primary key.
