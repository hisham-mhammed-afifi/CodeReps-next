import type { ChallengeDefinition } from "@/types/challenge";

export const cloneATemplateCard: ChallengeDefinition = {
  id: "dom-challenge-09",
  slug: "clone-a-template-card",
  title: "Clone a Template Card",
  trackSlug: "dom-manipulation",
  order: 9,
  difficulty: "intermediate",
  estimatedMinutes: 10,
  requiresPreview: true,
  problemStatement:
    "The page has a `<template id=\"card-template\">` containing a card structure. Write a function called `createCard` that takes a `title` and a `body`, clones the template, fills in the content, and appends it to `#cards-container`.",
  exampleCalls:
    'createCard("Welcome", "This is your first card.");\ncreateCard("Tip", "Use templates to avoid repetitive code.");\n// Two cards appear in #cards-container',
  expectedUnderstanding:
    "There's a hidden template on the page with a pre-built card structure. I need to make a copy of it, fill in the title and body text, and add the copy to the page. The template itself stays hidden and reusable.",
  breakdownBlocks: [
    { id: "block-1", text: "Select the template element", order: 1 },
    { id: "block-2", text: "Clone its content (make a deep copy)", order: 2 },
    { id: "block-3", text: "Inside the clone, find the .card-title element and set its text", order: 3 },
    { id: "block-4", text: "Inside the clone, find the .card-body element and set its text", order: 4 },
    { id: "block-5", text: "Append the clone to #cards-container", order: 5 },
  ],
  conceptOptions: [
    {
      name: "document.querySelector()",
      isCorrect: true,
      explanation: "querySelector finds the template element and the container.",
    },
    {
      name: ".content",
      isCorrect: true,
      explanation: "The .content property of a <template> holds its inner DocumentFragment.",
    },
    {
      name: ".cloneNode(true)",
      isCorrect: true,
      explanation: "cloneNode(true) makes a deep copy of the template content including all children.",
    },
    {
      name: ".textContent",
      isCorrect: true,
      explanation: "textContent fills in the title and body text on the clone.",
    },
    {
      name: ".appendChild()",
      isCorrect: true,
      explanation: "appendChild attaches the filled-in clone to the container.",
    },
    {
      name: "document.createElement()",
      isCorrect: false,
      explanation: "You don't need createElement when cloning from a template.",
    },
  ],
  systemHint:
    "`<template>` elements are special: they hold HTML that's NOT rendered on the page. Their content lives in a `.content` property (a DocumentFragment). Use `.cloneNode(true)` to make a deep copy (including all children). You can then use `querySelector` on the clone to find elements inside it, fill them in, and append the finished card. This avoids building HTML strings manually.",
  starterCode: `function createCard(title, body) {
  // Step 1: Select the template element by ID
  // Step 2: Clone its content with cloneNode(true)
  // Step 3: Find .card-title inside the clone and set its text
  // Step 4: Find .card-body inside the clone and set its text
  // Step 5: Append the clone to #cards-container
}`,
  solutionCode: `function createCard(title, body) {
  const template = document.querySelector("#card-template");
  const clone = template.content.cloneNode(true);

  clone.querySelector(".card-title").textContent = title;
  clone.querySelector(".card-body").textContent = body;

  document.querySelector("#cards-container").appendChild(clone);
}`,
  explanation:
    "You used the **template stamping pattern**. Instead of manually creating every element with `createElement` (like in Challenge 02), you defined the structure once in HTML and cloned it for each use. This is cleaner, easier to maintain, and closer to how modern frameworks work. The `<template>` tag is a built-in browser feature specifically designed for this. The key concept: `cloneNode(true)` makes a deep copy, so the original template is never modified. You can stamp out as many copies as you need.",
  testCases: [
    {
      input: 'createCard("Welcome", "First card content.")',
      expected: "undefined",
    },
    {
      input: 'createCard("Tip", "Second card content.")',
      expected: "undefined",
    },
  ],
  domTestCases: [
    {
      label: "Should have 2 cards after both calls",
      selector: "#cards-container",
      assertion: "childCount",
      expected: 2,
    },
    {
      label: 'First card title should be "Welcome"',
      selector: "#cards-container .card:first-child .card-title",
      assertion: "textContent",
      expected: "Welcome",
    },
    {
      label: 'First card body should be "First card content."',
      selector: "#cards-container .card:first-child .card-body",
      assertion: "textContent",
      expected: "First card content.",
    },
    {
      label: 'Second card title should be "Tip"',
      selector: "#cards-container .card:nth-child(2) .card-title",
      assertion: "textContent",
      expected: "Tip",
    },
  ],
  starterHTML: `<template id="card-template">
  <div class="card">
    <h3 class="card-title"></h3>
    <p class="card-body"></p>
  </div>
</template>

<div id="cards-container"></div>`,
  starterCSS: `#cards-container {
  font-family: Inter, system-ui, sans-serif;
  max-width: 480px;
  margin: 2rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.card {
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.25rem;
  background: #fff;
}
.card-title {
  color: #0f172a;
  font-size: 1.125rem;
  margin: 0 0 0.5rem;
}
.card-body {
  color: #475569;
  margin: 0;
  line-height: 1.5;
}`,
  patternsUnlocked: [
    {
      name: "Template stamping",
      plainEnglish:
        "Clone a reusable structure: template.content.cloneNode(true) > fill in data > append.",
      codeExample: `const template = document.querySelector("#tpl");\nconst clone = template.content.cloneNode(true);\nclone.querySelector(".title").textContent = data;\ncontainer.appendChild(clone);`,
    },
  ],
};
