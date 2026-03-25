# Story 4: Event Simulation in Test Runner

**Version:** v1.0 | **Last Updated:** 2026-03-24 | **Complexity:** 76/100 (Complex)
**Dependencies:** None (parallel to Story 1)
**PRD Reference:** REQ-005, REQ-007

---

**USER STORY**

As a beginner developer who just wrote an event handler,
I want the test runner to simulate real user interactions (clicks, typing, key presses, form submissions) and verify the result,
so that I get concrete feedback on whether my handler actually works without manually clicking through the preview myself.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And I have submitted code for a Track 3 challenge

**Scenarios:**

Scenario 1: Tests simulate click events and verify DOM changes

Given my code adds a click listener that increments a counter
When the test runner dispatches a click event on the button inside the preview
Then my click handler should fire exactly as if a real user clicked
And the test should assert on the resulting DOM state (e.g., counter text updated)
And the test result should show pass or fail with expected vs. actual

Scenario 2: Tests simulate keyboard events with specific keys

Given my code listens for keydown and checks event.key === "Enter"
When the test runner dispatches a KeyboardEvent with key: "Enter" on the input
Then my keydown handler should fire with the correct event.key value
And the test should also dispatch non-Enter keys to verify they are ignored
And each simulated event should trigger handlers exactly as real key presses would

Scenario 3: Tests simulate input events with pre-set values

Given my code listens for the "input" event and reads textarea.value.length
When the test runner sets the textarea value and dispatches an input event
Then my handler should fire and read the updated value
And the test should assert on the resulting display (e.g., character count span)

Scenario 4: Three assertion types coexist in unified results

Given a challenge has return-value tests (Track 1), DOM state tests (Track 2), and event-triggered tests (Track 3)
When all tests run
Then results should appear in a single unified list
And each test should be labeled: "Function output", "Page state", or "After interaction"
And all test types must pass for the challenge to be marked complete

---

**Additional Requirements:**

- The test runner dispatches events using standard DOM APIs: `element.click()`, `element.dispatchEvent(new Event("input"))`, `element.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }))`, `form.dispatchEvent(new Event("submit", { cancelable: true }))`, `element.dispatchEvent(new Event("mouseover"))`.
- All event dispatch happens inside the Sandpack preview iframe, not on parent app elements.
- Tests wait for event handlers to complete before asserting on DOM state (microtask flush).
- Event test cases are defined in the challenge's `eventTestCases` field. Each entry specifies: target selector, event type, event constructor properties, and then standard DOM assertions (same format as Track 2's domTestCases).
- The `event_test_dispatched` analytics event fires per simulated event with event_type and target_selector.
- Failed event-triggered assertions show human-readable messages: "After clicking #increment-btn, expected #count to show '1', found '0'."
- The test runner does not inject code into the user's solution. It dispatches events from outside the user's scope.

---

**Complexity Breakdown:**

```
Scenarios:    4 x 13 = 52  [new]
Systems:      1 (test runner) x 8 = 8       [established - Track 2]
              1 (event simulation) x 20 = 20 [new]
Roles:        1 (learner) x 3 = 3           [established - Story 1 or Track 2]
Integrations: 0
Total: 76/100 (Complex) - session-adjusted

Unadjusted: 96/100
```

Note: Event simulation is a genuinely new system layered onto the existing test runner. The score reflects the complexity of dispatching various event types and coordinating with the iframe sandbox.
