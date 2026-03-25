"use client";

import { useCallback } from "react";
import { Play, CheckCircle2, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChallengeStore } from "@/stores/challengeStore";
import { runTests } from "@/lib/sandbox/runTests";
import type { TestCase, DomTestCase } from "@/types/challenge";

interface StepVerifyProps {
  testCases: TestCase[];
  onAllPassed: () => void;
  /** Track 2+: Starter HTML for DOM sandbox execution */
  starterHTML?: string;
  /** Track 2+: CSS for DOM sandbox execution */
  starterCSS?: string;
  /** Track 2+: DOM-specific test assertions */
  domTestCases?: DomTestCase[];
}

export function StepVerify({ testCases, onAllPassed, starterHTML, starterCSS, domTestCases }: StepVerifyProps) {
  const {
    userCode,
    testResults,
    testError,
    testErrorLine,
    isRunningTests,
    allTestsPassed,
    setTestResults,
    setTestError,
    clearTestResults,
    setIsRunningTests,
    setAllTestsPassed,
    setPreviewHTML,
    resetPreview,
  } = useChallengeStore();

  const handleRunTests = useCallback(async () => {
    clearTestResults();
    setIsRunningTests(true);

    const options = starterHTML ? { starterHTML, starterCSS, domTestCases } : undefined;
    const result = await runTests(userCode, testCases, options);

    setIsRunningTests(false);

    switch (result.status) {
      case "success": {
        setTestResults(result.results);
        const passed = result.results.every((r) => r.passed);
        setAllTestsPassed(passed);
        // Update preview with post-execution DOM (Track 2+)
        if (result.resultHTML) {
          setPreviewHTML(result.resultHTML);
        }
        if (passed) onAllPassed();
        break;
      }
      case "error":
        setTestError(result.error, result.line);
        // Revert preview to starter HTML on error (Track 2+)
        if (starterHTML) resetPreview();
        break;
      case "timeout":
        setTestError("Your code took too long. Check for infinite loops.");
        // Revert preview on timeout too
        if (starterHTML) resetPreview();
        break;
    }
  }, [userCode, testCases, starterHTML, starterCSS, domTestCases, clearTestResults, setIsRunningTests, setTestResults, setTestError, setAllTestsPassed, setPreviewHTML, resetPreview, onAllPassed]);

  const passedCount = testResults?.filter((r) => r.passed).length ?? 0;
  const totalCount = testResults?.length ?? (testCases.length + (domTestCases?.length ?? 0));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-brand-slate-400">
          Test Results
        </h3>
        <Button
          onClick={handleRunTests}
          disabled={isRunningTests || !userCode.trim()}
          size="sm"
          className="gap-1.5 bg-brand-indigo hover:bg-brand-indigo/90"
          aria-label="Run tests"
        >
          {isRunningTests ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Play className="h-3.5 w-3.5" />
          )}
          {isRunningTests ? "Running..." : "Run Tests"}
        </Button>
      </div>

      {/* Summary banner */}
      {testResults && (
        <div
          className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium ${
            allTestsPassed
              ? "bg-brand-emerald/10 text-brand-emerald"
              : "bg-brand-rose/10 text-brand-rose"
          }`}
          role="status"
          aria-live="polite"
        >
          {allTestsPassed ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <XCircle className="h-4 w-4 shrink-0" />
          )}
          {allTestsPassed
            ? `All ${totalCount} tests passed!`
            : `${passedCount} of ${totalCount} tests passed`}
        </div>
      )}

      {/* Error display */}
      {testError && (
        <div
          className="flex items-start gap-3 rounded-lg border border-brand-rose/20 bg-brand-rose/5 px-4 py-3"
          role="alert"
          aria-live="assertive"
        >
          <AlertTriangle className="h-4 w-4 text-brand-rose shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm text-brand-rose">{testError}</p>
            {testErrorLine && (
              <p className="text-xs text-brand-slate-400">
                Around line {testErrorLine} in your code
              </p>
            )}
          </div>
        </div>
      )}

      {/* Individual test results */}
      {testResults && (
        <div className="space-y-2" role="list" aria-label="Test results">
          {testResults.map((result, idx) => (
            <div
              key={idx}
              className={`rounded-lg border px-4 py-3 ${
                result.passed
                  ? "border-brand-emerald/20 bg-brand-emerald/5"
                  : "border-brand-rose/20 bg-brand-rose/5"
              }`}
              role="listitem"
            >
              <div className="flex items-center gap-2 mb-1.5">
                {result.passed ? (
                  <CheckCircle2 className="h-4 w-4 text-brand-emerald shrink-0" aria-hidden="true" />
                ) : (
                  <XCircle className="h-4 w-4 text-brand-rose shrink-0" aria-hidden="true" />
                )}
                <span className={`text-sm font-medium ${result.passed ? "text-brand-emerald" : "text-brand-rose"}`}>
                  {result.passed ? "Passed" : "Failed"}
                </span>
                {result.category && (
                  <span className="text-xs text-brand-slate-400 ml-auto rounded bg-muted/50 px-1.5 py-0.5">
                    {result.category}
                  </span>
                )}
              </div>
              <div className="ml-6 space-y-1 font-mono text-xs">
                {result.category === "Page state" ? (
                  <>
                    <p className="text-brand-slate-400">
                      <span className="text-brand-slate-400/60">Check: </span>
                      {result.input}
                    </p>
                    {!result.passed && (
                      <>
                        <p className="text-brand-slate-400">
                          <span className="text-brand-slate-400/60">Expected: </span>
                          {result.expected}
                        </p>
                        <p className="text-brand-rose">
                          <span className="text-brand-rose/60">Found: </span>
                          {result.actual}
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-brand-slate-400">
                      <span className="text-brand-slate-400/60">Call: </span>
                      {result.input}
                    </p>
                    <p className="text-brand-slate-400">
                      <span className="text-brand-slate-400/60">Expected: </span>
                      {result.expected}
                    </p>
                    {!result.passed && (
                      <p className="text-brand-rose">
                        <span className="text-brand-rose/60">Actual: </span>
                        {result.actual}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!testResults && !testError && !isRunningTests && (
        <div className="rounded-lg border border-border/50 bg-muted/30 px-4 py-8 text-center">
          <p className="text-sm text-brand-slate-400">
            Click &quot;Run Tests&quot; to verify your solution.
          </p>
        </div>
      )}
    </div>
  );
}
