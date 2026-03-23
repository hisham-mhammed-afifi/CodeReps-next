"use client";

import { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChallengeStore } from "@/stores/challengeStore";
import { useProgressStore } from "@/stores/progressStore";

interface HintPanelProps {
  stepNumber: number;
  title: string;
  stepName: string;
  children: React.ReactNode;
}

export function HintPanel({
  stepNumber,
  title,
  stepName,
  children,
}: HintPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const willOpen = !prev;
      if (willOpen) {
        // Track hint_panel_opened analytics event
        console.log("[analytics] hint_panel_opened", { step: stepName });
        // Record hint usage for badge distinction tracking
        const challenge = useChallengeStore.getState().challenge;
        if (challenge) {
          useProgressStore.getState().markHintsUsed(challenge.slug);
        }
      }
      return willOpen;
    });
  }, [stepName]);

  const panelId = `hint-panel-${stepName}`;
  const triggerId = `hint-trigger-${stepName}`;

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <button
        type="button"
        id={triggerId}
        onClick={handleToggle}
        className={cn(
          "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
          "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:ring-inset",
          isOpen && "border-b border-border",
        )}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-indigo/10 text-xs font-semibold text-brand-indigo">
          {stepNumber}
        </span>
        <span className="flex-1 text-sm font-medium text-foreground">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className="p-4"
        >
          {children}
        </div>
      )}
    </div>
  );
}
