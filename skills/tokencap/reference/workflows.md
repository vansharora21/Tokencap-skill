# TokenCap Workflows Reference

## Workflow 1: New Codebase Onboarding

**Goal:** Understand an unfamiliar project in under 5 minutes.

```
Step 1: Generate Intelligence
  └─ tokencap make

Step 2: Read Entry Point
  └─ Read .tokencap/agent/START_HERE.md

Step 3: Understand Structure
  └─ tokencap ask "What is the project architecture?"

Step 4: Find Relevant Files
  └─ Check .tokencap/agent/allowed-context.json

Step 5: Start Working
  └─ Use intelligence for context-aware decisions
```

**Time:** ~5 minutes vs. 30+ minutes manual exploration.

---

## Workflow 2: Code Review

**Goal:** Review a PR with full context, not just diff.

```
Step 1: Identify Changed Files
  └─ git diff --name-only main..feature

Step 2: Analyze Risk
  └─ tokencap analyze risk

Step 3: Check Impact
  └─ tokencap impact src/changed-file.js

Step 4: Find Test Gaps
  └─ tokencap analyze tests --gaps

Step 5: Generate Review Packet
  └─ tokencap analyze review

Step 6: Review with Context
  └─ Use risk score, impact analysis, test gaps
```

**Output:** Structured review with risk level, affected areas, and test recommendations.

---

## Workflow 3: Refactoring

**Goal:** Refactor safely with graph-guided suggestions.

```
Step 1: Get Suggestions
  └─ tokencap refactor suggest

Step 2: Preview a Suggestion
  └─ tokencap refactor preview <id>

Step 3: Verify Impact
  └─ tokencap impact <affected-file>

Step 4: Apply Safely
  └─ tokencap refactor apply <id> --dry

Step 5: Run Tests
  └─ npm test

Step 6: Apply for Real
  └─ tokencap refactor apply <id>
```

**Safety:** Dry-run by default. Preview before apply.

---

## Workflow 4: Debugging

**Goal:** Trace issues through the dependency graph.

```
Step 1: Understand the Failing Area
  └─ tokencap ask "How does [failing feature] work?"

Step 2: Trace Dependencies
  └─ tokencap impact src/failing-module.js

Step 3: Check for Related Risks
  └─ tokencap analyze risk

Step 4: Find Similar Patterns
  └─ tokencap explore "similar to [pattern]"

Step 5: Fix with Context
  └─ Make changes informed by dependency graph
```

**Benefit:** Find root cause faster by understanding the full dependency chain.

---

## Workflow 5: Architecture Review

**Goal:** Compare declared vs actual architecture.

```
Step 1: Generate Intelligence
  └─ tokencap make

Step 2: Check Constitution
  └─ tokencap verify

Step 3: Analyze Graph
  └─ Read .tokencap/graph/summary.md

Step 4: Identify Drift
  └─ Compare declared architecture with actual clusters

Step 5: Document Findings
  └─ Use intelligence as evidence for architecture decisions
```

**Output:** Architecture drift report with specific recommendations.

---

## Workflow 6: Session Handoff

**Goal:** Capture context for the next agent.

```
Step 1: Start Session
  └─ tokencap session start

Step 2: Work on Task
  └─ Make changes, note decisions

Step 3: End Session
  └─ tokencap session end

Step 4: Next Agent Loads Context
  └─ Read .tokencap/memory/ for decisions and notes
```

**Benefit:** No context loss between sessions.

---

## Workflow 7: CI/CD Integration

**Goal:** Automated intelligence generation in pipelines.

```yaml
# GitHub Actions example
- name: Generate Intelligence
  run: |
    npm install -g tokencap
    tokencap make --force

- name: Check Risk
  run: tokencap analyze risk --json > risk-report.json

- name: Upload Report
  uses: actions/upload-artifact@v3
  with:
    name: risk-report
    path: risk-report.json
```

**Benefit:** Automated risk assessment on every PR.

---

## Workflow 8: Team Onboarding

**Goal:** Get new team members productive fast.

```
Step 1: Generate Intelligence
  └─ tokencap make

Step 2: Share Intelligence
  └─ Commit .tokencap/ to repo (optional)

Step 3: New Member Loads Context
  └─ Read .tokencap/agent/START_HERE.md

Step 4: Ask Questions
  └─ tokencap ask "How does [feature] work?"

Step 5: Start Contributing
  └─ Use intelligence for informed decisions
```

**Time:** New members productive in hours, not days.

---

## Decision Matrix

| Situation | Workflow | Key Command |
|-----------|----------|-------------|
| New to the project | Onboarding | `tokencap make` |
| Reviewing a PR | Code Review | `tokencap analyze review` |
| Planning refactoring | Refactoring | `tokencap refactor suggest` |
| Debugging an issue | Debugging | `tokencap impact` |
| Architecture discussion | Architecture Review | `tokencap verify` |
| Handing off work | Session Handoff | `tokencap session end` |
| Setting up CI/CD | CI/CD Integration | `tokencap make --force` |
| Onboarding a teammate | Team Onboarding | `tokencap ask` |
