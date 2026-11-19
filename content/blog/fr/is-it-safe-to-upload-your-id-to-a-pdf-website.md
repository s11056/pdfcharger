---
title: Est-il Prudent d'Envoyer son Passeport ou sa Carte d'Identité à un Site PDF ?
description: Avant d'envoyer votre passeport ou votre carte d'identité sur un site PDF gratuit, lisez ceci. Les vrais risques et une méthode plus sûre.
date: 2026-11-19
tools: [passport-id-composer, encrypt-pdf, redact-pdf]
---

Ouvrir un compte bancaire, commencer un nouveau travail, louer un appartement, demander un visa : tôt ou tard, quelqu'un demande « une copie de votre pièce d'identité, recto verso, sur une seule page, en PDF ». Vous photographiez la carte, cherchez un outil PDF gratuit, envoyez les deux photos et téléchargez le résultat.

C'est parfaitement normal. Mais la copie de votre pièce d'identité est l'une des choses les plus précieuses que vous enverrez sur internet. Mieux vaut savoir où vont ces images.

## Ce qui se passe quand vous envoyez votre pièce d'identité à un site PDF

La plupart des outils PDF en ligne traitent les fichiers sur leurs propres serveurs :

1. **Les images partent vers les serveurs du service**, souvent dans un autre pays.
2. **Elles y sont stockées pendant la création du PDF**, et souvent après. Certains services les gardent une heure, d'autres un jour ou plus.
3. **Des copies peuvent finir dans des sauvegardes et des journaux** que vous ne verrez jamais.

La plupart des services sont sérieux. Mais chaque endroit où votre pièce d'identité est stockée est un endroit de plus d'où elle peut fuiter : piratage, stockage mal configuré, employé disposant de trop d'accès. Et contrairement à un mot de passe, vous ne pouvez changer ni votre numéro de document ni votre visage.

## Pourquoi une copie divulguée pose problème

Un scan net contient tout ce qu'un fraudeur doit savoir pour se faire passer pour vous : nom complet, date de naissance, photo, numéro de document et souvent adresse et signature. Avec cela, il peut tenter d'ouvrir des comptes ou de souscrire des crédits à votre nom, passer l'étape « envoyez votre pièce d'identité » sur des applications, ouvrir des lignes téléphoniques ou louer un logement. Vous ne le découvrirez peut-être qu'avec les premières relances.

## Cinq questions à se poser avant d'envoyer quoi que ce soit

1. **Le fichier est-il traité sur mon appareil ou sur leur serveur ?** Si ce n'est pas clair, considérez qu'il est envoyé.
2. **Combien de temps le conservent-ils ?** « Supprimé après une heure » vaut mieux que rien, mais « jamais envoyé » est encore mieux.
3. **Qui gère le site ?** Y a-t-il un nom d'entreprise, une politique de confidentialité et un contact ?
4. **Faut-il un compte ?** S'inscrire relie votre pièce d'identité à votre adresse e-mail dans leur système.
5. **Puis-je vérifier ce qu'il fait ?** Le code des outils open source peut être examiné par tous.

## Une méthode plus sûre : préparer la copie dans le navigateur

Inutile d'envoyer quoi que ce soit pour réunir le recto et le verso sur une page. Le [compositeur de pièce d'identité de PDFCharger](/fr/tools/passport-id-composer/) le fait dans votre navigateur : les images ne quittent jamais votre appareil.

1. **Photographiez le recto et le verso** avec une bonne lumière et sans reflet. Recadrez chaque photo au ras de la carte.
2. **Ouvrez le [compositeur](/fr/tools/passport-id-composer/)** et ajoutez les deux images. JPG, PNG et PDF sont acceptés.
3. **Ajoutez un filigrane** (voir ci-dessous).
4. **Créez le PDF et téléchargez-le.** Vous obtenez une page A4 avec le recto en haut et le verso en bas, chacun à la taille réelle d'une carte d'identité standard (85,6 × 54 mm), pour une impression correcte.

## Mettez toujours un filigrane sur vos copies

Le filigrane est le moyen le plus simple de rendre une copie volée bien moins utile. Indiquez *pour qui*, *pourquoi* et *quand*, par exemple :

> Copy for flat rental application only - 19/11/2026

Si cette copie réapparaît ailleurs, l'abus est évident. L'outil répète votre texte en diagonale sur toute la page avec une faible opacité (15 %), pour tout couvrir sans gêner la lecture.

Gardez un texte court, en lettres latines et en chiffres.

## Ne partagez que le nécessaire

- **Demandez si le verso est vraiment utile.** Parfois, le recto suffit.
- **Masquez ce qui n'est pas demandé.** Si l'organisme confirme qu'une information est inutile, supprimez-la vraiment avec [Caviarder un PDF](/fr/tools/redact-pdf/) plutôt que de la couvrir d'un rectangle. Certains organismes, notamment les banques, doivent voir le document complet : renseignez-vous d'abord.
- **Protégez le fichier par mot de passe avant de l'envoyer par e-mail.** [Chiffrer un PDF](/fr/tools/encrypt-pdf/) ajoute un chiffrement AES 256 bits dans votre navigateur. Transmettez le mot de passe par un autre canal, SMS ou appel, jamais dans le même e-mail.

## Faites le ménage ensuite

Votre copie se trouve sans doute à plusieurs endroits : la galerie du téléphone et sa sauvegarde dans le cloud, le dossier Téléchargements, les e-mails envoyés et la messagerie utilisée. Supprimez les copies inutiles une fois la démarche terminée. Moins il y a de copies, moins il y a de risques.

## En bref

- Préparez vos copies dans le navigateur avec le [compositeur de pièce d'identité](/fr/tools/passport-id-composer/), sans rien envoyer.
- Ajoutez un filigrane : pour qui, pourquoi et la date.
- Ne partagez que le nécessaire et protégez le fichier par mot de passe.
- Supprimez les copies qui traînent une fois terminé.
