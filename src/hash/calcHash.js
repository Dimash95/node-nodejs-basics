import fs from "fs";
import crypto from "crypto";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileToHash = resolve(__dirname, "files", "fileToCalculateHashFor.txt");

const calcHash = () => {
  const hash = crypto.createHash("sha256");
  const stream = fs.createReadStream(fileToHash);

  stream.on("data", (chunk) => {
    hash.update(chunk);
  });

  stream.on("end", () => {
    const result = hash.digest("hex");
    console.log(`SHA256 Hash: ${result}`);
  });

  stream.on("error", (err) => {
    console.error(`Error reading file: ${err.message}`);
  });
};

calcHash();
