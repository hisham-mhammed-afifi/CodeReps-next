# Story 1: Live Preview Panel

**Version:** v1.0 | **Last Updated:** 2026-03-22 | **Complexity:** 82/100 (Complex)
**Dependencies:** None (start here)
**PRD Reference:** REQ-001, REQ-002, REQ-018

---

**USER STORY**

As a beginner developer learning DOM manipulation,
I want to see the visual result of my code on a real HTML page immediately after I run it,
so that I can connect what my JavaScript does to what users actually see on screen and debug visually when something looks wrong.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And I have opened a Track 2 challenge

**Scenarios:**

Scenario 1: See the page I'm going to manipulate before writing any code

Given the challenge workspace has loaded
When the Live Preview Panel renders
Then I should see the challenge's Starter HTML rendered as a real page inside the preview
And the preview should display before I write any code (not after first run)
And the Starter HTML should be visually styled with the challenge's associated CSS
And the preview should feel like a real page, not raw unstyled HTML

Scenario 2: See my code's effect on the page after running it

Given I have written JavaScript that manipulates the DOM (e.g., changes text, adds elements)
When I run my code
Then the Live Preview Panel should update to reflect the current DOM state
And new elements I created should appear in the preview
And text changes should be visible immediately
And class changes should affect the preview's styling
And the update should complete within 1 second of code execution

Scenario 3: Preview recovers gracefully from errors in my code

Given I have written code that throws a runtime error
When I run my code
Then the Live Preview Panel should revert to the original Starter HTML state
And I should not see a broken or partially rendered page
And the error message should appear in the test results area (not in the preview)
And I should be able to fix my code and run again without refreshing

Scenario 4: Preview is safely sandboxed from the main app

Given the Live Preview runs inside a sandboxed iframe
When my code executes in the preview
Then my code should not be able to access the parent app's DOM, cookies, or localStorage
And if my code triggers an infinite DOM loop, execution should terminate within 5 seconds
And the main CodeReps app should remain responsive regardless of what my code does in the preview

---

**Additional Requirements:**

- The preview panel sits below the code editor in the right pane on desktop (>= 1024px). On smaller viewports, it stacks below the editor at full width.
- The preview panel has a header label "Preview" with a refresh icon button to manually re-run.
- Preview background is Clean White (#FAFAFA) to simulate a real page context.
- A subtle border (Slate 400, #94A3B8) separates the preview from the editor above it.
- Minimum height: 200px on desktop, 150px on mobile.
- The preview iframe uses Sandpack's existing sandbox isolation (same technology as Track 1's code execution, extended to render HTML).
- Preview renders the `preview_rendered` analytics event with render_time_ms and had_error properties.
- The preview panel must be labeled for screen readers: "Live preview of your code output."
- A first-time tooltip appears on Challenge 1 only: "This is the page you'll modify with JavaScript."

---

**Complexity Breakdown:**

```
Scenarios:    4 x 13 = 52  [new]
Systems:      1 (preview panel) x 20 = 20  [new]
Roles:        1 (learner) x 10 = 10  [new - Track 2 session]
Integrations: 0 (Sandpack is a bundled library, not external)
Total: 82/100 (Complex)
```

Note: Score is high because this is the foundational story for Track 2, establishing the preview panel system and learner role for this session. Subsequent stories reuse these at reduced weight.
