import type { ChallengeDefinition } from "@/types/challenge";

export const removeDuplicates: ChallengeDefinition = {
  id: "challenge-07",
  slug: "remove-duplicates",
  title: "Remove Duplicates",
  trackSlug: "track-1-fundamentals",
  order: 7,
  difficulty: "intermediate",
  estimatedMinutes: 10,
  problemStatement:
    "Write a function called `removeDuplicates` that takes an array and returns a new array with all duplicate values removed. Keep the first occurrence of each value.",
  exampleCalls:
    'removeDuplicates([1, 2, 2, 3, 3, 3])          --> [1, 2, 3]\nremoveDuplicates(["a", "b", "a", "c", "b"])   --> ["a", "b", "c"]\nremoveDuplicates([1])                          --> [1]',
  expectedUnderstanding:
    "I need to go through the array and keep only items I haven't seen before. If an item already appeared, skip it.",
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Create a new empty array for unique items",
      order: 1,
    },
    {
      id: "block-2",
      text: "Go through each item in the original array",
      order: 2,
    },
    {
      id: "block-3",
      text: "Check if the item is already in the new array",
      order: 3,
    },
    {
      id: "block-4",
      text: "If not, add it",
      order: 4,
    },
    {
      id: "block-5",
      text: "If yes, skip it",
      order: 5,
    },
    {
      id: "block-6",
      text: "Return the new array",
      order: 6,
    },
  ],
  conceptOptions: [
    {
      name: "for loop",
      isCorrect: true,
      explanation: "A loop lets you go through each item in the array.",
    },
    {
      name: ".includes()",
      isCorrect: true,
      explanation:
        ".includes() checks if an item already exists in the unique array.",
    },
    {
      name: ".push()",
      isCorrect: true,
      explanation: ".push() adds the item to the unique array when it's new.",
    },
    {
      name: "new array []",
      isCorrect: true,
      explanation: "You need a new empty array to collect unique items.",
    },
    {
      name: "if",
      isCorrect: true,
      explanation:
        "An if statement decides whether to add or skip based on the .includes() check.",
    },
    {
      name: "Set",
      isCorrect: true,
      explanation:
        "A Set automatically removes duplicates -- it's the shortcut approach.",
    },
    {
      name: ".sort()",
      isCorrect: false,
      explanation:
        "Sorting rearranges items but doesn't remove duplicates.",
    },
    {
      name: "template literal",
      isCorrect: false,
      explanation:
        "Template literals embed values in strings. You're filtering an array, not building strings.",
    },
  ],
  systemHint:
    "The manual approach uses .includes() to check 'have I seen this before?' before pushing. The shortcut is new Set(array), which automatically removes duplicates -- but learning the manual way first helps you understand the logic behind it.",
  starterCode: `function removeDuplicates(items) {
  // Step 1: Create an empty array for unique items
  // Step 2: Loop through each item
  // Step 3: Check if the item is already in the unique array (.includes)
  // Step 4: If not, push it in
  // Step 5: Return the unique array
}`,
  solutionCode: `function removeDuplicates(items) {
  const unique = [];

  for (let i = 0; i < items.length; i++) {
    if (!unique.includes(items[i])) {
      unique.push(items[i]);
    }
  }

  return unique;
}`,
  explanation:
    "You used the filter-and-collect pattern: loop through items, check a condition, and collect only the ones that pass. The .includes() check acts as a memory -- 'have I seen this before?' This is a fundamental pattern for filtering data. The Set shortcut is great to know, but understanding the manual approach helps you solve similar problems where Set won't work.",
  testCases: [
    {
      input: "removeDuplicates([1, 2, 2, 3, 3, 3])",
      expected: "[1, 2, 3]",
    },
    {
      input: 'removeDuplicates(["a", "b", "a", "c", "b"])',
      expected: '["a", "b", "c"]',
    },
    {
      input: "removeDuplicates([1])",
      expected: "[1]",
    },
    {
      input: "removeDuplicates([])",
      expected: "[]",
    },
    {
      input: "removeDuplicates([5, 5, 5, 5])",
      expected: "[5]",
    },
  ],
  patternsUnlocked: [
    {
      name: "Filter-and-collect",
      plainEnglish:
        "Keep only items that meet a condition by creating an empty array, looping, and pushing if the condition is true.",
      codeExample:
        "const result = []; for (...) { if (condition) result.push(item); }",
    },
    {
      name: "Set dedup",
      plainEnglish: "Quick way to remove duplicates using a Set.",
      codeExample: "[...new Set(array)]",
    },
  ],
};
