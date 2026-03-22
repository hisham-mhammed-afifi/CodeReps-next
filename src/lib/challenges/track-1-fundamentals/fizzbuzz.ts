import type { ChallengeDefinition } from "@/types/challenge";

export const fizzbuzz: ChallengeDefinition = {
  id: "challenge-08",
  slug: "fizzbuzz",
  title: "FizzBuzz",
  trackSlug: "track-1-fundamentals",
  order: 8,
  difficulty: "intermediate",
  estimatedMinutes: 12,
  problemStatement:
    'Write a function called `fizzBuzz` that takes a number `n` and returns an array of strings from 1 to `n` where:\n\n- Numbers divisible by 3 are replaced with "Fizz"\n- Numbers divisible by 5 are replaced with "Buzz"\n- Numbers divisible by both 3 and 5 are replaced with "FizzBuzz"\n- All other numbers stay as strings (e.g., "1", "2")',
  exampleCalls:
    'fizzBuzz(5)  --> ["1", "2", "Fizz", "4", "Buzz"]\nfizzBuzz(15) --> ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]',
  expectedUnderstanding:
    "I need to loop from 1 to n. For each number, I check divisibility rules in a specific order and add the right string to a result array.",
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Create an empty results array",
      order: 1,
    },
    {
      id: "block-2",
      text: "Loop from 1 to n",
      order: 2,
    },
    {
      id: "block-3",
      text: "For each number, check: is it divisible by BOTH 3 and 5? (check this first!)",
      order: 3,
    },
    {
      id: "block-4",
      text: "If not, check: is it divisible by 3?",
      order: 4,
    },
    {
      id: "block-5",
      text: "If not, check: is it divisible by 5?",
      order: 5,
    },
    {
      id: "block-6",
      text: "If none of the above, use the number itself as a string",
      order: 6,
    },
    {
      id: "block-7",
      text: "Push the result to the array",
      order: 7,
    },
    {
      id: "block-8",
      text: "Return the array",
      order: 8,
    },
  ],
  conceptOptions: [
    {
      name: "for loop",
      isCorrect: true,
      explanation: "A loop iterates from 1 to n to process each number.",
    },
    {
      name: "if/else if/else",
      isCorrect: true,
      explanation:
        "A chain of conditions checks divisibility in the right priority order.",
    },
    {
      name: "modulo (%)",
      isCorrect: true,
      explanation:
        "The modulo operator checks if a number is divisible by 3 or 5.",
    },
    {
      name: ".push()",
      isCorrect: true,
      explanation: ".push() adds each result string to the output array.",
    },
    {
      name: "String()",
      isCorrect: true,
      explanation:
        "String() converts numbers to strings for the non-FizzBuzz cases.",
    },
    {
      name: "array",
      isCorrect: true,
      explanation: "An array collects all the results from 1 to n.",
    },
    {
      name: ".map()",
      isCorrect: false,
      explanation:
        "You're building an array from a range (1 to n), not transforming an existing array.",
    },
    {
      name: ".includes()",
      isCorrect: false,
      explanation:
        "You're checking divisibility with modulo, not searching for items in a list.",
    },
  ],
  systemHint:
    "The order of checks matters! Check divisible by both (3 AND 5) first. If you check for 3 first, you'll never reach the 'both' case because 15 is divisible by 3, so that check catches it first. This is a priority chain -- when conditions overlap, check the most specific one first.",
  starterCode: `function fizzBuzz(n) {
  // Step 1: Create an empty results array
  // Step 2: Loop from 1 to n
  // Step 3: Check divisible by BOTH 3 and 5 first --> push "FizzBuzz"
  // Step 4: Else check divisible by 3 --> push "Fizz"
  // Step 5: Else check divisible by 5 --> push "Buzz"
  // Step 6: Else push the number as a string
  // Step 7: Return the results
}`,
  solutionCode: `function fizzBuzz(n) {
  const results = [];

  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      results.push("FizzBuzz");
    } else if (i % 3 === 0) {
      results.push("Fizz");
    } else if (i % 5 === 0) {
      results.push("Buzz");
    } else {
      results.push(String(i));
    }
  }

  return results;
}`,
  explanation:
    "FizzBuzz combines several patterns you've learned: looping, checking divisibility with modulo, and branching with if/else. The new lesson here is condition ordering -- when conditions overlap, put the most specific one first. This shows up everywhere: form validation (check empty before checking format), permission checks (check admin before checking user), and error handling.",
  testCases: [
    {
      input: "fizzBuzz(1)",
      expected: '["1"]',
    },
    {
      input: "fizzBuzz(3)",
      expected: '["1", "2", "Fizz"]',
    },
    {
      input: "fizzBuzz(5)",
      expected: '["1", "2", "Fizz", "4", "Buzz"]',
    },
    {
      input: "fizzBuzz(15)",
      expected:
        '["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]',
    },
  ],
  patternsUnlocked: [
    {
      name: "Priority chain",
      plainEnglish:
        "Handle multiple overlapping conditions by checking the most specific one first with if/else if/else.",
      codeExample:
        "if (both) { ... } else if (condA) { ... } else if (condB) { ... } else { ... }",
    },
  ],
};
