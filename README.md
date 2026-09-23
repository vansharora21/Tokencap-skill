# TokenCap Agent Skill

Local-first codebase intelligence and context layer for AI coding agents.

This repository packages **TokenCap** as an Agent Skill compatible with Antigravity, Claude Code, Cursor, OpenCode, Cline, and other AI coding environments.

## What it does

TokenCap generates a compact, graph-ranked intelligence snapshot of any codebase. Instead of burning thousands of tokens rediscovering project structure in every prompt, agents load this pre-computed context instantly:

- **100% Local**: No network egress, no API keys, no external servers.
- **Secret Redaction**: Statically scrubs sensitive variables and keys.
- **Graph-Ranked Relevance**: Delivers architecture, dependencies, risk scores, and review checklists.

## Installation

### 1. Antigravity
Clone or copy into your Antigravity skills directory:
```bash
# Global (available across all projects)
git clone https://github.com/vansharora21/tokencap-skill.git ~/.gemini/config/skills/tokencap

# Or Workspace-scoped
git clone https://github.com/vansharora21/tokencap-skill.git .agents/skills/tokencap
```

### 2. Claude Code
Copy into your Claude Code skills directory:
```bash
git clone https://github.com/vansharora21/tokencap-skill.git ~/.claude/skills/tokencap
```

### 3. Cursor / OpenCode
Add to your project root under `.cursor/skills/` or `.opencode/skills/`.

## Prerequisites

Install the TokenCap CLI:
```bash
npm install -g tokencap
```

## Workflows Included

1. **New Codebase Onboarding**: Understand unfamiliar architecture in under 5 minutes.
2. **Pre-Commit / PR Code Review**: Analyze risk, impact blast radius, and test coverage gaps.
3. **Graph-Guided Refactoring**: Refactor safely using dependency graphs.
4. **Deep Debugging**: Trace call resolution, symbol usage, and blast radius.
5. **Architecture Review**: Compare declared vs actual architecture clusters.
6. **Session Handoff**: Preserve decision context across agent sessions.

See [reference/workflows.md](reference/workflows.md) and [reference/commands.md](reference/commands.md) for full documentation.

## License

[MIT](LICENSE)
