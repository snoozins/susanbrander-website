/**
 * Generates Open Graph share cards as 1200x630 PNGs.
 *
 * These are the images social platforms show when a link is pasted. They are
 * never rendered on the site itself, so they are built ahead of time and
 * committed to `public/` rather than generated at request time.
 *
 * Run: npm run og
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const WIDTH = 1200;
const HEIGHT = 630;

/** Palette lifted from src/styles/global.css so the cards match the site. */
const COLOUR = {
  cream: '#EDE9FE',
  ink: '#1A1614',
  inkMuted: '#6B5E56',
  accent: '#7C3AED',
  accentBorder: '#9333EA',
  border: '#C4B5FD',
  surface: '#DDD6FE',
} as const;

/**
 * Fraunces is loaded from Google Fonts in the browser but is not installed
 * locally, so the card falls back to the same serif stack the site declares.
 */
const DISPLAY_STACK = 'Fraunces, Georgia, Times New Roman, serif';
const BODY_STACK = 'Inter, Helvetica Neue, Helvetica, Arial, sans-serif';

interface Card {
  /** Output path, relative to public/ */
  file: string;
  /** Large display line. Wrapped automatically. */
  title: string;
  /** Optional line under the title. */
  dek?: string;
  /** Small line at the foot of the card. */
  meta: string;
}

const CARDS: Card[] = [
  {
    file: 'og-image.png',
    title: 'Susan Brander',
    dek: 'Technical depth. Human-first leadership.',
    meta: 'CTO at Kaleida · Founder, Tech Leading Ladies',
  },
  {
    file: 'og/adaconf-2025-data-pivot.png',
    title: 'Changing the engine mid-flight',
    dek: 'A startup data pivot',
    meta: 'Susan Brander · ADAConf 2025',
  },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Greedy word wrap. Approximate rather than exact: we have no font metrics
 * here, so `perLine` is tuned by eye against the rendered output.
 */
function wrap(text: string, perLine: number): string[] {
  const lines: string[] = [];
  let current = '';

  for (const word of text.split(' ')) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > perLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);

  return lines;
}

function buildSvg(card: Card): string {
  const titleSize = 72;
  const titleLeading = 84;
  const titleLines = wrap(card.title, 24);

  // Anchor the text block so title, dek and meta stay optically centred
  // regardless of how many lines the title wraps to.
  const blockHeight = titleLines.length * titleLeading + (card.dek ? 58 : 0);
  const titleTop = Math.round((HEIGHT - blockHeight) / 2) + titleSize;

  const titleTspans = titleLines
    .map((line, i) => `<tspan x="96" dy="${i === 0 ? 0 : titleLeading}">${escapeXml(line)}</tspan>`)
    .join('');

  const dekY = titleTop + (titleLines.length - 1) * titleLeading + 62;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${COLOUR.cream}"/>

  <!-- Accent spine down the left edge -->
  <rect x="0" y="0" width="16" height="${HEIGHT}" fill="${COLOUR.accent}"/>

  <!-- Soft decorative marks, echoing the site's surface tone -->
  <circle cx="1090" cy="118" r="150" fill="${COLOUR.surface}" opacity="0.55"/>
  <circle cx="1168" cy="540" r="96" fill="${COLOUR.border}" opacity="0.4"/>

  <text
    x="96"
    y="${titleTop}"
    font-family="${DISPLAY_STACK}"
    font-size="${titleSize}"
    font-weight="600"
    fill="${COLOUR.ink}"
  >${titleTspans}</text>

  ${
    card.dek
      ? `<text x="96" y="${dekY}" font-family="${BODY_STACK}" font-size="34" fill="${COLOUR.inkMuted}">${escapeXml(card.dek)}</text>`
      : ''
  }

  <text x="96" y="${HEIGHT - 68}" font-family="${BODY_STACK}" font-size="26" font-weight="500" fill="${COLOUR.accent}">${escapeXml(card.meta)}</text>
</svg>`;
}

async function main(): Promise<void> {
  for (const card of CARDS) {
    const out = resolve(ROOT, 'public', card.file);
    await mkdir(dirname(out), { recursive: true });

    const png = await sharp(Buffer.from(buildSvg(card)))
      .png({ compressionLevel: 9 })
      .toBuffer();

    await writeFile(out, png);
    console.log(`✓ public/${card.file}  (${(png.length / 1024).toFixed(0)} KB)`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
