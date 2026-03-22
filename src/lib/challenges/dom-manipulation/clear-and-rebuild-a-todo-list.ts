import type { ChallengeDefinition } from "@/types/challenge";

export const clearAndRebuildATodoList: ChallengeDefinition = {
  id: "dom-challenge-06",
  slug: "clear-and-rebuild-a-todo-list",
  title: "Clear and Rebuild a Todo List",
  trackSlug: "dom-manipulation",
  order: 6,
  difficulty: "intermediate",
  estimatedMinutes: 12,
  requiresPreview: true,
  problemStatement:
    'Write a function called `renderTodos` that takes an array of todo objects and renders them as a list. Each todo has `{ text, done }`. If `done` is true, add class `"completed"` to that `<li>`.\n\nThe function should **clear the existing list first** before rendering, so calling it again with new data replaces the old list.',
  exampleCalls:
    'renderTodos([\n  { text: "Buy groceries", done: false },\n  { text: "Walk the dog", done: true },\n  { text: "Write code", done: false }\n]);\n// #todo-list contains 3 <li> elements\n// "Walk the dog" li has class "completed"\n\nrenderTodos([{ text: "Sleep", done: false }]);\n// #todo-list now contains ONLY 1 <li> (old items cleared)',
  expectedUnderstanding:
    "I need to wipe everything currently inside the list, then create a new list item for each todo. Completed todos need a special class. Every time the function runs, it starts fresh.",
  breakdownBlocks: [
    { id: "block-1", text: "Select the #todo-list element", order: 1 },
    { id: "block-2", text: "Clear all its current content", order: 2 },
    { id: "block-3", text: "Loop through the todos array", order: 3 },
    { id: "block-4", text: "For each todo, create a <li> element", order: 4 },
    { id: "block-5", text: "Set its text to todo.text", order: 5 },
    { id: "block-6", text: 'If todo.done is true, add class "completed"', order: 6 },
    { id: "block-7", text: "Append the li to #todo-list", order: 7 },
  ],
  conceptOptions: [
    {
      name: "document.querySelector()",
      isCorrect: true,
      explanation: "querySelector finds the #todo-list element.",
    },
    {
      name: '.innerHTML = ""',
      isCorrect: true,
      explanation: 'Setting innerHTML to "" erases all content inside an element.',
    },
    {
      name: "for loop",
      isCorrect: true,
      explanation: "A loop iterates through each todo in the array.",
    },
    {
      name: "document.createElement()",
      isCorrect: true,
      explanation: "createElement builds each <li> element.",
    },
    {
      name: ".textContent",
      isCorrect: true,
      explanation: "textContent sets the text of each li.",
    },
    {
      name: ".classList.add()",
      isCorrect: true,
      explanation: 'classList.add attaches the "completed" class when a todo is done.',
    },
    {
      name: ".appendChild()",
      isCorrect: true,
      explanation: "appendChild attaches each li to the list.",
    },
    {
      name: "if",
      isCorrect: true,
      explanation: "An if statement checks whether todo.done is true.",
    },
  ],
  systemHint:
    "Setting `element.innerHTML = ''` erases everything inside that element. This is the simplest way to 'start fresh'. Then you rebuild the content from the new data. This **clear and rebuild** pattern is actually how many UI frameworks work conceptually: when data changes, throw away the old UI and build new UI from the current data.",
  starterCode: `function renderTodos(todos) {
  // Step 1: Select #todo-list
  // Step 2: Clear its contents (innerHTML = "")
  // Step 3: Loop through todos
  // Step 4: Create a li for each todo with its text
  // Step 5: If todo.done is true, add class "completed"
  // Step 6: Append each li to the list
}`,
  solutionCode: `function renderTodos(todos) {
  const list = document.querySelector("#todo-list");
  list.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const li = document.createElement("li");
    li.textContent = todos[i].text;

    if (todos[i].done) {
      li.classList.add("completed");
    }

    list.appendChild(li);
  }
}`,
  explanation:
    "You used the **clear and rebuild pattern**. This is a critical concept: when your data changes, you don't try to figure out which individual elements to update. You just erase everything and re-render from scratch. It sounds wasteful, but it's actually how React's mental model works. React's virtual DOM is an optimization on top of this exact idea. For small lists like this, clearing and rebuilding is perfectly fine and much simpler than tracking individual changes.",
  testCases: [
    {
      input: 'renderTodos([{ text: "Buy groceries", done: false }, { text: "Walk the dog", done: true }, { text: "Write code", done: false }])',
      expected: "undefined",
    },
    {
      input: 'renderTodos([{ text: "Sleep", done: false }])',
      expected: "undefined",
    },
    {
      input: "renderTodos([])",
      expected: "undefined",
    },
  ],
  domTestCases: [
    {
      label: "Should render 3 list items from first call",
      selector: "#todo-list",
      assertion: "childCount",
      expected: 3,
    },
    {
      label: 'First item should say "Buy groceries"',
      selector: "#todo-list li:first-child",
      assertion: "textContent",
      expected: "Buy groceries",
    },
    {
      label: 'Second item (done) should have "completed" class',
      selector: "#todo-list li:nth-child(2)",
      assertion: "classList",
      expected: "completed",
    },
    {
      label: 'Third item should NOT have "completed" class',
      selector: "#todo-list li:nth-child(3)",
      assertion: "exists",
      expected: true,
    },
  ],
  starterHTML: `<div id="app">
  <h2>My Todos</h2>
  <ul id="todo-list"></ul>
</div>`,
  starterCSS: `#app {
  font-family: Inter, system-ui, sans-serif;
  max-width: 480px;
  margin: 2rem auto;
  padding: 1.5rem;
}
h2 { color: #0f172a; margin-bottom: 0.75rem; }
#todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
#todo-list li {
  padding: 0.625rem 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  color: #0f172a;
}
#todo-list li.completed {
  text-decoration: line-through;
  color: #94a3b8;
}`,
  patternsUnlocked: [
    {
      name: "Clear and rebuild",
      plainEnglish:
        'Replace old content with new content: container.innerHTML = "" then re-render from current data.',
      codeExample: `container.innerHTML = "";\ndata.forEach(item => {\n  const el = document.createElement("li");\n  el.textContent = item;\n  container.appendChild(el);\n});`,
    },
  ],
};
