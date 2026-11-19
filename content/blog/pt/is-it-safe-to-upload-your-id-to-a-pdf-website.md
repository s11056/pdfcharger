---
title: É Seguro Enviar seu Passaporte ou RG para um Site de PDF?
description: Antes de enviar seu passaporte ou RG para um site de PDF grátis, leia isto. Os riscos reais, o que verificar e um jeito mais seguro.
date: 2026-11-19
tools: [passport-id-composer, encrypt-pdf, redact-pdf]
---

Abrir conta em banco, começar num emprego novo, alugar um apartamento, pedir um visto: cedo ou tarde alguém pede "uma cópia do seu documento, frente e verso, numa página só, em PDF." Você fotografa o documento, procura uma ferramenta de PDF on-line grátis, envia as duas fotos e baixa o resultado.

É algo totalmente normal. Mas a cópia do seu documento de identidade é uma das coisas mais valiosas que você vai mandar pela internet. Vale saber para onde essas imagens vão.

## O que acontece quando você envia o documento para um site de PDF

A maioria das ferramentas on-line processa os arquivos nos próprios servidores:

1. **As imagens viajam até os servidores do serviço**, muitas vezes em outro país.
2. **Ficam guardadas lá enquanto o PDF é gerado**, e com frequência depois disso. Alguns serviços guardam por uma hora, outros por um dia ou mais.
3. **Cópias podem parar em backups e registros** que você nunca vai ver.

A maioria dos serviços é séria. Mas cada lugar onde seu documento fica guardado é mais um lugar de onde ele pode vazar, por invasão, armazenamento mal configurado ou funcionário com acesso demais. E, ao contrário de uma senha, você não pode trocar o número do seu documento nem o seu rosto.

## Por que uma cópia vazada importa

Uma digitalização nítida tem tudo o que um golpista precisa para se passar por você: nome completo, data de nascimento, foto, número do documento e, muitas vezes, endereço e assinatura. Com isso, criminosos podem tentar abrir contas ou pedir empréstimos no seu nome, passar pela etapa "envie seu documento" em aplicativos, habilitar linhas de celular ou alugar imóveis. Talvez você só descubra quando as cobranças chegarem.

## Cinco perguntas antes de enviar qualquer coisa

1. **O arquivo é processado no meu aparelho ou no servidor deles?** Se não estiver claro, considere que é enviado.
2. **Por quanto tempo eles guardam?** "Apagado após uma hora" é melhor que nada, mas "nunca enviado" é melhor ainda.
3. **Quem mantém o site?** Há nome da empresa, política de privacidade e contato?
4. **Preciso criar conta?** O cadastro liga seu documento ao seu e-mail no sistema deles.
5. **Posso verificar o que ele faz?** Ferramentas de código aberto podem ser inspecionadas por qualquer pessoa.

## Um jeito mais seguro: monte a cópia no navegador

Você não precisa enviar nada para colocar frente e verso do documento numa página. O [Montador de Documento do PDFCharger](/pt/tools/passport-id-composer/) faz isso dentro do navegador, então as imagens nunca saem do seu aparelho:

1. **Fotografe a frente e o verso** com boa luz e sem reflexo. Recorte cada foto rente às bordas do documento.
2. **Abra o [Montador de Documento](/pt/tools/passport-id-composer/)** e adicione as duas imagens. JPG, PNG e PDF funcionam.
3. **Adicione uma marca d’água** (veja abaixo).
4. **Gere o PDF e baixe.** Você recebe uma página A4 com a frente em cima e o verso embaixo, cada um no tamanho real de um cartão de identidade padrão (85,6 × 54 mm), para imprimir corretamente.

## Sempre coloque marca d’água nas cópias

A marca d’água é o jeito mais simples de tornar uma cópia roubada muito menos útil. Escreva *para quem* é a cópia, *para quê* e *quando*, por exemplo:

> Copy for apartment rental only - 19/11/2026

Se essa cópia aparecer em outro lugar, fica claro que foi usada indevidamente. A ferramenta repete o texto na diagonal por toda a página com baixa opacidade (15%), cobrindo tudo sem atrapalhar a leitura.

Use um texto curto, apenas com letras latinas e números.

## Compartilhe só o necessário

- **Pergunte se precisam dos dois lados.** Às vezes só a frente basta.
- **Oculte o que não é necessário.** Se a instituição confirmar que não precisa de algum dado, remova-o de verdade com [Ocultar dados no PDF](/pt/tools/redact-pdf/), em vez de só cobrir com uma tarja. Algumas instituições, especialmente bancos, precisam ver o documento completo, então confirme antes.
- **Proteja o arquivo com senha antes de mandar por e-mail.** O [Criptografar PDF](/pt/tools/encrypt-pdf/) adiciona criptografia AES de 256 bits no navegador. Envie a senha por outro meio, como SMS ou ligação, nunca no mesmo e-mail.

## Faça a limpeza depois

Sua cópia provavelmente está em vários lugares: na galeria do celular e no backup na nuvem, na pasta Downloads, nos e-mails enviados e no aplicativo de mensagens que você usou. Apague as cópias desnecessárias quando terminar. Quanto menos cópias, menos chance de vazamento.

## Resumindo

- Monte cópias de documentos no navegador com o [Montador de Documento](/pt/tools/passport-id-composer/), sem enviar nada.
- Coloque marca d’água: para quem, para quê e a data.
- Compartilhe só o necessário e proteja o arquivo com senha.
- Apague as cópias espalhadas quando terminar.
