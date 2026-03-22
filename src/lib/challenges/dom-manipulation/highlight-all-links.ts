import type { ChallengeDefinition } from "@/types/challenge";

export const highlightAllLinks: ChallengeDefinition = {
  id: "dom-challenge-05",
  slug: "highlight-all-links",
  title: "Highlight All Links",
  trackSlug: "dom-manipulation",
  order: 5,
  difficulty: "beginner",
  estimatedMinutes: 8,
  requiresPreview: true,
  problemStatement:
    'Write two functions:\n\n1. `highlightLinks()` -- finds all `<a>` tags on the page and adds the class `"highlighted"` to each one\n2. `countLinks()` -- returns the total number of `<a>` tags on the page',
  exampleCalls:
    'countLinks();       // 5 (if page has 5 links)\nhighlightLinks();   // all 5 links now have class "highlighted"',
  expectedUnderstanding:
    "I need to select ALL anchor elements on the page (not just one), loop through them, and add a class to each. I also need to count how many there are.",
  breakdownBlocks: [
    { id: "block-1", text: "Select all <a> elements on the page (not just one)", order: 1 },
    { id: "block-2", text: "Loop through each one", order: 2 },
    { id: "block-3", text: 'Add the "highlighted" class to each', order: 3 },
    { id: "block-4", text: "For countLinks: select all <a> elements and return the count", order: 4 },
  ],
  conceptOptions: [
    {
      name: "document.querySelectorAll()",
      isCorrect: true,
      explanation: "querySelectorAll returns ALL matching elements, not just the first one.",
    },
    {
      name: ".classList.add()",
      isCorrect: true,
      explanation: "classList.add attaches a CSS class to an element.",
    },
    {
      name: ".forEach()",
      isCorrect: true,
      explanation: "forEach lets you run a function on each element in the NodeList.",
    },
    {
      name: ".length",
      isCorrect: true,
      explanation: ".length tells you how many elements were found.",
    },
    {
      name: "document.querySelector()",
      isCorrect: false,
      explanation: "querySelector only returns the FIRST match. You need ALL links.",
    },
    {
      name: "for loop",
      isCorrect: false,
      explanation: "A for loop works too, but forEach is more concise for this pattern.",
    },
  ],
  systemHint:
    "`querySelector` returns ONE element (the first match). `querySelectorAll` returns ALL matching elements as a NodeList. A NodeList looks like an array -- it has `.length` and you can loop through it with `for` or `.forEach()`. Any time you need to change MULTIPLE elements, you need `querySelectorAll`.",
  starterCode: `function highlightLinks() {
  // Step 1: Select ALL <a> elements (hint: querySelectorAll, not querySelector)
  // Step 2: Loop through each one
  // Step 3: Add class "highlighted" to each
}

function countLinks() {
  // Step 1: Select all <a> elements
  // Step 2: Return how many there are
}`,
  solutionCode: `function highlightLinks() {
  const links = document.querySelectorAll("a");

  links.forEach(function (link) {
    link.classList.add("highlighted");
  });
}

function countLinks() {
  const links = document.querySelectorAll("a");
  return links.length;
}`,
  explanation:
    'You used the **batch update pattern**: select many elements, loop through them, and change each one. The key difference from Challenge 01 is `querySelectorAll` vs `querySelector`. One gives you a single element, the other gives you a collection. This pattern is everywhere: highlight search results, disable all form inputs, hide all tooltips, update all prices during a sale. Whenever you think "do X to ALL of these", you need `querySelectorAll` + a loop.',
  testCases: [
    {
      input: "countLinks()",
      expected: "5",
    },
    {
      input: "highlightLinks(); countLinks()",
      expected: "5",
    },
  ],
  domTestCases: [
    {
      label: 'After highlightLinks(), first link should have "highlighted" class',
      selector: "a:first-of-type",
      assertion: "classList",
      expected: "highlighted",
    },
    {
      label: 'After highlightLinks(), last link should have "highlighted" class',
      selector: "a:last-of-type",
      assertion: "classList",
      expected: "highlighted",
    },
    {
      label: "Page should have 5 links total",
      selector: "#page",
      assertion: "exists",
      expected: true,
    },
  ],
  starterHTML: `<div id="page">
  <p>Visit <a href="#">Google</a> or <a href="#">GitHub</a> for more info.</p>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </nav>
</div>`,
  starterCSS: `#page {
  font-family: Inter, system-ui, sans-serif;
  max-width: 480px;
  margin: 2rem auto;
  padding: 1.5rem;
}
p { color: #475569; line-height: 1.6; }
nav {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
a {
  color: #6366f1;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: background 0.2s;
}
a:hover { text-decoration: underline; }
a.highlighted {
  background: #fef3c7;
  color: #92400e;
  font-weight: 600;
}`,
  patternsUnlocked: [
    {
      name: "Batch update",
      plainEnglish:
        "Change multiple elements at once: querySelectorAll(selector) + .forEach() or loop to modify each.",
      codeExample: `const items = document.querySelectorAll(".item");\nitems.forEach(item => {\n  item.classList.add("active");\n});`,
    },
  ],
};
