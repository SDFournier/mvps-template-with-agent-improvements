const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const apiRoot = path.join(repoRoot, "apps", "api", "src");
const webApiFile = path.join(repoRoot, "apps", "web", "lib", "api.ts");
const webIndexFile = path.join(repoRoot, "apps", "web", "pages", "index.tsx");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function extractString(value) {
  if (!value) {
    return "";
  }
  const match = value.match(/["'`]([^"'`]+)["'`]/);
  return match ? match[1] : "";
}

function normalizePath(value) {
  if (!value) {
    return "";
  }
  let normalized = value.replace(/\/{2,}/g, "/");
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

function joinPaths(base, leaf) {
  if (!base && !leaf) {
    return "";
  }
  const trimmedBase = base ? base.replace(/^\/|\/$/g, "") : "";
  const trimmedLeaf = leaf ? leaf.replace(/^\/|\/$/g, "") : "";
  const parts = [trimmedBase, trimmedLeaf].filter(Boolean);
  return normalizePath(parts.join("/"));
}

function collectApiRoutes() {
  const controllerFiles = walk(apiRoot).filter((file) =>
    file.endsWith(".controller.ts")
  );

  const routes = new Set();
  const controllerRegex = /@Controller\(([^)]*)\)/;
  const methodRegex = /@(Get|Post|Patch|Delete)\(([^)]*)\)/g;

  for (const file of controllerFiles) {
    const content = fs.readFileSync(file, "utf8");
    const controllerMatch = content.match(controllerRegex);
    const basePath = extractString(controllerMatch && controllerMatch[1]);

    let match;
    while ((match = methodRegex.exec(content)) !== null) {
      const methodPath = extractString(match[2]);
      const fullPath = joinPaths(basePath, methodPath);
      if (fullPath) {
        routes.add(fullPath);
      }
    }
  }

  return Array.from(routes);
}

function normalizeWebPath(raw) {
  if (!raw) {
    return "";
  }
  let value = raw;
  value = value.replace(/\/\$\{[^}]+\}/g, "/:param");
  value = value.replace(/\$\{[^}]+\}/g, "");
  const withoutQuery = value.split("?")[0];
  return normalizePath(withoutQuery);
}

function collectWebPaths() {
  const files = [webApiFile, webIndexFile].filter((file) =>
    fs.existsSync(file)
  );
  const paths = new Set();

  const requestRegex = /request(?:<[^>]+>)?\(\s*([`'"])([^`'"]+)\1/g;
  const fetchRegex = /fetch\(\s*([`'"])([^`'"]+)\1/g;

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    let match;

    while ((match = requestRegex.exec(content)) !== null) {
      const normalized = normalizeWebPath(match[2]);
      if (normalized) {
        paths.add(normalized);
      }
    }

    while ((match = fetchRegex.exec(content)) !== null) {
      const normalized = normalizeWebPath(match[2]);
      if (normalized) {
        paths.add(normalized);
      }
    }
  }

  return Array.from(paths);
}

function routeToRegex(route) {
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const withParams = escaped.replace(/:[^/]+/g, "[^/]+");
  return new RegExp(`^${withParams}$`);
}

function matchesRoute(pathValue, routes) {
  for (const route of routes) {
    const regex = routeToRegex(route);
    if (regex.test(pathValue)) {
      return true;
    }
  }
  return false;
}

const apiRoutes = collectApiRoutes();
const webPaths = collectWebPaths();

if (apiRoutes.length === 0 && webPaths.length === 0) {
  console.log("Cross-project contract check skipped (no routes detected).");
  process.exit(0);
}

if (apiRoutes.length === 0 && webPaths.length > 0) {
  console.error("Cross-project contract check failed.");
  console.error("No API routes detected, but web paths exist.");
  process.exit(1);
}

const missing = webPaths.filter((webPath) => !matchesRoute(webPath, apiRoutes));

if (missing.length > 0) {
  console.error("Cross-project contract check failed.");
  console.error("Missing API routes for web paths:");
  for (const pathValue of missing) {
    console.error(`- ${pathValue}`);
  }
  process.exit(1);
}

console.log("Cross-project contract check passed.");
console.log(`API routes detected: ${apiRoutes.length}`);
console.log(`Web paths detected: ${webPaths.length}`);
