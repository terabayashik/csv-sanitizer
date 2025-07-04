import { basename, dirname, extname, join } from "node:path";

export const generateOutputFileName = (inputFile: string) => {
  const ext = extname(inputFile);
  const nameWithoutExt = basename(inputFile, ext);
  const dir = dirname(inputFile);
  return join(dir, `${nameWithoutExt}_sanitized${ext}`);
};

export const readFile = async (filePath: string) => {
  const file = Bun.file(filePath);
  return await file.text();
};

export const writeFile = async (filePath: string, content: string) => {
  await Bun.write(filePath, content);
};

export const fileExists = async (filePath: string) => {
  const file = Bun.file(filePath);
  return await file.exists();
};
