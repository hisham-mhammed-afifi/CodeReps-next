"use client";

import { Puzzle, Lock } from "lucide-react";
import type { LibraryPattern } from "@/lib/challenges/patterns";

interface PatternLibraryCardProps {
  pattern: LibraryPattern;
  isUnlocked: boolean;
  onSelect: (pattern: LibraryPattern) => void;
}

export function PatternLibraryCard({
  pattern,
  isUnlocked,
  onSelect,
}: PatternLibraryCardProps) {
  if (!isUnlocked) {
    return (
      <div
        className="rounded-xl border border-border bg-brand-white/60 p-4 sm:p-5 opacity-50 select-none"
        aria-label={`${pattern.name} — locked pattern`}
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Lock
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Locked
            </p>
            <h3 className="text-base font-semibold text-muted-foreground">
              {pattern.name}
            </h3>
          </div>
        </div>
        <p className="text-sm text-muted-foreground/60 italic">
          Complete &ldquo;{pattern.challengeTitle}&rdquo; to unlock
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(pattern)}
      className="w-full text-left rounded-xl border border-border bg-brand-white p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo cursor-pointer"
      aria-label={`${pattern.name} — view pattern details`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-indigo/10">
          <Puzzle
            className="h-4 w-4 text-brand-indigo"
            aria-hidden="true"
          />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Pattern Unlocked
          </p>
          <h3 className="text-base font-bold text-brand-indigo">
            {pattern.name}
          </h3>
        </div>
      </div>

      <p className="text-sm text-foreground leading-relaxed mb-3">
        {pattern.plainEnglish}
      </p>

      <div className="rounded-md bg-brand-navy px-3 py-2.5">
        <code className="text-xs font-mono text-brand-emerald whitespace-pre-wrap">
          {pattern.codeExample}
        </code>
      </div>
    </button>
  );
}
