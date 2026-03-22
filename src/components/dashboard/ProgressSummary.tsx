"use client";

import { Trophy, Puzzle, Clock } from "lucide-react";

interface ProgressSummaryProps {
  completedCount: number;
  totalChallenges: number;
  patternsUnlocked: number;
  totalPatterns: number;
  totalTimeSeconds: number;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return "< 1 min";
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours === 0) return `${mins} min`;
  return `${hours}h ${mins}m`;
}

export function ProgressSummary({
  completedCount,
  totalChallenges,
  patternsUnlocked,
  totalPatterns,
  totalTimeSeconds,
}: ProgressSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-xl border border-border bg-card p-4 text-center">
        <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-brand-emerald/10">
          <Trophy className="h-4 w-4 text-brand-emerald" aria-hidden="true" />
        </div>
        <p className="text-lg font-bold text-foreground">
          {completedCount}/{totalChallenges}
        </p>
        <p className="text-xs text-muted-foreground">Challenges</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 text-center">
        <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-brand-indigo/10">
          <Puzzle className="h-4 w-4 text-brand-indigo" aria-hidden="true" />
        </div>
        <p className="text-lg font-bold text-foreground">
          {patternsUnlocked}/{totalPatterns}
        </p>
        <p className="text-xs text-muted-foreground">Patterns</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 text-center">
        <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-brand-cyan/10">
          <Clock className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
        </div>
        <p className="text-lg font-bold text-foreground">
          {formatTime(totalTimeSeconds)}
        </p>
        <p className="text-xs text-muted-foreground">Practiced</p>
      </div>
    </div>
  );
}

export function ProgressSummarySkeleton() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-border/50 bg-card p-4 animate-pulse"
        >
          <div className="mx-auto mb-2 h-9 w-9 rounded-full bg-muted" />
          <div className="mx-auto h-5 w-12 rounded bg-muted" />
          <div className="mx-auto mt-1 h-3 w-16 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
