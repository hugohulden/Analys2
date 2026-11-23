// Genererar lösningsfigurer (SVG) och appikoner (PNG via Playwright/Chromium).
// Kör: node scripts/make-figures.mjs
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const fig = join(pub, 'figurer')
mkdirSync(fig, { recursive: true })

/** Komplext talplan med rutnät. Enheter → pixlar. */
function plane({ min = -4, max = 4, size = 320, extra = '' }) {
  const s = size / (max - min)
  const X = (x) => (x - min) * s
  const Y = (y) => (max - y) * s
  let g = ''
  for (let i = Math.ceil(min); i <= max; i++) {
    g += `<line x1="${X(i)}" y1="0" x2="${X(i)}" y2="${size}" stroke="#ddd"/>`
    g += `<line x1="0" y1="${Y(i)}" x2="${size}" y2="${Y(i)}" stroke="#ddd"/>`
  }
  g += `<line x1="0" y1="${Y(0)}" x2="${size}" y2="${Y(0)}" stroke="#222" marker-end="url(#a)"/>`
  g += `<line x1="${X(0)}" y1="${size}" x2="${X(0)}" y2="0" stroke="#222" marker-end="url(#a)"/>`
  g += `<text x="${size - 22}" y="${Y(0) - 6}" font-size="13">Re</text><text x="${X(0) + 6}" y="14" font-size="13">Im</text>`
  g += `<text x="${X(1) - 3}" y="${Y(0) + 15}" font-size="11">1</text><text x="${X(0) - 12}" y="${Y(1) + 4}" font-size="11">i</text>`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" font-family="serif">
<defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="#222"/></marker></defs>
<rect width="100%" height="100%" fill="#fff"/>${g}${extra({ X, Y, s })}</svg>`
  return svg
}

const dot = (X, Y, x, y, label, dx = 6, dy = -6, color = '#1f5fa8') =>
  `<circle cx="${X(x)}" cy="${Y(y)}" r="4.5" fill="${color}"/><text x="${X(x) + dx}" y="${Y(y) + dy}" font-size="13" fill="${color}">${label}</text>`

// ht24 #2: z^3 = 27i
writeFileSync(
  join(fig, 'losning-ht24-2.svg'),
  plane({
    min: -4, max: 4,
    extra: ({ X, Y, s }) => {
      const r3 = (3 * Math.sqrt(3)) / 2
      return `<circle cx="${X(0)}" cy="${Y(0)}" r="${3 * s}" fill="none" stroke="#1f5fa8" stroke-dasharray="4 3"/>` +
        dot(X, Y, r3, 1.5, 'z₀ = 3√3/2 + 3i/2') .replace('x="', 'x="') +
        dot(X, Y, -r3, 1.5, 'z₁', -22, -6) +
        dot(X, Y, 0, -3, 'z₂ = −3i', 6, 14) +
        `<text x="${X(2.2)}" y="${Y(-2.6)}" font-size="12" fill="#555">|z| = 3</text>`
    },
  }).replace('z₀ = 3√3/2 + 3i/2</text>', 'z₀</text>'),
)

// ht24 #4a: |z − (1 − i)| ≤ 3
writeFileSync(
  join(fig, 'losning-ht24-4a.svg'),
  plane({
    min: -3, max: 5, size: 320,
    extra: ({ X, Y, s }) =>
      `<circle cx="${X(1)}" cy="${Y(-1)}" r="${3 * s}" fill="rgba(31,95,168,0.18)" stroke="#1f5fa8" stroke-width="2"/>` +
      dot(X, Y, 1, -1, '1 − i', 6, 14) +
      `<line x1="${X(1)}" y1="${Y(-1)}" x2="${X(4)}" y2="${Y(-1)}" stroke="#1f5fa8"/><text x="${X(2.3)}" y="${Y(-1) - 5}" font-size="12" fill="#1f5fa8">r = 3</text>`,
  }).replace(/viewBox="0 0 320 320"/, 'viewBox="0 0 320 320"'),
)

// ht25 #2b: u, w, u^40 w^3
writeFileSync(
  join(fig, 'losning-ht25-2b.svg'),
  plane({
    min: -3.5, max: 3.5,
    extra: ({ X, Y, s }) => {
      const p = (r, a) => [r * Math.cos(a), r * Math.sin(a)]
      const [ux, uy] = p(1, Math.PI / 6)
      const [wx, wy] = p(Math.SQRT2, Math.PI / 3)
      const [zx, zy] = p(2 * Math.SQRT2, (5 * Math.PI) / 3)
      return `<circle cx="${X(0)}" cy="${Y(0)}" r="${s}" fill="none" stroke="#bbb" stroke-dasharray="3 3"/>` +
        `<line x1="${X(0)}" y1="${Y(0)}" x2="${X(zx)}" y2="${Y(zy)}" stroke="#b42318" stroke-dasharray="4 3"/>` +
        dot(X, Y, ux, uy, 'u', 6, 4) + dot(X, Y, wx, wy, 'w', 6, -4) + dot(X, Y, zx, zy, 'u⁴⁰w³', 6, 4, '#b42318')
    },
  }),
)

// Ikon: integraltecken på blå bakgrund
const icon = (pad) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="${pad ? 0 : 96}" fill="#1f5fa8"/>
<text x="256" y="${pad ? 330 : 345}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="${pad ? 240 : 300}" fill="#fff">∫</text>
<text x="${pad ? 330 : 350}" y="${pad ? 350 : 380}" font-family="Georgia, serif" font-size="${pad ? 70 : 90}" font-weight="bold" fill="#ffd166">2</text></svg>`
writeFileSync(join(pub, 'favicon.svg'), icon(false))
writeFileSync(join(pub, 'icon-maskable.svg'), icon(true))

const { createRequire } = await import('node:module')
const { chromium } = createRequire(import.meta.url)('playwright')
const browser = await chromium.launch()
const page = await browser.newPage()
for (const [file, src, size] of [
  ['pwa-192.png', icon(false), 192],
  ['pwa-512.png', icon(false), 512],
  ['pwa-maskable-512.png', icon(true), 512],
  ['apple-touch-icon.png', icon(true), 180],
]) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(`<html><body style="margin:0;background:transparent">${src.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`)
  await page.screenshot({ path: join(pub, file), omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } })
}
await browser.close()
console.log('Figurer och ikoner skapade.')
