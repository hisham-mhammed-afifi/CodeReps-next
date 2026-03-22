# Story Outline: CodeReps Track 2 - DOM Manipulation

Generated from PRD: CodeReps Track 2 - DOM Manipulation (v0.1)

Total stories: 9 | Total complexity: 469 (avg 52 per story)

| # | Story Title | Scope | PRD Refs | Dependencies | Complexity | Status |
|---|---|---|---|---|---|---|
| 1 | Live Preview Panel | Sandboxed iframe renders Starter HTML and updates after code execution | REQ-001, REQ-002, REQ-018 | None (start here) | 82 (Complex) | GOOD: Generated (template) |
| 2 | View HTML Source Toggle | Switch between rendered preview and read-only HTML source | REQ-019 | Story 1 | 37 (Simple) | GOOD: Generated |
| 3 | Three-Panel Workspace Layout | Guidance / Editor / Preview with draggable dividers and responsive stacking | REQ-017 | Story 1 | 50 (Moderate) | GOOD: Generated |
| 4 | DOM-Aware Test Runner | Tests assert on DOM element state inside the preview iframe | REQ-003, REQ-008 | Story 1 | 63 (Moderate) | GOOD: Generated |
| 5 | Track 2 Challenge Content | 15 challenge definitions with Starter HTML, CSS, and DOM test cases | REQ-013, REQ-014, REQ-015 | Story 4 | 63 (Moderate) | GOOD: Generated |
| 6 | Track 2 Mode Progression Rules | Shifted mode defaults for DOM challenges | REQ-011 | Story 5 | 37 (Simple) | GOOD: Generated |
| 7 | Track 2 Patterns in the Pattern Library | 15 new patterns grouped under "DOM Manipulation", 34 total | REQ-016 | Story 5 | 37 (Simple) | GOOD: Generated |
| 8 | Badge System & DOM Builder Badge | badges/user_badges tables, award logic, capstone no-hints distinction | REQ-012 | Story 5 | 63 (Moderate) | GOOD: Generated |
| 9 | Track 2 Completion & Track 3 Gate | Completion screen, badge display, Track 3 unlock | - | Story 8 | 37 (Simple) | GOOD: Generated |

## Session Registry (Final State)

```
established_systems:      [preview_panel, workspace_layout, test_runner, challenge_engine, badge_system, pattern_library]
established_roles:        [learner]
established_integrations: []
```

## Dependency Graph

```
Story 1 (Live Preview Panel)
  |
  +---> Story 2 (View HTML Toggle)
  |
  +---> Story 3 (Three-Panel Layout)
  |
  +---> Story 4 (DOM-Aware Test Runner)
            |
            +---> Story 5 (Challenge Content)
                    |
                    +---> Story 6 (Mode Progression Rules)
                    |
                    +---> Story 7 (Patterns in Library)
                    |
                    +---> Story 8 (Badge System)
                              |
                              +---> Story 9 (Completion & Track 3 Gate)
```

## Consistency Check

Consistency check complete. No issues found.

- All stories reference the same analytics event naming conventions from Track 1 and the Track 2 PRD.
- Dependency declarations match actual content dependencies.
- No scenario overlap between stories (preview rendering is in Story 1, DOM testing in Story 4, layout in Story 3).
- Track 1 infrastructure (challenge engine, progress tracking, pattern unlocks, auth) is inherited, not re-specified.
- The badge system (Story 8) is designed as extensible infrastructure, not Track-2-specific hardcoding.
