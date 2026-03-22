import type { ChallengeDefinition } from "@/types/challenge";

export const countTheVowels: ChallengeDefinition = {
  id: "challenge-05",
  slug: "count-the-vowels",
  title: "Count the Vowels",
  trackSlug: "track-1-fundamentals",
  order: 5,
  difficulty: "beginner",
  estimatedMinutes: 10,
  problemStatement:
    "Write a function called `countVowels` that takes a string and returns the number of vowels (a, e, i, o, u) in it. Uppercase vowels count too.",
  exampleCalls:
    'countVowels("hello")      --> 2\ncountVowels("APPLE")      --> 2\ncountVowels("rhythm")     --> 0',
  expectedUnderstanding:
    "I need to go through each letter in a string, check if it's a vowel, and count how many vowels I find.",
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Define what the vowels are",
      order: 1,
    },
    {
      id: "block-2",
      text: "Start a counter at 0",
      order: 2,
    },
    {
      id: "block-3",
      text: "Go through each character in the string",
      order: 3,
    },
    {
      id: "block-4",
      text: "Convert the character to lowercase (to handle uppercase letters)",
      order: 4,
    },
    {
      id: "block-5",
      text: "If the character is a vowel, increase the counter",
      order: 5,
    },
    {
      id: "block-6",
      text: "Return the counter",
      order: 6,
    },
  ],
  conceptOptions: [
    {
      name: "for loop",
      isCorrect: true,
      explanation: "A loop lets you go through each character in the string.",
    },
    {
      name: ".toLowerCase()",
      isCorrect: true,
      explanation:
        "Converting to lowercase lets you check vowels without worrying about uppercase.",
    },
    {
      name: ".includes()",
      isCorrect: true,
      explanation:
        ".includes() checks if a character exists in your vowels list.",
    },
    {
      name: "variable (counter)",
      isCorrect: true,
      explanation: "A counter variable tracks how many vowels you've found.",
    },
    {
      name: "if",
      isCorrect: true,
      explanation:
        "An if statement checks whether the current character is a vowel.",
    },
    {
      name: ".push()",
      isCorrect: false,
      explanation:
        "You're counting vowels, not collecting them into an array.",
    },
    {
      name: ".map()",
      isCorrect: false,
      explanation:
        "Map transforms items. You're counting matches, not transforming characters.",
    },
  ],
  systemHint:
    "Store the vowels as a string or array like 'aeiou'. Use .includes() to check if a character exists in that list. Use .toLowerCase() so you don't have to check uppercase separately. This is the counter pattern: loop through items and count matches.",
  starterCode: `function countVowels(text) {
  // Step 1: Define the vowels (as a string "aeiou" or an array)
  // Step 2: Create a counter variable starting at 0
  // Step 3: Loop through each character in the text
  // Step 4: Convert the character to lowercase
  // Step 5: Check if it's a vowel, if yes increment the counter
  // Step 6: Return the counter
}`,
  solutionCode: `function countVowels(text) {
  const vowels = "aeiou";
  let count = 0;

  for (let i = 0; i < text.length; i++) {
    if (vowels.includes(text[i].toLowerCase())) {
      count++;
    }
  }

  return count;
}`,
  explanation:
    "You used the counter pattern: start at zero, loop through items, increment when a condition is met. This pattern is useful any time you need to count occurrences -- how many times something appears, how many items match a condition, etc. You also learned to normalize data with .toLowerCase() before comparing, which prevents bugs from case mismatches.",
  testCases: [
    {
      input: 'countVowels("hello")',
      expected: "2",
    },
    {
      input: 'countVowels("APPLE")',
      expected: "2",
    },
    {
      input: 'countVowels("rhythm")',
      expected: "0",
    },
    {
      input: 'countVowels("aeiou")',
      expected: "5",
    },
    {
      input: 'countVowels("")',
      expected: "0",
    },
    {
      input: 'countVowels("JavaScript")',
      expected: "3",
    },
  ],
  patternsUnlocked: [
    {
      name: "Counter",
      plainEnglish:
        "Count how many items match a condition by starting at 0 and incrementing.",
      codeExample: "let count = 0; for (...) { if (match) count++; }",
    },
  ],
};
