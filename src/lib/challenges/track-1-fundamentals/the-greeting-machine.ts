import type { ChallengeDefinition } from "@/types/challenge";

export const theGreetingMachine: ChallengeDefinition = {
  id: "challenge-01",
  slug: "the-greeting-machine",
  title: "The Greeting Machine",
  trackSlug: "track-1-fundamentals",
  order: 1,
  difficulty: "beginner",
  estimatedMinutes: 5,
  problemStatement:
    'Write a function called `greet` that takes a person\'s name and returns a greeting message.',
  exampleCalls: 'greet("Sara") --> "Hello, Sara! Welcome aboard."\ngreet("Ahmed") --> "Hello, Ahmed! Welcome aboard."',
  expectedUnderstanding:
    "I need to create a function that receives a name and combines it into a greeting sentence.",
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Create a function that accepts one input (the name)",
      order: 1,
    },
    {
      id: "block-2",
      text: "Build a sentence that includes the name",
      order: 2,
    },
    {
      id: "block-3",
      text: "Return the full sentence",
      order: 3,
    },
  ],
  conceptOptions: [
    {
      name: "function",
      isCorrect: true,
      explanation: "You need a function to define reusable logic.",
    },
    {
      name: "parameter",
      isCorrect: true,
      explanation: "A parameter lets the function receive the name as input.",
    },
    {
      name: "template literal",
      isCorrect: true,
      explanation:
        "Template literals let you embed variables inside a string with ${} syntax.",
    },
    {
      name: "return",
      isCorrect: true,
      explanation: "Return sends the greeting message back to the caller.",
    },
    {
      name: "array",
      isCorrect: false,
      explanation:
        "Arrays store lists of items. You only need a single string here, not a list.",
    },
    {
      name: "loop",
      isCorrect: false,
      explanation:
        "Loops repeat actions. You only need to build one greeting, no repetition required.",
    },
    {
      name: "if/else",
      isCorrect: false,
      explanation:
        "Conditionals check different cases. The greeting is the same every time, no branching needed.",
    },
  ],
  systemHint:
    "You need a way to define reusable logic (function), receive input (parameter), combine text with a value (template literal), and send the result back (return).",
  starterCode: `function greet(name) {
  // Step 1: Build the greeting message using the name
  // Step 2: Return the message
}`,
  solutionCode: `function greet(name) {
  const message = \`Hello, \${name}! Welcome aboard.\`;
  return message;
}`,
  explanation:
    "You used a template literal (backtick string with ${}) to insert the name into a sentence. This is how developers build dynamic text — combining fixed words with changing values. You'll use this pattern constantly in real projects.",
  testCases: [
    {
      input: 'greet("Sara")',
      expected: '"Hello, Sara! Welcome aboard."',
    },
    {
      input: 'greet("Ahmed")',
      expected: '"Hello, Ahmed! Welcome aboard."',
    },
    {
      input: 'greet("")',
      expected: '"Hello, ! Welcome aboard."',
    },
  ],
  patternUnlocked: {
    name: "Insert a value into text",
    plainEnglish: "Use a template literal to embed a variable inside a string.",
    codeExample: "`text ${variable} more text`",
  },
};
