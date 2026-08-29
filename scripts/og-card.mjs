/**
 * Regenerates public/assets/og-card.png — the image LinkedIn, Slack and
 * WhatsApp show when someone shares the site.
 *
 * The card lives in scripts/og-card.html and is styled to match the landing
 * page's dictionary entry. It pulls the site's self-hosted webfonts by
 * absolute path, so the dev server has to be up:
 *
 *   npm run dev
 *   node scripts/og-card.mjs
 *
 * Playwright's browser is needed once: npx playwright install chromium
 */
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, '../public/assets/og-card.png');
const origin = process.env.ORIGIN ?? 'http://localhost:4321';

const html = await readFile(resolve(here, 'og-card.html'), 'utf8');

const browser = await chromium.launch();
const page = await browser.newPage({
	viewport: { width: 1200, height: 630 },
	deviceScaleFactor: 2,
});

// A <base> makes the card's absolute /fonts/… URLs resolve against the dev server.
await page.setContent(`<base href="${origin}/">\n${html}`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out });
await browser.close();

console.log(`wrote ${out}`);
