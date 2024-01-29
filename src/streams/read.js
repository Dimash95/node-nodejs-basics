import fs from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToRead = resolve(__dirname, "files", "fileToRead.txt");

const read = () => {
  const readStream = fs.createReadStream(fileToRead, { encoding: "utf8" });

  readStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  readStream.on("error", (error) => {
    console.error(`Произошла ошибка при чтении файла: ${error.message}`);
  });
};

read();
