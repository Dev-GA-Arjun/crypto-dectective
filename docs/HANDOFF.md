# HANDOFF.md (overwrite this file at the end of every session and every 30 to 45 minutes)

Last agent: Copilot
Last updated: 2026-10-15 11:52 +05:30
Branch / last commit: master / e45ecc1 P1.5: document API response shapes

## Current phase and task
Phase 2, task 2.1 (not started)

## Done since last handoff
- Phase 1 tasks 1.1-1.6 completed, each in its own commit:
  - `1a40d4b` P1.1: scaffold server and client
  - `e6201ff` P1.2: add validated Mongoose models
  - `b613603` P1.3: add synthetic demo case data
  - `ae6a7f0` P1.4: seed synthetic demo case
  - `e45ecc1` P1.5: document API response shapes
  - The current handoff commit completes P1.6 and confirms D-004.
- Client production build passed; `/api/health` returned `status: ok`, `database: connected`.
- Root `npm run dev` started both apps together; the API health JSON and Vite client HTML both returned HTTP 200.
- `npm run seed` succeeded twice; MongoDB holds one synthetic case, 12 evidence records, and 10 transactions after both runs.
- `server/seed/demo-case.json` has a sample shape for all 13 documented API routes.

## In progress (exact state)
- Phase 1 is complete. Phase 2 has not started.

## Next 3 steps
1. Task 2.1: implement `POST /cases/:id/evidence` to store chat/report text, transaction hashes, and addresses.
2. Task 2.2: parse WhatsApp/Telegram export format into `ChatMessage` objects.
3. Task 2.3: add provider-swappable LLM extraction that validates its JSON output.

## Known bugs and gotchas
- All wallets, transaction hashes, amounts, blocks, timestamps, and the example deposit endpoint in `server/seed/demo-txs.json` are fictional.
- `server/seed/exchange-labels.json` explicitly sets `verified` to `false`; never present its example endpoint as a real exchange attribution.
- `npm install` initially hit a transient Windows `EBUSY` on esbuild; retry succeeded.
- API response shapes are documented but most routes are not implemented yet.

## How to run
- Start local MongoDB, then run `npm install` and `npm run dev` from the repository root.
- Run `npm run seed` to load or refresh only the fixed synthetic case; it does not call external APIs.
- The health endpoint is `http://localhost:5000/api/health`; the client is at `http://localhost:5173`.

## Open questions for the human
- None. LLM provider and key are environment-configurable; Etherscan and LLM keys are optional until their integrations are implemented.

## Decisions made this session (also in DECISIONS.md)
- D-008: local MongoDB and environment-driven integration configuration.
- D-009: model-level evidence references and inferred certainty requirements.
- D-010: explicitly identify synthetic blockchain and exchange data as fictional.
- D-011: idempotently refresh only the synthetic demo case.
- D-012: define route-specific JSON response contracts.
- D-013: confirm Ethereum with optional Etherscan.
