import { Transform } from "stream";

const reverseTextTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().split("").reverse().join(""));
    callback();
  },
});

console.log("Введите текст для переворота (Ctrl+D для завершения, Ctrl+C для выхода):");

process.stdin.pipe(reverseTextTransform).pipe(process.stdout);
