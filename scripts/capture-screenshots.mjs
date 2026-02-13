import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const PORT = Number(process.env.SCREENSHOT_PORT || 4020);
const BASE_URL = `http://127.0.0.1:${PORT}`;
const ROUTES = [
  "/",
  "/personal-training",
  "/about-us",
  "/contact-us-about-fitness",
  "/fitnessblog",
];
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 1024, height: 1366 },
  { name: "mobile", width: 390, height: 844 },
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const res = await fetch(`${BASE_URL}/`);
      if (res.ok) return;
    } catch {
      // retry
    }
    await wait(300);
  }
  throw new Error("Timed out waiting for next start");
}

function slugifyRoute(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replaceAll("/", "-");
}

async function revealScrollAnimations(page) {
  const maxScroll = await page.evaluate(() => Math.max(0, document.body.scrollHeight - window.innerHeight));
  const step = 520;

  for (let y = 0; y <= maxScroll; y += step) {
    await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
    await wait(120);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(1200);
}

async function main() {
  const stamp = new Date().toISOString().replace(/[.:]/g, "-");
  const outputDir = path.resolve("artifacts", "screenshots", stamp);
  fs.mkdirSync(outputDir, { recursive: true });

  const server = spawn("npm", ["run", "start", "--", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env },
  });

  let serverLog = "";
  server.stdout.on("data", (chunk) => {
    serverLog += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    serverLog += chunk.toString();
  });

  try {
    await waitForServer();

    const { chromium } = await import("playwright");
    const browser = await chromium.launch();

    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();

      for (const route of ROUTES) {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
        await wait(350);
        await revealScrollAnimations(page);

        const fileName = `${viewport.name}-${slugifyRoute(route)}.png`;
        const filePath = path.join(outputDir, fileName);
        await page.screenshot({ path: filePath, fullPage: true });
        process.stdout.write(`Saved ${fileName}\n`);
      }

      await context.close();
    }

    await browser.close();
    process.stdout.write(`Screenshots complete: ${outputDir}\n`);
  } catch (error) {
    process.stderr.write(`Screenshot workflow failed: ${error instanceof Error ? error.message : String(error)}\n`);
    process.stderr.write("Tip: if browsers are missing, run `npx playwright install chromium`.\n");
    process.stderr.write(serverLog);
    process.exitCode = 1;
  } finally {
    server.kill("SIGTERM");
  }
}

await main();
