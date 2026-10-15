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
