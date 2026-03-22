import type { DomTestCase } from "@/types/challenge";

/**
 * Generates JavaScript code that runs inside the sandbox iframe
 * to evaluate DOM assertions after user code has executed.
 *
 * Each DomTestCase becomes a pass/fail result with a human-readable
 * failure message. Whitespace is normalized for textContent comparisons.
 */
export function buildDomAssertionScript(domTestCases: DomTestCase[]): string {
  const casesJson = JSON.stringify(domTestCases);

  return `
(function() {
  function normalizeWhitespace(str) {
    return String(str).trim().replace(/\\s+/g, " ");
  }

  var domCases = ${casesJson};
  var domResults = domCases.map(function(tc) {
    var el = document.querySelector(tc.selector);

    // --- exists ---
    if (tc.assertion === "exists") {
      var found = el !== null;
      var expectedBool = tc.expected === true || tc.expected === "true";
      return {
        input: tc.label,
        expected: expectedBool ? "Element exists" : "Element does not exist",
        actual: found ? "Element exists" : "Element not found",
        passed: found === expectedBool,
        category: "Page state"
      };
    }

    // All other assertions require the element to exist
    if (!el) {
      return {
        input: tc.label,
        expected: String(tc.expected),
        actual: "Element not found (" + tc.selector + " matched nothing)",
        passed: false,
        category: "Page state"
      };
    }

    // --- textContent ---
    if (tc.assertion === "textContent") {
      var actualText = normalizeWhitespace(el.textContent || "");
      var expectedText = normalizeWhitespace(String(tc.expected));
      return {
        input: tc.label,
        expected: expectedText,
        actual: actualText,
        passed: actualText === expectedText,
        category: "Page state"
      };
    }

    // --- classList ---
    if (tc.assertion === "classList") {
      var hasClass = el.classList.contains(String(tc.expected));
      return {
        input: tc.label,
        expected: "Has class \\\"" + tc.expected + "\\\"",
        actual: hasClass ? "Has class \\\"" + tc.expected + "\\\"" : "Missing class \\\"" + tc.expected + "\\\"",
        passed: hasClass,
        category: "Page state"
      };
    }

    // --- childCount ---
    if (tc.assertion === "childCount") {
      var count = el.children.length;
      var expectedCount = Number(tc.expected);
      return {
        input: tc.label,
        expected: expectedCount + " child element" + (expectedCount === 1 ? "" : "s"),
        actual: count + " child element" + (count === 1 ? "" : "s"),
        passed: count === expectedCount,
        category: "Page state"
      };
    }

    // --- attribute ---
    if (tc.assertion === "attribute") {
      var attrName = tc.attributeName || "";
      var attrVal = el.getAttribute(attrName);
      var expectedVal = String(tc.expected);
      if (attrVal === null) {
        return {
          input: tc.label,
          expected: expectedVal,
          actual: "Attribute \\\"" + attrName + "\\\" not found",
          passed: false,
          category: "Page state"
        };
      }
      return {
        input: tc.label,
        expected: expectedVal,
        actual: attrVal,
        passed: normalizeWhitespace(attrVal) === normalizeWhitespace(expectedVal),
        category: "Page state"
      };
    }

    return {
      input: tc.label,
      expected: String(tc.expected),
      actual: "Unknown assertion type: " + tc.assertion,
      passed: false,
      category: "Page state"
    };
  });

  return domResults;
})()
`;
}
