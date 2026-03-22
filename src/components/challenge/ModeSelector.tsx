"use client";

import { useCallback } from "react";
import type { ChallengeMode } from "@/types/progress";

interface ModeSelectorProps {
  currentMode: ChallengeMode;
  onModeChange: (mode: ChallengeMode) => void;
}

const MODE_LABELS: Record<ChallengeMode, string> = {
  guided: "Guided",
  semi_guided: "Semi-Guided",
  independent: "Independent",
};

const MODE_DESCRIPTIONS: Record<ChallengeMode, string> = {
  guided: "Step-by-step walkthrough",
  semi_guided: "Code with optional hints",
  independent: "Just you and the problem",
};

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newMode = e.target.value as ChallengeMode;
      if (newMode !== currentMode) {
        onModeChange(newMode);
      }
    },
    [currentMode, onModeChange],
  );

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="mode-selector"
        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        Mode
      </label>
      <select
        id="mode-selector"
        value={currentMode}
        onChange={handleChange}
        className="rounded-md border border-border bg-card px-2 py-1 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo transition-colors cursor-pointer"
        aria-label="Challenge mode"
      >
        {(Object.keys(MODE_LABELS) as ChallengeMode[]).map((mode) => (
          <option key={mode} value={mode}>
            {MODE_LABELS[mode]} — {MODE_DESCRIPTIONS[mode]}
          </option>
        ))}
      </select>
    </div>
  );
}
