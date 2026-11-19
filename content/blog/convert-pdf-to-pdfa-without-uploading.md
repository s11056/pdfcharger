---
title: How to Convert a PDF to PDF/A for Archiving Without Uploading It
description: What PDF/A is, which version to choose (1b, 2b or 3b), and how to convert documents for long-term archiving for free, without uploading them.
date: 2026-11-19
tools: [pdf-to-pdfa, flatten-pdf, remove-metadata]
---

Courts, universities, public bodies and many companies ask for documents in **PDF/A**. If you've been told to "submit the thesis as PDF/A" or "archive the contracts in PDF/A", here's what it means and how to do it for free.

## What is PDF/A?

PDF/A is an international standard version of PDF designed for **long-term archiving**. The idea is simple: a PDF/A file must look exactly the same when it's opened in 20 or 50 years, on software that doesn't exist yet.

To make that possible, PDF/A requires that a file is **self-contained**:

- **fonts are embedded**, so text never falls back to a different font;
- **colours are defined** precisely, so they display consistently;
- **nothing depends on outside content**, such as links to external files or fonts;
- **no scripts, audio or video**, which may not work in future software;
- **no encryption**, so the file can always be opened.

## Which PDF/A version should I choose?

You'll usually see three options:

| Version | Use it when |
|---|---|
| **PDF/A-1b** | The organisation specifically asks for PDF/A-1. It's the oldest and strictest; transparency isn't allowed. |
| **PDF/A-2b** | Nothing specific is requested. This is the usual recommendation: it supports transparency and better compression. |
| **PDF/A-3b** | You need to embed other files, such as the original spreadsheet or an XML invoice, inside the PDF. |

The "b" means *basic* conformance: the document is guaranteed to **look** right. That's what almost every submission portal expects.

## How to convert a PDF to PDF/A

1. Open [PDF to PDF/A](/en/tools/pdf-to-pdfa/) on [PDFCharger](/en/).
2. Drop in your PDF.
3. Choose **PDF/A-1b, 2b or 3b** (2b if unsure).
4. Convert and download.

The tool embeds fonts and flattens transparency where the chosen level requires it. Everything happens **in your browser**, which matters for the kinds of documents that get archived: contracts, case files, medical and HR records, and theses before publication.

## Before you convert

- **Fill and flatten forms first.** Interactive form fields are a common cause of problems. Use [Flatten PDF](/en/tools/flatten-pdf/) to turn them into normal page content.
- **Remove passwords.** PDF/A files can't be encrypted.
- **Tidy the metadata.** The archive will keep the title and author fields for decades, so make sure they're right, or clear what shouldn't be there with [Remove Metadata](/en/tools/remove-metadata/).

## Checking the result

Some archives and courts run the file through a formal validator when you submit it. Browser-based conversion handles typical documents well, but complex files (unusual fonts, embedded media, damaged PDFs) can occasionally need extra work. If your submission is strict, open the result in a desktop PDF reader that shows the PDF/A status, or use the portal's own checker if it has one.

## The short version

PDF/A is PDF for the long term: fonts embedded, nothing external, nothing that might stop working. Choose **PDF/A-2b** unless you're told otherwise, flatten forms first, and convert for free in your browser, without uploading the document.
