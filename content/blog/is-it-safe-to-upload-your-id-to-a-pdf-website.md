---
title: Is It Safe to Upload Your Passport or ID to a PDF Website?
description: Before you upload a scan of your passport or ID card to a free PDF site, read this. The real risks, what to check, and a safer way to prepare ID copies.
date: 2026-11-17
tools: [passport-id-composer, encrypt-pdf, redact-pdf]
---

Opening a bank account, starting a new job, renting a flat, applying for a visa: sooner or later someone asks for "a copy of your ID, front and back, on one page, as a PDF." So you photograph your card, search for a free online PDF tool, upload both photos, and download the result.

It's a perfectly normal thing to do. But a copy of your identity document is one of the most valuable things you'll ever send over the internet. It's worth knowing where those images go.

## What happens when you upload an ID to a PDF website

Most online PDF tools process files on their own servers. When you upload your ID photos:

1. **The images travel to the service's servers**, often in another country.
2. **They're stored there while the PDF is made**, and frequently for some time afterwards. Many services keep files for an hour, some for a day or more, and their privacy policies decide what happens next.
3. **Copies may end up in backups and logs** you'll never see.

Most services are run responsibly. But every place your ID is stored is another place it could leak from, through a data breach, a misconfigured storage bucket, or an employee with too much access. And unlike a password, you can't change your passport number or your face.

## Why a leaked ID copy matters

A clear scan of an identity document has everything a fraudster needs to pretend to be you: your full name, date of birth, photo, document number, nationality and often your address and signature. With it, criminals may try to:

- open bank accounts or credit lines in your name;
- pass the "upload your ID" step on websites and apps;
- rent property, buy phone contracts or register companies;
- make fake documents more convincing.

You might not find out until debt collectors call. That's why identity copies deserve more care than an ordinary document.

## Five questions to ask before you upload anything

1. **Is the file processed on my device or on their server?** Look for a clear statement on the tool's page or in its privacy policy. If it isn't clear, assume your file is uploaded.
2. **How long do they keep it?** "Deleted after one hour" is better than silence, but "never uploaded" is better still.
3. **Who runs the site?** Is there a company name, a privacy policy and a way to contact them? Anonymous sites are a gamble.
4. **Do I need an account?** Signing up links your ID to your email address on their system.
5. **Can I check what it does?** Open-source tools let anyone inspect the code, and you can test any website yourself (see below).

## A safer way: prepare ID copies in your browser

You don't need to upload anything to put both sides of an ID card on one page. [PDFCharger's Double-Sided ID Composer](/en/tools/passport-id-composer/) does it inside your browser, so the images never leave your device:

1. **Take clear photos of the front and back** of your card, in good light and without glare. Crop each photo to the edges of the card first.
2. **Open the [ID Composer](/en/tools/passport-id-composer/)** and add both images. JPG, PNG and PDF files all work.
3. **Add a watermark** (more on this below).
4. **Create the PDF and download it.** You get a single A4 page with the front above the back, each placed at the real size of a standard ID card (85.6 × 54 mm), so it prints correctly too.

Want proof that nothing is uploaded? Open your browser's Developer Tools, go to the Network tab and watch while you create the PDF. Our guide to [compressing a PDF without uploading it](/en/blog/compress-pdf-without-uploading/) walks through this check step by step.

## Always watermark your ID copies

A watermark is the simplest way to make a stolen copy far less useful. Write *who* the copy is for, *why*, and *when*, for example:

> Copy for flat rental application only - 17/11/2026

If that copy turns up anywhere else, it's obviously been misused, and it's much harder to pass off as a fresh scan for something new. The ID Composer repeats your text diagonally across the whole page at low opacity (15%), so every part of the document is covered while the details stay readable.

Keep the text short, and use plain Latin letters and numbers.

## Share only what's needed

- **Ask whether they need both sides.** Sometimes only the photo side is required.
- **Cover what they don't need.** If the organisation confirms it doesn't need a particular detail, black it out properly with [Redact PDF](/en/tools/redact-pdf/), which removes the content rather than just covering it. (Our guide on [how to redact a PDF properly](/en/blog/how-to-redact-a-pdf-properly/) explains why that difference matters.) Some organisations, especially banks, are required to see the complete document, so check first.
- **Password-protect the file before emailing it.** [Encrypt PDF](/en/tools/encrypt-pdf/) adds 256-bit AES encryption in your browser. Send the password by a different route, such as a text message or a phone call, never in the same email.

## Clean up afterwards

Your ID copy now probably exists in several places you'll forget about:

- your phone's camera roll and its cloud photo backup;
- your Downloads folder;
- your email's Sent folder;
- any messaging app you used to send it.

Delete the copies you don't need once the application is done. The fewer copies exist, the fewer can leak.

## The short version

Uploading your ID to a free PDF website isn't automatically dangerous, but it puts one of your most sensitive documents on someone else's computer. You can avoid that entirely:

- Create ID copies in your browser with the [ID Composer](/en/tools/passport-id-composer/), so nothing is uploaded.
- Watermark every copy with who it's for, why, and the date.
- Share only what's needed, and password-protect the file.
- Delete stray copies when you're done.
