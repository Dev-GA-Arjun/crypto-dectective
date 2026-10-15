# AGENTS.md (single source of truth for every coding agent)

Project: TraceLedger, a crypto scam investigation and fund tracing platform (Bugged Out hackathon, PS 01).
Mode: single agent at a time. Agents are swapped only when one hits its usage limit.

## Start of every session (mandatory, in this order)

1. Read `docs/HANDOFF.md` (where the last agent stopped).
2. Read `docs/PHASES.md` (find the current phase and task).
3. Read `docs/DECISIONS.md` (do not contradict past decisions).
4. Read `docs/ARCHITECTURE.md` only for the parts you need.
5. Reply with a 3 line summary: current task, what you will touch, what you will not touch. Then start.

## Working rules

- Work on ONE task at a time from `docs/PHASES.md`. Do not start the next phase until the current phase checklist is fully ticked.
- Keep scope to the MVP list in `docs/PROJECT.md`. Anything not listed there needs a logged decision first.
- Every non-trivial choice (library, data shape, endpoint change, trade-off) is appended to `docs/DECISIONS.md` as a new D-number. Never edit or delete old entries; supersede them with a new entry.
- Do not rename or move files, or change the data model or API shapes, without logging a decision and updating `docs/ARCHITECTURE.md`.
- Commit after every completed task. Message format: `P<phase>.<task>: short description`.
- Update `docs/HANDOFF.md` every 30 to 45 minutes and before stopping. Limits can hit without warning.
- Tick finished items in `docs/PHASES.md` as you go.

## Product rules (non negotiable)

- Every finding must link to its evidence (chat message id, transaction hash, or both).
- Every graph edge and every finding is labelled `verified` (comes directly from blockchain data or supplied evidence) or `inferred` (derived by heuristic or model). Inferred items must carry a confidence value and a one line reason.
- Never present an inferred item as a fact. Never invent addresses, hashes, exchange labels, or amounts.
- If data is missing, show "unknown" instead of guessing.
- The app must run fully from the seeded demo case with no network. Live chain calls are an enhancement, never a dependency.

## Code rules

- Stack: Node.js + Express (server), React + Vite (client), MongoDB (Mongoose).
- Folders: `/server`, `/client`, `/docs`, `/server/seed`.
- Secrets only in `.env` (never commit). Keep `.env.example` current.
- Cache all external API responses in MongoDB or on disk.
- Keep functions small and named by what they do. Add short comments only where logic is non obvious.
- No emojis and no em dashes in code comments, docs, or UI copy.

## UI rules

All UI work follows the Hallmark skill at <path from step 1>. Design tokens live in client/src/design/tokens.css and design.md. Use only those tokens. Never hardcode colors, fonts, or spacing.

## End of session (mandatory)

1. Commit all work.
2. Rewrite `docs/HANDOFF.md` using its template.
3. Append any new decisions to `docs/DECISIONS.md`.
4. Tick completed items in `docs/PHASES.md`.
