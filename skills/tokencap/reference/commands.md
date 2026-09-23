# TokenCap CLI Commands Reference

## Core Commands

### `tokencap make`
Generate or refresh the intelligence snapshot.

```bash
tokencap make                    # Generate (skip if fresh)
tokencap make --force            # Regenerate (ignore cache)
tokencap make --watch            # Auto-regenerate on file changes
tokencap make --plan-only        # Plan mode (no file writes)
```

**Output:** `.tokencap/` directory with snapshot, graph, brain, agent docs.

---

### `tokencap ask <question>`
Query the intelligence snapshot in natural language.

```bash
tokencap ask "How does authentication work?"
tokencap ask "What are the main entry points?"
tokencap ask "Where is the database connection configured?"
```

**Returns:** Relevant files, code locations, and explanations.

---

### `tokencap impact <file>`
Analyze the impact of changing a specific file.

```bash
tokencap impact src/auth.js              # Direct impact
tokencap impact src/auth.js:validateToken # Specific function
tokencap impact src/utils.js --deep      # Include transitive dependents
```

**Returns:** Direct dependents, transitive dependents, boundary crossings, risk level.

---

### `tokencap analyze <type>`
Run batched analysis on the codebase.

```bash
tokencap analyze risk         # Repository risk assessment
tokencap analyze review       # Generate review packet
tokencap analyze tests        # Test mapping
tokencap analyze tests --gaps # Find test coverage gaps
```

**Returns:** Structured analysis with risk scores, review checklists, test recommendations.

---

### `tokencap refactor <action>`
Get and apply refactoring suggestions.

```bash
tokencap refactor suggest           # Get suggestions
tokencap refactor preview <id>      # Preview a suggestion
tokencap refactor apply <id>        # Apply a suggestion
tokencap refactor apply <id> --dry  # Dry run (no writes)
```

**Returns:** Ranked suggestions with impact estimates and safe preview.

### `tokencap update`
Update TokenCap to the latest version.

```bash
tokencap update             # Check and install latest version
tokencap update --check     # Check for updates without installing
tokencap update --force     # Force re-installation of latest version
```

---

## Server Commands

### `tokencap serve`
Start the MCP server for real-time queries.

```bash
tokencap serve              # Start (foreground)
tokencap serve --daemon     # Start (background)
tokencap serve --stop       # Stop running server
tokencap serve --status     # Check server status
tokencap serve --port 3000  # Custom port
```

---

## Utility Commands

### `tokencap health`
Check intelligence freshness and validity.

```bash
tokencap health             # Show freshness status
tokencap health --verbose   # Show detailed metrics
```

---

### `tokencap stats`
View token savings metrics.

```bash
tokencap stats              # Show savings summary
tokencap stats --json       # Machine-readable output
```

---

### `tokencap session <action>`
Manage session handoff between agents.

```bash
tokencap session start      # Start a new session
tokencap session end        # End session, capture decisions
tokencap session list       # List recent sessions
```

---

## MCP Tools

When the MCP server is running, these tools are available:

| Tool | Parameters | Description |
|------|-----------|-------------|
| `overview` | (none) | Project summary, tech stack, architecture |
| `impact` | `file`, `deep?` | Analyze change impact |
| `analyze` | `type`, `files?` | Batched analysis (risk, review, tests) |
| `explore` | `query`, `type?` | Search files by content, patterns, names |
| `verify` | `type?` | Constitution checks, architecture drift |
| `improve` | `file?` | Refactoring suggestions, code smells |

---

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Invalid arguments |
| 3 | File not found |
| 4 | Permission denied |
| 5 | Generation failed |
| 6 | Server error |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `TOKENCAP_HOME` | `.tokencap` | Intelligence directory |
| `TOKENCAP_PORT` | `3000` | MCP server port |
| `TOKENCAP_LOG` | `info` | Log level (debug, info, warn, error) |
| `TOKENCAP_CACHE` | `true` | Enable/disable caching |
