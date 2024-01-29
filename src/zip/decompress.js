import fs from "fs";
import zlib from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";

import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compressedFile = resolve(__dirname, "files", "archive.gz");
const decompressedFile = resolve(__dirname, "files", "fileToCompress.txt");

const decompress = async () => {
  const gunzip = zlib.createGunzip();
  const source = fs.createReadStream(compressedFile);
  const destination = fs.createWriteStream(decompressedFile);

  const pipe = promisify(pipeline);

  try {
    await pipe(source, gunzip, destination);
    console.log("Файл успешно декомпрессирован");
  } catch (error) {
    console.error("Ошибка при декомпрессии файла:", error);
  }
};

decompress();
