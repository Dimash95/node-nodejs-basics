import fs from "fs";
import zlib from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToCompress = resolve(__dirname, "files", "fileToCompress.txt");
const compressedFile = resolve(__dirname, "files", "archive.gz");

const compress = async () => {
  const gzip = zlib.createGzip();
  const source = fs.createReadStream(fileToCompress);
  const destination = fs.createWriteStream(compressedFile);

  const pipe = promisify(pipeline);

  try {
    await pipe(source, gzip, destination);
    console.log("Файл успешно сжат");
  } catch (error) {
    console.error("Ошибка при сжатии файла:", error);
  }
};

compress();
