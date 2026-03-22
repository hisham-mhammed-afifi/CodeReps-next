import type { ChallengeDefinition } from "@/types/challenge";

export const buildABreadcrumbTrail: ChallengeDefinition = {
  id: "dom-challenge-13",
  slug: "build-a-breadcrumb-trail",
  title: "Build a Breadcrumb Trail",
  trackSlug: "dom-manipulation",
  order: 13,
  difficulty: "advanced",
  estimatedMinutes: 12,
  requiresPreview: true,
  problemStatement:
    'Write a function called `renderBreadcrumbs` that takes an array of path names and renders a breadcrumb navigation inside `#breadcrumb`. Each path becomes a `<span>`. A text separator `" > "` goes between items (but NOT after the last one). The last item gets class `"active"`.',
  exampleCalls:
    'renderBreadcrumbs(["Home", "Products", "Shoes"]);\n// Renders: Home > Products > Shoes\n// "Shoes" span has class "active"',
  expectedUnderstanding:
    "I need to build a row of text items with separators between them. The last item is special (it gets a class). The separator should only appear BETWEEN items, not at the end.",
  breakdownBlocks: [
    { id: "block-1", text: "Select #breadcrumb and clear it", order: 1 },
    { id: "block-2", text: "Loop through the paths array", order: 2 },
    { id: "block-3", text: "Create a <span> for each path with its text", order: 3 },
    { id: "block-4", text: 'If it\'s the last item, add class "active"', order: 4 },
    { id: "block-5", text: "Append the span to #breadcrumb", order: 5 },
    { id: "block-6", text: "If it's NOT the last item, also create and append a separator text node", order: 6 },
  ],
  conceptOptions: [
    {
      name: "document.querySelector()",
      isCorrect: true,
      explanation: "querySelector finds the #breadcrumb container.",
    },
    {
      name: "document.createElement()",
      isCorrect: true,
      explanation: "createElement builds the span for each path.",
    },
    {
      name: "document.createTextNode()",
      isCorrect: true,
      explanation: 'createTextNode creates the " > " separator as plain text.',
    },
    {
      name: ".classList.add()",
      isCorrect: true,
      explanation: 'classList.add marks the last item as "active".',
    },
    {
      name: ".appendChild()",
      isCorrect: true,
      explanation: "appendChild attaches each span and separator to the container.",
    },
    {
      name: '.innerHTML = ""',
      isCorrect: true,
      explanation: "innerHTML clears old breadcrumbs before re-rendering.",
    },
    {
      name: "for loop",
      isCorrect: true,
      explanation: "A for loop iterates through the paths array.",
    },
    {
      name: "array.length - 1",
      isCorrect: true,
      explanation: "length - 1 identifies the last item to apply the active class and skip the separator.",
    },
  ],
  systemHint:
    "The tricky part is the separator. You need to add it BETWEEN items, not after each one. The simplest approach: check `if (i < paths.length - 1)` to know if the current item is NOT the last one. If it's not last, add a separator after it. `document.createTextNode(' > ')` creates a plain text node (not an element). This 'separator between items' pattern appears in breadcrumbs, comma-separated lists, tag displays, and step indicators.",
  starterCode: `function renderBreadcrumbs(paths) {
  // Step 1: Select #breadcrumb and clear it
  // Step 2: Loop through paths
  // Step 3: Create a span for each path with its text
  // Step 4: If it's the last item, add class "active"
  // Step 5: Append the span
  // Step 6: If NOT the last item, append a " > " text node as separator
}`,
  solutionCode: `function renderBreadcrumbs(paths) {
  const nav = document.querySelector("#breadcrumb");
  nav.innerHTML = "";

  for (let i = 0; i < paths.length; i++) {
    const span = document.createElement("span");
    span.textContent = paths[i];

    if (i === paths.length - 1) {
      span.classList.add("active");
    }

    nav.appendChild(span);

    if (i < paths.length - 1) {
      const separator = document.createTextNode(" > ");
      nav.appendChild(separator);
    }
  }
}`,
  explanation:
    "You handled the **between items** problem: adding separators or dividers that appear between elements but not after the last one. The check `i < array.length - 1` is the universal way to say 'everything except the last one'. You also used `createTextNode` for the first time. Unlike `createElement`, a text node is just plain text with no HTML tag wrapping it. This pattern shows up any time you build lists with separators: 'tag1, tag2, tag3', breadcrumbs, step indicators like '1 - 2 - 3'.",
  testCases: [
    {
      input: 'renderBreadcrumbs(["Home", "Products", "Shoes"]); document.querySelectorAll("#breadcrumb span").length',
      expected: "3",
    },
    {
      input: 'document.querySelector("#breadcrumb span.active").textContent',
      expected: '"Shoes"',
    },
    {
      input: 'renderBreadcrumbs(["Home"]); document.querySelectorAll("#breadcrumb span").length',
      expected: "1",
    },
  ],
  domTestCases: [
    {
      label: 'After renderBreadcrumbs(["Home"]), should have 1 span',
      selector: "#breadcrumb",
      assertion: "childCount",
      expected: 1,
    },
    {
      label: 'The single span should have "active" class',
      selector: "#breadcrumb span.active",
      assertion: "textContent",
      expected: "Home",
    },
  ],
  starterHTML: `<nav id="breadcrumb"></nav>`,
  starterCSS: `#breadcrumb {
  font-family: Inter, system-ui, sans-serif;
  max-width: 480px;
  margin: 2rem auto;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
}
#breadcrumb span {
  color: #6366f1;
}
#breadcrumb span.active {
  color: #0f172a;
  font-weight: 600;
}`,
  patternsUnlocked: [
    {
      name: "Between-items separator",
      plainEnglish:
        "Add separators between items but not after the last: check if (i < array.length - 1) inside the loop. Use createTextNode() for plain text separators.",
      codeExample: `for (let i = 0; i < items.length; i++) {\n  container.appendChild(createEl(items[i]));\n  if (i < items.length - 1) {\n    container.appendChild(document.createTextNode(", "));\n  }\n}`,
    },
  ],
};
