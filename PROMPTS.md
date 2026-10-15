# PROMPTS.md (copy and paste these; not read by agents)

## First prompt, brand new session or after switching agents
Read /AGENTS.md, docs/HANDOFF.md, docs/PHASES.md and docs/DECISIONS.md. Then reply in 3 lines: the current task, the files you will touch, and anything unclear. Do not write code until I say go.

## Quick resume prompt (same agent, new chat)
Continue from docs/HANDOFF.md. Follow /AGENTS.md. Work on the current task only.

## Before a switch or when you suspect a limit is near
Stop coding. Commit all work. Rewrite docs/HANDOFF.md using its template with exact file names and the state of any half-finished work. Append any new decisions to docs/DECISIONS.md and tick finished items in docs/PHASES.md.

## If a limit hit without warning
Run `git status` and `git diff`, then fill docs/HANDOFF.md yourself from the diff, commit, and use the first prompt with the new agent.

## Phase kickoff prompt
Start Phase N from docs/PHASES.md. List the tasks, propose the order and any decisions needed, wait for my approval, then build task by task, committing after each.

## Phase review prompt
Review Phase N against its "Done when" line and the product rules in /AGENTS.md. List anything missing, anything unverified labelled as verified, and any claim without a citation. Fix only what is on that list.
