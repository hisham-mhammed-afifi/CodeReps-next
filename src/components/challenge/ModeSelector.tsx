"use client";

import { useCallback } from "react";
import type { ChallengeMode } from "@/types/progress";

interface ModeSelectorProps {
  currentMode: ChallengeMode;
  onModeChange: (mode: ChallengeMode) => void;
  availableModes?: ChallengeMode[];
  encourageIndependent?: boolean;
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

const ALL_MODES: ChallengeMode[] = ["guided", "semi_guided", "independent"];

export function ModeSelector({
  currentMode,
  onModeChange,
  availableModes = ALL_MODES,
  encourageIndependent = false,
}: ModeSelectorProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newMode = e.target.value as ChallengeMode;
      if (newMode !== currentMode && availableModes.includes(newMode)) {
        onModeChange(newMode);
      }
    },
    [currentMode, onModeChange, availableModes],
  );

  // Don't render if only one mode is available
  if (availableModes.length <= 1) {
    return null;
  }

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
        {availableModes.map((mode) => (
          <option key={mode} value={mode}>
            {MODE_LABELS[mode]} — {MODE_DESCRIPTIONS[mode]}
            {mode === "independent" && encourageIndependent ? " ✦ Try it!" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
