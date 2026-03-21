"use client";

import { Check } from "lucide-react";
import { STEPS } from "@/types/challenge";
import type { StepId } from "@/types/challenge";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: StepId;
  completedSteps: Set<StepId>;
  onStepClick: (step: StepId) => void;
  isStepAccessible: (step: StepId) => boolean;
}

export function StepIndicator({
  currentStep,
  completedSteps,
  onStepClick,
  isStepAccessible,
}: StepIndicatorProps) {
  return (
    <nav aria-label="Challenge steps" className="w-full">
      <ol className="flex items-center gap-1 sm:gap-2">
        {STEPS.map((step, index) => {
          const isCompleted = completedSteps.has(step.id);
          const isCurrent = currentStep === step.id;
          const isAccessible = isStepAccessible(step.id);

          return (
            <li key={step.id} className="flex items-center flex-1">
              {index > 0 && (
                <div
                  className={cn(
                    "h-0.5 w-full mr-1 sm:mr-2 transition-colors duration-200",
                    isCompleted || isCurrent
                      ? "bg-brand-indigo"
                      : "bg-border",
                  )}
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                onClick={() => isAccessible && onStepClick(step.id)}
                disabled={!isAccessible}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Step ${step.number}: ${step.label}${isCompleted ? " (completed)" : ""}${isCurrent ? " (current)" : ""}${!isAccessible ? " (locked)" : ""}`}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo",
                  isCompleted &&
                    "bg-brand-emerald/10 text-brand-emerald",
                  isCurrent &&
                    !isCompleted &&
                    "bg-brand-indigo/10 text-brand-indigo ring-2 ring-brand-indigo",
                  !isCurrent &&
                    !isCompleted &&
                    isAccessible &&
                    "text-muted-foreground hover:bg-muted",
                  !isAccessible &&
                    "text-muted-foreground/50 cursor-not-allowed opacity-50",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-xs font-semibold shrink-0",
                    isCompleted && "bg-brand-emerald text-white",
                    isCurrent && !isCompleted && "bg-brand-indigo text-white",
                    !isCurrent && !isCompleted && "bg-muted text-muted-foreground",
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3" aria-hidden="true" />
                  ) : (
                    step.number
                  )}
                </span>
                <span className="hidden sm:inline">{step.shortLabel}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
