import { create } from "zustand";
import type { StepId, ChallengeDefinition, TestResult } from "@/types/challenge";
import type { ChallengeMode, UserProgress } from "@/types/progress";

interface ChallengeState {
  challenge: ChallengeDefinition | null;
  mode: ChallengeMode;
  currentStep: StepId;
  stepDirection: "forward" | "backward";
  completedSteps: Set<StepId>;
  userRephrasing: string;
  blockOrder: string[];
  selectedConcepts: Set<string>;
  stepSubmitted: Record<StepId, boolean>;
  userCode: string;
  testResults: TestResult[] | null;
  testError: string | null;
  testErrorLine: number | null;
  isRunningTests: boolean;
  allTestsPassed: boolean;
  challengeCompleted: boolean;
  attempts: number;

  setChallenge: (challenge: ChallengeDefinition, savedProgress?: UserProgress | null) => void;
  setMode: (mode: ChallengeMode) => void;
  setCurrentStep: (step: StepId) => void;
  completeStep: (step: StepId) => void;
  isStepAccessible: (step: StepId) => boolean;
  isStepCompleted: (step: StepId) => boolean;
  setUserRephrasing: (text: string) => void;
  setBlockOrder: (order: string[]) => void;
  setSelectedConcepts: (concepts: Set<string>) => void;
  setUserCode: (code: string) => void;
  setTestResults: (results: TestResult[]) => void;
  setTestError: (error: string, line?: number) => void;
  clearTestResults: () => void;
  setIsRunningTests: (running: boolean) => void;
  setAllTestsPassed: (passed: boolean) => void;
  setChallengeCompleted: (completed: boolean) => void;
  resetCode: () => void;
  markStepSubmitted: (step: StepId) => void;
  isStepSubmitted: (step: StepId) => boolean;
  incrementAttempts: () => void;
  advanceToNextStep: () => void;
  reset: () => void;
}

const STEP_ORDER: StepId[] = [
  "understand",
  "breakdown",
  "map",
  "write",
  "verify",
];

function getNextStep(current: StepId): StepId | null {
  const idx = STEP_ORDER.indexOf(current);
  return idx < STEP_ORDER.length - 1 ? STEP_ORDER[idx + 1] : null;
}

function isStepBefore(a: StepId, b: StepId): boolean {
  return STEP_ORDER.indexOf(a) < STEP_ORDER.indexOf(b);
}

