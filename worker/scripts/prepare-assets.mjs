import { copyFile, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = fileURLToPath(new URL(".", import.meta.url));
const workerDirectory = resolve(scriptDirectory, "..");
const projectDirectory = resolve(workerDirectory, "..");
const assetDirectory = resolve(workerDirectory, ".assets");
const files = ["index.html", "style.css", "app.js", "config.js", "live-data-adapter.js"];

await rm(assetDirectory, { recursive: true, force: true });
await mkdir(assetDirectory, { recursive: true });
await Promise.all(files.map((file) => copyFile(resolve(projectDirectory, file), resolve(assetDirectory, file))));

console.log(`Prepared ${files.length} dashboard files for the private Worker.`);
