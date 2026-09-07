# Product Requirements — MVP

## Problem

Small manufacturers and B2B businesses spend too much time finding prospects, researching companies, writing repetitive outreach, and remembering follow-ups.

## User

Primary user: a small business owner or sales operator who has a clear product/service and wants qualified B2B opportunities in selected markets.

## Core outcome

A user should be able to define an ideal customer and receive a reviewable list of qualified prospects with evidence-backed research and personalized outreach drafts.

## Lead lifecycle

`DISCOVERED → QUALIFIED → RESEARCHED → DRAFTED → APPROVED → CONTACTED → REPLIED → OPPORTUNITY → WON/LOST`

A lead can move backward or be marked `DISQUALIFIED` at any stage.

## Lead quality requirements

Every discovered company should retain:

- Company name
- Website when available
- Country/region
- Industry/category
- Source URL
- Source type
- Discovery timestamp
- Qualification status
- Score
- Evidence supporting the score

Contact information must include its source and should distinguish company-level addresses from individual personal contact information.

## AI requirements

AI should:

- Return structured data validated by a schema.
- Separate facts from inference.
- Cite the source/evidence used for important claims.
- Mark unknown information instead of guessing.
- Generate drafts that users can edit before sending.

## Outreach requirements

The MVP is a sales-assistance product, not an unrestricted spam engine.

- Default to human approval before sending.
- Support unsubscribe/opt-out handling.
- Respect provider and jurisdictional requirements.
- Avoid sending duplicate messages.
- Record every outreach event and its status.

## Success metrics

The first version should measure:

1. Qualified leads per search job
2. Qualification precision (manual review)
3. Outreach approval rate
4. Reply rate
5. Positive reply rate
6. Meeting/opportunity rate
7. Time saved per qualified lead
