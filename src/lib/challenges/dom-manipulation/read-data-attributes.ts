import type { ChallengeDefinition } from "@/types/challenge";

export const readDataAttributes: ChallengeDefinition = {
  id: "dom-challenge-10",
  slug: "read-data-attributes",
  title: "Read Data Attributes",
  trackSlug: "dom-manipulation",
  order: 10,
  difficulty: "intermediate",
  estimatedMinutes: 10,
  requiresPreview: true,
  problemStatement:
    'The page has several `<button>` elements with `data-action` attributes. Write two functions:\n\n1. `getButtonsByAction(action)` -- returns an array of buttons matching the given action\n2. `getActionOf(button)` -- takes a button element and returns its action string',
  exampleCalls:
    'getButtonsByAction("save");   // [<button>, <button>] (all save buttons)\ngetButtonsByAction("delete"); // [<button>]\ngetActionOf(someButton);      // "edit"',
  expectedUnderstanding:
    "Buttons have hidden metadata (data-action) that describes what they do. I need to filter buttons by this metadata and also read the metadata from a specific button.",
  breakdownBlocks: [
    { id: "block-1", text: "For getButtonsByAction: select all buttons on the page", order: 1 },
    { id: "block-2", text: "Filter them: keep only buttons whose data-action matches the given action", order: 2 },
    { id: "block-3", text: "Return matching buttons as an array", order: 3 },
    { id: "block-4", text: "For getActionOf: read the button's data-action attribute and return it", order: 4 },
  ],
  conceptOptions: [
    {
      name: "document.querySelectorAll()",
      isCorrect: true,
      explanation: "querySelectorAll finds all buttons (or buttons matching a selector).",
    },
    {
      name: ".dataset.action",
      isCorrect: true,
      explanation: "The dataset property reads data-* attributes: dataset.action reads data-action.",
    },
    {
      name: "Array.from()",
      isCorrect: true,
      explanation: "Array.from converts a NodeList into a real array you can filter.",
    },
    {
      name: ".filter()",
      isCorrect: true,
      explanation: "filter keeps only the elements that match a condition.",
    },
    {
      name: '.getAttribute("data-action")',
      isCorrect: false,
      explanation: "getAttribute works but dataset is the modern, cleaner alternative.",
    },
    {
      name: "for loop",
      isCorrect: false,
      explanation: "A loop works too, but Array.from + filter is more concise for this pattern.",
    },
  ],
  systemHint:
    "HTML `data-*` attributes let you store custom metadata on any element. In JS, access them through the `.dataset` property: `element.dataset.action` reads `data-action`. You can also use `querySelectorAll('[data-action=\"save\"]')` to select elements by attribute directly. This is how many JS libraries (like Bootstrap and Alpine.js) connect behavior to HTML without extra JS code.",
  starterCode: `function getButtonsByAction(action) {
  // Step 1: Select all buttons
  // Step 2: Convert NodeList to array (Array.from or spread)
  // Step 3: Filter to keep only buttons where data-action matches
  // Step 4: Return the filtered array
}

function getActionOf(button) {
  // Step 1: Read the button's data-action attribute
  // Step 2: Return it
}`,
  solutionCode: `function getButtonsByAction(action) {
  const allButtons = document.querySelectorAll("button");
  const buttonsArray = Array.from(allButtons);

  return buttonsArray.filter(function (button) {
    return button.dataset.action === action;
  });
}

function getActionOf(button) {
  return button.dataset.action;
}`,
  explanation:
    'You used the **attribute routing pattern**. HTML elements can carry invisible metadata through `data-*` attributes, and JavaScript can read that metadata to make decisions. Approach A finds all buttons then filters in JS. Approach B uses a CSS attribute selector to let the browser do the filtering. Both are valid. This pattern is the foundation of declarative programming in the DOM: the HTML says WHAT something is (`data-action=\'save\'`), and JS decides what to DO with it. You\'ll see this in frameworks, component libraries, and custom JS everywhere.',
  testCases: [
    {
      input: 'getButtonsByAction("save").length',
      expected: "2",
    },
    {
      input: 'getButtonsByAction("delete").length',
      expected: "1",
    },
    {
      input: 'getButtonsByAction("nonexistent").length',
      expected: "0",
    },
    {
      input: 'getActionOf(document.querySelector(\'[data-action="edit"]\'))',
      expected: '"edit"',
    },
  ],
  domTestCases: [
    {
      label: "Toolbar should have 4 buttons",
      selector: "#toolbar",
      assertion: "childCount",
      expected: 4,
    },
    {
      label: 'First button should have data-action="save"',
      selector: "#toolbar button:first-child",
      assertion: "attribute",
      expected: "save",
      attributeName: "data-action",
    },
  ],
  starterHTML: `<div id="toolbar">
  <button data-action="save" class="btn">Save Draft</button>
  <button data-action="save" class="btn">Save & Publish</button>
  <button data-action="edit" class="btn">Edit</button>
  <button data-action="delete" class="btn">Delete</button>
</div>`,
  starterCSS: `#toolbar {
  font-family: Inter, system-ui, sans-serif;
  max-width: 480px;
  margin: 2rem auto;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  background: #fff;
  color: #0f172a;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.15s;
}
.btn:hover { background: #f1f5f9; }
.btn[data-action="delete"] {
  border-color: #fecaca;
  color: #dc2626;
}`,
  patternsUnlocked: [
    {
      name: "Attribute routing",
      plainEnglish:
        'Read metadata from HTML to drive logic: element.dataset.name or getAttribute("data-name") to read, [data-attr="value"] selectors to find.',
      codeExample: `const action = button.dataset.action;\nconst saves = document.querySelectorAll('[data-action="save"]');`,
    },
  ],
};
