---
title: Je Bezpečné Nahrát Pas nebo Občanku na Web s PDF Nástroji?
description: Než nahrajete sken pasu nebo občanského průkazu na bezplatný PDF web, přečtěte si tohle. Skutečná rizika, co ověřit a bezpečnější způsob, jak připravit kopii.
date: 2026-11-19
tools: [passport-id-composer, encrypt-pdf, redact-pdf]
---

Založení účtu v bance, nová práce, pronájem bytu, žádost o vízum: dříve či později někdo chce „kopii dokladu, obě strany, na jedné stránce, v PDF". Vyfotíte kartu, najdete bezplatný PDF nástroj, nahrajete obě fotky a stáhnete výsledek.

Je to úplně běžné. Kopie dokladu totožnosti je ale jedna z nejcennějších věcí, které po internetu posíláte. Vyplatí se vědět, kam ty obrázky putují.

## Co se stane, když nahrajete doklad na PDF web

Většina online PDF nástrojů zpracovává soubory na vlastních serverech:

1. **Obrázky putují na servery služby**, často v jiné zemi.
2. **Jsou tam uložené, dokud se vytváří PDF**, a často i potom. Některé služby je drží hodinu, jiné den i déle.
3. **Kopie mohou skončit v zálohách a protokolech**, které nikdy neuvidíte.

Většina služeb funguje poctivě. Každé místo, kde je váš doklad uložený, je ale další místo, odkud může uniknout: útok hackerů, špatně nastavené úložiště, zaměstnanec s příliš širokým přístupem. A na rozdíl od hesla nezměníte rodné číslo ani obličej.

## Proč je uniklá kopie dokladu nebezpečná

Ostrý sken obsahuje vše, co podvodník potřebuje, aby se za vás vydával: celé jméno, datum narození, fotografii, číslo dokladu a často i adresu. S tím se může pokusit založit účet nebo vzít úvěr na vaše jméno, projít ověřením „nahrajte doklad" v aplikacích, uzavřít telefonní smlouvu nebo pronajmout byt. Možná se to dozvíte až od vymahačů.

## Pět otázek, než cokoli nahrajete

1. **Zpracovává se soubor na mém zařízení, nebo na jejich serveru?** Pokud to není jasné, počítejte s nahráním.
2. **Jak dlouho ho uchovávají?** „Smazáno po hodině" je lepší než nic, ale „nikdy nenahráno" je lepší.
3. **Kdo web provozuje?** Je uveden název firmy, zásady ochrany soukromí a kontakt?
4. **Potřebuji účet?** Registrace propojí váš doklad s vaším e-mailem v jejich systému.
5. **Mohu ověřit, co nástroj dělá?** Kód open source nástrojů si může prohlédnout kdokoli.

## Bezpečněji: připravte kopii v prohlížeči

K tomu, abyste dali obě strany dokladu na jednu stránku, nemusíte nic nahrávat. [Skladač dokladů PDFCharger](/cs/tools/passport-id-composer/) pracuje v prohlížeči, takže obrázky neopustí vaše zařízení:

1. **Vyfoťte ostře přední i zadní stranu**, při dobrém světle a bez odlesků. Každou fotku ořízněte přesně na okraj karty.
2. **Otevřete [skladač dokladů](/cs/tools/passport-id-composer/)** a přidejte oba obrázky. Fungují JPG, PNG i PDF.
3. **Přidejte vodoznak** (viz níže).
4. **Vytvořte PDF a stáhněte ho.** Dostanete jednu stránku A4 s přední stranou nahoře a zadní dole, každou ve skutečné velikosti standardní identifikační karty (85,6 × 54 mm), takže i tisk vyjde správně.

## Kopie vždy opatřete vodoznakem

Vodoznak je nejjednodušší způsob, jak ukradenou kopii udělat téměř bezcennou. Napište, *pro koho* kopie je, *k čemu* a *kdy*, například:

> Copy for apartment rental only - 19.11.2026

Pokud se kopie objeví jinde, zneužití je zřejmé. Nástroj opakuje text úhlopříčně po celé stránce s nízkou krycí schopností (15 %), takže zakryje vše a údaje zůstanou čitelné.

**Pozor:** text pište krátký, jen latinkou bez diakritiky a číslicemi.

## Sdílejte jen to, co je nutné

- **Zeptejte se, zda potřebují obě strany.** Někdy stačí přední strana s fotkou.
- **Zakryjte, co nepotřebují.** Pokud instituce potvrdí, že nějaký údaj nepotřebuje, odstraňte ho skutečně nástrojem [Začernit PDF](/cs/tools/redact-pdf/), ne jen překrytím obdélníkem. Některé instituce, hlavně banky, musejí vidět celý doklad, proto se nejdřív zeptejte.
- **Před odesláním e-mailem soubor zaheslujte.** [Zašifrovat PDF](/cs/tools/encrypt-pdf/) přidá v prohlížeči 256bitové šifrování AES. Heslo pošlete jinou cestou, SMS nebo telefonem, nikdy ve stejném e-mailu.

## Potom uklízejte

Vaše kopie je teď nejspíš na několika místech: v galerii telefonu a její záloze v cloudu, ve složce Stažené, v odeslané poště a v aplikaci, kterou jste použili. Po vyřízení nepotřebné kopie smažte. Čím méně kopií, tím menší riziko.

## Stručně

- Kopie dokladů připravujte v prohlížeči [skladačem dokladů](/cs/tools/passport-id-composer/), bez nahrávání.
- Přidejte vodoznak: pro koho, k čemu a datum.
- Sdílejte jen nutné údaje a soubor chraňte heslem.
- Po dokončení smažte roztroušené kopie.
