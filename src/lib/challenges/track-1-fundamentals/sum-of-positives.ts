import type { ChallengeDefinition } from "@/types/challenge";

export const sumOfPositives: ChallengeDefinition = {
  id: "challenge-09",
  slug: "sum-of-positives",
  title: "Sum of Positives",
  trackSlug: "track-1-fundamentals",
  order: 9,
  difficulty: "intermediate",
  estimatedMinutes: 8,
  problemStatement:
    "Write a function called `sumPositives` that takes an array of numbers and returns the sum of only the positive numbers (greater than 0).",
  exampleCalls:
    "sumPositives([1, -2, 3, -4, 5])   --> 9\nsumPositives([-1, -2, -3])         --> 0\nsumPositives([10, 20, 30])         --> 60",
  expectedUnderstanding:
    "I need to go through the numbers, pick only the positive ones, and add them together.",
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Start a sum variable at 0",
      order: 1,
    },
    {
      id: "block-2",
      text: "Loop through each number in the array",
      order: 2,
    },
    {
      id: "block-3",
      text: "Check if the number is greater than 0",
      order: 3,
    },
    {
      id: "block-4",
      text: "If yes, add it to the sum",
      order: 4,
    },
    {
      id: "block-5",
      text: "Return the sum",
      order: 5,
    },
  ],
  conceptOptions: [
    {
      name: "for loop",
      isCorrect: true,
      explanation: "A loop lets you go through each number in the array.",
    },
    {
      name: "if",
      isCorrect: true,
      explanation:
        "An if statement checks whether each number is positive before adding.",
    },
    {
      name: "variable",
      isCorrect: true,
      explanation: "A variable accumulates the running sum of positive numbers.",
    },
    {
      name: "comparison (>)",
      isCorrect: true,
      explanation: "The > operator checks if a number is greater than 0.",
    },
    {
      name: "addition (+=)",
      isCorrect: true,
      explanation: "+= adds the current number to the running sum.",
    },
    {
      name: ".push()",
      isCorrect: false,
      explanation:
        "You're summing numbers, not collecting them into an array.",
    },
    {
      name: ".length",
      isCorrect: false,
      explanation:
        "You're summing values, not checking how many items there are.",
    },
  ],
  systemHint:
    "This combines two patterns you already know: the counter pattern (but adding values instead of counting) and the filter concept (only processing items that pass a condition). You're essentially doing a conditional accumulation -- add up values, but only the ones that meet a rule.",
  starterCode: `function sumPositives(numbers) {
  // Step 1: Create a sum variable starting at 0
  // Step 2: Loop through each number
  // Step 3: If the number is positive (> 0), add it to sum
  // Step 4: Return the sum
}`,
  solutionCode: `function sumPositives(numbers) {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
      sum += numbers[i];
    }
  }

  return sum;
}`,
  explanation:
    "This is the conditional accumulation pattern -- like the counter pattern, but instead of adding 1, you add the value itself. This pattern appears in real apps constantly: calculate total cart price (sum prices of items), total hours worked (sum only entries marked 'completed'), etc.",
  testCases: [
    {
      input: "sumPositives([1, -2, 3, -4, 5])",
      expected: "9",
    },
    {
      input: "sumPositives([-1, -2, -3])",
      expected: "0",
    },
    {
      input: "sumPositives([10, 20, 30])",
      expected: "60",
    },
    {
      input: "sumPositives([])",
      expected: "0",
    },
    {
      input: "sumPositives([0, 0, 0])",
      expected: "0",
    },
  ],
  patternsUnlocked: [
    {
      name: "Conditional accumulation",
      plainEnglish:
        "Add up values that match a condition by starting at 0, looping, and adding only when the condition is true.",
      codeExample: "let sum = 0; for (...) { if (cond) sum += value; }",
    },
  ],
};
