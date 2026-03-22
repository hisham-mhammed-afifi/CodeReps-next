import type { ChallengeDefinition } from "@/types/challenge";

export const findTheIndex: ChallengeDefinition = {
  id: "challenge-11",
  slug: "find-the-index",
  title: "Find the Index",
  trackSlug: "track-1-fundamentals",
  order: 11,
  difficulty: "intermediate",
  estimatedMinutes: 10,
  problemStatement:
    "Write a function called `findIndex` that takes an array and a target value. Return the index of the first occurrence of the target. If the target is not found, return `-1`. Do not use the built-in `.indexOf()` method.",
  exampleCalls:
    'findIndex([10, 20, 30, 40], 30)     --> 2\nfindIndex(["a", "b", "c"], "d")     --> -1\nfindIndex([5, 5, 5], 5)             --> 0',
  expectedUnderstanding:
    "I need to check each item in the array from start to end. The moment I find the target, I return its position. If I go through the whole array without finding it, I return -1.",
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Loop through the array from start to end",
      order: 1,
    },
    {
      id: "block-2",
      text: "For each item, check if it equals the target",
      order: 2,
    },
    {
      id: "block-3",
      text: "If it matches, return the current index immediately",
      order: 3,
    },
    {
      id: "block-4",
      text: "If the loop ends without finding it, return -1",
      order: 4,
    },
  ],
  conceptOptions: [
    {
      name: "for loop",
      isCorrect: true,
      explanation: "A loop lets you go through each item in the array.",
    },
    {
      name: "if",
      isCorrect: true,
      explanation:
        "An if statement checks whether the current item matches the target.",
    },
    {
      name: "comparison (===)",
      isCorrect: true,
      explanation:
        "Strict equality checks if the current item is exactly the target.",
    },
    {
      name: "return",
      isCorrect: true,
      explanation:
        "Return exits the function immediately when you find the target (early return).",
    },
    {
      name: "index variable (i)",
      isCorrect: true,
      explanation: "The loop variable i tracks the current position in the array.",
    },
    {
      name: ".push()",
      isCorrect: false,
      explanation:
        "You're returning an index number, not building an array.",
    },
    {
      name: ".includes()",
      isCorrect: false,
      explanation:
        ".includes() only tells you true/false, not the position. You need the index.",
    },
  ],
  systemHint:
    "Notice the early return here: you return INSIDE the loop as soon as you find what you're looking for. You don't need to check the rest. The -1 return is AFTER the loop -- it only runs if nothing was found. This is the search pattern.",
  starterCode: `function findIndex(array, target) {
  // Step 1: Loop through the array
  // Step 2: If current item equals target, return the index
  // Step 3: If loop finishes without finding it, return -1
}`,
  solutionCode: `function findIndex(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    }
  }

  return -1;
}`,
  explanation:
    "You used the linear search pattern: go through each item one by one until you find what you're looking for. The early return is key -- returning inside the loop exits the entire function immediately. This is efficient because you stop as soon as you succeed. The '-1 at the end' convention is standard in JS to mean 'not found'.",
  testCases: [
    {
      input: "findIndex([10, 20, 30, 40], 30)",
      expected: "2",
    },
    {
      input: 'findIndex(["a", "b", "c"], "d")',
      expected: "-1",
    },
    {
      input: "findIndex([5, 5, 5], 5)",
      expected: "0",
    },
    {
      input: "findIndex([], 1)",
      expected: "-1",
    },
    {
      input: "findIndex([1, 2, 3], 3)",
      expected: "2",
    },
  ],
  patternsUnlocked: [
    {
      name: "Linear search",
      plainEnglish:
        "Find something in a list by looping through, returning immediately when found, and returning -1 after the loop if not found.",
      codeExample:
        "for (...) { if (arr[i] === target) return i; } return -1;",
    },
    {
      name: "Early return",
      plainEnglish:
        "Stop as soon as you find what you're looking for by returning inside a loop.",
      codeExample: "for (...) { if (found) return result; }",
    },
  ],
};
