---
title: ¿Es Seguro Subir tu Pasaporte o DNI a una Web de PDF?
description: Antes de subir tu pasaporte o DNI a una web de PDF gratuita, lee esto. Los riesgos reales, qué comprobar y una alternativa más segura.
date: 2026-11-19
tools: [passport-id-composer, encrypt-pdf, redact-pdf]
---

Abrir una cuenta bancaria, empezar un trabajo, alquilar un piso, pedir un visado: tarde o temprano alguien te pide "una copia de tu documento, por las dos caras, en una sola página, en PDF". Fotografías el documento, buscas una herramienta de PDF gratuita, subes las dos fotos y descargas el resultado.

Es lo más normal del mundo. Pero la copia de tu documento de identidad es de lo más valioso que vas a enviar por internet. Conviene saber adónde van esas imágenes.

## Qué pasa cuando subes tu documento a una web de PDF

La mayoría de las herramientas de PDF en línea procesan los archivos en sus propios servidores:

1. **Las imágenes viajan a los servidores del servicio**, a menudo en otro país.
2. **Se guardan allí mientras se crea el PDF**, y con frecuencia después. Algunos servicios las conservan una hora; otros, un día o más.
3. **Pueden quedar copias en copias de seguridad y registros** que nunca verás.

La mayoría de los servicios son serios. Pero cada lugar donde se guarda tu documento es un sitio más desde el que puede filtrarse: un ataque, un almacenamiento mal configurado o un empleado con demasiado acceso. Y, a diferencia de una contraseña, no puedes cambiar tu número de documento ni tu cara.

## Por qué importa una copia filtrada

Un escaneo nítido contiene todo lo que un estafador necesita para hacerse pasar por ti: nombre completo, fecha de nacimiento, foto, número de documento y, a menudo, dirección y firma. Con eso pueden intentar abrir cuentas o pedir préstamos a tu nombre, superar el paso de "sube tu documento" en aplicaciones, contratar líneas de móvil o alquilar viviendas. Quizá no te enteres hasta que lleguen las reclamaciones.

## Cinco preguntas antes de subir nada

1. **¿El archivo se procesa en mi dispositivo o en su servidor?** Si no está claro, da por hecho que se sube.
2. **¿Cuánto tiempo lo guardan?** "Se borra en una hora" es mejor que nada, pero "nunca se sube" es mejor todavía.
3. **¿Quién está detrás de la web?** ¿Hay nombre de empresa, política de privacidad y forma de contacto?
4. **¿Necesito una cuenta?** Registrarte vincula tu documento con tu correo en su sistema.
5. **¿Puedo comprobar lo que hace?** El código de las herramientas de código abierto lo puede revisar cualquiera.

## Una alternativa más segura: prepara la copia en el navegador

No necesitas subir nada para poner las dos caras de tu documento en una página. El [Compositor de documentos de PDFCharger](/es/tools/passport-id-composer/) lo hace dentro del navegador, así que las imágenes nunca salen de tu dispositivo:

1. **Haz fotos nítidas del anverso y el reverso**, con buena luz y sin reflejos. Recorta cada foto al borde de la tarjeta.
2. **Abre el [Compositor de documentos](/es/tools/passport-id-composer/)** y añade las dos imágenes. Sirven JPG, PNG y PDF.
3. **Añade una marca de agua** (ver abajo).
4. **Crea el PDF y descárgalo.** Obtienes una página A4 con el anverso arriba y el reverso abajo, cada uno al tamaño real de una tarjeta de identidad estándar (85,6 × 54 mm), para que también se imprima bien.

## Pon siempre marca de agua a tus copias

La marca de agua es la forma más sencilla de que una copia robada sirva de poco. Escribe *para quién* es, *para qué* y *cuándo*, por ejemplo:

> Copy for flat rental application only - 19/11/2026

Si esa copia aparece en otro sitio, es evidente que se ha usado mal. La herramienta repite tu texto en diagonal por toda la página con baja opacidad (15%), para cubrirlo todo sin impedir la lectura.

Usa un texto corto, solo con letras latinas y números.

## Comparte solo lo necesario

- **Pregunta si necesitan las dos caras.** A veces basta con la de la foto.
- **Oculta lo que no necesiten.** Si la entidad confirma que no necesita un dato, elimínalo de verdad con [Censurar PDF](/es/tools/redact-pdf/), en lugar de taparlo con un recuadro. Algunas entidades, sobre todo los bancos, deben ver el documento completo, así que pregunta antes.
- **Protege el archivo con contraseña antes de enviarlo por correo.** [Cifrar PDF](/es/tools/encrypt-pdf/) añade cifrado AES de 256 bits en tu navegador. Envía la contraseña por otra vía, como un SMS o una llamada, nunca en el mismo correo.

## Limpia después

Tu copia probablemente está ahora en varios sitios: la galería del móvil y su copia en la nube, la carpeta de descargas, los enviados del correo y la aplicación de mensajería que usaste. Borra las copias que no necesites cuando termines. Cuantas menos copias, menos riesgo.

## En resumen

- Crea las copias en el navegador con el [Compositor de documentos](/es/tools/passport-id-composer/), sin subir nada.
- Pon marca de agua: para quién, para qué y la fecha.
- Comparte solo lo necesario y protege el archivo con contraseña.
- Borra las copias sueltas al terminar.
