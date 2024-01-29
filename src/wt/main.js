import { Worker } from "worker_threads";
import os from "os";

const performCalculations = async () => {
  const numCores = os.cpus().length;
  const promises = [];

  for (let i = 0; i < numCores; i++) {
    const workerPromise = new Promise((resolve, reject) => {
      const worker = new Worker("./src/wt/worker.js");
      worker.postMessage(10 + i);

      worker.on("message", (result) => {
        resolve(result);
      });

      worker.on("error", (err) => {
        console.error(`Ошибка в рабочем потоке: ${err}`);
        resolve({ status: "error", data: null });
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          console.error(`Worker остановлен с кодом выхода ${code}`);
          resolve({ status: "error", data: null });
        }
      });
    });

    promises.push(workerPromise);
  }

  const results = await Promise.all(promises);
  console.log(results);
};

await performCalculations();
