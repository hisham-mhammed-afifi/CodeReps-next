import type { TestCase, TestRunResult } from "@/types/challenge";
import { translateError } from "./translateError";

const TIMEOUT_MS = 5000;

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
 * Runs user code + test cases inside a sandboxed iframe.
 * Returns structured results for each test or an error/timeout.
 */
export function runTests(
  userCode: string,
  testCases: TestCase[],
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
        resolve({ status: "success", results: data.results });
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

    // Build the test runner script
    const testCasesJson = JSON.stringify(testCases);
    const script = `
      <script>
        try {
          // Run user code to define their function(s)
          ${userCode}

          // Run test cases
          const testCases = ${testCasesJson};
          const results = testCases.map(tc => {
            try {
              const actual = eval(tc.input);
              const actualStr = JSON.stringify(actual);
              let expectedStr;
              try {
                expectedStr = JSON.stringify(JSON.parse(tc.expected));
              } catch {
                expectedStr = tc.expected;
              }
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

    iframe.srcdoc = script;
  });
}
