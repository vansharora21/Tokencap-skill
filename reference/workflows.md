# TokenCap Workflows Reference

## Workflow 1: New Codebase Onboarding

```text
1. tokencap make
2. Read .tokencap/agent/START_HERE.md
3. Read allowed-context.json for the task area
4. tokencap ask "What is the project architecture?"
5. Read only the returned files before editing
```

## Workflow 2: Code Review

```text
1. tokencap analyze review
2. tokencap analyze risk
3. tokencap ask impact <file>:<symbol>
4. tokencap analyze tests --gaps
5. Verify material findings in source and tests
```

## Workflow 3: Refactoring

```text
1. tokencap ask impact <file>:<symbol>
2. tokencap analyze refactor
3. tokencap analyze tests --gaps
4. Apply a minimal source change
5. Run the repository's test command
```

## Workflow 4: Debugging

```text
1. tokencap ask "How does the failing feature work?"
2. tokencap ask impact <file>:<symbol>
3. tokencap analyze debug
4. Inspect the relevant code and reproduce the issue
```

## Workflow 5: Architecture Review

```text
1. tokencap make --rebuild
2. Read .tokencap/graph/summary.md and agent architecture context
3. tokencap analyze constitution
4. Record verified architecture decisions through the repository process
```

## Workflow 6: Session Handoff

```text
1. tokencap serve session save --summary "outcome" --files <paths>
2. Review staged captures before approval
3. tokencap serve session handoff
4. The next agent starts at .tokencap/agent/START_HERE.md
```

## Workflow 7: CI

```yaml
- name: Build TokenCap intelligence
  run: |
    npm install -g tokencap
    tokencap make --rebuild

- name: Review repository risk
  run: tokencap analyze risk --json > risk-report.json
```
