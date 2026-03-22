"use client";

import { useCallback } from "react";
import type { ChallengeMode } from "@/types/progress";

interface ModePromptProps {
  challengeTitle: string;
  availableModes: ChallengeMode[];
  encourageIndependent: boolean;
  highlightSemiGuided?: boolean;
  defaultMode?: ChallengeMode;
  promptMessage?: string;
  capstoneNote?: string | null;
  onSelect: (mode: ChallengeMode) => void;
}

const MODE_CONFIG: Record<
  ChallengeMode,
  { label: string; description: string; icon: string }
> = {
  guided: {
    label: "Guided",
    description:
      "Walk through the full 5-step framework. Great for building your thinking process.",
    icon: "🗺️",
  },
  semi_guided: {
    label: "Semi-Guided",
    description:
      "Jump straight to coding with thinking steps available as optional hints when you need them.",
    icon: "🧭",
  },
  independent: {
    label: "Independent",
    description:
      "Just the problem and a blank editor. You've got the thinking process down — prove it!",
    icon: "🚀",
  },
};

export function ModePrompt({
  challengeTitle,
  availableModes,
  encourageIndependent,
  highlightSemiGuided = false,
  defaultMode,
  promptMessage,
  capstoneNote,
  onSelect,
}: ModePromptProps) {
  const handleSelect = useCallback(
    (mode: ChallengeMode) => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("codereps:mode_selected", {
            detail: { selected_mode: mode },
          }),
        );
      }
      onSelect(mode);
    },
    [onSelect],
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-lg w-full space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            {challengeTitle}
          </h2>
          <p className="text-muted-foreground">
            {promptMessage ?? "Ready to try with less guidance? Pick the approach that feels right for you."}
          </p>
        </div>

        <div className="space-y-3" role="group" aria-label="Mode selection">
          {availableModes.map((mode) => {
            const config = MODE_CONFIG[mode];
            const isEncouraged =
              mode === "independent" && encourageIndependent;
            const isSemiHighlighted =
              mode === "semi_guided" && highlightSemiGuided;
            const isDefault = defaultMode === mode;
            const isHighlighted = isEncouraged || isSemiHighlighted;

            return (
              <button
                key={mode}
                onClick={() => handleSelect(mode)}
                className={`w-full rounded-xl border-2 p-4 text-left transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:ring-offset-2 ${
                  isHighlighted
                    ? "border-brand-indigo bg-brand-indigo/5 hover:bg-brand-indigo/10"
                    : "border-border bg-card hover:bg-muted/50"
                }`}
                aria-label={`Select ${config.label} mode: ${config.description}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl" aria-hidden="true">
                    {config.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {config.label}
                      </span>
                      {isEncouraged && (
                        <span className="inline-flex items-center rounded-full bg-brand-indigo/10 px-2 py-0.5 text-xs font-semibold text-brand-indigo">
                          Try it!
                        </span>
                      )}
                      {isSemiHighlighted && !isEncouraged && (
                        <span className="inline-flex items-center rounded-full bg-brand-indigo/10 px-2 py-0.5 text-xs font-semibold text-brand-indigo">
                          Recommended
                        </span>
                      )}
                      {isDefault && !isHighlighted && (
                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {config.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {capstoneNote && (
          <p className="text-sm font-medium text-brand-indigo">
            {capstoneNote}
          </p>
        )}

        <p className="text-xs text-muted-foreground/70">
          You can always switch modes later from the workspace header.
        </p>
      </div>
    </div>
  );
}
