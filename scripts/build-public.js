/* Copy site assets into public/ for DigitalOcean static builds */
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const out = path.join(root, "public");

const FILES = [
  "index.html",
  "about.html",
  "work.html",
  "journal.html",
  "contact.html",
  "styles.css",
  "main.js",
  "i18n.js",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "llms-full.txt",
  "humans.txt",
  "site.webmanifest",
  "og-image.jpg",
  "favicon.svg",
  "favicon.ico",
  "favicon-32.png",
  "favicon-512.png",
  "apple-touch-icon.png",
  "work-1.jpg",
  "work-2.jpg",
  "work-3.jpg",
  "work-4.jpg"
];

const DIRS = ["clients", "work"];

function rmrf(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else if (entry.isFile()) copyFile(from, to);
  }
}

rmrf(out);
ensureDir(out);

for (const file of FILES) {
  const src = path.join(root, file);
  if (!fs.existsSync(src)) {
    console.warn("skip missing", file);
    continue;
  }
  copyFile(src, path.join(out, file));
}

for (const dir of DIRS) {
  const src = path.join(root, dir);
  if (!fs.existsSync(src)) continue;
  copyDir(src, path.join(out, dir));
}

console.log("Built static site → public/");
