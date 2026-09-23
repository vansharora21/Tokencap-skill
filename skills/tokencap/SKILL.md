---
name: tokencap
description: Generate and query local-first codebase intelligence for AI coding agents. Use when starting work on an unfamiliar codebase, when you need to understand project architecture, when reviewing changes for risk, when onboarding to a new project, when planning refactoring, or when an agent lacks project context.
---

# TokenCap — Local-First Codebase Intelligence

## Overview

TokenCap generates a compact, graph-ranked intelligence snapshot of any codebase. It gives AI agents immediate full project context — architecture, dependencies, risks, patterns — without re-discovering the codebase every session.

**The core insight:** AI agents waste tokens re-reading codebases from scratch. TokenCap pre-computes the intelligence once, stores it locally, and lets any agent load it instantly.

**The four laws:**
1. No network egress at runtime (everything stays local)
2. No API keys, ever (no premium tier, no degraded free path)
3. No build step (install and run)
4. Auditable surface (small dependency tree)

## When to Use

- **Starting work on an unfamiliar codebase** — generate intelligence before writing code
- **Reviewing a PR or commit** — analyze risk, impact, and test coverage gaps
- **Onboarding a new team member** — provide instant project context
- **Planning refactoring** — get graph-guided suggestions ranked by impact
- **Debugging dependency issues** — trace transitive callers and blast radius
- **Architecture review** — compare declared vs actual architecture
- **Session handoff** — capture decisions and context for the next agent

## When NOT to Use

- **Trivial scripts** (<20 files) — the overhead exceeds the value
- **One-off code generation** — no existing codebase to analyze
- **Binary-only repos** — TokenCap analyzes source code, not compiled output
- **When you need real-time collaboration** — TokenCap is local-first, not a server

---

## Quick Start

### Step 1: Generate Intelligence

```bash
# Navigate to your project root
cd /path/to/your/project

# Generate the intelligence snapshot
tokencap make
```

This creates `.tokencap/` with:
```
.tokencap/
├── snapshot.md          # Token-budgeted project overview
├── graph/               # Dependency graph and clusters
├── brain/               # Knowledge base (patterns, risks)
├── agent/               # AI onboarding docs
│   ├── START_HERE.md    # Entry point for agents
│   └── allowed-context.json  # File relevance map
├── memory/              # Developer notes and decisions
└── savings.json         # Token savings metrics
```

### Step 2: Load Intelligence

**Option A: Read the entry point**
```
Read .tokencap/agent/START_HERE.md
```

**Option B: Use MCP tools** (if MCP server is running)
```bash
tokencap serve  # Start the MCP server
```

Then use MCP tools: `overview`, `impact`, `analyze`, `explore`, `verify`

**Option C: Use the CLI directly**
```bash
tokencap ask "How does authentication work?"
tokencap impact src/auth.js:validateToken
tokencap analyze risk
```

### Step 3: Apply Intelligence

Use the generated context to:
- Make informed code changes
- Identify affected files before editing
- Understand architecture before adding features
- Review changes with full context

---

## Core Workflows

### Workflow 1: New Codebase Onboarding

```
START
  │
  ▼
Is .tokencap/ present?
  ├── NO → Run `tokencap make`
  │         │
  │         ▼
  │       Read .tokencap/agent/START_HERE.md
  │         │
  │         ▼
  │       Check allowed-context.json for relevant files
  │
  └── YES → Check freshness with `tokencap health`
             │
             ├── FRESH (< 24h old) → Use existing intelligence
             │
             └── STALE (> 24h old) → Run `tokencap make --force`
                                       │
                                       ▼
                                     Use refreshed intelligence
```

### Workflow 2: Code Review

```bash
# 1. Analyze the changes
tokencap analyze review

# 2. Check risk score
tokencap analyze risk

# 3. Identify impact
tokencap impact src/changed-file.js

# 4. Find test gaps
tokencap analyze tests --gaps

# 5. Review with context
# The agent now has: risk score, impact analysis, test gaps, review checklist
```

### Workflow 3: Refactoring

