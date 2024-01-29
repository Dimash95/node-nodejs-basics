import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceFile = resolve(__dirname, "files", "wrongFilename.txt");
const destinationFile = resolve(__dirname, "files", "properFilename.md");

const renameFile = async () => {
  try {
    await fs.access(sourceFile);
    try {
      await fs.access(destinationFile);
      throw new Error("FS operation failed: properFilename.md already exists");
    } catch {
      await fs.rename(sourceFile, destinationFile);
      console.log("File successfully renamed");
    }
  } catch (error) {
    console.error("FS operation failed: " + error.message);
  }
};

renameFile();
