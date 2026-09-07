# AI Customer Acquisition MVP

## Goal

Build a practical B2B lead-generation assistant for a lingerie/apparel manufacturer targeting US apparel brands, wholesalers, and e-commerce sellers.

## MVP workflow

1. User creates an ICP.
2. User starts a lead discovery job.
3. System stores discovered companies and evidence.
4. AI normalizes, deduplicates, and scores leads.
5. Qualified leads with a verified business contact email enter an automated outreach sequence.
6. AI creates a personalized outreach message from verified evidence.
7. System sends the message automatically through the connected Microsoft mailbox.
8. System monitors replies and stops the sequence when a reply, rejection, unsubscribe, or invalid address is detected.
9. System schedules follow-ups and notifications through the connected mailbox.

## Automated outreach rules

- No manual approval is required for leads that satisfy campaign qualification rules.
- Only use permitted business contact information and reliable source evidence.
- Deduplicate by company/contact/email before sending.
- Do not send when email is missing, invalid, suppressed, or already contacted under the same campaign.
- Apply mailbox/domain rate limits and a daily sending cap.
- Stop follow-ups on reply, rejection, unsubscribe/opt-out, or invalid address.
- Keep a suppression list so opted-out contacts are never re-added.
- Log sends, provider message IDs, errors, and stop reasons.

## Default follow-up sequence

- Initial outreach: Day 0
- First follow-up: 5 business days later
- Second follow-up: 7 business days after the first follow-up
- Stop after the second follow-up unless a campaign explicitly defines another compliant sequence.

The deployed app should use Microsoft Graph OAuth for long-running email sending and scheduled jobs. The ChatGPT Outlook connector is useful for interactive mailbox operations but does not itself authorize a deployed web app.

## AI tasks

### Company classification

Classify whether a company is an apparel brand, wholesaler, e-commerce seller, or another category.

### Product matching

Determine whether public evidence indicates that the company sells lingerie, underwear sets, shapewear, sleepwear, or adjacent women's apparel.

### Lead scoring

Return a structured score from 0-100 and concise reasons tied to evidence.

### Outreach personalization

Generate email using only verified company/product information. Never fabricate a relationship, order history, product need, business fact, contact detail, or previous interaction.

## Safety and compliance

- Do not scrape or collect data from sources in ways that violate their terms or technical restrictions.
- Use permitted public business information and user-provided data.
- Provide source attribution for lead evidence.
- Avoid harvesting sensitive personal data.
- Respect applicable email marketing, privacy, and platform rules for the target market.
- Include unsubscribe / opt-out handling before automated sending.

## MVP screens

- Dashboard
- ICP / Campaign setup
- Lead discovery
- Lead list
- Lead detail
- Outreach settings
- Follow-up queue
- Email integration / Settings

## MVP success criteria

A user can define the target market, rank candidate companies, inspect evidence, enable automated outreach, connect a Microsoft mailbox, automatically contact qualified leads, stop sequences based on replies/opt-outs/errors, and track follow-ups and outcomes.
