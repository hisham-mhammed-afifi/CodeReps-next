"use client";

import type { ChallengeDefinition } from "@/types/challenge";

interface SemiGuidedHintContentProps {
  step: "understand" | "breakdown" | "map";
  challenge: ChallengeDefinition;
}

export function SemiGuidedHintContent({
  step,
  challenge,
}: SemiGuidedHintContentProps) {
  switch (step) {
    case "understand":
      return (
        <div className="space-y-3 text-sm">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="font-medium text-foreground mb-1">Problem</p>
            <p className="text-foreground">{challenge.problemStatement}</p>
          </div>
          <div className="rounded-md bg-muted p-3 font-mono text-xs">
            <pre className="whitespace-pre-wrap">{challenge.exampleCalls}</pre>
          </div>
          <div className="rounded-md border border-brand-indigo/20 bg-brand-indigo/5 p-3">
            <p className="font-medium text-brand-indigo mb-1">
              Expected understanding
            </p>
            <p className="text-foreground text-xs">
              {challenge.expectedUnderstanding}
            </p>
          </div>
        </div>
      );

    case "breakdown": {
      const sorted = [...challenge.breakdownBlocks].sort(
        (a, b) => a.order - b.order,
      );
      return (
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground text-xs">
            The steps to solve this problem, in order:
          </p>
          <ol className="space-y-1.5" role="list">
            {sorted.map((block, i) => (
              <li
                key={block.id}
                className="flex items-start gap-2 rounded-md border border-border bg-card px-3 py-2"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-indigo/10 text-xs font-semibold text-brand-indigo">
                  {i + 1}
                </span>
                <span className="text-foreground text-xs">{block.text}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    }

    case "map": {
      const correctConcepts = challenge.conceptOptions.filter(
        (c) => c.isCorrect,
      );
      return (
        <div className="space-y-3 text-sm">
          <p className="text-muted-foreground text-xs">
            Key concepts for this challenge:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {correctConcepts.map((concept) => (
              <span
                key={concept.name}
                className="inline-flex items-center rounded-full border border-brand-indigo/30 bg-brand-indigo/10 px-3 py-1 text-xs font-medium text-brand-indigo"
              >
                {concept.name}
              </span>
            ))}
          </div>
          <div className="rounded-md border border-brand-indigo/20 bg-brand-indigo/5 p-3">
            <p className="text-foreground text-xs">{challenge.systemHint}</p>
          </div>
        </div>
      );
    }
  }
}
