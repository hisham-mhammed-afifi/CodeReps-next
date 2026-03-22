import type { ChallengeDefinition } from "@/types/challenge";

export const renderAList: ChallengeDefinition = {
  id: "dom-challenge-03",
  slug: "render-a-list",
  title: "Render a List",
  trackSlug: "dom-manipulation",
  order: 3,
  difficulty: "beginner",
  estimatedMinutes: 10,
  requiresPreview: true,
  problemStatement:
    "Write a function called `renderList` that takes an array of strings and creates a `<ul>` with a `<li>` for each item, then appends it to `#container`.",
  exampleCalls:
    'renderList(["Apple", "Banana", "Cherry"]);\n// Adds to #container:\n// <ul>\n//   <li>Apple</li>\n//   <li>Banana</li>\n//   <li>Cherry</li>\n// </ul>',
  expectedUnderstanding:
    "I have an array of text items. I need to create a list structure in the DOM where each array item becomes a list item inside an unordered list.",
  breakdownBlocks: [
    { id: "block-1", text: "Create a <ul> element", order: 1 },
    { id: "block-2", text: "Loop through the items array", order: 2 },
    { id: "block-3", text: "For each item, create a <li> element", order: 3 },
    { id: "block-4", text: "Set the li's text to the current item", order: 4 },
    { id: "block-5", text: "Append the li to the ul", order: 5 },
    { id: "block-6", text: "After the loop, append the ul to #container", order: 6 },
  ],
  conceptOptions: [
    {
      name: "document.createElement()",
      isCorrect: true,
      explanation: "You need createElement to build the ul and each li.",
    },
    {
      name: "for loop",
      isCorrect: true,
      explanation: "A loop iterates through the items array to create one li per item.",
    },
    {
      name: ".textContent",
      isCorrect: true,
      explanation: "textContent sets the text of each li to the array item.",
    },
    {
      name: ".appendChild()",
      isCorrect: true,
      explanation: "appendChild nests each li inside the ul, then the ul inside #container.",
    },
    {
      name: ".forEach()",
      isCorrect: false,
      explanation: "forEach also works for looping, but a for loop is equally valid here.",
    },
    {
      name: "document.querySelector()",
      isCorrect: false,
      explanation: "querySelector finds #container, but it's not the core concept for this challenge.",
    },
  ],
  systemHint:
    "This challenge combines a **Track 1 pattern** (looping through an array) with a **Track 2 pattern** (creating DOM elements). For each item in the data, you create an element. This is the most fundamental frontend pattern: turning data into UI. React, Vue, and Angular all do exactly this under the hood.",
  starterCode: `function renderList(items) {
  // Step 1: Create a ul element
  // Step 2: Loop through the items array
  // Step 3: For each item, create a li element with the item's text
  // Step 4: Append each li to the ul
  // Step 5: Append the ul to #container
}`,
  solutionCode: `function renderList(items) {
  const ul = document.createElement("ul");

  for (let i = 0; i < items.length; i++) {
    const li = document.createElement("li");
    li.textContent = items[i];
    ul.appendChild(li);
  }

  document.querySelector("#container").appendChild(ul);
}`,
  explanation:
    "You just turned data into UI. This is the **render from data pattern** and it's arguably the most important concept in frontend development. Every list, every table, every feed, every search result you've ever seen on a website was built this way: take an array of data, loop through it, create an element for each item, and attach them to the page. Frameworks like React do this with JSX (`.map()` inside a template), but the underlying idea is exactly what you just wrote.",
  testCases: [
    {
      input: 'renderList(["Apple", "Banana", "Cherry"]); document.querySelector("#container ul").children.length',
      expected: "3",
    },
    {
      input: 'renderList(["Apple", "Banana", "Cherry"]); document.querySelector("#container ul li:first-child").textContent',
      expected: '"Apple"',
    },
    {
      input: 'renderList([]); document.querySelectorAll("#container ul").length',
      expected: "2",
    },
  ],
  domTestCases: [
    {
      label: "At least one <ul> should exist inside #container",
      selector: "#container ul",
      assertion: "exists",
      expected: true,
    },
    {
      label: "First ul should have 3 list items",
      selector: "#container ul:first-child",
      assertion: "childCount",
      expected: 3,
    },
  ],
  starterHTML: `<div id="container"></div>`,
  starterCSS: `#container {
  font-family: Inter, system-ui, sans-serif;
  max-width: 480px;
  margin: 2rem auto;
  padding: 1rem;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  padding: 0.625rem 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  color: #0f172a;
}
li:last-child {
  border-bottom: none;
}`,
  patternsUnlocked: [
    {
      name: "Render from data",
      plainEnglish:
        "Turn an array into visible elements: create a container, loop through data, create + append an element per item.",
      codeExample: `const ul = document.createElement("ul");\nitems.forEach(item => {\n  const li = document.createElement("li");\n  li.textContent = item;\n  ul.appendChild(li);\n});`,
    },
  ],
};
