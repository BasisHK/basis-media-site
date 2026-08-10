/* Basis Media — static site + Mailtrap contact API */
"use strict";

require("dotenv").config();

const path = require("path");
const express = require("express");

const PORT = Number(process.env.PORT) || 8080;
const TOKEN = process.env.MAILTRAP_API_TOKEN || "";
const FROM_EMAIL = process.env.MAILTRAP_FROM_EMAIL || "business@basis.hk";
const FROM_NAME = process.env.MAILTRAP_FROM_NAME || "Basis Media";
const TO_EMAIL = process.env.MAILTRAP_TO_EMAIL || "business@basis.hk";
const MAILTRAP_URL = "https://send.api.mailtrap.io/api/send";

const app = express();
const root = __dirname;

app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: false, limit: "32kb" }));

app.use(function (req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

app.get("/robots.txt", function (req, res) {
  res.type("text/plain; charset=utf-8");
  res.sendFile(path.join(root, "robots.txt"));
});
app.get("/sitemap.xml", function (req, res) {
  res.type("application/xml; charset=utf-8");
  res.sendFile(path.join(root, "sitemap.xml"));
});
app.get("/llms.txt", function (req, res) {
  res.type("text/plain; charset=utf-8");
  res.sendFile(path.join(root, "llms.txt"));
});
app.get("/llms-full.txt", function (req, res) {
  res.type("text/plain; charset=utf-8");
  res.sendFile(path.join(root, "llms-full.txt"));
});
app.get("/humans.txt", function (req, res) {
  res.type("text/plain; charset=utf-8");
  res.sendFile(path.join(root, "humans.txt"));
});
app.get("/site.webmanifest", function (req, res) {
  res.type("application/manifest+json; charset=utf-8");
  res.sendFile(path.join(root, "site.webmanifest"));
});

/* Simple in-memory rate limit: 5 requests / IP / 10 minutes */
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const max = 5;
  const entry = hits.get(ip) || { count: 0, start: now };
  if (now - entry.start > windowMs) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  hits.set(ip, entry);
  return entry.count > max;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

app.post("/api/contact", async (req, res) => {
  try {
    if (!TOKEN) {
      return res.status(500).json({ ok: false, error: "Mailtrap is not configured." });
    }

    const ip = req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() || req.socket.remoteAddress || "unknown";
    if (rateLimited(ip)) {
      return res.status(429).json({ ok: false, error: "Too many requests. Please try again later." });
    }

    const body = req.body || {};
    // Honeypot — bots fill this; humans never see it
    if (body.website || body.company_url) {
      return res.json({ ok: true });
    }

    const name = String(body.name || "").trim().slice(0, 120);
    const email = String(body.email || "").trim().slice(0, 180);
    const brand = String(body.brand || "").trim().slice(0, 160);
    const brief = String(body.brief || "").trim().slice(0, 5000);

    if (!name || !email || !brief) {
      return res.status(400).json({ ok: false, error: "Name, email, and brief are required." });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
    }

    const subject = "Brief" + (brand ? " — " + brand : "") + " · Basis Media";
    const text =
      "New brief from the Basis Media contact form\n\n" +
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Brand: " + (brand || "—") + "\n\n" +
      brief + "\n";

    const html =
      "<h2 style=\"font-family:sans-serif;margin:0 0 12px\">New brief</h2>" +
      "<p style=\"font-family:sans-serif;margin:0 0 8px\"><strong>Name:</strong> " + escapeHtml(name) + "</p>" +
      "<p style=\"font-family:sans-serif;margin:0 0 8px\"><strong>Email:</strong> " + escapeHtml(email) + "</p>" +
      "<p style=\"font-family:sans-serif;margin:0 0 16px\"><strong>Brand:</strong> " + escapeHtml(brand || "—") + "</p>" +
      "<p style=\"font-family:sans-serif;white-space:pre-wrap;margin:0\">" + escapeHtml(brief) + "</p>";

    const payload = {
      from: { email: FROM_EMAIL, name: FROM_NAME },
      to: [{ email: TO_EMAIL }],
      reply_to: { email, name },
      subject,
      text,
      html,
      category: "Contact Form"
    };

    const mtRes = await fetch(MAILTRAP_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + TOKEN,
        "Content-Type": "application/json",
        "User-Agent": "BasisMediaContact/1.0"
      },
      body: JSON.stringify(payload)
    });

    const mtBody = await mtRes.json().catch(() => ({}));
    if (!mtRes.ok || mtBody.success === false) {
      console.error("Mailtrap error", mtRes.status, mtBody);
      return res.status(502).json({
        ok: false,
        error: "Could not send the brief. Please email business@basis.hk directly."
      });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error("Contact API error", err);
    return res.status(500).json({
      ok: false,
      error: "Something went wrong. Please email business@basis.hk directly."
    });
  }
});

app.use(express.static(root, {
  extensions: ["html"],
  setHeaders(res, filePath) {
    if (filePath.endsWith(".html")) {
      res.setHeader("Cache-Control", "no-cache");
    } else if (/\.(jpg|jpeg|png|webp|svg|ico)$/i.test(filePath)) {
      res.setHeader("Cache-Control", "public, max-age=604800, immutable");
    } else if (/\.(css|js)$/i.test(filePath)) {
      res.setHeader("Cache-Control", "public, max-age=86400");
    }
  }
}));

/* Keep API and known files from falling through to SPA-style index */
app.use(function (req, res) {
  res.status(404).type("text/plain").send("Not found");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Basis Media site on http://127.0.0.1:" + PORT);
  if (!TOKEN) console.warn("Warning: MAILTRAP_API_TOKEN is not set — contact form will fail.");
});
