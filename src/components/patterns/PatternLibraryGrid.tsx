"use client";

import { useState, useCallback } from "react";
import { Puzzle } from "lucide-react";
import type { LibraryPattern } from "@/lib/challenges/patterns";
import { PatternLibraryCard } from "./PatternLibraryCard";
import { PatternDetailDialog } from "./PatternDetailDialog";

interface PatternLibraryGridProps {
  patterns: LibraryPattern[];
  unlockedSlugs: Set<string>;
  unlockedCount: number;
  totalCount: number;
}

export function PatternLibraryGrid({
  patterns,
  unlockedSlugs,
  unlockedCount,
  totalCount,
}: PatternLibraryGridProps) {
  const [selectedPattern, setSelectedPattern] =
    useState<LibraryPattern | null>(null);

  const handleSelect = useCallback((pattern: LibraryPattern) => {
    setSelectedPattern(pattern);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedPattern(null);
  }, []);

  const progressPercent =
    totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  return (
    <>
      {/* Progress header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-indigo/10">
            <Puzzle
              className="h-5 w-5 text-brand-indigo"
              aria-hidden="true"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Pattern Library
            </h1>
            <p className="text-sm text-muted-foreground">
              Your growing collection of problem-solving patterns
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-sm font-semibold text-foreground"
              aria-live="polite"
            >
              {unlockedCount} of {totalCount} patterns unlocked
            </span>
            <span className="text-xs text-muted-foreground">
              {progressPercent}%
            </span>
          </div>
          <div
            className="h-2 w-full rounded-full bg-muted overflow-hidden"
            role="progressbar"
            aria-valuenow={unlockedCount}
            aria-valuemin={0}
            aria-valuemax={totalCount}
            aria-label={`${unlockedCount} of ${totalCount} patterns unlocked`}
          >
            <div
              className="h-full rounded-full bg-brand-indigo transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Pattern grid */}
      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Pattern cards"
      >
        {patterns.map((pattern) => {
          const isUnlocked = unlockedSlugs.has(pattern.challengeSlug);
          return (
            <div key={`${pattern.challengeSlug}-${pattern.name}`} role="listitem">
              <PatternLibraryCard
                pattern={pattern}
                isUnlocked={isUnlocked}
                onSelect={handleSelect}
              />
            </div>
          );
        })}
      </div>

      {/* Detail dialog */}
      <PatternDetailDialog
        pattern={selectedPattern}
        onClose={handleClose}
      />
    </>
  );
}
