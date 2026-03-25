import type { ChallengeDefinition } from "@/types/challenge";

export const dynamicFilterUi: ChallengeDefinition = {
  id: "dom-challenge-15",
  slug: "dynamic-filter-ui",
  title: "Dynamic Filter UI",
  trackSlug: "dom-manipulation",
  order: 15,
  difficulty: "advanced",
  estimatedMinutes: 20,
  requiresPreview: true,
  problemStatement:
    'This is the **capstone challenge** for Track 2. You\'ll build a complete filter UI using every pattern from this track.\n\nYou\'re given an array of product objects with `{ name, category, price }`. Implement three functions:\n\n1. `renderProducts(products)` -- renders product cards inside `#product-grid`\n2. `renderFilters(categories)` -- renders filter buttons inside `#filters`, each with a `data-category` attribute\n3. `filterByCategory(category)` -- clears the grid, re-renders only matching products (or all if category is "all"), and toggles the "active" class on the matching filter button',
  exampleCalls:
    'renderFilters(["all", "footwear", "clothing", "accessories"]);\nrenderProducts(products);\n// Shows all 8 products, "all" filter button is active\n\nfilterByCategory("footwear");\n// Shows only 3 footwear products, "footwear" button is active',
  expectedUnderstanding:
    'I need to build a product grid and filter buttons. When a filter button is clicked (simulated by calling filterByCategory), the grid clears and shows only matching products. The active button should be highlighted with a class.',
  breakdownBlocks: [
    { id: "block-1", text: "renderProducts: clear #product-grid, loop through products, create a card div for each with name, category, and price, append to grid", order: 1 },
    { id: "block-2", text: "renderFilters: loop through categories, create a button for each with text and data-category attribute, append to #filters", order: 2 },
    { id: "block-3", text: 'filterByCategory: if category is "all", use the full products array; otherwise filter products by category. Call renderProducts with the filtered list. Remove "active" class from all filter buttons, then add "active" to the matching button.', order: 3 },
  ],
  conceptOptions: [
    {
      name: "document.createElement()",
      isCorrect: true,
      explanation: "createElement builds product cards and filter buttons.",
    },
    {
      name: ".appendChild()",
      isCorrect: true,
      explanation: "appendChild attaches cards to the grid and buttons to the filters.",
    },
    {
      name: '.innerHTML = ""',
      isCorrect: true,
      explanation: "innerHTML clears the grid before re-rendering.",
    },
    {
      name: ".textContent",
      isCorrect: true,
      explanation: "textContent sets the text of each element.",
    },
    {
      name: ".classList.add()",
      isCorrect: true,
      explanation: "classList.add marks the active filter button.",
    },
    {
      name: ".classList.remove()",
      isCorrect: true,
      explanation: "classList.remove clears the active state from all buttons.",
    },
    {
      name: "document.querySelectorAll()",
      isCorrect: true,
      explanation: "querySelectorAll finds all filter buttons for batch class removal.",
    },
    {
      name: ".dataset.category",
      isCorrect: true,
      explanation: "dataset.category reads the data-category attribute on filter buttons.",
    },
    {
      name: '.setAttribute("data-category")',
      isCorrect: true,
      explanation: "setAttribute sets the data-category on each filter button.",
    },
    {
      name: ".filter()",
      isCorrect: true,
      explanation: "filter narrows the products array to matching categories.",
    },
  ],
  systemHint:
    'This challenge combines nearly every pattern from Track 2:\n- **Clear and rebuild** (renderProducts clears and re-renders)\n- **Render from data** (products array becomes card elements)\n- **Create and append** (building cards and buttons)\n- **Attribute routing** (data-category on buttons)\n- **Toggle state** (active class on filter buttons)\n- **Batch update** (removing active from all buttons)\nThink of it as an assembly line: each function handles one job, and they work together to create the full UI.',
  starterCode: `const products = [
  { name: "Running Shoes", category: "footwear", price: 120 },
  { name: "Sandals", category: "footwear", price: 45 },
  { name: "T-Shirt", category: "clothing", price: 30 },
  { name: "Jeans", category: "clothing", price: 65 },
  { name: "Watch", category: "accessories", price: 200 },
  { name: "Sunglasses", category: "accessories", price: 85 },
  { name: "Hoodie", category: "clothing", price: 55 },
  { name: "Boots", category: "footwear", price: 150 }
];

function renderProducts(productList) {
  // Step 1: Select #product-grid and clear it
  // Step 2: Loop through productList
  // Step 3: For each product, create a div with class "product-card"
  // Step 4: Add an h3 with the product name
  // Step 5: Add a p with the price
  // Step 6: Add a span with the category
  // Step 7: Append the card to #product-grid
}

function renderFilters(categories) {
  // Step 1: Select #filters and clear it
  // Step 2: Loop through categories
  // Step 3: Create a button for each with its text
  // Step 4: Set data-category attribute on each button
  // Step 5: Append to #filters
}

function filterByCategory(category) {
  // Step 1: If category is "all", use the full products array
  //         Otherwise, filter products where product.category matches
  // Step 2: Call renderProducts with the filtered list
  // Step 3: Remove "active" class from ALL filter buttons
  // Step 4: Find the button with matching data-category and add "active" class
}`,
  solutionCode: `const products = [
  { name: "Running Shoes", category: "footwear", price: 120 },
  { name: "Sandals", category: "footwear", price: 45 },
  { name: "T-Shirt", category: "clothing", price: 30 },
  { name: "Jeans", category: "clothing", price: 65 },
  { name: "Watch", category: "accessories", price: 200 },
  { name: "Sunglasses", category: "accessories", price: 85 },
  { name: "Hoodie", category: "clothing", price: 55 },
  { name: "Boots", category: "footwear", price: 150 }
];

function renderProducts(productList) {
  const grid = document.querySelector("#product-grid");
  grid.innerHTML = "";

  for (let i = 0; i < productList.length; i++) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const name = document.createElement("h3");
    name.textContent = productList[i].name;

    const price = document.createElement("p");
    price.textContent = "$" + productList[i].price;

    const category = document.createElement("span");
    category.textContent = productList[i].category;
    category.classList.add("category-tag");

    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(category);

    grid.appendChild(card);
  }
}

function renderFilters(categories) {
  const filtersContainer = document.querySelector("#filters");
  filtersContainer.innerHTML = "";

  for (let i = 0; i < categories.length; i++) {
    const button = document.createElement("button");
    button.textContent = categories[i];
    button.setAttribute("data-category", categories[i]);

    filtersContainer.appendChild(button);
  }
}

function filterByCategory(category) {
  let filtered;

  if (category === "all") {
    filtered = products;
  } else {
    filtered = products.filter(function (product) {
      return product.category === category;
    });
  }

  renderProducts(filtered);

  const allButtons = document.querySelectorAll("#filters button");
  allButtons.forEach(function (button) {
    button.classList.remove("active");
  });

  const activeButton = document.querySelector(
    '#filters [data-category="' + category + '"]'
  );
  activeButton.classList.add("active");
}`,
  explanation:
    "Congratulations, you just built a real, functional UI feature. This capstone ties together nearly everything from Track 2:\n\n- **Clear and rebuild**: `renderProducts` clears the grid before re-rendering\n- **Render from data**: Products array becomes visible cards\n- **Create and append**: Every card is built from scratch in JS\n- **Attribute routing**: `data-category` on buttons drives the filter logic\n- **Batch update**: Removing 'active' from all buttons before adding it to one\n- **Toggle state**: The active class shows which filter is selected\n\nThis is exactly how product listing pages work on e-commerce sites. The data comes from an API, filters narrow it down, and the UI rebuilds to show the results. The only thing missing is actual click event handlers, which is what Track 3 (Events & Interactions) will teach you.",
  testCases: [
    {
      input: 'renderFilters(["all","footwear","clothing","accessories"]); renderProducts(products); document.querySelector("#product-grid").children.length',
      expected: "8",
    },
    {
      input: 'document.querySelector("#filters").children.length',
      expected: "4",
    },
    {
      input: 'filterByCategory("footwear"); document.querySelector("#product-grid").children.length',
      expected: "3",
    },
    {
      input: 'document.querySelector(\'#filters [data-category="footwear"]\').classList.contains("active")',
      expected: "true",
    },
    {
      input: 'filterByCategory("all"); document.querySelector("#product-grid").children.length',
      expected: "8",
    },
  ],
  domTestCases: [
    {
      label: "Should have 4 filter buttons",
      selector: "#filters",
      assertion: "childCount",
      expected: 4,
    },
    {
      label: 'After filterByCategory("all"), grid should have 8 cards',
      selector: "#product-grid",
      assertion: "childCount",
      expected: 8,
    },
    {
      label: '"all" button should have "active" class',
      selector: '#filters [data-category="all"]',
      assertion: "classList",
      expected: "active",
    },
  ],
  starterHTML: `<div id="app">
  <div id="filters"></div>
  <div id="product-grid"></div>
</div>`,
  starterCSS: `#app {
  font-family: Inter, system-ui, sans-serif;
  max-width: 640px;
  margin: 2rem auto;
  padding: 1rem;
}
#filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
#filters button {
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 2rem;
  background: #fff;
  color: #475569;
  cursor: pointer;
  font-size: 0.875rem;
  text-transform: capitalize;
  transition: all 0.15s;
}
#filters button:hover { background: #f1f5f9; }
#filters button.active {
  background: #6366f1;
  color: #fff;
  border-color: #6366f1;
}
#product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}
.product-card {
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1rem;
  background: #fff;
}
.product-card h3 {
  color: #0f172a;
  font-size: 1rem;
  margin: 0 0 0.25rem;
}
.product-card p {
  color: #6366f1;
  font-weight: 600;
  margin: 0 0 0.5rem;
}
.category-tag {
  display: inline-block;
  font-size: 0.75rem;
  color: #64748b;
  background: #f1f5f9;
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
  text-transform: capitalize;
}`,
  patternsUnlocked: [
    {
      name: "Combined UI pattern",
      plainEnglish:
        "Build a complete interactive UI from data: combine render-from-data + clear-and-rebuild + attribute routing + batch update. Separate your code into small functions that each handle one job.",
      codeExample: `function renderList(data) { /* clear + rebuild */ }\nfunction renderControls(options) { /* create buttons */ }\nfunction filter(value) {\n  const filtered = data.filter(...);\n  renderList(filtered);\n  updateActiveControl(value);\n}`,
    },
  ],
};
