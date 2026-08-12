/* Basis Media site — consultancy page + redirect everything else to https://basis.hk */
"use strict";

require("dotenv").config();

const path = require("path");
const express = require("express");

const PORT = Number(process.env.PORT) || 8080;
const DEST = "https://basis.hk/";
const root = __dirname;

const app = express();

app.disable("x-powered-by");

app.use(function (req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.get(["/consultancy", "/consultancy.html"], function (req, res) {
  res.setHeader("Cache-Control", "no-cache");
  res.sendFile(path.join(root, "consultancy.html"));
});

app.get(["/robots.txt", "/sitemap.xml", "/llms.txt", "/llms-full.txt", "/humans.txt", "/site.webmanifest"], function (req, res) {
  const file = req.path.replace(/^\//, "");
  const type =
    file.endsWith(".xml") ? "application/xml; charset=utf-8" :
    file.endsWith(".webmanifest") ? "application/manifest+json; charset=utf-8" :
    "text/plain; charset=utf-8";
  res.type(type);
  res.sendFile(path.join(root, file));
});

/* Static assets for the consultancy page only */
app.use("/images", express.static(path.join(root, "images"), { maxAge: "7d" }));
app.get(["/styles.css", "/main.js", "/favicon.svg", "/favicon.ico", "/favicon-32.png", "/favicon-512.png", "/apple-touch-icon.png", "/og-image.png", "/og-image.jpg"], function (req, res) {
  res.sendFile(path.join(root, req.path.replace(/^\//, "")));
});

app.use(function (req, res) {
  res.redirect(301, DEST);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Consultancy at /consultancy · all other routes → " + DEST);
});
