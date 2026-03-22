import type { TestCase, DomTestCase, TestRunResult } from "@/types/challenge";
import { translateError } from "./translateError";
import { buildDomAssertionScript } from "./domAssertions";

const TIMEOUT_MS = 5000;

interface RunTestsOptions {
  /** Track 2+: Starter HTML to render in the sandbox before executing user code */
  starterHTML?: string;
  /** Track 2+: CSS to inject alongside the starter HTML */
  starterCSS?: string;
  /** Track 2+: DOM-specific test assertions run after user code executes */
  domTestCases?: DomTestCase[];
}

function createSandboxIframe(): HTMLIFrameElement {
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.sandbox.add("allow-scripts");
  document.body.appendChild(iframe);
  return iframe;
}

function removeSandboxIframe(iframe: HTMLIFrameElement) {
  iframe.remove();
}

/**
 * Builds the srcdoc for Track 1 challenges (pure JS, no DOM).
 */
function buildPureJSScript(userCode: string, testCases: TestCase[]): string {
  const testCasesJson = JSON.stringify(testCases);
  return `
    <script>
      try {
        // Run user code to define their function(s)
        ${userCode}

        // Run test cases
        const testCases = ${testCasesJson};
        const results = testCases.map(tc => {
          try {
            const actual = eval(tc.input);
            const actualStr = actual === undefined ? "undefined" : JSON.stringify(actual);
            const expectedStr = tc.expected;
            // Compare JSON-stringified values
            return {
              input: tc.input,
              expected: tc.expected,
              actual: actualStr,
              passed: actualStr === expectedStr,
            };
          } catch (err) {
            return {
              input: tc.input,
              expected: tc.expected,
              actual: "Error: " + err.message,
              passed: false,
            };
          }
        });
        parent.postMessage({ type: "results", results }, "*");
      } catch (err) {
        parent.postMessage({ type: "error", error: err.message + (err.stack ? "\\n" + err.stack : "") }, "*");
      }
    </script>
  `;
}

/**
 * Builds the srcdoc for Track 2+ DOM challenges.
 * Injects starter HTML + CSS, runs user code against the DOM,
 * then runs test cases and returns the resulting DOM HTML.
 */
function buildDOMScript(
  userCode: string,
  testCases: TestCase[],
  starterHTML: string,
  starterCSS?: string,
  domTestCases?: DomTestCase[],
): string {
  const testCasesJson = JSON.stringify(testCases);
  const cssBlock = starterCSS
    ? `<style>${starterCSS}</style>`
    : "";
  const domAssertionCode = domTestCases?.length
    ? buildDomAssertionScript(domTestCases)
    : "[]";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8">${cssBlock}</head>
<body>
${starterHTML}
<script>
  try {
    // Run user code that manipulates the DOM
    ${userCode}

    // Run return-value test cases (these eval against the now-modified DOM)
    var testCases = ${testCasesJson};
    var results = testCases.map(function(tc) {
      try {
        var actual = eval(tc.input);
        var actualStr = actual === undefined ? "undefined" : JSON.stringify(actual);
        var expectedStr = tc.expected;
        return {
          input: tc.input,
          expected: tc.expected,
          actual: actualStr,
          passed: actualStr === expectedStr,
          category: "Function output"
        };
      } catch (err) {
        return {
          input: tc.input,
          expected: tc.expected,
          actual: "Error: " + err.message,
          passed: false,
          category: "Function output"
        };
      }
    });

    // Run DOM assertions (element existence, textContent, classList, etc.)
    var domResults = ${domAssertionCode};
    var allResults = results.concat(domResults);

    // Capture the resulting DOM HTML for the preview panel
    var resultHTML = document.body.innerHTML;
    parent.postMessage({ type: "results", results: allResults, resultHTML: resultHTML }, "*");
  } catch (err) {
    parent.postMessage({ type: "error", error: err.message + (err.stack ? "\\n" + err.stack : "") }, "*");
  }
</script>
</body>
</html>`;
}

/**
 * Runs user code + test cases inside a sandboxed iframe.
 * Returns structured results for each test or an error/timeout.
 *
 * For Track 2+ DOM challenges, pass starterHTML/starterCSS in options.
 * The user code runs against the starter HTML, and the resulting DOM
 * is returned as resultHTML for the Live Preview Panel.
 */
export function runTests(
  userCode: string,
  testCases: TestCase[],
  options?: RunTestsOptions,
): Promise<TestRunResult> {
  return new Promise((resolve) => {
    const iframe = createSandboxIframe();

    const timeout = setTimeout(() => {
      removeSandboxIframe(iframe);
      resolve({ status: "timeout" });
    }, TIMEOUT_MS);

    function onMessage(event: MessageEvent) {
      // Only accept messages from our iframe
      if (event.source !== iframe.contentWindow) return;
      window.removeEventListener("message", onMessage);
      clearTimeout(timeout);
      removeSandboxIframe(iframe);

      const data = event.data;
      if (data.type === "results") {
        resolve({
          status: "success",
          results: data.results,
          resultHTML: data.resultHTML,
        });
      } else if (data.type === "error") {
        const translated = translateError(data.error);
        resolve({
          status: "error",
          error: translated.message,
          line: translated.line,
        });
      }
    }

    window.addEventListener("message", onMessage);

    // Build the appropriate sandbox script
    const srcdoc = options?.starterHTML
      ? buildDOMScript(userCode, testCases, options.starterHTML, options.starterCSS, options.domTestCases)
      : buildPureJSScript(userCode, testCases);

    iframe.srcdoc = srcdoc;
  });
}
