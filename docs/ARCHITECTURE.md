# ARCHITECTURE.md

## Stack
- Server: Node.js, Express, Mongoose (MongoDB)
- Client: React + Vite, a graph library (React Flow or Cytoscape.js, see DECISIONS), a timeline component built by hand
- LLM: used for evidence extraction and the investigator chat. Provider set in `.env` (`LLM_PROVIDER`, `LLM_API_KEY`). Must return JSON for extraction.
- Chain data: Etherscan API (Ethereum). Cached. Seed file used as fallback.

## Folder structure
```
/server
  /src
    /models        Case, Evidence, Entity, Transaction, Edge, TimelineEvent, Report
    /routes        cases, evidence, trace, graph, timeline, chat, report
    /services      extractor, tracer, correlator, detectors, freezeClock, reporter, chatAgent
    /lib           etherscanClient, llmClient, cache
  /seed            demo-case.json, demo-chat.txt, demo-txs.json
/client
  /src
    /pages         CaseList, CaseView
    /components    EvidencePanel, GraphView, Timeline, FreezeClock, ChatPanel, ReportView
    /api           client helpers
/docs
```

## Data model (core fields)
- Case: _id, title, victimName, status, createdAt
- Evidence: _id, caseId, type (chat | report | txhash | address | file), rawText, source, createdAt
- ChatMessage (embedded or separate): id, evidenceId, sender, timestamp, text
- Entity: _id, caseId, kind (wallet | txhash | exchange | person | amount), value, label, labelStatus (verified | inferred), evidenceRefs[]
- Transaction: hash, caseId, from, to, valueWei, asset, timestamp, blockNumber, status
- Edge: _id, caseId, from, to, amount, asset, timestamp, txHash (nullable), status (verified | inferred), confidence (0 to 1, inferred only), reason, evidenceRefs[]
- TimelineEvent: _id, caseId, timestamp, kind (chat | tx | detector), summary, status, evidenceRefs[]
- Report: _id, caseId, summary, findings[], freezeRequestDraft, generatedAt

`evidenceRefs` item shape: `{ type: "chat" | "tx" | "evidence", id: string, excerpt?: string }`

## API contract (all JSON, prefix /api)
| Method | Route | Purpose |
|---|---|---|
| POST | /cases | create case (or load seeded demo) |
| GET | /cases | list cases |
| GET | /cases/:id | case with evidence summary |
| POST | /cases/:id/evidence | add chat text, report text, tx hash, or address |
| POST | /cases/:id/extract | run extraction, returns entities and chat events |
| POST | /cases/:id/trace | trace from seed wallets (depth limited), returns edges |
| GET | /cases/:id/graph | nodes and edges with status labels |
| GET | /cases/:id/timeline | merged chronological events |
| GET | /cases/:id/findings | detector and contradiction findings |
| GET | /cases/:id/freeze-clock | per exchange endpoint: arrivedAt, hoursElapsed, urgency |
| POST | /cases/:id/chat | question in, answer plus citations out |
| POST | /cases/:id/report | generate summary and freeze request draft |

Response shapes live in `server/seed/demo-case.json`. If a shape changes, log a decision and update this file.

## Freeze urgency rule (initial, tunable, log changes)
- LOW: under 12 hours since funds reached the endpoint
- MEDIUM: 12 to 48 hours
- HIGH: over 48 hours
Reason: freeze requests are most effective soon after deposit. Label this rule as a heuristic in the UI.

## Exchange endpoint identification
A wallet is labelled an exchange endpoint only if it matches the local label list `server/seed/exchange-labels.json`. Match is `verified`. Any other guess (for example a high-volume deposit pattern) is `inferred` with a confidence and reason.

## Chat agent design
Tool calling over case data only. Tools: `get_transactions(wallet)`, `get_edges()`, `find_chat_mentions(query)`, `get_timeline()`, `get_freeze_clock()`. The system prompt forbids claims without a citation. Output format: answer text plus `citations[]` plus `status` per claim.

## Run
- `npm run dev` in `/server` (port 5000) and `/client` (port 5173)
- `npm run seed` loads the demo case
- `.env.example` lists all variables (MONGODB_URI, ETHERSCAN_API_KEY, LLM_PROVIDER, LLM_API_KEY)
