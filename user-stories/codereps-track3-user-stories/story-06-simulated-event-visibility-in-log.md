# Story 6: Simulated Event Visibility in Log

**Version:** v1.0 | **Last Updated:** 2026-03-24 | **Complexity:** 37/100 (Simple)
**Dependencies:** Stories 1, 4
**PRD Reference:** REQ-004

---

**USER STORY**

As a beginner developer watching tests run,
I want to see the simulated events (programmatic clicks, key presses) that the test runner dispatches appear in the Interaction Log with a clear "Simulated" label,
so that I understand exactly what the tests are doing to my code and can follow along as they simulate user behavior.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And the Interaction Log and event simulation test runner are both active

**Scenarios:**

Scenario 1: Simulated events appear in the log with a distinct badge

Given the test runner dispatches a click event on a button in the preview
When the event fires
Then a new entry should appear in the Interaction Log
And the entry should show the same information as a real event (type, target, timestamp)
And the entry should have a visible "Simulated" badge or label distinguishing it from manual interactions

Scenario 2: Simulated and real events are visually distinct

Given the log contains both real interactions (from me clicking in the preview) and simulated events (from the test runner)
When I scan the log
Then I should immediately be able to tell which events I triggered and which the tests triggered
And the "Simulated" badge should use a dashed border or robot icon, not just a color change
And the visual distinction should be accessible (not color-only)

Scenario 3: Filtering includes simulated events

Given I have filtered the log to show only "Click" events
When both a real click and a simulated click exist in the log
Then both should be visible (filter is by event type, not by source)
And the simulated badge should remain visible on the simulated entry

---

**Additional Requirements:**

- Simulated events are identified by a flag set during test runner dispatch (e.g., event detail or message channel metadata). The Interaction Log checks this flag when rendering entries.
- The "Simulated" badge uses a robot icon (Lucide `bot` icon, 14px) next to the event type badge.
- The `interaction_log_entry` analytics event includes `is_simulated: true` for these entries.
- Simulated event entries are included in the 100-entry cap and can be cleared via the Clear button.
- Screen reader announces simulated entries as "Simulated [event type] on [target]."

---

**Complexity Breakdown:**

```
Scenarios:    3 x 13 = 39  [new]
Systems:      1 (interaction log) x 8 = 8    [established - Story 1]
              1 (event simulation) x 5 = 5   [established - Story 4, lightweight integration]
Roles:        1 (learner) x 3 = 3            [established - Story 1]
Integrations: 0
Total: 37/100 (Simple) - session-adjusted

Unadjusted: 56/100
```
