---
title: È Sicuro Caricare Passaporto o Carta d'Identità su un Sito PDF?
description: Prima di caricare la scansione di passaporto o carta d'identità su un sito PDF gratuito, leggi qui. I rischi reali, cosa controllare e un metodo più sicuro.
date: 2026-11-19
tools: [passport-id-composer, encrypt-pdf, redact-pdf]
---

Aprire un conto, iniziare un nuovo lavoro, affittare casa, chiedere un visto: prima o poi qualcuno chiede "una copia del documento, fronte e retro, su una sola pagina, in PDF". Fotografi il documento, cerchi uno strumento PDF gratuito, carichi le due foto e scarichi il risultato.

È del tutto normale. Ma la copia del tuo documento d'identità è una delle cose più preziose che invierai mai su internet. Vale la pena sapere dove finiscono quelle immagini.

## Cosa succede quando carichi il documento su un sito PDF

La maggior parte degli strumenti PDF online elabora i file sui propri server:

1. **Le immagini viaggiano fino ai server del servizio**, spesso in un altro Paese.
2. **Vengono conservate lì mentre si crea il PDF**, e spesso anche dopo. Alcuni servizi tengono i file un'ora, altri un giorno o più.
3. **Le copie possono finire in backup e registri** che non vedrai mai.

La maggior parte dei servizi è seria. Ma ogni posto in cui è conservato il tuo documento è un posto in più da cui può uscire: un attacco informatico, uno spazio di archiviazione configurato male, un dipendente con troppi accessi. E, a differenza di una password, non puoi cambiare il numero del documento né il tuo viso.

## Perché una copia trafugata è un problema

Una scansione nitida contiene tutto ciò che serve a un truffatore per spacciarsi per te: nome completo, data di nascita, foto, numero del documento e spesso indirizzo e firma. Con questi dati può provare ad aprire conti o chiedere finanziamenti a tuo nome, superare il passaggio "carica il documento" nelle app, attivare SIM o affittare immobili. Potresti accorgertene solo quando arrivano i solleciti.

## Cinque domande prima di caricare qualsiasi cosa

1. **Il file viene elaborato sul mio dispositivo o sul loro server?** Se non è chiaro, considera che viene caricato.
2. **Per quanto tempo lo conservano?** "Eliminato dopo un'ora" è meglio di niente, ma "mai caricato" è meglio ancora.
3. **Chi gestisce il sito?** Ci sono nome dell'azienda, informativa sulla privacy e contatti?
4. **Serve un account?** Registrarsi collega il tuo documento alla tua email nel loro sistema.
5. **Posso verificare cosa fa?** Il codice degli strumenti open source può essere controllato da chiunque.

## Un metodo più sicuro: prepara la copia nel browser

Non serve caricare nulla per mettere fronte e retro su una pagina. Il [compositore di documenti di PDFCharger](/it/tools/passport-id-composer/) lo fa nel browser, quindi le immagini non lasciano mai il tuo dispositivo:

1. **Fotografa fronte e retro** con buona luce e senza riflessi. Ritaglia ogni foto sui bordi della tessera.
2. **Apri il [compositore di documenti](/it/tools/passport-id-composer/)** e aggiungi le due immagini. Vanno bene JPG, PNG e PDF.
3. **Aggiungi una filigrana** (vedi sotto).
4. **Crea il PDF e scaricalo.** Ottieni una pagina A4 con il fronte sopra e il retro sotto, ciascuno alla dimensione reale di una tessera standard (85,6 × 54 mm), così anche la stampa è corretta.

## Metti sempre una filigrana sulle copie

La filigrana è il modo più semplice per rendere quasi inutile una copia rubata. Scrivi *per chi* è la copia, *a cosa serve* e *quando*, ad esempio:

> Copy for flat rental application only - 19/11/2026

Se quella copia compare altrove, l'abuso è evidente. Lo strumento ripete il testo in diagonale su tutta la pagina con bassa opacità (15%), coprendo tutto senza impedire la lettura.

Usa un testo breve, con lettere latine e numeri.

## Condividi solo il necessario

- **Chiedi se servono entrambi i lati.** A volte basta il fronte.
- **Oscura ciò che non serve.** Se l'ente conferma che un dato non è necessario, eliminalo davvero con [Oscura PDF](/it/tools/redact-pdf/), invece di coprirlo con un riquadro. Alcuni enti, soprattutto le banche, devono vedere il documento completo: chiedi prima.
- **Proteggi il file con una password prima di inviarlo via email.** [Crittografa PDF](/it/tools/encrypt-pdf/) aggiunge la crittografia AES a 256 bit nel browser. Invia la password per un'altra via, come SMS o telefonata, mai nella stessa email.

## Fai pulizia dopo

La copia probabilmente ora si trova in più posti: galleria del telefono e relativo backup nel cloud, cartella Download, posta inviata e app di messaggistica usata. Elimina le copie inutili a pratica conclusa. Meno copie ci sono, minore è il rischio.

## In breve

- Crea le copie nel browser con il [compositore di documenti](/it/tools/passport-id-composer/), senza caricare nulla.
- Aggiungi una filigrana: per chi, a cosa serve e la data.
- Condividi solo il necessario e proteggi il file con una password.
- Elimina le copie sparse quando hai finito.
