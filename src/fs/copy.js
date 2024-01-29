import { promises as fs, constants } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceFolder = resolve(__dirname, "files");
const destinationFolder = resolve(__dirname, "files_copy");

const copyDirectory = async (source, destination) => {
  await fs.mkdir(destination, { recursive: true });

  const entries = await fs.readdir(source, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = join(source, entry.name);
    const destPath = join(destination, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
};

const copyFiles = async () => {
  try {
    await fs.access(sourceFolder, constants.F_OK);
    try {
      await fs.access(destinationFolder, constants.F_OK);
      throw new Error("FS operation failed: Destination folder already exists");
    } catch {
      await copyDirectory(sourceFolder, destinationFolder);
      console.log("Folder successfully copied");
    }
  } catch (error) {
    console.error("FS operation failed: " + error.message);
  }
};

copyFiles();
