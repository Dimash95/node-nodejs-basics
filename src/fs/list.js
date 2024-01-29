import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filesFolder = resolve(__dirname, "files");

const list = async () => {
  try {
    const files = await fs.readdir(filesFolder);
    console.log(files);
  } catch (error) {
    console.error("FS operation failed: " + error.message);
  }
};

list();
