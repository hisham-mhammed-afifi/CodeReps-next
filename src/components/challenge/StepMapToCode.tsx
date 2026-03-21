"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ConceptOption } from "@/types/challenge";

interface StepMapToCodeProps {
  conceptOptions: ConceptOption[];
  systemHint: string;
  onComplete: () => void;
}

export function StepMapToCode({
  conceptOptions,
  systemHint,
  onComplete,
}: StepMapToCodeProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  function toggleConcept(name: string) {
    if (submitted) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }

  function handleSubmit() {
    if (selected.size === 0) return;
    setSubmitted(true);
  }

  const allCorrectSelected =
    submitted &&
    conceptOptions
      .filter((c) => c.isCorrect)
      .every((c) => selected.has(c.name)) &&
    conceptOptions
      .filter((c) => !c.isCorrect)
      .every((c) => !selected.has(c.name));

  const hasIncorrect =
    submitted &&
    conceptOptions
      .filter((c) => !c.isCorrect)
      .some((c) => selected.has(c.name));

  const hasMissedCorrect =
    submitted &&
    conceptOptions
      .filter((c) => c.isCorrect)
      .some((c) => !selected.has(c.name));

  function handleRetry() {
    setSelected(new Set());
    setSubmitted(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-2">
          Step 3: Map to Code
        </h2>
        <p className="text-muted-foreground text-sm">
          Which JavaScript concepts do you need to solve this problem? Select
          all that apply.
        </p>
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="JavaScript concept options"
      >
        {conceptOptions.map((concept) => {
          const isSelected = selected.has(concept.name);
          const showResult = submitted && isSelected;
          const isCorrectPick = showResult && concept.isCorrect;
          const isIncorrectPick = showResult && !concept.isCorrect;
          const isMissedCorrect =
            submitted && !isSelected && concept.isCorrect;

          return (
            <button
              key={concept.name}
              type="button"
              onClick={() => toggleConcept(concept.name)}
              disabled={submitted}
              aria-pressed={isSelected}
              aria-label={`${concept.name}${isCorrectPick ? " (correct)" : ""}${isIncorrectPick ? " (incorrect)" : ""}${isMissedCorrect ? " (missed - this was needed)" : ""}`}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-150",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo",
                !submitted &&
                  !isSelected &&
                  "border border-border bg-card text-foreground hover:border-brand-indigo hover:bg-brand-indigo/5",
                !submitted &&
                  isSelected &&
                  "border-2 border-brand-indigo bg-brand-indigo/10 text-brand-indigo",
                isCorrectPick &&
                  "border-2 border-brand-emerald bg-brand-emerald/10 text-brand-emerald",
                isIncorrectPick &&
                  "border-2 border-brand-rose bg-brand-rose/10 text-brand-rose",
                isMissedCorrect &&
                  "border border-dashed border-brand-amber bg-brand-amber/5 text-brand-amber",
                submitted && !isSelected && !isMissedCorrect && "opacity-50",
              )}
            >
              {isCorrectPick && (
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {isIncorrectPick && (
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {concept.name}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className="space-y-2" role="status" aria-live="polite">
          {conceptOptions
            .filter((c) => selected.has(c.name) || (submitted && c.isCorrect && !selected.has(c.name)))
            .map((concept) => {
              const isSelected = selected.has(concept.name);
              const isCorrect = concept.isCorrect && isSelected;
              const isIncorrect = !concept.isCorrect && isSelected;
              const isMissed = concept.isCorrect && !isSelected;

              return (
                <div
                  key={concept.name}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm",
                    isCorrect && "bg-brand-emerald/5 text-brand-emerald",
                    isIncorrect && "bg-brand-rose/5 text-brand-rose",
                    isMissed && "bg-brand-amber/5 text-brand-amber",
                  )}
                >
                  <span className="font-medium">{concept.name}:</span>{" "}
                  {concept.explanation}
                  {isMissed && " (you missed this one)"}
                </div>
              );
            })}
        </div>
      )}

      {submitted && allCorrectSelected && (
        <div className="rounded-lg border border-brand-indigo/30 bg-brand-indigo/5 p-4">
          <p className="text-sm font-medium text-brand-indigo mb-1">
            How these concepts connect to your breakdown:
          </p>
          <p className="text-sm text-foreground">{systemHint}</p>
        </div>
      )}

      {!submitted && (
        <Button
          onClick={handleSubmit}
          disabled={selected.size === 0}
          className="bg-brand-indigo hover:bg-brand-indigo/90 text-white"
        >
          Check my picks
        </Button>
      )}

      {submitted && (hasIncorrect || hasMissedCorrect) && (
        <Button
          onClick={handleRetry}
          variant="outline"
          className="border-brand-indigo text-brand-indigo hover:bg-brand-indigo/5"
        >
          Try again
        </Button>
      )}

      {submitted && allCorrectSelected && (
        <Button
          onClick={onComplete}
          className="bg-brand-indigo hover:bg-brand-indigo/90 text-white"
        >
          Continue to coding
        </Button>
      )}
    </div>
  );
}
