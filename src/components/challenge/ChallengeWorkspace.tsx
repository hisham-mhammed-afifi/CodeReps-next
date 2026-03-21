"use client";

import { useEffect } from "react";
import type { ChallengeDefinition } from "@/types/challenge";
import { useChallengeStore } from "@/stores/challengeStore";
import { StepIndicator } from "./StepIndicator";
import { StepTransition } from "./StepTransition";
import { StepUnderstand } from "./StepUnderstand";
import { StepBreakdown } from "./StepBreakdown";
import { StepMapToCode } from "./StepMapToCode";

interface ChallengeWorkspaceProps {
  challenge: ChallengeDefinition;
}

export function ChallengeWorkspace({ challenge }: ChallengeWorkspaceProps) {
  const {
    currentStep,
    stepDirection,
    completedSteps,
    setChallenge,
    setCurrentStep,
    advanceToNextStep,
    isStepAccessible,
  } = useChallengeStore();

  useEffect(() => {
    setChallenge(challenge);
  }, [challenge, setChallenge]);

  function renderCurrentStep() {
    switch (currentStep) {
      case "understand":
        return (
          <StepUnderstand
            problemStatement={challenge.problemStatement}
            exampleCalls={challenge.exampleCalls}
            expectedUnderstanding={challenge.expectedUnderstanding}
            onComplete={advanceToNextStep}
          />
        );
      case "breakdown":
        return (
          <StepBreakdown
            blocks={challenge.breakdownBlocks}
            onComplete={advanceToNextStep}
          />
        );
      case "map":
        return (
          <StepMapToCode
            conceptOptions={challenge.conceptOptions}
            systemHint={challenge.systemHint}
            onComplete={advanceToNextStep}
          />
        );
      case "write":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">
              Step 4: Write
            </h2>
            <div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
              <p className="text-muted-foreground">
                Code editor coming in Story 2.
              </p>
            </div>
          </div>
        );
      case "verify":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">
              Step 5: Verify
            </h2>
            <div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
              <p className="text-muted-foreground">
                Test runner coming in Story 2.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-border bg-card px-4 py-3 sm:px-6">
        <div className="mb-3">
          <h1 className="text-xl font-bold text-foreground">
            {challenge.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {challenge.difficulty} &middot; ~{challenge.estimatedMinutes} min
          </p>
        </div>
        <StepIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={setCurrentStep}
          isStepAccessible={isStepAccessible}
        />
      </div>

      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Guidance pane: 40% on desktop, full width stacked on mobile */}
        <div className="w-full lg:w-[40%] overflow-y-auto border-b lg:border-b-0 lg:border-r border-border p-4 sm:p-6">
          <StepTransition stepKey={currentStep} direction={stepDirection}>
            {renderCurrentStep()}
          </StepTransition>
        </div>

        {/* Right pane placeholder for editor (Story 2) */}
        <div className="flex-1 flex items-center justify-center bg-brand-navy text-brand-slate-400 p-8">
          <div className="text-center space-y-2">
            <p className="font-mono text-sm">Code editor</p>
            <p className="text-xs text-brand-slate-400/60">
              Available after completing Steps 1-3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}