import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = fileURLToPath(new URL(".", import.meta.url));
const projectDirectory = resolve(scriptDirectory, "..");
const lock = JSON.parse(await readFile(resolve(projectDirectory, ".design-lock.json"), "utf8"));

let changed = false;
for (const [file, expectedHash] of Object.entries(lock.files)) {
  const contents = await readFile(resolve(projectDirectory, file));
  const actualHash = createHash("sha256").update(contents).digest("hex");
  if (actualHash !== expectedHash) {
    changed = true;
    console.error(`Design lock failed: ${file} changed.`);
  }
}

if (changed) {
  console.error("Restore the locked design file. Put personalization in config.js or live-data-adapter.js instead.");
  process.exitCode = 1;
} else {
  console.log("Design lock passed: the exact STR Mission Control design is intact.");
}
