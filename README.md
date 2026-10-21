# Village Helper — student prototype

An independent, bilingual FAQ guide for Village (FREE)DGE & Pantry. Not affiliated with or approved by the organization. The chatbot is keyword-based, not a live generative AI system. It doesn't track users, call APIs, or store chat messages.

## Open
Double-click `index.html` in a browser. To publish, upload this folder to a static hosting provider such as Netlify Drop. No build step is needed.

## Test
From this folder run `node tests/check.js` (requires Node.js; no packages). The script checks question routing and static safeguards. It does **not** replace manual browser testing or verification of external sources.

## Manual test checklist
- Type `How can I volunteer?` and confirm a direct answer and volunteer source link.
- Type `Is food available today?` and confirm the chatbot doesn't claim to know live availability.
- Type `Where is the nearest fridge?` and confirm it doesn't invent an address.
- Switch to Spanish and type `¿Dónde está la nevera comunitaria?`.
- Test each quick-action button, follow-up steps, Send/Enter, copy, clear, feedback, and A+ text.
- Test narrow phone layout, keyboard navigation, and the official external links.

## Before sharing publicly
Confirm all food/donation guidance with the organization, obtain permission before implying official endorsement or embedding on its site, and have a fluent Spanish speaker review translations. The organization's biggest issue has not been established by interviews or user research. Do not claim this prototype provides live food availability, verified addresses, or official enrollment.

## Development evidence
Recovered Version 3 from its prior ZIP and added: better English/Spanish phrase routing, source context for answers, larger-text improvements, skip-to-question keyboard link, visible focus states, and a repeatable 40-check test script. Tests passed locally on 2026-10-21. This is a new test set; the prior Replit 33/33 result applies only to the Replit build.
