interface TranslatedError {
  message: string;
  line?: number;
}

const ERROR_PATTERNS: Array<{
  pattern: RegExp;
  translate: (match: RegExpMatchArray) => string;
}> = [
  {
    pattern: /(\w+) is not defined/,
    translate: (m) =>
      `"${m[1]}" doesn't exist yet. Check the spelling, or make sure you declared it with let, const, or function.`,
  },
  {
    pattern: /(\w+) is not a function/,
    translate: (m) =>
      `You tried to call "${m[1]}" as a function, but it isn't one. Check if you misspelled the name or forgot to define it.`,
  },
  {
    pattern: /Cannot read propert(?:y|ies) of (undefined|null)/,
    translate: () =>
      `You tried to access a property on something that doesn't exist (undefined or null). Check that your variable has a value before using it.`,
  },
  {
    pattern: /Unexpected token '?(.+?)'?$/,
    translate: (m) =>
      `JavaScript found "${m[1]}" where it didn't expect it. Check for missing brackets, parentheses, or semicolons nearby.`,
  },
  {
    pattern: /Unexpected end of input/,
    translate: () =>
      `Your code ended too early. You're probably missing a closing bracket "}" or parenthesis ")".`,
  },
  {
    pattern: /Missing initializer in const declaration/,
    translate: () =>
      `You declared a const but didn't give it a value. const variables must be assigned when created: const x = value.`,
  },
  {
    pattern: /Assignment to constant variable/,
    translate: () =>
      `You tried to change a const variable. Use let instead if the value needs to change.`,
  },
  {
    pattern: /Cannot access '(\w+)' before initialization/,
    translate: (m) =>
      `You tried to use "${m[1]}" before it was created. Move the declaration above where you use it.`,
  },
  {
    pattern: /Maximum call stack size exceeded/,
    translate: () =>
      `Your function calls itself forever (infinite recursion). Make sure there's a condition that stops the recursion.`,
  },
];

function extractLineNumber(errorMessage: string): number | undefined {
  // Patterns like "<anonymous>:3:5" or "line 3"
  const lineMatch = errorMessage.match(/<anonymous>:(\d+):\d+/) ??
    errorMessage.match(/line (\d+)/i);
  if (lineMatch) {
    return parseInt(lineMatch[1], 10);
  }
  return undefined;
}

export function translateError(rawError: string): TranslatedError {
  const line = extractLineNumber(rawError);

  for (const { pattern, translate } of ERROR_PATTERNS) {
    const match = rawError.match(pattern);
    if (match) {
      return { message: translate(match), line };
    }
  }

  // Fallback: clean up the raw message
  const cleaned = rawError
    .replace(/at\s+.*$/gm, "")
    .replace(/<anonymous>:\d+:\d+/g, "")
    .trim();

  return {
    message: cleaned || "Something went wrong when running your code. Check for syntax errors and try again.",
    line,
  };
}
