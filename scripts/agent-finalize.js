const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const nodeDir = path.dirname(process.execPath);
const pnpmJs = path.join(nodeDir, "node_modules", "corepack", "dist", "pnpm.js");

const command = fs.existsSync(pnpmJs) ? process.execPath : "pnpm";
const args = fs.existsSync(pnpmJs) ? [pnpmJs, "-r", "test"] : ["-r", "test"];

const child = spawn(command, args, {
  stdio: "inherit",
  shell: false
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
