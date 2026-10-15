# PHASES.md

Total budget about 7.5 hours plus 30 minutes buffer. Tick items as you finish them. Do not start a phase until the previous one is fully ticked, except Phase 8 items marked "any time".

Current phase: 1

## Phase 1: Setup, data model, seeded demo case (45 min)
- [x] 1.1 Init repo, `/server` (Express + Mongoose) and `/client` (Vite + React), `.env.example`, health route
- [x] 1.2 Create Mongoose models per ARCHITECTURE.md
- [x] 1.3 Build the seeded demo case: `demo-chat.txt` (realistic pig-butchering style chat, 25 to 40 messages with timestamps), `demo-txs.json` (8 to 15 transactions across 5 to 8 wallets ending at an exchange deposit address), `exchange-labels.json`
- [x] 1.4 `npm run seed` loads the demo case into MongoDB
- [x] 1.5 Write `server/seed/demo-case.json` with sample response shapes for every API route
- [x] 1.6 Confirm or revise D-004 (chain choice) in DECISIONS.md
Done when: server and client run, seed loads, health route works, commit made.

## Phase 2: Evidence extraction (60 min)
- [ ] 2.1 POST /cases/:id/evidence stores chat text, report text, tx hashes, addresses
- [ ] 2.2 Chat parser for WhatsApp/Telegram export format into ChatMessage objects
- [ ] 2.3 LLM extraction service returning JSON: wallets, tx hashes, amounts, timestamps, platform names (validate output with a schema; reject malformed)
- [ ] 2.4 Regex pass for addresses and hashes as a verified baseline (LLM results cross-checked against regex)
- [ ] 2.5 POST /cases/:id/extract creates Entities with evidenceRefs
- [ ] 2.6 Client: EvidencePanel (add evidence, see extracted entities with source excerpts)
Done when: seeded chat produces correct entities, each linked to its source message.

## Phase 3: Blockchain tracing (75 min)
- [ ] 3.1 Etherscan client with caching and graceful failure to seed data
- [ ] 3.2 Tracer: from starting wallets follow outgoing transfers, depth limit and value filter, build verified Edges
- [ ] 3.3 Exchange endpoint matching against `exchange-labels.json` (verified); optional inferred guess with confidence and reason
- [ ] 3.4 POST /cases/:id/trace and GET /cases/:id/graph
- [ ] 3.5 Basic suspicious path highlighting (longest or highest value path to an endpoint)
Done when: demo case produces a complete graph from victim wallet to exchange endpoint, works offline.

## Phase 4: Fund flow graph UI (60 min)
- [ ] 4.1 GraphView with nodes (wallets) and edges (amount, timestamp on hover)
- [ ] 4.2 Verified edges solid, inferred edges dashed, with confidence and reason in a side panel
- [ ] 4.3 Exchange endpoints visually distinct
- [ ] 4.4 Click an edge to show tx hash and linked evidence
- [ ] 4.5 Suspicious path highlight toggle
Done when: graph is interactive and the verified vs inferred difference is obvious.

## Phase 5: Timeline and correlation (45 min)
- [ ] 5.1 Correlator merges chat events and transactions into TimelineEvents ordered by time
- [ ] 5.2 Link chat statements to matching transactions (amount and time window match is `inferred` with confidence; exact hash mention is `verified`)
- [ ] 5.3 GET /cases/:id/timeline and Timeline component with evidence links
Done when: timeline reads as a story and every row links to evidence.

## Phase 6: Wow features (90 min)
- [ ] 6.1 W1 Freeze clock service and FreezeClock component (urgency rule in ARCHITECTURE.md)
- [ ] 6.2 W2 Chat agent with tools and citation output; ChatPanel with clickable citations that focus the graph or timeline item
- [ ] 6.3 W3 Final polish of verified vs inferred layer (legend, toggle to hide inferred edges)
- [ ] 6.4 (stretch) W4 pattern detectors
- [ ] 6.5 (stretch) W5 statement contradiction check
Done when: demo script steps 3 and 4 work end to end.

## Phase 7: Reports and freeze request (45 min)
- [ ] 7.1 Report service: case summary with findings, each with evidence refs and status
- [ ] 7.2 Draft asset-freeze request (addresses, tx hashes, amounts, timeline, exchange endpoint, clear marking of inferred items, placeholders for investigator details)
- [ ] 7.3 ReportView with copy and download (markdown or PDF)
- [ ] 7.4 Disclaimer: draft for investigator review, not auto submitted
Done when: demo script step 5 works.

## Phase 8: Polish and submission (30 min)
- [ ] 8.1 Full run of the demo script from a clean seed
- [ ] 8.2 README with setup, architecture summary, screenshots, demo script
- [ ] 8.3 Fix top 3 rough edges (empty states, loading states, error messages)
- [ ] 8.4 Record or rehearse the 90 second demo
- [ ] 8.5 Final commit and tag
- [ ] 8.6 (any time) keep `.env.example` and docs current

## Cut order if time runs short (cut from the top)
1. W5 contradiction check
2. W4 pattern detectors
3. Live Etherscan calls (keep seed only)
4. PDF export (keep markdown)
Never cut: R1 to R5, W1, W2, W3.
