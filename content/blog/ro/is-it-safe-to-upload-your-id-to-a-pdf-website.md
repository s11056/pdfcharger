---
title: Este Sigur să Încarci Pașaportul sau Buletinul pe un Site PDF?
description: Înainte să încarci pașaportul sau buletinul pe un site PDF gratuit, citește asta. Riscurile reale, ce să verifici și o metodă mai sigură.
date: 2026-11-19
tools: [passport-id-composer, encrypt-pdf, redact-pdf]
---

Deschiderea unui cont bancar, un job nou, închirierea unui apartament, cererea de viză: mai devreme sau mai târziu cineva îți cere „o copie a actului de identitate, față-verso, pe o singură pagină, în PDF". Fotografiezi cardul, cauți un instrument PDF gratuit, încarci cele două poze și descarci rezultatul.

E ceva cât se poate de normal. Dar copia actului tău de identitate e unul dintre cele mai valoroase lucruri pe care le trimiți pe internet. Merită să știi unde ajung acele imagini.

## Ce se întâmplă când încarci actul pe un site PDF

Majoritatea instrumentelor PDF online procesează fișierele pe propriile servere:

1. **Imaginile ajung pe serverele serviciului**, adesea în altă țară.
2. **Sunt stocate acolo cât se creează PDF-ul**, și adesea și după. Unele servicii le păstrează o oră, altele o zi sau mai mult.
3. **Copii pot ajunge în backupuri și jurnale** pe care nu le vei vedea niciodată.

Majoritatea serviciilor sunt serioase. Dar fiecare loc în care e stocat actul tău e încă un loc din care poate scăpa: un atac informatic, o stocare configurată greșit, un angajat cu prea multe drepturi. Și, spre deosebire de o parolă, nu-ți poți schimba CNP-ul sau fața.

## De ce contează o copie scursă

O scanare clară conține tot ce-i trebuie unui escroc ca să se dea drept tine: nume complet, dată de naștere, fotografie, număr de document și adesea adresa. Cu ele poate încerca să deschidă conturi sau să ia credite pe numele tău, să treacă de pasul „încarcă actul de identitate" din aplicații, să facă abonamente telefonice sau să închirieze locuințe. S-ar putea să afli abia când vin somațiile.

## Cinci întrebări înainte să încarci ceva

1. **Fișierul e procesat pe dispozitivul meu sau pe serverul lor?** Dacă nu e clar, presupune că e încărcat.
2. **Cât timp îl păstrează?** „Șters după o oră" e mai bine decât nimic, dar „niciodată încărcat" e și mai bine.
3. **Cine administrează site-ul?** Există numele firmei, politică de confidențialitate și date de contact?
4. **Am nevoie de cont?** Înregistrarea leagă actul tău de adresa ta de e-mail în sistemul lor.
5. **Pot verifica ce face?** Codul instrumentelor open source poate fi verificat de oricine.

## O metodă mai sigură: pregătește copia în browser

Nu trebuie să încarci nimic ca să pui față și verso pe o pagină. [Instrumentul de compunere a actelor din PDFCharger](/ro/tools/passport-id-composer/) lucrează în browser, deci imaginile nu-ți părăsesc dispozitivul:

1. **Fotografiază clar fața și versoul**, cu lumină bună și fără reflexii. Decupează fiecare poză pe marginile cardului.
2. **Deschide [instrumentul de compunere](/ro/tools/passport-id-composer/)** și adaugă cele două imagini. Merg JPG, PNG și PDF.
3. **Adaugă un filigran** (vezi mai jos).
4. **Creează PDF-ul și descarcă-l.** Primești o pagină A4 cu fața sus și versoul jos, fiecare la dimensiunea reală a unui card de identitate standard (85,6 × 54 mm), ca să se tipărească corect.

## Pune mereu filigran pe copii

Filigranul e cel mai simplu mod de a face o copie furată aproape inutilă. Scrie *pentru cine* e copia, *în ce scop* și *când*, de exemplu:

> Copy for apartment rental only - 19/11/2026

Dacă acea copie apare în altă parte, abuzul e evident. Instrumentul repetă textul în diagonală pe toată pagina, cu opacitate redusă (15%), acoperind totul fără să împiedice citirea.

**Atenție:** scrie un text scurt, doar cu litere latine fără diacritice și cifre.

## Împărtășește doar ce e necesar

- **Întreabă dacă au nevoie de ambele fețe.** Uneori e suficientă fața cu fotografia.
- **Ascunde ce nu e necesar.** Dacă instituția confirmă că nu are nevoie de o informație, elimin-o cu adevărat cu [Anonimizează PDF](/ro/tools/redact-pdf/), nu doar acoperind-o cu un dreptunghi. Unele instituții, mai ales băncile, trebuie să vadă documentul complet, așa că întreabă înainte.
- **Pune parolă pe fișier înainte să-l trimiți pe e-mail.** [Criptează PDF](/ro/tools/encrypt-pdf/) adaugă criptare AES pe 256 de biți în browser. Trimite parola pe altă cale, prin SMS sau telefon, niciodată în același e-mail.

## Fă curat după

Copia ta se află acum probabil în mai multe locuri: galeria telefonului și backupul ei în cloud, folderul Descărcări, e-mailurile trimise și aplicația de mesagerie folosită. Șterge copiile inutile după ce ai terminat. Cu cât sunt mai puține copii, cu atât riscul e mai mic.

## Pe scurt

- Pregătește copiile actelor în browser cu [instrumentul de compunere](/ro/tools/passport-id-composer/), fără să încarci nimic.
- Pune filigran: pentru cine, în ce scop și data.
- Împărtășește doar ce e necesar și protejează fișierul cu parolă.
- Șterge copiile rătăcite când ai terminat.
