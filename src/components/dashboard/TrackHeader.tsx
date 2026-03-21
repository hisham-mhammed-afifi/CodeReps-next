"use client";

import { BookOpen } from "lucide-react";

interface TrackHeaderProps {
  title: string;
  description: string;
  completedCount: number;
  totalCount: number;
}

export function TrackHeader({
  title,
  description,
  completedCount,
  totalCount,
}: TrackHeaderProps) {
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-indigo/10">
          <BookOpen className="h-5 w-5 text-brand-indigo" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {completedCount} of {totalCount} challenges completed
          </span>
          <span className="font-medium text-foreground">
            {progressPercent}%
          </span>
        </div>
        <div
          className="h-2 w-full rounded-full bg-brand-slate-100 dark:bg-brand-slate-400/20"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Track progress: ${progressPercent}%`}
        >
          <div
            className="h-full rounded-full bg-brand-indigo transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
