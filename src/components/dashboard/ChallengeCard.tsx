"use client";

import { Lock, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChallengeStatus } from "@/types/progress";

interface ChallengeCardProps {
  order: number;
  title: string;
  slug: string;
  difficulty: string;
  estimatedMinutes: number;
  status: ChallengeStatus;
  isUnlocked: boolean;
  isFirst: boolean;
}

export function ChallengeCard({
  order,
  title,
  slug,
  difficulty,
  estimatedMinutes,
  status,
  isUnlocked,
  isFirst,
}: ChallengeCardProps) {
  const isLocked = !isUnlocked;
  const isCompleted = status === "completed";
  const isInProgress = status === "in_progress";

  if (isLocked) {
    return (
      <div
        className="relative rounded-xl border border-border/50 bg-card/50 p-4 opacity-60 select-none"
        aria-disabled="true"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Lock className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Challenge {order}
              </p>
              <p className="text-xs text-muted-foreground/60">
                {difficulty} &middot; ~{estimatedMinutes} min
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
        "group relative block rounded-xl border p-4 transition-all hover:shadow-md",
        isCompleted
          ? "border-brand-emerald/30 bg-brand-emerald/5 hover:border-brand-emerald/50"
          : "border-border bg-card hover:border-brand-indigo/40",
      )}
    >
      {isFirst && status === "not_started" && (
        <div className="absolute -top-2.5 left-4 flex items-center gap-1 rounded-full bg-brand-indigo px-2.5 py-0.5 text-xs font-medium text-white">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          Start here
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
            <p className="text-xs text-muted-foreground">
              {difficulty} &middot; ~{estimatedMinutes} min
              {isInProgress && (
                <span className="ml-2 text-brand-amber font-medium">
                  In progress
                </span>
              )}
              {isCompleted && (
                <span className="ml-2 text-brand-emerald font-medium">
                  Completed
                </span>
              )}
            </p>
          </div>
        </div>

        <ArrowRight
          className={cn(
            "h-4 w-4 transition-transform group-hover:translate-x-0.5",
            isCompleted ? "text-brand-emerald" : "text-muted-foreground",
          )}
          aria-hidden="true"
        />
      </div>
    </a>
  );
}
