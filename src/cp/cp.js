import { spawn } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const scriptPath = resolve(__dirname, "files", "script.js");
  const child = spawn("node", [scriptPath, ...args]);

  process.stdin.pipe(child.stdin);

  child.stdout.pipe(process.stdout);

  child.on("exit", (code) => {
    console.log(`Дочерний процесс завершился с кодом ${code}`);
  });
};

spawnChildProcess(["arg1", "arg2"]);
