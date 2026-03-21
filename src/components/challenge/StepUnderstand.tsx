"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StepUnderstandProps {
  problemStatement: string;
  exampleCalls: string;
  expectedUnderstanding: string;
  onComplete: () => void;
}

export function StepUnderstand({
  problemStatement,
  exampleCalls,
  expectedUnderstanding,
  onComplete,
}: StepUnderstandProps) {
  const [userText, setUserText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [referenceOpen, setReferenceOpen] = useState(true);

  const canSubmit = userText.trim().length >= 10;

  function handleSubmit() {
    if (!canSubmit) return;
    setSubmitted(true);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-2">
          Step 1: Understand
        </h2>
        <p className="text-muted-foreground text-sm mb-4">
          Read the problem carefully, then rewrite it in your own words.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="font-semibold text-foreground text-sm">Problem</h3>
        <p className="text-foreground">{problemStatement}</p>
        <div className="rounded-md bg-muted p-3 font-mono text-sm">
          <pre className="whitespace-pre-wrap">{exampleCalls}</pre>
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="user-rephrasing"
          className="block text-sm font-medium text-foreground"
        >
          Your understanding
        </label>
        <textarea
          id="user-rephrasing"
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder="Rewrite this problem in your own words."
          disabled={submitted}
          rows={3}
          className={cn(
            "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-transparent",
            "disabled:opacity-60 disabled:cursor-not-allowed",
            "resize-none",
          )}
          aria-describedby="char-count"
        />
        <p
          id="char-count"
          className={cn(
            "text-xs",
            userText.trim().length < 10
              ? "text-muted-foreground"
              : "text-brand-emerald",
          )}
        >
          {userText.trim().length}/10 characters minimum
        </p>
      </div>

      {!submitted && (
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="bg-brand-indigo hover:bg-brand-indigo/90 text-white"
        >
          Submit my understanding
        </Button>
      )}

      {submitted && (
        <div className="space-y-4">
          <div className="rounded-lg border border-brand-indigo/30 bg-brand-indigo/5">
            <button
              type="button"
              onClick={() => setReferenceOpen(!referenceOpen)}
              className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-brand-indigo"
              aria-expanded={referenceOpen}
              aria-controls="reference-block"
            >
              <span>Expected understanding (reference)</span>
              {referenceOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {referenceOpen && (
              <div
                id="reference-block"
                className="border-t border-brand-indigo/20 px-4 py-3 text-sm text-foreground"
              >
                {expectedUnderstanding}
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            Compare your understanding with the reference above. When you feel
            ready, move on.
          </p>

          <Button
            onClick={onComplete}
            className="bg-brand-indigo hover:bg-brand-indigo/90 text-white"
          >
            Got it, next step
          </Button>
        </div>
      )}
    </div>
  );
}
