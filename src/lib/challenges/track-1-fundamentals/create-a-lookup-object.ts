import type { ChallengeDefinition } from "@/types/challenge";

export const createALookupObject: ChallengeDefinition = {
  id: "challenge-14",
  slug: "create-a-lookup-object",
  title: "Create a Lookup Object",
  trackSlug: "track-1-fundamentals",
  order: 14,
  difficulty: "advanced",
  estimatedMinutes: 12,
  problemStatement:
    "Write a function called `createLookup` that takes an array of `[key, value]` pairs and returns an object where each key maps to its value.",
  exampleCalls:
    'createLookup([["name", "Sara"], ["age", "25"], ["city", "Cairo"]])\n// { name: "Sara", age: "25", city: "Cairo" }\n\ncreateLookup([["a", 1], ["b", 2]])\n// { a: 1, b: 2 }\n\ncreateLookup([])\n// {}',
  expectedUnderstanding:
    "I have pairs of data (like label and value). I need to turn them into an object where the first item of each pair becomes the key and the second becomes the value.",
  breakdownBlocks: [
    {
      id: "block-1",
      text: "Create an empty object",
      order: 1,
    },
    {
      id: "block-2",
      text: "Loop through each pair in the array",
      order: 2,
    },
    {
      id: "block-3",
      text: "The first element of the pair is the key",
      order: 3,
    },
    {
      id: "block-4",
      text: "The second element of the pair is the value",
      order: 4,
    },
    {
      id: "block-5",
      text: "Set object[key] = value",
      order: 5,
    },
    {
      id: "block-6",
      text: "Return the object",
      order: 6,
    },
  ],
  conceptOptions: [
    {
      name: "for loop",
      isCorrect: true,
      explanation: "A loop lets you go through each key-value pair.",
    },
    {
      name: "object",
      isCorrect: true,
      explanation:
        "An object stores the lookup data with dynamic keys and values.",
    },
    {
      name: "property access []",
      isCorrect: true,
      explanation:
        "Bracket notation lets you use a variable as an object key.",
    },
    {
      name: "destructuring",
      isCorrect: true,
      explanation:
        "Destructuring can extract key and value from each pair: const [key, value] = pair.",
    },
    {
      name: ".push()",
      isCorrect: false,
      explanation:
        "You're building an object, not an array. Use obj[key] = value instead.",
    },
    {
      name: ".includes()",
      isCorrect: false,
      explanation:
        "You're mapping pairs to an object, not searching for items.",
    },
  ],
  systemHint:
    "Each pair is a small array like ['name', 'Sara']. You access the key with pair[0] and the value with pair[1]. Or use destructuring: const [key, value] = pair. Then set object[key] = value. This is the object-building pattern and it's essential for transforming data from one shape to another.",
  starterCode: `function createLookup(pairs) {
  // Step 1: Create an empty object
  // Step 2: Loop through each pair
  // Step 3: Extract the key (first item) and value (second item)
  // Step 4: Add them to the object
  // Step 5: Return the object
}`,
  solutionCode: `function createLookup(pairs) {
  const result = {};

  for (let i = 0; i < pairs.length; i++) {
    const key = pairs[i][0];
    const value = pairs[i][1];
    result[key] = value;
  }

  return result;
}`,
  explanation:
    "You used the object-building pattern: start with an empty object and populate it in a loop using dynamic keys. The object[variable] syntax (bracket notation) is what lets you use a variable as a key name -- this is different from object.key which uses the literal word 'key'. This pattern is everywhere: converting API data, building config objects, creating caches.",
  testCases: [
    {
      input:
        'createLookup([["name", "Sara"], ["age", "25"], ["city", "Cairo"]])',
      expected: '{"name": "Sara", "age": "25", "city": "Cairo"}',
    },
    {
      input: 'createLookup([["a", 1], ["b", 2]])',
      expected: '{"a": 1, "b": 2}',
    },
    {
      input: "createLookup([])",
      expected: "{}",
    },
    {
      input: 'createLookup([["x", true]])',
      expected: '{"x": true}',
    },
  ],
  patternsUnlocked: [
    {
      name: "Object building",
      plainEnglish:
        "Create an object from data by starting with {}, looping, and setting obj[key] = value.",
      codeExample:
        "const obj = {}; for (...) { obj[key] = value; }",
    },
    {
      name: "Bracket notation",
      plainEnglish:
        "Use a variable as an object key with obj[variableName] instead of obj.literalName.",
      codeExample: "obj[dynamicKey] = value",
    },
  ],
};
