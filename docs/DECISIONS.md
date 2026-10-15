# DECISIONS.md (append only, never edit old entries; supersede with a new entry)

Entry format:
```
## D-XXX | Phase N | Title
Status: confirmed | proposed | superseded by D-YYY
Why:
Alternatives rejected:
Impact:
```

---

## D-001 | Phase 0 | Build PS 01 (crypto scam investigation and fund tracing)
Status: confirmed
Why: matches stack (Node, React, MongoDB), uses agentic AI and RAG interests, visual demo, few teams likely to pick it.
Alternatives rejected: PS 03 (crowded), PS 02 (crowded), PS 04 (low wow factor), PS 05 to 07 (need ML or optimisation datasets).
Impact: whole project scope.

## D-002 | Phase 0 | Stack: Node/Express, React (Vite), MongoDB
Status: confirmed
Why: the builder's existing stack, fastest path in 8 hours.
Alternatives rejected: none considered.
Impact: all code.

## D-003 | Phase 0 | Single agent mode, switch only when a limit exhausts
Status: confirmed
Why: solo builder, integration overhead of parallel agents is higher than the gain, parallel use would burn both quotas at once.
Alternatives rejected: two agents on backend and frontend lanes (optional speed-up only if ahead of schedule and both have quota).
Impact: one HANDOFF.md, commit after every task, switch at task boundaries.

## D-004 | Phase 0 | Chain scope: Ethereum only via Etherscan, with seeded demo fallback
Status: proposed (confirm in Phase 1)
Why: free API, good docs, one chain keeps scope small, fallback removes rate limit risk during demo.
Alternatives rejected: Tron (less tooling), multi-chain (time).
Impact: Transaction model has no chain field for now.

## D-005 | Phase 0 | Verified vs inferred labelling is mandatory on every edge and finding
Status: confirmed
Why: the brief explicitly asks for a clear distinction; also our main credibility point.
Alternatives rejected: single confidence score for everything.
Impact: Edge and TimelineEvent carry `status`; UI uses solid vs dashed styling.

## D-006 | Phase 0 | App must run fully offline from a seeded demo case
Status: confirmed
Why: demo must never depend on rate limits, network, or API keys being valid.
Alternatives rejected: live-only tracing.
Impact: `server/seed/*` is a first class deliverable; live calls are optional enhancement.

## D-007 | Phase 0 | Wow features chosen: freeze clock, evidence grounded chat, verified/inferred graph layer
Status: confirmed
Why: ties directly to the brief's pain point (missed freeze window), shows agentic AI, and shows honesty about uncertainty.
Alternatives rejected: cross-chain tracing, ML wallet classification.
Impact: Phase 6 scope. Detectors and contradiction check are stretch only.

<!-- New decisions go below. Next number: D-008 -->

## D-008 | Phase 1 | Local MongoDB and environment-driven integrations
Status: confirmed
Why: development and the offline demo use a local MongoDB instance; external provider credentials are not needed to scaffold Phase 1.
Alternatives rejected: requiring hosted MongoDB or committing real provider credentials.
Impact: MongoDB defaults to `mongodb://127.0.0.1:27017/traceledger`; `.env.example` contains placeholders for MongoDB, Etherscan, and LLM configuration. LLM integrations select their provider through `LLM_PROVIDER` and credential through `LLM_API_KEY`, so no provider is hard-coded.

## D-009 | Phase 1 | Validate evidence and certainty in models
Status: confirmed
Why: investigators must be able to trace stored entities, graph edges, timeline events, and findings to evidence, and inferred claims must not be mistaken for verified facts.
Alternatives rejected: accepting incomplete references or permitting inferred records without confidence and a reason.
Impact: Entity, Edge, TimelineEvent, and Report finding schemas require at least one evidence reference. Edge, TimelineEvent, and Report finding schemas require confidence from 0 to 1 and a reason when status is inferred. Transaction status represents chain execution state (`success`, `failed`, or `pending`).

## D-010 | Phase 1 | Mark seeded blockchain scenario as synthetic
Status: confirmed
Why: Phase 1 requires a complete offline case, but fabricated transactions or exchange attributions must not be presented as real verified blockchain evidence.
Alternatives rejected: unlabeled synthetic records or using an unverified real-world exchange label.
Impact: demo transactions, wallets, hashes, amounts, timestamps, blocks, and the example deposit endpoint are explicitly marked fictional. Seed consumers must preserve that notice and must not treat the example exchange label as verified against a real exchange.

## D-011 | Phase 1 | Idempotently refresh only the synthetic demo case
Status: confirmed
Why: `npm run seed` must be repeatable without duplicating demo records or altering unrelated case data.
Alternatives rejected: inserting a new case on every run or clearing the whole local database.
Impact: the seed script uses a stable ID for its synthetic case, upserts its records, and removes stale evidence and transactions only within that case.

## D-012 | Phase 1 | Define route-specific JSON response contracts
Status: confirmed
Why: the client and server need a shared reference for API integration, including evidence citations and verified versus inferred certainty.
Alternatives rejected: undocumented response shapes or a generic envelope that obscures route-specific data.
Impact: `server/seed/demo-case.json` records one response shape for every route in `docs/ARCHITECTURE.md`; implementation changes must update both files.

## D-013 | Phase 1 | Confirm Ethereum with optional Etherscan
Status: confirmed
Why: the project scope already selects Ethereum for a single-chain MVP, while the seeded demo keeps development and presentation independent of network access and API keys.
Alternatives rejected: expanding to Tron or multiple chains, or making live Etherscan access a requirement.
Impact: confirms the proposal in D-004. Ethereum is the only supported chain; Etherscan is an optional enhancement when configured, and all demo flows must remain available from local seed data.
