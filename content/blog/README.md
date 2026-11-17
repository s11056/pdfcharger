# Blog posts

Each `.md` file here is one post at `https://www.pdfcharger.com/en/blog/<file-name>/`.
The file name is the URL slug, so use lowercase words joined by hyphens.

```markdown
---
title: How to Compress a PDF Without Uploading It
description: One or two sentences for Google results, under 160 characters.
date: 2026-11-17
updated: 2026-12-01
tools: [compress-pdf, delete-pages]
draft: true
---

Post body in Markdown. Use ## for section headings (the title is the H1).
Link tools as [Compress PDF](/en/tools/compress-pdf/).
```

- `updated` is optional. Set it only when the content meaningfully changes; it feeds the sitemap `lastmod`.
- `tools` are tool ids from `src/config/tools.ts`, shown as cards under the post.
- `draft: true` shows the post in `npm run dev` only. Production builds need at least one non-draft post.
- The blog is English-only on purpose. Translate a post only once it ranks.
