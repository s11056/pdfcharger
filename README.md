# PDFCharger

**Every PDF tool you need, supercharged.** Merge, split, compress, convert, edit and sign PDFs right in the browser — free, fast and private.

🌐 **Live site:** [pdfcharger.com](https://pdfcharger.com)

PDFCharger processes files entirely on the user's device using WebAssembly. Documents are never uploaded to a server.

## Features

- **130+ PDF tools** in six colour-coded categories: Organize & Manage, Optimize & Repair, Convert to PDF, Convert from PDF, Edit & Annotate, Secure PDF
- **Drop-anywhere homepage**: drop a file on the hero and PDFCharger suggests the right tools; the file carries over into the tool you pick
- **PDF Studio** and a visual **Workflow** editor for chaining tools
- **18 languages** with English fallback for any untranslated string
- Light and dark themes, fully responsive down to 375px

## Tech stack

Next.js 15 (static export) · React 19 · TypeScript · Tailwind CSS 4 · next-intl · pdf-lib · PDF.js · qpdf / PyMuPDF / LibreOffice compiled to WebAssembly

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script | What it does |
|---|---|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Static export to `out/` |
| `npm test` | Vitest test suite |
| `npm run lint` | ESLint |

## Project layout (UI)

| Path | Purpose |
|---|---|
| `src/app/globals.css` | Design tokens (brand gradient, category colours, light/dark) |
| `src/config/categories.ts` | Category order, colours, icons |
| `src/config/site.ts` | Site name, URL, links |
| `src/components/brand/Logo.tsx` | Logo mark and wordmark |
| `src/components/layout/` | Header (mega menu, search palette, mobile drawer) and footer |
| `src/app/[locale]/HomePageClient.tsx` | Homepage |
| `src/components/tools/ToolPage.tsx` | Shared layout for every tool page |
| `src/components/tools/ToolCard.tsx`, `ToolGrid.tsx` | Tool tiles |
| `messages/*.json` | UI strings per language |

## Deployment

The site is a static export (`output: 'export'`), so it can be hosted on any static host. Build with `npm run build` and deploy the `out/` directory. Ready-made configs are included for Vercel (`vercel.json`), Netlify (`netlify.toml`), Cloudflare Pages (`public/_headers`), Docker + Nginx and Apache. See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

The hosting must serve the cross-origin isolation headers from `public/_headers` (COOP/COEP) and the `application/wasm` MIME type for the WebAssembly tools to work.

## Credits and licence

PDFCharger ([github.com/s11056/pdfcharger](https://github.com/s11056/pdfcharger)) is a fork of [PDFCraft](https://github.com/PDFCraftTool/pdfcraft) by the PDFCraft Team, which itself builds on [BentoPDF](https://github.com/alam00000/bentopdf). The PDF processing engine comes from those projects; PDFCharger adds a redesigned interface and branding.

Licensed under the **GNU Affero General Public License v3.0**; see [LICENSE](LICENSE). Because the site is offered over a network, the AGPL requires that users of pdfcharger.com can obtain the complete corresponding source code. The site footer links to this repository for that reason, so keep the repository public and up to date with what is deployed.