export const useChallengeStore = create<ChallengeState>((set, get) => ({
  challenge: null,
  mode: "guided" as ChallengeMode,
  currentStep: "understand",
  stepDirection: "forward" as const,
  completedSteps: new Set<StepId>(),
  userRephrasing: "",
  blockOrder: [],
  selectedConcepts: new Set<string>(),
  stepSubmitted: {
    understand: false,
    breakdown: false,
    map: false,
    write: false,
    verify: false,
  },
  userCode: "",
  testResults: null,
  testError: null,
  testErrorLine: null,
  isRunningTests: false,
  allTestsPassed: false,
  challengeCompleted: false,
  attempts: 0,

  setChallenge: (challenge, savedProgress) => {
    if (savedProgress && savedProgress.status !== "not_started") {
      const restoredSteps = new Set<StepId>(
        (savedProgress.completedSteps ?? []).filter((s): s is StepId =>
          STEP_ORDER.includes(s as StepId),
        ),
      );
      const restoredStep =
        savedProgress.lastStep &&
        STEP_ORDER.includes(savedProgress.lastStep as StepId)
          ? (savedProgress.lastStep as StepId)
          : "understand";

      // Build stepSubmitted from completed steps
      const stepSubmitted: Record<StepId, boolean> = {
        understand: false,
        breakdown: false,
        map: false,
        write: false,
        verify: false,
      };
      for (const s of restoredSteps) {
        stepSubmitted[s] = true;
      }

      const isCompleted = savedProgress.status === "completed";

      set({
        challenge,
        currentStep: isCompleted ? "verify" : restoredStep,
        stepDirection: "forward" as const,
        completedSteps: restoredSteps,
        userRephrasing: savedProgress.savedRephrasing ?? "",
        blockOrder: savedProgress.savedBlockOrder ?? [],
        selectedConcepts: new Set<string>(savedProgress.savedConcepts ?? []),
        stepSubmitted,
        userCode: savedProgress.userSolution ?? challenge.starterCode,
        testResults: null,
        testError: null,
        testErrorLine: null,
        isRunningTests: false,
        allTestsPassed: isCompleted,
        challengeCompleted: isCompleted,
        attempts: savedProgress.attempts,
      });
    } else {
      set({
        challenge,
        currentStep: "understand",
        stepDirection: "forward" as const,
        completedSteps: new Set<StepId>(),
        userRephrasing: "",
        blockOrder: [],
        selectedConcepts: new Set<string>(),
        stepSubmitted: {
          understand: false,
          breakdown: false,
          map: false,
          write: false,
          verify: false,
        },
        userCode: challenge.starterCode,
        testResults: null,
        testError: null,
        testErrorLine: null,
        isRunningTests: false,
        allTestsPassed: false,
        challengeCompleted: false,
        attempts: 0,
      });
    }
  },

  setMode: (mode) => set({ mode }),

  setCurrentStep: (step) => {
    const state = get();
    if (state.isStepAccessible(step)) {
      const dir =
        STEP_ORDER.indexOf(step) >= STEP_ORDER.indexOf(state.currentStep)
          ? ("forward" as const)
          : ("backward" as const);
      set({ currentStep: step, stepDirection: dir });
    }
  },

  completeStep: (step) => {
    const completed = new Set(get().completedSteps);
    completed.add(step);
    set({ completedSteps: completed });
  },

  isStepAccessible: (step) => {
    const { completedSteps } = get();
    if (step === "understand") return true;
    // A step is accessible if all previous steps are completed
    return STEP_ORDER.filter((s) => isStepBefore(s, step)).every((s) =>
      completedSteps.has(s),
    );
  },

  isStepCompleted: (step) => get().completedSteps.has(step),

  setUserRephrasing: (text) => set({ userRephrasing: text }),

  setBlockOrder: (order) => set({ blockOrder: order }),

  setSelectedConcepts: (concepts) => set({ selectedConcepts: concepts }),

  setUserCode: (code) => set({ userCode: code }),

  setTestResults: (results) => set({ testResults: results, testError: null, testErrorLine: null }),

  setTestError: (error, line) => set({ testError: error, testErrorLine: line ?? null, testResults: null }),

  clearTestResults: () => set({ testResults: null, testError: null, testErrorLine: null }),

  setIsRunningTests: (running) => set({ isRunningTests: running }),

  setAllTestsPassed: (passed) => set({ allTestsPassed: passed }),

  setChallengeCompleted: (completed) => set({ challengeCompleted: completed }),

  resetCode: () => {
    const { challenge } = get();
    if (challenge) {
      set({ userCode: challenge.starterCode, testResults: null, testError: null, testErrorLine: null, allTestsPassed: false });
    }
  },

  markStepSubmitted: (step) =>
    set((state) => ({
      stepSubmitted: { ...state.stepSubmitted, [step]: true },
    })),

  isStepSubmitted: (step) => get().stepSubmitted[step],

  incrementAttempts: () => set((state) => ({ attempts: state.attempts + 1 })),

  advanceToNextStep: () => {
    const { currentStep, completedSteps } = get();
    const completed = new Set(completedSteps);
    completed.add(currentStep);
    const next = getNextStep(currentStep);
    if (next) {
      set({ completedSteps: completed, currentStep: next, stepDirection: "forward" as const });
    } else {
      set({ completedSteps: completed });
    }
  },

  reset: () =>
    set({
      challenge: null,
      mode: "guided" as ChallengeMode,
      currentStep: "understand",
      stepDirection: "forward" as const,
      completedSteps: new Set<StepId>(),
      userRephrasing: "",
      blockOrder: [],
      selectedConcepts: new Set<string>(),
      stepSubmitted: {
        understand: false,
        breakdown: false,
        map: false,
        write: false,
        verify: false,
      },
      userCode: "",
      testResults: null,
      testError: null,
      testErrorLine: null,
      isRunningTests: false,
      allTestsPassed: false,
      challengeCompleted: false,
      attempts: 0,
    }),
}));
