import type { ChallengeDefinition } from "@/types/challenge";

export const changeTheHeadline: ChallengeDefinition = {
  id: "dom-challenge-01",
  slug: "change-the-headline",
  title: "Change the Headline",
  trackSlug: "dom-manipulation",
  order: 1,
  difficulty: "beginner",
  estimatedMinutes: 5,
  requiresPreview: true,
  problemStatement:
    'A page has an `<h1 id="title">` with the text "Welcome". Write a function called `updateHeadline` that takes a string and changes the headline text to that string.',
  exampleCalls:
    'updateHeadline("Hello CodeReps")\n// The h1 now shows "Hello CodeReps"\n\nupdateHeadline("New Title")\n// The h1 now shows "New Title"',
  expectedUnderstanding:
    "I need to find the h1 element on the page and replace its text with the new text that was passed into the function.",
  breakdownBlocks: [
    { id: "block-1", text: "Find the h1 element using its ID", order: 1 },
    { id: "block-2", text: "Change its text content to the new text", order: 2 },
  ],
  conceptOptions: [
    {
      name: "document.querySelector()",
      isCorrect: true,
      explanation:
        "querySelector lets you find an element using a CSS selector like '#title'.",
    },
    {
      name: ".textContent",
      isCorrect: true,
      explanation:
        "textContent lets you read or change the text inside an element.",
    },
    {
      name: ".innerHTML",
      isCorrect: false,
      explanation:
        "innerHTML works but is less safe than textContent because it parses HTML. For plain text changes, textContent is preferred.",
    },
    {
      name: ".innerText",
      isCorrect: false,
      explanation:
        "innerText is similar but triggers a reflow and is slower. textContent is the standard choice.",
    },
    {
      name: "document.getElementById()",
      isCorrect: false,
      explanation:
        "getElementById works too, but querySelector is more flexible since it accepts any CSS selector.",
    },
  ],
  systemHint:
    "To grab an element from the page, use `document.querySelector('#id')` with a CSS selector. To change the text inside it, set `.textContent`. We prefer `.textContent` over `.innerHTML` because it's safer (no HTML injection) and faster.",
  starterCode: `function updateHeadline(newText) {
  // Step 1: Find the h1 element with id "title"
  // Step 2: Change its text content to newText
}`,
  solutionCode: `function updateHeadline(newText) {
  const heading = document.querySelector("#title");
  heading.textContent = newText;
}`,
  explanation:
    'You just did your first DOM manipulation. `document.querySelector(\'#title\')` reaches into the page and grabs the element matching that CSS selector. Then `.textContent` lets you read or change the text inside it. This is the foundation of every interactive website: JS selects an element and changes something about it. You\'ll do this hundreds of times in your career.',
  testCases: [
    {
      input: 'updateHeadline("Hello CodeReps")',
      expected: "undefined",
    },
    {
      input: 'updateHeadline("")',
      expected: "undefined",
    },
    {
      input: 'updateHeadline("123")',
      expected: "undefined",
    },
  ],
  domTestCases: [
    {
      label: 'After updateHeadline("Hello CodeReps"), h1 text should be "Hello CodeReps"',
      selector: "#title",
      assertion: "textContent",
      expected: "Hello CodeReps",
    },
    {
      label: 'After updateHeadline(""), h1 text should be empty',
      selector: "#title",
      assertion: "textContent",
      expected: "",
    },
    {
      label: 'After updateHeadline("123"), h1 text should be "123"',
      selector: "#title",
      assertion: "textContent",
      expected: "123",
    },
  ],
  starterHTML: `<div id="page">
  <h1 id="title">Welcome</h1>
  <p>This is a sample page. Change the headline above!</p>
</div>`,
  starterCSS: `#page {
  font-family: Inter, system-ui, sans-serif;
  max-width: 480px;
  margin: 2rem auto;
  padding: 1.5rem;
}
#title {
  color: #0f172a;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}
p {
  color: #475569;
  line-height: 1.6;
}`,
  patternsUnlocked: [
    {
      name: "Select and modify",
      plainEnglish:
        "Grab an element and change it: document.querySelector(selector) + .textContent = value",
      codeExample: `const el = document.querySelector("#title");\nel.textContent = "New text";`,
    },
  ],
};
