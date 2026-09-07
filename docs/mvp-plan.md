# AI Customer Acquisition MVP

## Goal

Build a practical B2B lead-generation assistant for a lingerie/apparel manufacturer targeting US apparel brands, wholesalers, and e-commerce sellers.

## MVP workflow

1. User creates an ICP.
2. User starts a lead discovery job.
3. System stores discovered companies and evidence.
4. AI normalizes and scores leads.
5. User reviews a lead detail page.
6. AI creates a personalized outreach draft from verified evidence.
7. User edits and approves the message.
8. System records the outreach and schedules a follow-up task.

## MVP screens

- Dashboard
- ICP / Campaign setup
- Lead discovery
- Lead list
- Lead detail
- Outreach draft / review
- Follow-up queue
- Settings

## Lead fields

- Company name
- Website
- Country
- Industry
- Customer type
- Product categories
- Description
- Lead score
- Score reasons
- Evidence / source URLs
- Contact name
- Contact role
- Contact email (when available from permitted sources)
- Contact source
- Lead status
- Last activity
- Next follow-up

## AI tasks

### Company classification

Classify whether a company is an apparel brand, wholesaler, e-commerce seller, or another category.

### Product matching

Determine whether public evidence indicates that the company sells lingerie, underwear sets, shapewear, sleepwear, or adjacent women's apparel.

### Lead scoring

Return a structured score from 0-100 and concise reasons tied to evidence.

### Outreach personalization

Generate an email draft that references only verified company/product information. Never fabricate a relationship, order history, product need, or business fact.

## Safety and compliance

- Do not scrape or collect data from sources in ways that violate their terms or technical restrictions.
- Use permitted public business information and user-provided data.
- Provide source attribution for lead evidence.
- Avoid harvesting sensitive personal data.
- Keep outbound sending behind explicit user approval in the MVP.
- Include unsubscribe / opt-out handling in the outreach design before automated sending is enabled.

## MVP success criteria

A user can define the target market, review a ranked list of candidate companies, inspect the evidence behind each score, generate a personalized outreach draft, approve it, and track the next follow-up.
