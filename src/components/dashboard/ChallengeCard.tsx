"use client";

import { Lock, CheckCircle2, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChallengeStatus, ChallengeMode } from "@/types/progress";

const DIFFICULTY_STYLES: Record<string, { color: string; bg: string }> = {
  beginner: { color: "text-brand-emerald", bg: "bg-brand-emerald/10" },
  intermediate: { color: "text-brand-amber", bg: "bg-brand-amber/10" },
  advanced: { color: "text-brand-rose", bg: "bg-brand-rose/10" },
};

const MODE_LABELS: Record<ChallengeMode, string> = {
  guided: "Guided",
  semi_guided: "Semi-Guided",
  independent: "Independent",
};

interface ChallengeCardProps {
  order: number;
  title: string;
  slug: string;
  difficulty: string;
  estimatedMinutes: number;
  status: ChallengeStatus;
  isUnlocked: boolean;
  isNextUp: boolean;
  completedMode?: ChallengeMode | null;
}

export function ChallengeCard({
  order,
  title,
  slug,
  difficulty,
  estimatedMinutes,
  status,
  isUnlocked,
  isNextUp,
  completedMode,
}: ChallengeCardProps) {
  const isLocked = !isUnlocked;
  const isCompleted = status === "completed";
  const isInProgress = status === "in_progress";
  const diffStyle = DIFFICULTY_STYLES[difficulty] ?? DIFFICULTY_STYLES.beginner;

  if (isLocked) {
    return (
      <div
        className="relative rounded-xl border border-border/50 bg-card/50 p-4 opacity-50 select-none"
        aria-disabled="true"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Lock className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {title}
              </p>
              <p className="text-xs text-muted-foreground/60">
                <span className={diffStyle.color}>{difficulty}</span>
                {" "}&middot; ~{estimatedMinutes} min
              </p>
            </div>
          </div>
          <span className="sr-only">Locked</span>
        </div>
      </div>
    );
  }

  return (
    <a
      href={`/challenge/${slug}`}
      className={cn(
        "group relative block rounded-xl border p-4 transition-all hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo",
        isNextUp
          ? "border-brand-indigo bg-brand-indigo/5 ring-1 ring-brand-indigo/20 hover:border-brand-indigo/80"
          : isCompleted
            ? "border-brand-emerald/30 bg-brand-emerald/5 hover:border-brand-emerald/50"
            : "border-border bg-card hover:border-brand-indigo/40",
      )}
    >
      {isNextUp && (
        <div className="absolute -top-2.5 left-4 flex items-center gap-1 rounded-full bg-brand-indigo px-2.5 py-0.5 text-xs font-medium text-white">
          <Zap className="h-3 w-3" aria-hidden="true" />
          Next up
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold",
              isCompleted
                ? "bg-brand-emerald/10 text-brand-emerald"
                : "bg-brand-indigo/10 text-brand-indigo",
            )}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            ) : (
              order
            )}
          </div>
          <div>
            <p
              className={cn(
                "text-sm font-semibold",
                isCompleted ? "text-brand-emerald" : "text-foreground",
              )}
            >
              {title}
            </p>
            <div className="flex flex-wrap items-center gap-x-1.5 text-xs text-muted-foreground">
              <span className={cn("font-medium", diffStyle.color)}>
                {difficulty}
              </span>
              <span>&middot;</span>
              <span>~{estimatedMinutes} min</span>
              {isInProgress && (
                <>
                  <span>&middot;</span>
                  <span className="text-brand-amber font-medium">
                    In progress
                  </span>
                </>
              )}
              {isCompleted && completedMode && (
                <>
                  <span>&middot;</span>
                  <span className="text-brand-emerald font-medium">
                    {MODE_LABELS[completedMode]}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <ArrowRight
          className={cn(
            "h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5",
            isCompleted ? "text-brand-emerald" : "text-muted-foreground",
          )}
          aria-hidden="true"
        />
      </div>
    </a>
  );
}
