---
title: How to See and Remove Hidden Metadata from a PDF
description: PDFs can reveal your name, software, edit dates and old versions of the text. How to check what a PDF says about you and remove it, free and privately.
date: 2026-11-19
tools: [view-metadata, remove-metadata, deep-sanitize, sanitize-pdf]
---

Before you send a CV, publish a report or share a contract, it's worth asking: **what does this PDF say that I can't see?** Most PDFs carry hidden information, and some of it can be embarrassing or sensitive.

## What hidden information can a PDF contain?

- **Document properties:** author name, title, subject and keywords. These are often filled in automatically from your computer's user name or an old template.
- **Software and dates:** which program created the file, and exactly when it was created and last changed.
- **XMP metadata:** a more detailed block that can include editing history and identifiers.
- **Earlier versions:** when a PDF is edited, many programs add the changes to the end of the file instead of rewriting it, so **deleted text can still be inside**.
- **Hidden layers:** content that isn't visible but is still in the file.
- **Comments, attachments and scripts** that a viewer may not show by default.

Real-world leaks happen this way: a report "anonymised" on screen still names its author in the properties; a contract shows which earlier draft it came from; a CV reveals it was built from a colleague's template.

## Step 1: See what's there

Open [View Metadata](/en/tools/view-metadata/) on [PDFCharger](/en/) and drop in your PDF. It lists the author, title, subject, keywords, creator software, and creation and modification dates. It's a quick check before anything leaves your hands.

## Step 2: Remove it

Pick the tool that matches how careful you need to be:

| Tool | What it removes | Use it for |
|---|---|---|
| [Remove Metadata](/en/tools/remove-metadata/) | Document properties: author, title, dates, software | Everyday sharing, such as CVs and quotes |
| [Sanitize PDF](/en/tools/sanitize-pdf/) | Metadata plus scripts, attachments, comments and other hidden content | Documents for public release |
| [Deep Metadata Sanitizer](/en/tools/deep-sanitize/) | XMP metadata, editing caches, hidden layers, and earlier versions left inside the file | Sensitive documents where leftovers must not survive |

If you only want to **change** the details rather than delete them, for example to put your company name as author, use [Edit Metadata](/en/tools/edit-metadata/).

## Metadata isn't the only leak

- **Redaction:** drawing black boxes over text doesn't delete it. Use proper redaction; here's [how to redact a PDF properly](/en/blog/how-to-redact-a-pdf-properly/).
- **Scanned ID documents:** add a watermark that says who the copy is for. See [is it safe to upload your ID to a PDF website?](/en/blog/is-it-safe-to-upload-your-id-to-a-pdf-website/)

## Why do this in your browser?

Uploading a sensitive document to a website in order to remove its sensitive information rather defeats the purpose. PDFCharger's metadata tools run **on your own device**: the file is never uploaded, and it's free.

## A simple habit

Before sending anything important:

1. check it with View Metadata;
2. remove or correct what shouldn't be there;
3. for public or sensitive documents, run Sanitize or Deep Sanitize as the last step.

## The short version

PDFs carry hidden names, dates, software details and sometimes old versions of the text. Check them with View Metadata, and remove them with Remove Metadata, Sanitize PDF or the Deep Metadata Sanitizer, free and without uploading.
