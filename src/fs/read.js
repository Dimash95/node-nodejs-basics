import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToRead = resolve(__dirname, "files", "fileToRead.txt");

const read = async () => {
  try {
    const content = await fs.readFile(fileToRead, "utf8");
    console.log(content);
  } catch (error) {
    console.error("FS operation failed: " + error.message);
  }
};

read();
