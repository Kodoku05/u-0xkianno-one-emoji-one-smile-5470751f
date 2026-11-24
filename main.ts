import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One emoji, one smile: a single beaming face with smiling eyes.
// The entry text lives in entry.txt at the repo root; this program only
// validates it and copies its exact bytes to the output directory.
const repoRoot = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const raw = await readFile(join(repoRoot, "entry.txt"), "utf8");
const text = raw.trim();
if ([...text].length !== 1) {
  throw new Error("entry.txt must hold exactly one character");
}
if (text.trim().length === 0) {
  throw new Error("entry.txt must not be only whitespace");
}
if (Buffer.byteLength(text, "utf8") > 8) {
  throw new Error("entry.txt must be at most 8 bytes");
}

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, "entry.txt"), text, "utf8");
