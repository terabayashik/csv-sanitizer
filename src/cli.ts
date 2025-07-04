import { parseArgs } from "node:util";

export const parseCliArgs = () => {
  const { values, positionals } = parseArgs({
    args: Bun.argv,
    options: {
      o: {
        type: "string",
        short: "o",
      },
      output: {
        type: "string",
      },
    },
    strict: true,
    allowPositionals: true,
  });

  const inputFile = positionals[2];
  if (!inputFile) {
    console.error("Usage: bun run src/main.ts <input.csv> [-o <output.csv>]");
    process.exit(1);
  }

  const outputFile = values.o || values.output;

  return {
    inputFile,
    outputFile,
  };
};
