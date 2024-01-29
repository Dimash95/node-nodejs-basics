import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToRemove = resolve(__dirname, "files", "fileToRemove.txt");

const remove = async () => {
  try {
    await fs.access(fileToRemove);
    await fs.unlink(fileToRemove);
    console.log("File successfully removed");
  } catch (error) {
    console.error("FS operation failed: " + error.message);
  }
};

remove();
