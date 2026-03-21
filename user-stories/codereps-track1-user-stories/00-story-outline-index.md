# Story Outline: CodeReps Track 1 - Fundamentals

Generated from PRD: CodeReps Track 1 - Fundamentals (v0.1)

Total stories: 10 | Total complexity: 524 (avg 52 per story)

| # | Story Title | Scope | PRD Refs | Dependencies | Complexity | Status |
|---|---|---|---|---|---|---|
| 1 | Guided Problem-Solving Walkthrough | Steps 1-3 interactive framework in guided mode | REQ-001, REQ-002, REQ-003, REQ-008 | None (start here) | 82 (Complex) | GOOD: Generated (template) |
| 2 | Code Writing & Test Verification | Monaco editor + Sandpack test runner | REQ-004, REQ-005, REQ-016 | Story 1 | 76 (Complex) | GOOD: Generated |
| 3 | Challenge Completion & Pattern Unlock | Explanation + pattern card reward on success | REQ-006, REQ-007 | Story 2 | 50 (Moderate) | GOOD: Generated |
| 4 | Challenge Progress & Sequential Unlock | Auto-save progress, unlock next challenge | REQ-012 | Story 3 | 63 (Moderate) | GOOD: Generated |
| 5 | Semi-Guided Mode | Code with optional collapsible hint panels | REQ-009 | Story 2 | 37 (Simple) | GOOD: Generated |
| 6 | Independent Mode | Problem + blank editor, no scaffolding | REQ-010 | Story 2 | 37 (Simple) | GOOD: Generated |
| 7 | Mode Selection & Progression Rules | Enforce mode availability per challenge range | REQ-011 | Stories 5, 6 | 50 (Moderate) | GOOD: Generated |
| 8 | Pattern Library | Browse and reference collected patterns | REQ-015 | Story 3 | 50 (Moderate) | GOOD: Generated |
| 9 | Track Dashboard & Challenge Navigation | Progress overview, challenge picker | - | Story 4 | 42 (Moderate) | GOOD: Generated |
| 10 | Track 1 Completion & Track 2 Gate | Celebration, summary, next track unlock | - | Story 4 | 37 (Simple) | GOOD: Generated |

## Session Registry (Final State)

```
established_systems:      [challenge_engine, code_sandbox, pattern_system]
established_roles:        [learner]
established_integrations: []
```

## Dependency Graph

```
Story 1 (Guided Walkthrough)
  |
  +---> Story 2 (Code & Tests)
  |       |
  |       +---> Story 3 (Completion & Patterns)
  |       |       |
  |       |       +---> Story 4 (Progress & Unlock)
  |       |       |       |
  |       |       |       +---> Story 9 (Dashboard)
  |       |       |       +---> Story 10 (Track Completion)
  |       |       |
  |       |       +---> Story 8 (Pattern Library)
  |       |
  |       +---> Story 5 (Semi-Guided)---+
  |       +---> Story 6 (Independent)---+
  |                                     |
  |                                     +---> Story 7 (Mode Rules)
```

## Consistency Check

Consistency check complete. No issues found. All stories reference consistent terminology, share the same analytics event naming conventions, and dependency declarations match actual content dependencies.
