# TokenCap Agent Skill

The standalone Agent Skill for [TokenCap](https://github.com/vansharora21/TOKENCAP): local-first codebase intelligence for AI coding agents.

The Skill tells compatible agents to build repository intelligence once, start from `.tokencap/agent/START_HERE.md`, and use graph-ranked context for onboarding, change planning, review, debugging, and staged session handoff.

## Prerequisite

Install the TokenCap CLI in the environment where the agent works:

```bash
npm install -g tokencap
```

## Install the Skill

Clone this repository into the skill directory used by your host, or copy its contents there. The repository root is the Skill directory; do not nest it again under another `tokencap/` folder.

```bash
git clone https://github.com/vansharora21/Tokencap-skill.git <your-host-skills-directory>/tokencap
```

Hosts choose their own discovery locations. Examples include a project-scoped skills folder, Codex's configured skills location, or a host-specific global skills directory. TokenCap does not automatically overwrite host configuration.

After installation, the agent should run:

```bash
tokencap make
```

For MCP-capable hosts, start the server separately:

```bash
tokencap serve --mcp
```

`tokencap serve` without `--mcp` starts the browser Companion bridge.

## Contents

- `SKILL.md`: agent instructions and operating boundaries.
- `reference/commands.md`: the current seven-command CLI surface.
- `reference/workflows.md`: onboarding, review, refactoring, debugging, handoff, and CI workflows.

The Skill tracks TokenCap v2.9.0. See the [TokenCap documentation](https://tokencap.vansharora.app/) for product and host setup guidance.

## Validation

```bash
npm test
```

## License

[MIT](LICENSE)
