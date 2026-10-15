# PROJECT.md

## One line
A platform that lets a financial crime investigator combine victim evidence (chats, tx hashes, wallet addresses) with blockchain records to trace stolen funds, see them on a graph and timeline, and generate an evidence-backed case report with a draft asset-freeze request.

## Core principle
Be honest about certainty. Every finding is `verified` or `inferred`, and every finding links to its evidence.

## Problem (from the brief)
Investigators take days to match victim statements with wallet hops, and miss the window to request asset freezes at exchanges.

## MVP requirements (all five are mandatory)
- [ ] R1 Extract evidence: accept victim report, chat export, tx hashes, wallet addresses; extract entities, timestamps, amounts.
- [ ] R2 Trace transactions: fetch or load blockchain records, map fund movements across wallets, highlight suspicious paths.
- [ ] R3 Correlate evidence: chronological incident timeline combining chat events and transactions, each linked to its evidence.
- [ ] R4 Visualize fund flows: interactive graph with wallets, transfers, amounts, timestamps, likely exchange endpoints where verifiable.
- [ ] R5 Generate reports: case summary plus draft asset-freeze request, reviewable by an investigator, clear verified vs inferred distinction.

Scope limit allowed by the brief: one blockchain, a defined set of evidence formats.
Chosen scope: Ethereum (ETH and a stablecoin), evidence formats: pasted or uploaded chat text (WhatsApp/Telegram style export), manual tx hash and address entry.

## Wow features (what makes us stand out)
- [ ] W1 Freeze window clock: per exchange endpoint, show time since funds arrived and a freeze urgency level.
- [ ] W2 Evidence grounded investigator chat: agent answers questions using tools over case data, every claim carries a clickable citation, inferred claims are visibly marked.
- [ ] W3 Verified vs inferred layer on the graph: solid edges are on-chain facts, dashed edges are inferred, each with confidence and reasoning.
- [ ] W4 (stretch) Pattern detectors: peel chain, fan-out, fan-in, rapid pass-through, with one line explanations.
- [ ] W5 (stretch) Statement contradiction check: victim's claimed time or amount vs actual on-chain data.

## Out of scope
Multi-chain tracing, ML wallet classification, real law enforcement integrations, user auth, real exchange API calls, OCR of screenshots (screenshots are attached as evidence files with manual or LLM text notes only, unless time remains).

## Demo script (90 seconds)
1. Open the seeded case: show the incident timeline.
2. Show the graph: point out verified vs inferred edges.
3. Show the freeze clock on the exchange endpoint (HIGH urgency).
4. Ask the chat: "Where did the second payment go?" and click a citation.
5. Generate the report and the draft freeze request.

## Evaluation focus
Traceable evidence, explainable findings, clear verified vs inferred distinction.
