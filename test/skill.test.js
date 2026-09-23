// @ts-check
"use strict";

/**
 * @file skill.test.js
 * Automated tests for TokenCap as an Agent Skill.
 * Validates SKILL.md frontmatter, documentation structure, reference guides,
 * and command coverage.
 *
 * Runs with: node ./test/skill.test.js
 */

const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const SKILL_FILE = path.join(ROOT, "SKILL.md");
const COMMANDS_FILE = path.join(ROOT, "reference", "commands.md");
const WORKFLOWS_FILE = path.join(ROOT, "reference", "workflows.md");

let passed = 0;
let failed = 0;

/**
 * @param {string} name
 * @param {() => void} fn
 */
function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error(`  ✗ ${name}`);
    console.error(`    ${error.message}`);
    failed++;
  }
}

console.log("TokenCap Standalone Skill Tests\n");

// ─────────────────────────────────────────────────────────────────────────────
// 1. Skill File Existence & Structure
// ─────────────────────────────────────────────────────────────────────────────

test("SKILL.md exists and is readable", () => {
  assert.ok(fs.existsSync(SKILL_FILE), "SKILL.md must exist");
  const stats = fs.statSync(SKILL_FILE);
  assert.ok(stats.size > 500, `SKILL.md size should be substantial (got ${stats.size} bytes)`);
});

test("SKILL.md has valid YAML frontmatter with name and description", () => {
  const content = fs.readFileSync(SKILL_FILE, "utf8");
  assert.ok(content.startsWith("---\n") || content.startsWith("---\r\n"), "SKILL.md must start with YAML frontmatter delimiters");
  
  const endIdx = content.indexOf("\n---", 4);
  assert.ok(endIdx > 4, "SKILL.md must close YAML frontmatter with ---");
  
  const frontmatter = content.slice(4, endIdx);
  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);
  
  assert.ok(nameMatch, "Frontmatter must contain 'name'");
  assert.strictEqual(nameMatch[1].trim(), "tokencap", "Skill name must be 'tokencap'");
  
  assert.ok(descMatch, "Frontmatter must contain 'description'");
  assert.ok(descMatch[1].trim().length > 30, "Skill description must be comprehensive");
});

test("SKILL.md contains all standard agent skill sections", () => {
  const content = fs.readFileSync(SKILL_FILE, "utf8");
  const requiredSections = [
    "## Overview",
    "## When to Use",
    "## When NOT to Use",
    "## Quick Start",
    "## Core Workflows",
    "## Decision Trees",
    "## Common Rationalizations",
    "## Red Flags"
  ];
  for (const sec of requiredSections) {
    assert.ok(content.includes(sec), `SKILL.md must contain section: ${sec}`);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Reference Guides Validation
// ─────────────────────────────────────────────────────────────────────────────

test("reference/commands.md exists and contains 7 core CLI verbs", () => {
  assert.ok(fs.existsSync(COMMANDS_FILE), "reference/commands.md must exist");
  const content = fs.readFileSync(COMMANDS_FILE, "utf8");
  
  const coreVerbs = ["tokencap make", "tokencap ask", "tokencap impact", "tokencap analyze", "tokencap refactor", "tokencap serve", "tokencap update"];
  for (const verb of coreVerbs) {
    assert.ok(content.includes(verb), `commands.md must document '${verb}'`);
  }
});

test("reference/workflows.md exists and contains standard agent workflows", () => {
  assert.ok(fs.existsSync(WORKFLOWS_FILE), "reference/workflows.md must exist");
  const content = fs.readFileSync(WORKFLOWS_FILE, "utf8");
  
  const workflows = [
    "Workflow 1: New Codebase Onboarding",
    "Workflow 2: Code Review",
    "Workflow 3: Refactoring",
    "Workflow 4: Debugging",
    "Workflow 5: Architecture Review"
  ];
  for (const wf of workflows) {
    assert.ok(content.includes(wf), `workflows.md must document '${wf}'`);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// Summary
// ─────────────────────────────────────────────────────────────────────────────

console.log(`\n${"─".repeat(50)}`);
console.log(`TokenCap Skill Tests — ${passed + failed} total`);
console.log(`  ✓ Passed: ${passed}`);
if (failed > 0) {
  console.log(`  ✗ Failed: ${failed}`);
  process.exitCode = 1;
} else {
  console.log(`  All skill tests passed successfully.`);
}
