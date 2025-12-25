const { spawn } = require("child_process");
const lines = [
  "Starting services (expected):",
  "- Web (Next): http://localhost:3000",
  "- API (Nest): http://localhost:3001/health",
  "- MySQL (Docker): localhost:3307",
  "- Redis (Docker): localhost:6378",
  ""
];

process.stdout.write(`${lines.join("\n")}\n`);

const path = require("path");
const concurrentlyBin = path.join(
  __dirname,
  "..",
  "node_modules",
  "concurrently",
  "dist",
  "bin",
  "concurrently.js"
);

const env = { ...process.env };
const existingOptions = env.NODE_OPTIONS ? `${env.NODE_OPTIONS} ` : "";
env.NODE_OPTIONS = `${existingOptions}--no-deprecation`.trim();

if (env.PATH) {
  const parts = env.PATH.split(path.delimiter);
  env.PATH = parts
    .filter((entry) => !entry.toLowerCase().includes("node_modules\\.bin"))
    .join(path.delimiter);
}

const args = [
  "-n",
  "web,api",
  "-c",
  "blue,green",
  "pnpm --filter @repo/web dev",
  "pnpm --filter @repo/api dev"
];

const child = spawn(process.execPath, [concurrentlyBin, ...args], {
  stdio: "inherit",
  env
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