```bash
# 1. Get suggestions
tokencap refactor suggest

# 2. Preview a specific suggestion
tokencap refactor preview <suggestion-id>

# 3. Apply safely (dry-run by default)
tokencap refactor apply <suggestion-id>

# 4. Verify
npm test
```

### Workflow 4: Debugging

```bash
# 1. Understand the failing area
tokencap ask "How does [failing feature] work?"

# 2. Trace dependencies
tokencap impact src/failing-module.js

# 3. Check for related risks
tokencap analyze risk

# 4. Find similar patterns
tokencap explore "similar to [pattern]"
```

---

## MCP Tools Reference

When the MCP server is running (`tokencap serve`), use these tools:

| Tool | What It Does | When to Use |
|------|-------------|-------------|
| `overview` | Project summary, tech stack, architecture | Starting work, orientation |
| `impact` | Analyze change impact (direct + transitive) | Before editing, review |
| `analyze` | Batched analysis (risk, review, tests) | Comprehensive review |
| `explore` | Search files by content, patterns, names | Finding relevant code |
| `verify` | Constitution checks, architecture drift | Quality gates |
| `improve` | Refactoring suggestions, code smells | Planning improvements |

### Tool Usage Patterns

**Before making changes:**
```
impact(file) → understand blast radius
analyze(file) → get risk + review checklist
```

**When exploring unfamiliar code:**
```
overview() → understand project structure
explore(query) → find relevant files
```

**During code review:**
```
analyze(changedFiles) → risk + tests + review
verify() → check constitution compliance
```

---

## CLI Commands Reference

| Command | What It Does | Example |
|---------|-------------|---------|
| `tokencap make` | Generate intelligence snapshot | `tokencap make` |
| `tokencap make --force` | Regenerate (ignore cache) | `tokencap make --force` |
| `tokencap make --watch` | Auto-regenerate on file changes | `tokencap make --watch` |
| `tokencap health` | Check intelligence freshness | `tokencap health` |
| `tokencap ask <question>` | Query the intelligence | `tokencap ask "auth flow"` |
| `tokencap impact <file>` | Analyze change impact | `tokencap impact src/auth.js` |
| `tokencap analyze risk` | Repository risk assessment | `tokencap analyze risk` |
| `tokencap analyze review` | Generate review packet | `tokencap analyze review` |
| `tokencap analyze tests` | Test mapping and gaps | `tokencap analyze tests --gaps` |
| `tokencap refactor suggest` | Get refactoring suggestions | `tokencap refactor suggest` |
| `tokencap serve` | Start MCP server | `tokencap serve` |
| `tokencap serve --daemon` | Start MCP server (background) | `tokencap serve --daemon` |
| `tokencap serve --stop` | Stop MCP server | `tokencap serve --stop` |
| `tokencap stats` | View token savings | `tokencap stats` |

---

## Intelligence Artifacts

### snapshot.md
Token-budgeted project overview. Contains:
- Project metadata (name, language, framework)
- File manifest (most important files ranked)
- Git snapshot (recent changes)
- Architecture summary

### graph/
Dependency graph and clusters. Contains:
- `summary.md` — Human-readable graph overview
- `clusters.json` — Louvain-detected communities
- `graph.html` — Interactive visualization

### brain/
Knowledge base. Contains:
- `knowledge.json` — Patterns, risks, rules
- `clusters.json` — Code organization
- `timeline.json` — Development history

### agent/
AI onboarding docs. Contains:
- `START_HERE.md` — Entry point for agents
- `allowed-context.json` — File relevance map
- `agent.json` — Machine-readable intelligence
- `execution-contract/` — Behavior constraints

---

## Decision Trees

### Should I regenerate intelligence?

```
Is .tokencap/ present?
├── NO → Yes, run `tokencap make`
└── YES
    │
    Has the codebase changed significantly?
    ├── YES (>10% files changed) → Yes, run `tokencap make --force`
    └── NO
        │
        Is intelligence > 24 hours old?
        ├── YES → Probably, run `tokencap make`
        └── NO → No, use existing
```

### Should I use MCP or CLI?

