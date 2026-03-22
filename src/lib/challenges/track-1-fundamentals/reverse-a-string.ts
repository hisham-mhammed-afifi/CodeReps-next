import type { ChallengeDefinition } from "@/types/challenge";

export const reverseAString: ChallengeDefinition = {
  id: "challenge-06",
  slug: "reverse-a-string",
  title: "Reverse a String",
  trackSlug: "track-1-fundamentals",
  order: 6,
  difficulty: "intermediate",
  estimatedMinutes: 10,
  problemStatement:
    "Write a function called `reverseString` that takes a string and returns it reversed. Do not use the built-in `.reverse()` method.",
  exampleCalls:
    'reverseString("hello")   --> "olleh"\nreverseString("world")   --> "dlrow"\nreverseString("a")       --> "a"',
  expectedUnderstanding:
    "I need to read the string from the end to the start and build a new string in that order.",
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Create an empty string to hold the reversed result",
      order: 1,
    },
    {
      id: "block-2",
      text: "Loop through the original string from the last character to the first",
      order: 2,
    },
    {
      id: "block-3",
      text: "Add each character to the result string",
      order: 3,
    },
    {
      id: "block-4",
      text: "Return the result",
      order: 4,
    },
  ],
  conceptOptions: [
    {
      name: "for loop (backward)",
      isCorrect: true,
      explanation:
        "A backward loop starts at the end and decreases, letting you read the string in reverse.",
    },
    {
      name: "string concatenation (+)",
      isCorrect: true,
      explanation:
        "The + operator joins characters together to build the reversed string.",
    },
    {
      name: ".length",
      isCorrect: true,
      explanation:
        ".length tells you the last index so you know where to start the backward loop.",
    },
    {
      name: "variable",
      isCorrect: true,
      explanation:
        "A variable holds the reversed string as you build it character by character.",
    },
    {
      name: "index access []",
      isCorrect: true,
      explanation:
        "Bracket notation accesses individual characters by their position.",
    },
    {
      name: ".push()",
      isCorrect: false,
      explanation:
        ".push() adds to arrays. You're building a string, not an array.",
    },
    {
      name: ".includes()",
      isCorrect: false,
      explanation:
        ".includes() checks if something exists. You're assembling characters, not searching.",
    },
  ],
  systemHint:
    "To go backward through a string, start your loop at string.length - 1 and decrease. Use string[i] to access each character. Build the result by adding characters one by one with +. This is the accumulator pattern: start empty and build up a result piece by piece.",
  starterCode: `function reverseString(text) {
  // Step 1: Create an empty string for the result
  // Step 2: Loop from the last character to the first
  // Step 3: Add each character to the result
  // Step 4: Return the result
}`,
  solutionCode: `function reverseString(text) {
  let reversed = "";

  for (let i = text.length - 1; i >= 0; i--) {
    reversed += text[i];
  }

  return reversed;
}`,
  explanation:
    "You used the accumulator pattern: start with an empty value and build it up inside a loop. You also learned to loop backward, which is useful whenever you need to process things in reverse order. The key insight is that string.length - 1 gives you the last index, because indexes start at 0.",
  testCases: [
    {
      input: 'reverseString("hello")',
      expected: '"olleh"',
    },
    {
      input: 'reverseString("world")',
      expected: '"dlrow"',
    },
    {
      input: 'reverseString("a")',
      expected: '"a"',
    },
    {
      input: 'reverseString("")',
      expected: '""',
    },
    {
      input: 'reverseString("12345")',
      expected: '"54321"',
    },
  ],
  patternsUnlocked: [
    {
      name: "Accumulator",
      plainEnglish:
        "Build up a result piece by piece by starting empty and adding in a loop.",
      codeExample: 'let result = ""; for (...) { result += item; }',
    },
    {
      name: "Backward loop",
      plainEnglish: "Process items in reverse by looping from the end to the start.",
      codeExample: "for (let i = arr.length - 1; i >= 0; i--)",
    },
  ],
};
