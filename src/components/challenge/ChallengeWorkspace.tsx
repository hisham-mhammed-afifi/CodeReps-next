"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import type { ChallengeDefinition } from "@/types/challenge";
import { useChallengeStore } from "@/stores/challengeStore";
import { StepIndicator } from "./StepIndicator";
import { StepTransition } from "./StepTransition";
import { StepUnderstand } from "./StepUnderstand";
import { StepBreakdown } from "./StepBreakdown";
import { StepMapToCode } from "./StepMapToCode";
import { StepCodeEditor } from "./StepCodeEditor";
import { StepVerify } from "./StepVerify";

interface ChallengeWorkspaceProps {
  challenge: ChallengeDefinition;
}

function DraggableDivider({
  onDrag,
}: {
  onDrag: (deltaX: number) => void;
}) {
  const dragging = useRef(false);
  const lastX = useRef(0);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      lastX.current = e.clientX;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const delta = e.clientX - lastX.current;
      lastX.current = e.clientX;
      onDrag(delta);
    },
    [onDrag],
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      className="hidden lg:flex w-1.5 cursor-col-resize items-center justify-center bg-border hover:bg-brand-indigo/40 transition-colors shrink-0"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize panes"
      tabIndex={0}
    >
      <div className="h-8 w-0.5 rounded-full bg-brand-slate-400/40" />
    </div>
  );
}

export function ChallengeWorkspace({ challenge }: ChallengeWorkspaceProps) {
  const {
    currentStep,
    stepDirection,
    completedSteps,
    setChallenge,
    setCurrentStep,
    advanceToNextStep,
    completeStep,
    isStepAccessible,
  } = useChallengeStore();

  const [leftPanePercent, setLeftPanePercent] = useState(40);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChallenge(challenge);
  }, [challenge, setChallenge]);

  const handleDividerDrag = useCallback((deltaX: number) => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const deltaPercent = (deltaX / containerWidth) * 100;
    setLeftPanePercent((prev) =>
      Math.min(70, Math.max(25, prev + deltaPercent)),
    );
  }, []);

  const handleAllTestsPassed = useCallback(() => {
    completeStep("verify");
  }, [completeStep]);

  const isOnWriteOrVerify = currentStep === "write" || currentStep === "verify";

  function renderGuidanceStep() {
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
              Step 4: Write Your Solution
            </h2>
            <p className="text-sm text-muted-foreground">
              Use the code editor to write your solution. The starter code
              includes comments to guide you.
            </p>
            <p className="text-sm text-muted-foreground">
              When you&apos;re ready, move to the Verify step to run tests.
            </p>
            <button
              onClick={advanceToNextStep}
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-brand-indigo px-4 py-2 text-sm font-medium text-white hover:bg-brand-indigo/90 transition-colors"
            >
              Run Tests →
            </button>
          </div>
        );
      case "verify":
        return (
          <StepVerify
            testCases={challenge.testCases}
            onAllPassed={handleAllTestsPassed}
          />
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

      <div
        ref={containerRef}
        className="flex flex-1 flex-col lg:flex-row overflow-hidden"
      >
        {/* Guidance pane */}
        <div
          className="w-full overflow-y-auto border-b lg:border-b-0 border-border p-4 sm:p-6"
          style={{
            flexBasis: `${leftPanePercent}%`,
            flexShrink: 0,
            flexGrow: 0,
          }}
        >
          <StepTransition stepKey={currentStep} direction={stepDirection}>
            {renderGuidanceStep()}
          </StepTransition>
        </div>

        {/* Draggable divider - desktop only */}
        <DraggableDivider onDrag={handleDividerDrag} />

        {/* Code editor pane */}
        <div className="flex-1 flex flex-col bg-brand-navy overflow-hidden min-h-[200px] lg:min-h-0">
          {isOnWriteOrVerify ? (
            <StepCodeEditor starterCode={challenge.starterCode} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-brand-slate-400 p-8">
              <div className="text-center space-y-2">
                <p className="font-mono text-sm">Code editor</p>
                <p className="text-xs text-brand-slate-400/60">
                  Available after completing Steps 1-3
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
