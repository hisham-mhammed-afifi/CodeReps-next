import type { ChallengeDefinition } from "@/types/challenge";

export const buildAProductTable: ChallengeDefinition = {
  id: "dom-challenge-07",
  slug: "build-a-product-table",
  title: "Build a Product Table",
  trackSlug: "dom-manipulation",
  order: 7,
  difficulty: "intermediate",
  estimatedMinutes: 15,
  requiresPreview: true,
  problemStatement:
    'Write a function called `renderTable` that takes an array of product objects and builds an HTML table inside `#container`.\n\nEach product has `{ name, price, inStock }`. The table should have a header row with columns "Name", "Price", and "In Stock". Rows where `inStock` is false should get class `"out-of-stock"`.',
  exampleCalls:
    'renderTable([\n  { name: "Laptop", price: 999, inStock: true },\n  { name: "Keyboard", price: 75, inStock: false },\n  { name: "Mouse", price: 25, inStock: true }\n]);',
  expectedUnderstanding:
    "I need to create a table from scratch with a header row and one data row per product. Products that are out of stock get a special class on their row.",
  breakdownBlocks: [
    { id: "block-1", text: "Create a <table> element", order: 1 },
    { id: "block-2", text: 'Create a header row (<tr>) with three <th> cells: "Name", "Price", "In Stock"', order: 2 },
    { id: "block-3", text: "Append the header row to the table", order: 3 },
    { id: "block-4", text: "Loop through the products array", order: 4 },
    { id: "block-5", text: "For each product, create a <tr> with three <td> cells", order: 5 },
    { id: "block-6", text: "Fill each td with the product's name, price, and inStock value", order: 6 },
    { id: "block-7", text: 'If inStock is false, add "out-of-stock" class to the row', order: 7 },
    { id: "block-8", text: "Append the row to the table", order: 8 },
    { id: "block-9", text: "Append the table to #container", order: 9 },
  ],
  conceptOptions: [
    {
      name: "document.createElement()",
      isCorrect: true,
      explanation: "createElement builds the table, rows, and cells.",
    },
    {
      name: ".appendChild()",
      isCorrect: true,
      explanation: "appendChild nests cells inside rows and rows inside the table.",
    },
    {
      name: ".textContent",
      isCorrect: true,
      explanation: "textContent sets the text of each cell.",
    },
    {
      name: ".classList.add()",
      isCorrect: true,
      explanation: "classList.add marks out-of-stock rows.",
    },
    {
      name: "for loop",
      isCorrect: true,
      explanation: "A loop iterates through the products array.",
    },
    {
      name: "if",
      isCorrect: true,
      explanation: "An if statement checks the inStock value.",
    },
  ],
  systemHint:
    "A table is a nested structure: `<table>` contains `<tr>` rows, and each row contains `<th>` (header) or `<td>` (data) cells. You're building three levels of nesting. This is the same create-and-append pattern from Challenge 02, just with more levels. Break it into sub-tasks: first build the header row, then loop to build data rows.",
  starterCode: `function renderTable(products) {
  // Step 1: Create the table element
  // Step 2: Build the header row with th cells: "Name", "Price", "In Stock"
  // Step 3: Append header row to table
  // Step 4: Loop through products
  // Step 5: For each product, create a tr with 3 td cells
  // Step 6: If not in stock, add "out-of-stock" class to the tr
  // Step 7: Append each row to the table
  // Step 8: Append the table to #container
}`,
  solutionCode: `function renderTable(products) {
  const table = document.createElement("table");

  const headerRow = document.createElement("tr");
  const headers = ["Name", "Price", "In Stock"];

  for (let i = 0; i < headers.length; i++) {
    const th = document.createElement("th");
    th.textContent = headers[i];
    headerRow.appendChild(th);
  }

  table.appendChild(headerRow);

  for (let i = 0; i < products.length; i++) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = products[i].name;

    const priceCell = document.createElement("td");
    priceCell.textContent = products[i].price;

    const stockCell = document.createElement("td");
    stockCell.textContent = products[i].inStock ? "Yes" : "No";

    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(stockCell);

    if (!products[i].inStock) {
      row.classList.add("out-of-stock");
    }

    table.appendChild(row);
  }

  document.querySelector("#container").appendChild(table);
}`,
  explanation:
    "You just built a data table from scratch. This is the create-and-append pattern scaled up with nesting: a table contains rows, rows contain cells. Notice how you used two separate loops: one for the header (a fixed list of column names) and one for the data rows (dynamic from the array). You also used the ternary operator (`? :`) to convert a boolean into readable text. Data tables are one of the most common UI components in dashboards, admin panels, and e-commerce sites.",
  testCases: [
    {
      input: 'renderTable([{name:"Laptop",price:999,inStock:true},{name:"Keyboard",price:75,inStock:false},{name:"Mouse",price:25,inStock:true}]); document.querySelector("#container table").children.length',
      expected: "4",
    },
    {
      input: 'document.querySelector("#container table tr:first-child th:first-child").textContent',
      expected: '"Name"',
    },
    {
      input: 'document.querySelector("#container table tr:nth-child(3)").classList.contains("out-of-stock")',
      expected: "true",
    },
  ],
  domTestCases: [
    {
      label: "Table should exist in #container",
      selector: "#container table",
      assertion: "exists",
      expected: true,
    },
    {
      label: "Table should have 4 rows (1 header + 3 data)",
      selector: "#container table",
      assertion: "childCount",
      expected: 4,
    },
    {
      label: 'Keyboard row should have "out-of-stock" class',
      selector: "#container table tr:nth-child(3)",
      assertion: "classList",
      expected: "out-of-stock",
    },
  ],
  starterHTML: `<div id="container"></div>`,
  starterCSS: `#container {
  font-family: Inter, system-ui, sans-serif;
  max-width: 560px;
  margin: 2rem auto;
  padding: 1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  text-align: left;
  padding: 0.625rem 0.75rem;
  border-bottom: 1px solid #e2e8f0;
}
th {
  background: #f8fafc;
  color: #475569;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
td { color: #0f172a; }
tr.out-of-stock td {
  color: #94a3b8;
  text-decoration: line-through;
}`,
  patternsUnlocked: [
    {
      name: "Nested create-and-append",
      plainEnglish:
        "Build nested structures from data: create the outer container, loop to build inner elements, nest them before attaching to the page.",
      codeExample: `const table = document.createElement("table");\ndata.forEach(item => {\n  const row = document.createElement("tr");\n  const cell = document.createElement("td");\n  cell.textContent = item;\n  row.appendChild(cell);\n  table.appendChild(row);\n});`,
    },
  ],
};
