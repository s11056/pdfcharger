---
title: Ist es sicher, Reisepass oder Ausweis auf eine PDF-Website hochzuladen?
description: Bevor Sie Reisepass oder Ausweis auf eine kostenlose PDF-Seite hochladen, lesen Sie dies. Die echten Risiken und eine sicherere Methode.
date: 2026-11-19
tools: [passport-id-composer, encrypt-pdf, redact-pdf]
---

Konto eröffnen, neuen Job antreten, Wohnung mieten, Visum beantragen: Früher oder später verlangt jemand „eine Kopie Ihres Ausweises, Vorder- und Rückseite, auf einer Seite, als PDF". Sie fotografieren die Karte, suchen ein kostenloses PDF-Tool, laden beide Fotos hoch und laden das Ergebnis herunter.

Das ist völlig normal. Doch eine Kopie Ihres Ausweisdokuments gehört zu den wertvollsten Dingen, die Sie je über das Internet verschicken. Es lohnt sich zu wissen, wohin diese Bilder gehen.

## Was passiert, wenn Sie Ihren Ausweis auf eine PDF-Website hochladen

Die meisten Online-PDF-Tools verarbeiten Dateien auf eigenen Servern:

1. **Die Bilder werden an die Server des Dienstes übertragen**, oft in einem anderen Land.
2. **Sie werden dort gespeichert, während die PDF entsteht**, und häufig auch danach. Manche Dienste behalten Dateien eine Stunde, andere einen Tag oder länger.
3. **Kopien können in Backups und Protokollen landen**, die Sie nie sehen.

Die meisten Dienste arbeiten seriös. Aber jeder Ort, an dem Ihr Ausweis liegt, ist ein weiterer Ort, an dem er durch einen Hackerangriff, falsch konfigurierten Speicher oder Mitarbeitende mit zu vielen Rechten abhandenkommen kann. Und anders als ein Passwort können Sie Ihre Ausweisnummer oder Ihr Gesicht nicht ändern.

## Warum eine geleakte Ausweiskopie gefährlich ist

Ein klarer Scan enthält alles, was Betrüger brauchen, um sich als Sie auszugeben: vollständiger Name, Geburtsdatum, Foto, Dokumentnummer und oft Adresse und Unterschrift. Damit können sie versuchen, Konten oder Kredite in Ihrem Namen zu eröffnen, die „Ausweis hochladen"-Prüfung in Apps zu bestehen, Handyverträge abzuschließen oder Wohnungen anzumieten. Vielleicht merken Sie es erst, wenn Mahnungen kommen.

## Fünf Fragen, bevor Sie etwas hochladen

1. **Wird die Datei auf meinem Gerät oder auf deren Server verarbeitet?** Wenn das unklar ist, gehen Sie von einem Upload aus.
2. **Wie lange wird sie gespeichert?** „Nach einer Stunde gelöscht" ist besser als nichts, „nie hochgeladen" ist besser.
3. **Wer betreibt die Website?** Gibt es einen Firmennamen, eine Datenschutzerklärung und Kontaktmöglichkeiten?
4. **Brauche ich ein Konto?** Eine Anmeldung verknüpft Ihren Ausweis mit Ihrer E-Mail-Adresse in deren System.
5. **Kann ich prüfen, was das Tool tut?** Den Code von Open-Source-Tools kann jeder einsehen.

## Sicherer: Ausweiskopie im Browser erstellen

Sie müssen nichts hochladen, um Vorder- und Rückseite auf eine Seite zu bringen. Der [Ausweis-Composer von PDFCharger](/de/tools/passport-id-composer/) erledigt das im Browser, die Bilder verlassen Ihr Gerät also nie:

1. **Fotografieren Sie Vorder- und Rückseite** scharf, bei gutem Licht und ohne Spiegelungen. Schneiden Sie jedes Foto an den Kartenrändern zu.
2. **Öffnen Sie den [Ausweis-Composer](/de/tools/passport-id-composer/)** und fügen Sie beide Bilder hinzu. JPG, PNG und PDF funktionieren.
3. **Fügen Sie ein Wasserzeichen hinzu** (siehe unten).
4. **Erstellen und laden Sie die PDF herunter.** Sie erhalten eine A4-Seite mit der Vorderseite oben und der Rückseite unten, jeweils in der echten Größe einer Standard-Ausweiskarte (85,6 × 54 mm), damit auch der Ausdruck stimmt.

## Versehen Sie Ausweiskopien immer mit einem Wasserzeichen

Ein Wasserzeichen macht eine gestohlene Kopie am einfachsten nahezu wertlos. Schreiben Sie, *für wen*, *wofür* und *wann* die Kopie ist, zum Beispiel:

> Copy for flat rental application only - 19/11/2026

Taucht diese Kopie woanders auf, ist der Missbrauch offensichtlich. Das Tool wiederholt Ihren Text diagonal über die ganze Seite mit geringer Deckkraft (15 %), sodass alles abgedeckt und trotzdem lesbar bleibt.

Halten Sie den Text kurz und verwenden Sie nur lateinische Buchstaben und Ziffern.

## Teilen Sie nur, was nötig ist

- **Fragen Sie, ob beide Seiten gebraucht werden.** Manchmal genügt die Vorderseite.
- **Schwärzen Sie, was nicht gebraucht wird.** Bestätigt die Stelle, dass eine Angabe nicht nötig ist, entfernen Sie sie richtig mit [PDF schwärzen](/de/tools/redact-pdf/), statt nur ein Rechteck darüberzulegen. Manche Stellen, vor allem Banken, müssen das vollständige Dokument sehen; fragen Sie also vorher.
- **Schützen Sie die Datei mit einem Passwort, bevor Sie sie mailen.** [PDF verschlüsseln](/de/tools/encrypt-pdf/) fügt im Browser eine 256-Bit-AES-Verschlüsselung hinzu. Senden Sie das Passwort auf anderem Weg, per SMS oder Anruf, nie in derselben E-Mail.

## Räumen Sie danach auf

Ihre Ausweiskopie liegt nun wahrscheinlich an mehreren Orten: in der Fotogalerie und deren Cloud-Backup, im Download-Ordner, im Postausgang und im Messenger, den Sie genutzt haben. Löschen Sie nicht benötigte Kopien, wenn alles erledigt ist. Je weniger Kopien, desto geringer das Risiko.

## Kurz gesagt

- Erstellen Sie Ausweiskopien im Browser mit dem [Ausweis-Composer](/de/tools/passport-id-composer/), ohne Upload.
- Versehen Sie jede Kopie mit Wasserzeichen: für wen, wofür und Datum.
- Teilen Sie nur das Nötige und schützen Sie die Datei mit einem Passwort.
- Löschen Sie verstreute Kopien, wenn Sie fertig sind.
