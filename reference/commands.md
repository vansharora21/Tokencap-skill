# TokenCap CLI Command Reference

## Seven Core Commands

### `tokencap make`

Build or refresh local repository intelligence.

```bash
tokencap make
tokencap make --watch
tokencap make --rebuild
tokencap make --open-graph
```

### `tokencap ask <query>`

Create a focused context pack or query a specific intelligence surface.

```bash
tokencap ask "How does authentication work?"
tokencap ask brain authentication
tokencap ask impact src/auth/token.js:validateToken
```

### `tokencap analyze <tool>`

Run bounded repository analysis.

```bash
tokencap analyze review
tokencap analyze review --base main
tokencap analyze tests --gaps
tokencap analyze risk
tokencap analyze refactor
```

### `tokencap serve`

Run a local service. The default is the browser Companion bridge; `--mcp` selects the MCP stdio server.

```bash
tokencap serve
tokencap serve --daemon
tokencap serve --status
tokencap serve --stop
tokencap serve --mcp
tokencap serve --mcp --init --client codex
```

### `tokencap update`

Check for or install an update.

```bash
tokencap update
tokencap update --check
```

### `tokencap help` and `tokencap version`

```bash
tokencap help
tokencap version
```

## Session Handoff

```bash
tokencap serve session save --summary "implemented auth guard" --files src/auth/guard.js
tokencap serve session list
tokencap serve session handoff
```

## MCP Tool Names

MCP tools use the `tokencap_` prefix. Common entry points are `tokencap_overview`, `tokencap_files`, `tokencap_search`, `tokencap_impact`, `tokencap_review`, and `tokencap_verify`.

## Compatibility

Legacy commands remain aliases for existing users. New instructions should use the seven core commands above so the Skill remains portable across current installations.