```
Do you need real-time queries?
├── YES → Use MCP (`tokencap serve`)
│         │
│         └── Is the server running?
│             ├── YES → Use MCP tools
│             └── NO → Run `tokencap serve` first
│
└── NO
    │
    Do you need batch analysis?
    ├── YES → Use CLI (`tokencap analyze`, `tokencap impact`)
    └── NO → Use CLI for simple queries (`tokencap ask`)
```

### How detailed should my analysis be?

```
What are you doing?
├── Quick orientation → `overview` tool or `tokencap ask`
├── Code review → `analyze` tool (risk + tests + review)
├── Refactoring → `improve` tool or `tokencap refactor suggest`
├── Debugging → `impact` tool + `tokencap ask`
└── Architecture review → `verify` tool + graph analysis
```

---

## Common Rationalizations

| Rationalization | Reality |
|----------------|---------|
| "I'll just grep for what I need" | Grep finds text, not meaning. TokenCap finds architecture, dependencies, and risk. |
| "My codebase is too small" | Under 20 files? Skip it. 20-100 files? The snapshot alone saves 10+ minutes of orientation. |
| "I already know this codebase" | The next person won't. Generate intelligence for your future self and your team. |
| "It takes too long to generate" | `tokencap make` on a 1000-file repo takes ~5 seconds. The intelligence saves hours. |
| "I don't trust generated analysis" | TokenCap shows evidence, not opinions. Every finding has a source. Verify it yourself. |
| "We have documentation" | Documentation rots. TokenCap generates from the actual code, always current. |
| "I'll read the code myself" | You will. But you'll read the RIGHT code, not waste time on irrelevant files. |

---

## Red Flags

Stop and regenerate if you see:

- **Intelligence is stale** — `tokencap health` shows >24h old
- **Missing files** — Intelligence doesn't cover files you're working on
- **Wrong architecture** — Graph doesn't match what you see in the code
- **Outdated risks** — Risk findings reference code that no longer exists
- **Empty clusters** — Graph shows no meaningful organization

---

## Anti-Patterns

### BAD: Reading files without context
```bash
# Blindly reading files
cat src/auth.js
cat src/user.js
cat src/api/routes.js
# Wasted time reading irrelevant code
```

### GOOD: Using intelligence to find relevant files
```bash
# Get oriented first
tokencap ask "authentication flow"
# Then read only the relevant files
cat src/auth/validateToken.js
cat src/auth/middleware.js
```

### BAD: Refactoring without impact analysis
```bash
# Changing code without understanding blast radius
vim src/utils.js  # Oops, 47 files depend on this
```

### GOOD: Analyze before changing
```bash
# Understand impact first
tokencap impact src/utils.js
# Shows: 47 dependents, 3 boundary crossings, HIGH risk
# Now make informed decisions
```

---

## Verification

After using TokenCap, verify:

- [ ] Intelligence is fresh (`tokencap health` shows <24h)
- [ ] You understand the project architecture
- [ ] You know which files are most important
- [ ] You understand the dependency graph
- [ ] You've identified risks before making changes
- [ ] You have test coverage information
- [ ] You can trace impact of your changes

---

## Cross-References

- For code review guidance, see `code-review-and-quality`
- For debugging workflows, see `debugging-and-error-recovery`
- For security analysis, see `security-and-hardening`
- For performance concerns, see `performance-optimization`
- For testing strategies, see `test-driven-development`
- For architecture decisions, see `documentation-and-adrs`

---

## Troubleshooting

### Intelligence not generating
```bash
# Check for errors
tokencap make 2>&1

# Verify Node.js version (requires 18+)
node --version

# Check disk space
df -h
```

### MCP server not responding
```bash
# Stop any existing server
tokencap serve --stop

# Start fresh
tokencap serve

# Test connection
tokencap mcp --test
```

### Stale intelligence after code changes
```bash
# Force regeneration
tokencap make --force

# Or enable auto-regeneration
tokencap make --watch
```

### Wrong file relevance
```bash
# Check what the intelligence thinks is relevant
cat .tokencap/agent/allowed-context.json

# Regenerate if needed
tokencap make --force
```
