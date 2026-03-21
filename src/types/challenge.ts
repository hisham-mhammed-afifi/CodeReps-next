export interface TestCase {
  input: string;
  expected: string;
}

export interface TestResult {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
}

export type TestRunResult =
  | { status: "success"; results: TestResult[] }
  | { status: "error"; error: string; line?: number }
  | { status: "timeout" };

export interface ConceptOption {
  name: string;
  isCorrect: boolean;
  explanation: string;
}

export interface BreakdownBlock {
  id: string;
  text: string;
  order: number;
}

export interface PatternDefinition {
  name: string;
  plainEnglish: string;
  codeExample: string;
}

export interface ChallengeDefinition {
  id: string;
  slug: string;
  title: string;
  trackSlug: string;
  order: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedMinutes: number;
  problemStatement: string;
  exampleCalls: string;
  expectedUnderstanding: string;
  breakdownBlocks: BreakdownBlock[];
  conceptOptions: ConceptOption[];
  systemHint: string;
  starterCode: string;
  solutionCode: string;
  explanation: string;
  testCases: TestCase[];
  patternsUnlocked: PatternDefinition[];
}

export type StepId = "understand" | "breakdown" | "map" | "write" | "verify";

export interface StepDefinition {
  id: StepId;
  label: string;
  shortLabel: string;
  number: number;
}

export const STEPS: StepDefinition[] = [
  { id: "understand", label: "Understand", shortLabel: "Understand", number: 1 },
  { id: "breakdown", label: "Break Down", shortLabel: "Break Down", number: 2 },
  { id: "map", label: "Map to Code", shortLabel: "Map", number: 3 },
  { id: "write", label: "Write", shortLabel: "Write", number: 4 },
  { id: "verify", label: "Verify", shortLabel: "Verify", number: 5 },
];
