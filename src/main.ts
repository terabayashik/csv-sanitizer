import { parseCliArgs } from "./cli.ts";
import { fileExists, generateOutputFileName } from "./fileUtils.ts";
import { sanitizeCSV } from "./sanitizer.ts";

const main = async () => {
  const args = parseCliArgs();

  const outputFile = args.outputFile || generateOutputFileName(args.inputFile);

  // Check if input file exists
  if (!(await fileExists(args.inputFile))) {
    console.error(`Input file not found: ${args.inputFile}`);
    process.exit(1);
  }

  await sanitizeCSV(args.inputFile, outputFile);
};

main().catch((error) => {
  console.error(`Unexpected error: ${error}`);
  process.exit(1);
});
