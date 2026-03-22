import type { ChallengeDefinition } from "@/types/challenge";

export const doubleTheNumbers: ChallengeDefinition = {
  id: "challenge-04",
  slug: "double-the-numbers",
  title: "Double the Numbers",
  trackSlug: "track-1-fundamentals",
  order: 4,
  difficulty: "beginner",
  estimatedMinutes: 8,
  problemStatement:
    "Write a function called `doubleAll` that takes an array of numbers and returns a new array where every number is doubled.",
  exampleCalls:
    "doubleAll([1, 2, 3])      --> [2, 4, 6]\ndoubleAll([10, 0, -5])    --> [20, 0, -10]\ndoubleAll([])              --> []",
  expectedUnderstanding:
    "I need to take each number in the array, multiply it by 2, and put all the results in a new array.",
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Create a new empty array for the results",
      order: 1,
    },
    {
      id: "block-2",
      text: "Go through each number in the input array",
      order: 2,
    },
    {
      id: "block-3",
      text: "Multiply the current number by 2",
      order: 3,
    },
    {
      id: "block-4",
      text: "Add the doubled number to the results array",
      order: 4,
    },
    {
      id: "block-5",
      text: "Return the results array",
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
      name: ".push()",
      isCorrect: true,
      explanation: ".push() adds the doubled value to the results array.",
    },
    {
      name: "new array []",
      isCorrect: true,
      explanation: "You need a new empty array to collect the doubled numbers.",
    },
    {
      name: "multiplication (*)",
      isCorrect: true,
      explanation: "You multiply each number by 2 to double it.",
    },
    {
      name: ".map()",
      isCorrect: true,
      explanation:
        ".map() transforms every item in an array and returns a new one -- the cleaner approach.",
    },
    {
      name: "if/else",
      isCorrect: false,
      explanation:
        "You don't need a condition here -- every number gets doubled, no filtering.",
    },
    {
      name: "modulo (%)",
      isCorrect: false,
      explanation:
        "Modulo checks divisibility. You're multiplying, not checking remainders.",
    },
  ],
  systemHint:
    "There are two ways to do this. The manual way: create an empty array, loop, push doubled values. The cleaner way: use .map(), which transforms every item in an array and returns a new one. Both are valid, but .map() is the pattern developers use most.",
  starterCode: `function doubleAll(numbers) {
  // Approach A (manual):
  // Step 1: Create an empty results array
  // Step 2: Loop through numbers
  // Step 3: Push each number * 2 into results
  // Step 4: Return results

  // Approach B (using .map):
  // Return numbers.map(...) with a function that doubles each number
}`,
  solutionCode: `function doubleAll(numbers) {
  return numbers.map(function (num) {
    return num * 2;
  });
}`,
  explanation:
    "When you need to transform every item in an array into something new, that's the map pattern. .map() takes a function, runs it on each item, and collects all the results into a new array. It's one of the most used array methods in frontend development -- you'll see it everywhere in React, Vue, and Angular when rendering lists.",
  testCases: [
    {
      input: "doubleAll([1, 2, 3])",
      expected: "[2, 4, 6]",
    },
    {
      input: "doubleAll([10, 0, -5])",
      expected: "[20, 0, -10]",
    },
    {
      input: "doubleAll([])",
      expected: "[]",
    },
    {
      input: "doubleAll([100])",
      expected: "[200]",
    },
  ],
  patternsUnlocked: [
    {
      name: "Map",
      plainEnglish: "Transform each item in an array into something new.",
      codeExample: ".map(item => newValue)",
    },
  ],
};
