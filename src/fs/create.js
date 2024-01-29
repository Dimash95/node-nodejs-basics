import { promises as fs } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = resolve(__dirname, "files", "fresh.txt");

const create = async () => {
  try {
    await fs.access(filePath);
    console.error("FS operation failed");
  } catch (error) {
    try {
      await fs.writeFile(filePath, "I am fresh and young");
      console.log("File successfully written!");
    } catch (writeError) {
      console.error("FS operation failed: " + writeError.message);
    }
  }
};

create().catch((error) => {
  console.error(error.message);
});
