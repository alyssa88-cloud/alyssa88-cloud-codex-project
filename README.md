# AI Customer Acquisition Platform

An AI-powered B2B customer acquisition platform for manufacturers, exporters, agencies, and small businesses.

## Goal

Turn a target customer profile into a repeatable workflow:

**Define ICP → discover companies → qualify leads → research → draft outreach → human approval → follow up → measure conversion**

The first release should optimize for a small number of high-quality leads rather than indiscriminate mass outreach.

## MVP

### 1. Workspace
- User/workspace settings
- Target markets and languages
- Product/service profile

### 2. ICP Builder
- Countries/regions
- Industries
- Company size
- Buyer role
- Keywords and exclusions
- Qualification rules

### 3. Lead Discovery
- Pluggable search/data-source adapters
- Company website and public business information
- Source URL and retrieval timestamp
- Deduplication

### 4. Lead Qualification
- Rule-based checks
- AI-assisted scoring
- Evidence and explanation for each score
- Manual override

### 5. Outreach Copilot
- Personalized email drafts
- Follow-up drafts
- WhatsApp/LinkedIn draft messages where appropriate
- User approval before sending

### 6. CRM
- Lead pipeline
- Notes and activities
- Contact attempts
- Reply status
- Follow-up schedule

### 7. Analytics
- Leads discovered
- Qualified leads
- Outreach sent
- Reply rate
- Positive reply rate
- Meetings and opportunities

## Non-goals for the first release

- Fully autonomous bulk sending
- Scraping behind authentication or access controls
- Circumventing provider rate limits or anti-bot systems
- Buying or exposing private personal data

## Suggested stack

- Next.js + TypeScript
- PostgreSQL + Prisma
- OpenAI API for structured AI workflows
- Zod for runtime validation
- Vitest for unit tests
- Playwright for critical browser flows

Keep external providers behind interfaces so discovery, email, CRM, and AI providers can be replaced independently.

## Development

See `AGENTS.md` for repository rules and engineering guidance.

Create `.env` from `.env.example` before running the application. Never commit real secrets.
