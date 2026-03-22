# Story 4: DOM-Aware Test Runner

**Version:** v1.0 | **Last Updated:** 2026-03-22 | **Complexity:** 63/100 (Moderate)
**Dependencies:** Story 1
**PRD Reference:** REQ-003, REQ-008

---

**USER STORY**

As a beginner developer learning DOM manipulation,
I want the test runner to verify not just what my function returns but what actually changed on the page,
so that I get precise feedback on whether my code produced the correct visual result and can fix DOM-specific mistakes.

---

**ACCEPTANCE CRITERIA**

**Background:**

Given I am a signed-in user
And I have opened a Track 2 challenge and written code

**Scenarios:**

Scenario 1: DOM assertions check element state after code runs

Given my code has executed and the preview has updated
When the test runner evaluates DOM test cases
Then it should query elements inside the preview iframe (not the parent app)
And it should check: element existence, text content, class lists, attributes, and child counts
And each DOM assertion should show as a distinct pass/fail line in the test results

Scenario 2: Failed DOM assertions show what was expected vs. what was found

Given my code ran but produced incorrect DOM output
When a DOM test fails
Then I should see a clear comparison: what was expected and what was actually found
And the message should be human-readable (e.g., "Expected 3 list items inside #todo-list, found 0")
And it should not show raw HTML dumps or technical querySelector strings

Scenario 3: DOM tests and return-value tests coexist

Given a challenge has both traditional return-value tests and DOM assertions
When all tests run
Then return-value tests and DOM tests should appear in a single unified results list
And each test should be labeled by what it checks (e.g., "Function output" vs. "Page state")
And all tests must pass for the challenge to be marked complete

Scenario 4: DOM tests run after the preview has fully updated

Given my code modifies the DOM asynchronously or in multiple steps
When the test runner executes
Then it should wait for the preview to finish rendering before asserting on DOM state
And assertions should never run against a stale or mid-render state
And if the preview fails to update within 5 seconds, tests should report a timeout error

---

**Additional Requirements:**

- DOM test cases are defined in the challenge's `dom_test_cases` field (jsonb). Each entry specifies: selector, assertion type (exists, textContent, classList.contains, childCount, getAttribute), expected value, and human-readable failure message.
- The test runner queries elements via the Sandpack iframe's contentDocument (or equivalent API).
- DOM test failures fire the `dom_test_failed` analytics event with test_name, expected, and actual.
- Failed DOM assertions use the same red X styling as Track 1 test failures. Passed DOM assertions use the same green check.
- Screen readers should announce DOM test results the same way as return-value test results.
- The test runner normalizes whitespace in textContent comparisons (trim leading/trailing, collapse internal whitespace) to prevent brittle failures.

---

**Complexity Breakdown:**

```
Scenarios:    4 x 13 = 52  [new]
Systems:      1 (preview panel) x 8 = 8   [established - Story 1]
              1 (test runner) x 8 = 8     [established - Track 1]
Roles:        1 (learner) x 3 = 3        [established - Story 1]
Integrations: 0
Total: 63/100 (Moderate) - session-adjusted

Unadjusted: 82/100
```

Note: Two systems involved (preview panel and test runner), but both are established. The core work is bridging them so the test runner can query inside the preview iframe.
