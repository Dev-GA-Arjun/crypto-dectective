# HANDOFF.md (overwrite this file at the end of every session and every 30 to 45 minutes)

Last agent: Copilot
Last updated: 2026-10-15 11:42 +05:30
Branch / last commit: master / e6201ff P1.2: add validated Mongoose models

## Current phase and task
Phase 1, task 1.4 (not started)

## Done since last handoff
- Task 1.1: npm workspace scaffold, Express/Mongoose API, Vite/React client, `.env.example`, and `/api/health`.
- Task 1.2: seven Mongoose models with evidence-reference and inferred-certainty validation.
- Task 1.3: 32-message synthetic chat, 10 synthetic transactions across six wallets, and a fictional unverified exchange label.
- Commits: `1a40d4b` (1.1), `e6201ff` (1.2); task 1.3 changes are being committed with this handoff.

## In progress (exact state)
- Nothing. Task 1.3 fixture is complete and validated; no seed loader exists yet.

## Next 3 steps
1. Task 1.4: implement `npm run seed` to load the synthetic demo case into local MongoDB and preserve the synthetic-data notice.
2. Task 1.5: write `server/seed/demo-case.json` with sample response shapes for every API route.
3. Task 1.6: confirm or revise D-004 (Ethereum via Etherscan with seeded fallback).

## Known bugs and gotchas
- All wallets, transaction hashes, amounts, blocks, timestamps, and the example deposit endpoint in `server/seed/demo-txs.json` are fictional.
- `server/seed/exchange-labels.json` explicitly sets `verified` to `false`; never present its example endpoint as a real exchange attribution.
- `npm install` initially hit a transient Windows `EBUSY` on esbuild; retry succeeded.

## How to run
- Start local MongoDB, then run `npm install` and `npm run dev` from the repository root.
- The health endpoint is `http://localhost:5000/api/health`; the client is at `http://localhost:5173`.
- `npm run seed` is not implemented yet.

## Open questions for the human
- None for Phase 1. LLM and Etherscan keys are not needed; `.env.example` contains placeholders and `LLM_PROVIDER` is environment-configurable.

## Decisions made this session (also in DECISIONS.md)
- D-008: local MongoDB and environment-driven integration configuration.
- D-009: model-level evidence references and inferred certainty requirements.
- D-010: explicitly identify synthetic blockchain and exchange data as fictional.
