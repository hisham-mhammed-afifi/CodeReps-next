import type { ChallengeDefinition } from "@/types/challenge";

export const evenOrOdd: ChallengeDefinition = {
  id: "challenge-02",
  slug: "even-or-odd",
  title: "Even or Odd",
  trackSlug: "track-1-fundamentals",
  order: 2,
  difficulty: "beginner",
  estimatedMinutes: 5,
  problemStatement:
    'Write a function called `evenOrOdd` that takes a number and returns `"Even"` if the number is even, or `"Odd"` if it\'s odd.',
  exampleCalls:
    'evenOrOdd(4)  --> "Even"\nevenOrOdd(7)  --> "Odd"\nevenOrOdd(0)  --> "Even"',
  expectedUnderstanding:
    'I need to check if a number is divisible by 2. If yes, return "Even". If not, return "Odd".',
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Take a number as input",
      order: 1,
    },
    {
      id: "block-2",
      text: "Check if the number is divisible by 2",
      order: 2,
    },
    {
      id: "block-3",
      text: 'If yes, return "Even"',
      order: 3,
    },
    {
      id: "block-4",
      text: 'If no, return "Odd"',
      order: 4,
    },
  ],
  conceptOptions: [
    {
      name: "function",
      isCorrect: true,
      explanation: "You need a function to wrap the logic and accept a number.",
    },
    {
      name: "if/else",
      isCorrect: true,
      explanation:
        "if/else lets you choose between returning \"Even\" or \"Odd\".",
    },
    {
      name: "modulo (%)",
      isCorrect: true,
      explanation:
        "The modulo operator gives the remainder after division. number % 2 tells you if it's even.",
    },
    {
      name: "return",
      isCorrect: true,
      explanation: "Return sends the result back to the caller.",
    },
    {
      name: "comparison (===)",
      isCorrect: true,
      explanation:
        "You compare the remainder to 0 to check if the number is even.",
    },
    {
      name: "array",
      isCorrect: false,
      explanation:
        "Arrays store lists of items. You only need to check one number, not a list.",
    },
    {
      name: "loop",
      isCorrect: false,
      explanation:
        "Loops repeat actions. You only need to check one number once.",
    },
    {
      name: "template literal",
      isCorrect: false,
      explanation:
        'Template literals embed values in strings. Here you return fixed strings "Even" or "Odd", no embedding needed.',
    },
  ],
  systemHint:
    'The modulo operator (%) gives you the remainder after division. If number % 2 equals 0, the number is even. Use if/else to pick between two outcomes.',
  starterCode: `function evenOrOdd(number) {
  // Step 1: Check if the number is divisible by 2 (hint: use %)
  // Step 2: Return "Even" or "Odd" based on the check
}`,
  solutionCode: `function evenOrOdd(number) {
  if (number % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}`,
  explanation:
    'You used the modulo operator (%) to find the remainder. This is one of the most common patterns in programming: checking divisibility. You also used if/else to branch your logic into two paths. Almost every program has decisions like this.',
  testCases: [
    {
      input: "evenOrOdd(4)",
      expected: '"Even"',
    },
    {
      input: "evenOrOdd(7)",
      expected: '"Odd"',
    },
    {
      input: "evenOrOdd(0)",
      expected: '"Even"',
    },
    {
      input: "evenOrOdd(-3)",
      expected: '"Odd"',
    },
    {
      input: "evenOrOdd(100)",
      expected: '"Even"',
    },
  ],
  patternsUnlocked: [
    {
      name: "If/else",
      plainEnglish: "Choose between two options based on a condition.",
      codeExample: "if (condition) { } else { }",
    },
    {
      name: "Modulo check",
      plainEnglish: "Check if a number is divisible by another number.",
      codeExample: "number % divisor === 0",
    },
  ],
};
