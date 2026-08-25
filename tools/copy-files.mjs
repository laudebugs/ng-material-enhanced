// Copy the files over so that they can be uploaded by the pages publish command.
import fs from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(import.meta.url), "../../");
const client = resolve(root, "dist/ng-material-enhanced/browser");
const ssr = resolve(root, "dist/ng-material-enhanced/server");
const cloudflare = resolve(root, "dist/cloudflare");
const worker = resolve(cloudflare, "_worker.js");

fs.rmSync(cloudflare, { recursive: true, force: true });
fs.mkdirSync(worker, { recursive: true });

fs.cpSync(client, cloudflare, { recursive: true });
fs.cpSync(ssr, worker, { recursive: true });

fs.renameSync(join(worker, "server.mjs"), join(worker, "index.js"));

// Replace dynamic import("xhr2") in server bundles to avoid esbuild resolution errors during Cloudflare Pages deployment
const mainServerPath = join(worker, "main.server.mjs");
if (fs.existsSync(mainServerPath)) {
  let mainServerContent = fs.readFileSync(mainServerPath, "utf8");
  mainServerContent = mainServerContent.replace(
    /import\s*\(\s*["']xhr2["']\s*\)/g,
    'Promise.resolve({ default: globalThis.XMLHttpRequest || class XMLHttpRequest {} })'
  );
  fs.writeFileSync(mainServerPath, mainServerContent, "utf8");
}


