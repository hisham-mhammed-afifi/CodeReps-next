import type { ChallengeDefinition } from "@/types/challenge";

export const flattenAnArray: ChallengeDefinition = {
  id: "challenge-13",
  slug: "flatten-an-array",
  title: "Flatten an Array",
  trackSlug: "track-1-fundamentals",
  order: 13,
  difficulty: "advanced",
  estimatedMinutes: 12,
  problemStatement:
    "Write a function called `flatten` that takes an array of arrays and returns a single flat array containing all elements.",
  exampleCalls:
    'flatten([[1, 2], [3, 4], [5]])           --> [1, 2, 3, 4, 5]\nflatten([["a", "b"], ["c"]])             --> ["a", "b", "c"]\nflatten([[1], [], [2, 3]])               --> [1, 2, 3]',
  expectedUnderstanding:
    "I have an array where each item is itself an array. I need to merge all inner arrays into one single array.",
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Create an empty result array",
      order: 1,
    },
    {
      id: "block-2",
      text: "Loop through each inner array",
      order: 2,
    },
    {
      id: "block-3",
      text: "Loop through each item in the inner array",
      order: 3,
    },
    {
      id: "block-4",
      text: "Push each item into the result",
      order: 4,
    },
    {
      id: "block-5",
      text: "Return the result",
      order: 5,
    },
  ],
  conceptOptions: [
    {
      name: "nested for loops",
      isCorrect: true,
      explanation:
        "A loop inside a loop: the outer loop goes through inner arrays, the inner loop goes through items.",
    },
    {
      name: ".push()",
      isCorrect: true,
      explanation: ".push() adds each individual item to the flat result array.",
    },
    {
      name: "new array []",
      isCorrect: true,
      explanation: "You need a new empty array to collect all flattened items.",
    },
    {
      name: ".concat()",
      isCorrect: true,
      explanation:
        ".concat() can merge inner arrays into the result without a nested loop.",
    },
    {
      name: "if",
      isCorrect: false,
      explanation:
        "You don't need conditions -- every item from every inner array goes into the result.",
    },
    {
      name: ".includes()",
      isCorrect: false,
      explanation:
        "You're merging arrays, not searching for specific items.",
    },
  ],
  systemHint:
    "This needs a nested loop -- a loop inside a loop. The outer loop goes through each inner array. The inner loop goes through each item in that inner array. This is the first time you're dealing with two levels of data, which is very common when working with API responses and complex datasets.",
  starterCode: `function flatten(arrays) {
  // Step 1: Create an empty result array
  // Step 2: Loop through each inner array
  // Step 3: Loop through each item in the inner array
  // Step 4: Push each item into the result
  // Step 5: Return the result
}`,
  solutionCode: `function flatten(arrays) {
  const result = [];

  for (let i = 0; i < arrays.length; i++) {
    for (let j = 0; j < arrays[i].length; j++) {
      result.push(arrays[i][j]);
    }
  }

  return result;
}`,
  explanation:
    "You used nested loops -- a loop inside a loop. The outer loop handles the 'rows' (inner arrays), the inner loop handles the 'columns' (individual items). This is the foundation for working with tables, grids, matrices, and any multi-level data structure. You'll see nested loops when rendering table rows, processing spreadsheet data, and traversing tree-like structures.",
  testCases: [
    {
      input: "flatten([[1, 2], [3, 4], [5]])",
      expected: "[1, 2, 3, 4, 5]",
    },
    {
      input: 'flatten([["a", "b"], ["c"]])',
      expected: '["a", "b", "c"]',
    },
    {
      input: "flatten([[1], [], [2, 3]])",
      expected: "[1, 2, 3]",
    },
    {
      input: "flatten([])",
      expected: "[]",
    },
    {
      input: "flatten([[1]])",
      expected: "[1]",
    },
  ],
  patternsUnlocked: [
    {
      name: "Nested loops",
      plainEnglish:
        "Process items inside items using an outer loop for groups and an inner loop for items within each group.",
      codeExample:
        "for (let i ...) { for (let j ...) { result.push(arr[i][j]); } }",
    },
  ],
};
