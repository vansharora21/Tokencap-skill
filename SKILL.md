---
name: tokencap
description: Generate and query local-first codebase intelligence for AI coding agents. Use when starting work on an unfamiliar codebase, understanding architecture, planning a change, reviewing risk, debugging dependencies, or preparing a session handoff.
---

# TokenCap: Local-First Codebase Intelligence

## Overview

TokenCap builds a compact, graph-ranked view of a repository before an agent starts exploring it. It keeps repository intelligence local and makes relevant architecture, dependencies, risks, rules, and recent changes available without repeatedly reading unrelated files.

The four laws are: no runtime network egress, no API keys, no separate build step after installation, and an auditable dependency surface.

## When to Use

- Starting work in an unfamiliar repository.
- Planning a feature, refactor, or risky change.
- Reviewing changes and identifying test gaps.
- Debugging a dependency or architecture issue.
- Handing an approved session summary to the next agent.

## When NOT to Use

- A trivial repository with fewer than roughly 20 source files.
- One-off code generation with no existing repository to inspect.
- Binary-only projects.
- A workflow requiring a hosted collaboration service; TokenCap is local-first.

## Quick Start

### Step 1: Build intelligence

```bash
cd /path/to/project
tokencap make
```

For a full clean rebuild, use `tokencap make --rebuild`.

### Step 2: Read the entry point

Read `.tokencap/agent/START_HERE.md`, then use `.tokencap/agent/allowed-context.json` to select task-relevant files. Do not scan the repository broadly unless this generated context is insufficient.

### Step 3: Query only what is needed

```bash
tokencap ask "How does authentication work?"
tokencap ask impact src/auth/token.js:validateToken
tokencap analyze review
```

### Step 4: Use MCP when an agent host supports it

```bash
tokencap serve --mcp
tokencap serve --mcp --init --client codex
```

`tokencap serve` without `--mcp` starts the local browser Companion bridge, not the MCP server.

## Core Workflows

### Workflow 1: New Codebase Onboarding

```text
1. Run tokencap make.
2. Read .tokencap/agent/START_HERE.md.
3. Select relevant files through allowed-context.json.
4. Use tokencap ask for a focused architecture question.
5. Read only the returned files before editing.
```

### Workflow 2: Code Review

```bash
tokencap analyze review
tokencap analyze risk
tokencap ask impact src/changed-file.js:changedSymbol
tokencap analyze tests --gaps
```

Treat findings as evidence and verify uncertain conclusions in source. Review packets are advisory; they are not compliance verdicts.

### Workflow 3: Refactoring

```bash
tokencap ask impact src/module.js:targetSymbol
tokencap analyze refactor
tokencap analyze tests --gaps
```

Inspect the plan and test scope before applying source edits. TokenCap should guide decisions, never silently rewrite a repository.

### Workflow 4: Debugging

```bash
tokencap ask "How does the failing feature work?"
tokencap ask impact src/failing-module.js:failingSymbol
tokencap analyze debug
```

### Workflow 5: Session Handoff

```bash
tokencap serve session save --summary "what changed" --files src/example.js
tokencap serve session list
tokencap serve session handoff
```

Captured sessions remain staged until explicitly approved; do not treat raw browser conversations as durable memory.

## MCP Tools Reference

Start MCP with `tokencap serve --mcp`. Use the host's MCP client to call tools with the `tokencap_` prefix:

| Tool | Use |
| --- | --- |
| `tokencap_overview` | Project orientation, stack, risks, and freshness. |
| `tokencap_files` | Graph-ranked files relevant to a task. |
| `tokencap_search` | Cross-layer intelligence search. |
| `tokencap_impact` | Proposed-change blast radius. |
| `tokencap_review` | Evidence-backed local review packet. |
| `tokencap_verify` | Relevant test, build, and lint guidance. |
| `tokencap_execution` | Execution-contract guidance for the current task. |

## CLI Commands Reference

TokenCap v2.8+ has seven core commands:

| Command | Purpose |
| --- | --- |
| `tokencap make` | Build or refresh repository intelligence. |
| `tokencap ask <query>` | Create a task-scoped context pack or query the brain/impact graph. |
| `tokencap analyze <tool>` | Run review, tests, risk, security, refactor, and related analysis. |
| `tokencap serve` | Run the browser Companion bridge; add `--mcp` for the MCP server. |
| `tokencap update` | Check for and install TokenCap updates. |
| `tokencap help` | Show command help. |
| `tokencap version` | Print the installed version. |

Legacy top-level commands remain compatibility aliases, but agents should use the core command forms above in new instructions.

## Decision Trees

### Should intelligence be rebuilt?

```text
No .tokencap/ directory?  Run tokencap make.
Existing intelligence but substantial repository drift?  Run tokencap make --rebuild.
Recent, relevant intelligence?  Use it and avoid a broad scan.
```

### MCP or CLI?

```text
Agent host supports MCP?  Start tokencap serve --mcp and query tools on demand.
Need a terminal artifact or a one-off answer?  Use tokencap ask or tokencap analyze.
Need browser-chat context?  Start tokencap serve without --mcp.
```

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "I will just grep first." | Search text after the graph has selected a relevant scope. |
| "I know this codebase." | The graph can reveal indirect dependents and stale assumptions. |
| "More files means better context." | High-signal, bounded context is more useful than a repository dump. |
| "The analyzer is always right." | Findings are evidence, not ground truth; inspect source before acting. |

## Red Flags

- Generated intelligence is missing, stale, or does not mention the current area.
- The graph omits a file known to be central to the task.
- A risk or impact claim lacks source evidence.
- The repository changed materially after the last build.

## Verification

- [ ] Intelligence exists and is fresh enough for the task.
- [ ] `START_HERE.md` and `allowed-context.json` were read first.
- [ ] The intended change's impact and test scope were considered.
- [ ] Important decisions are captured through the staged session workflow when appropriate.
