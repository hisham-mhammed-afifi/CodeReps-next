# Story 2: View HTML Source Toggle

**Version:** v1.0 | **Last Updated:** 2026-03-22 | **Complexity:** 37/100 (Simple)
**Dependencies:** Story 1
**PRD Reference:** REQ-019

---

**USER STORY**

As a beginner developer working on a DOM challenge,
I want to peek at the Starter HTML source code behind the preview so I can see the element IDs, classes, and structure I need to target,
so that I understand the page structure before writing querySelector calls and don't have to guess at element names.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And I have opened a Track 2 challenge with the Live Preview Panel visible

**Scenarios:**

Scenario 1: Toggle from rendered preview to HTML source

Given the Live Preview Panel is showing the rendered page (default state)
When I activate the "View HTML" toggle on the preview panel header
Then the rendered preview should be replaced with a read-only code block showing the raw Starter HTML
And the code block should have syntax highlighting for HTML
And I should be able to read element IDs, classes, and structure clearly
And I should not be able to edit the HTML

Scenario 2: Toggle back to rendered preview

Given I am viewing the HTML source
When I deactivate the "View HTML" toggle
Then the code block should be replaced with the rendered preview
And the preview should reflect the current DOM state (including any changes from my last code run)
And the transition should feel instant (no loading delay)

Scenario 3: Default state is always the rendered preview

Given I open a new challenge or navigate to a different challenge
When the workspace loads
Then the preview panel should default to the rendered view (not source)
And the toggle should be in its "off" state

---

**Additional Requirements:**

- The toggle sits in the preview panel header, next to the "Preview" label and refresh button.
- HTML source view uses JetBrains Mono font with the same syntax highlighting theme as the code editor.
- The source view renders in a Monaco editor instance set to read-only mode.
- The `preview_html_toggled` analytics event fires on each toggle with new_view (preview or source).
- The toggle is keyboard-accessible (Tab to focus, Enter/Space to activate).
- Screen reader announcement on toggle: "Showing HTML source" or "Showing rendered preview."

---

**Complexity Breakdown:**

```
Scenarios:    3 x 13 = 39  [new]
Systems:      1 (preview panel) x 8 = 8   [established - Story 1]
Roles:        1 (learner) x 3 = 3         [established - Story 1]
Integrations: 0
Total: 37/100 (Simple) - session-adjusted

Unadjusted: 56/100
```
