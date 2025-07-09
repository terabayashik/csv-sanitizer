import { sanitizeCSVContent } from "../csvProcessor.ts";
import { readFile, writeFile } from "../fileUtils.ts";

export const sanitizeCSV = async (inputFile: string, outputFile: string) => {
  try {
    const content = await readFile(inputFile);
    const sanitizedContent = sanitizeCSVContent(content);
    await writeFile(outputFile, sanitizedContent);
    console.log(`Sanitized CSV saved to: ${outputFile}`);
  } catch (error) {
    console.error(`Error processing file: ${error}`);
    process.exit(1);
  }
};
