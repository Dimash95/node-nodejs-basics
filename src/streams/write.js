import fs from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToWrite = resolve(__dirname, "files", "fileToWrite.txt"); // Замените на полный путь к файлу, если он находится в другом месте

const write = () => {
  const writeStream = fs.createWriteStream(fileToWrite, { encoding: "utf8" });

  process.stdin.pipe(writeStream);

  process.stdin.on("end", () => {
    writeStream.end();
  });

  writeStream.on("finish", () => {
    console.log("Данные успешно записаны в файл.");
  });

  writeStream.on("error", (error) => {
    console.error(`Произошла ошибка при записи в файл: ${error.message}`);
  });
};

write();

console.log("Введите текст (Ctrl+D для завершения, Ctrl+C для выхода):");
