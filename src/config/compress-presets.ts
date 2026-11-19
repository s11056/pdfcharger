/**
 * "Compress PDF to <size>" landing pages
 * Each preset gets a page at /<locale>/compress-pdf-to/<slug>/ that opens the
 * Compress tool with that target size already selected.
 *
 * @module config/compress-presets
 */

import type { Locale } from '@/lib/i18n/config';
import type { ToolContent } from '@/types/tool';

export interface CompressPreset {
  /** URL segment, e.g. "100kb" */
  slug: string;
  /** Target size in KB */
  kb: number;
}

export const COMPRESS_PRESETS: CompressPreset[] = [
  { slug: '50kb', kb: 50 },
  { slug: '100kb', kb: 100 },
  { slug: '200kb', kb: 200 },
  { slug: '300kb', kb: 300 },
  { slug: '500kb', kb: 500 },
  { slug: '1mb', kb: 1024 },
];

export function getCompressPreset(slug: string): CompressPreset | undefined {
  return COMPRESS_PRESETS.find((preset) => preset.slug === slug);
}

interface PresetStrings {
  title: string;
  meta: string;
  intro: string;
  privacy: string;
  otherSizes: string;
  steps: [string, string][];
  useCases: [string, string][];
  faq: [string, string][];
}

/** Size label in the locale's usual units */
export function formatPresetSize(kb: number, locale: Locale): string {
  const [k, m] = locale === 'fr' ? ['Ko', 'Mo'] : ['KB', 'MB'];
  return kb >= 1024 && kb % 1024 === 0 ? `${kb / 1024} ${m}` : `${kb} ${k}`;
}

/* {size} is replaced with the preset size, e.g. "100 KB" */
const STRINGS: Record<Locale, PresetStrings> = {
  en: {
    title: 'Compress PDF to {size}',
    meta: 'Compress a PDF to {size} or less, free and in your browser. Ideal for exam forms, job portals and government websites. No upload, no sign-up.',
    intro: 'Many online forms, from exam and job applications to government and university portals, only accept PDFs below a fixed size. This page compresses your PDF to {size} or less, directly in your browser.',
    privacy: 'Your file never leaves your device. Gentle settings are tried first to keep text sharp; only if needed are pages turned into lower-resolution images to reach the target.',
    otherSizes: 'Other sizes:',
    steps: [
      ['Add your PDF', 'Drop the PDF into the box above or click to choose it. The {size} target is already selected.'],
      ['Compress', 'Click Compress PDF. Gentle settings are tried first, then stronger ones until the file fits.'],
      ['Download', 'Check the new file size and download your PDF.'],
    ],
    useCases: [
      ['Exam and job application forms', 'Application portals often accept documents only under a fixed size, such as 100 KB or 200 KB.'],
      ['Government and visa websites', 'Upload scanned certificates, ID copies and proofs that meet strict size limits.'],
      ['Email and messaging', 'Send PDFs that fit attachment limits and open quickly on phones.'],
    ],
    faq: [
      ['Will my PDF really be under {size}?', 'In most cases, yes. Stronger settings are tried until the file fits. A document with many pages may still not reach {size}; you will see the smallest size reached, and you can remove pages or split the PDF.'],
      ['Will the quality drop?', 'Text-only files often fit with no visible change. To reach very small sizes, pages may be turned into lower-resolution images: they stay readable, but the text can no longer be selected or searched.'],
      ['Is my file uploaded?', 'No. Compression runs in your browser on your own device. Your PDF is never sent to a server.'],
      ['Is it free?', 'Yes. Free, with no sign-up, no watermark and no daily limit.'],
    ],
  },
  ja: {
    title: 'PDF を {size} に圧縮',
    meta: 'PDF を {size} 以下に無料で圧縮。試験の願書、求人サイト、行政サイトへの提出に最適。アップロード不要、登録不要でブラウザ内で処理します。',
    intro: '試験や求人の応募、行政・大学のポータルなど、多くのオンラインフォームは決められたサイズ以下の PDF しか受け付けません。このページでは PDF をブラウザ内で {size} 以下に圧縮できます。',
    privacy: 'ファイルが端末の外に出ることはありません。まず文字をくっきり保つ穏やかな設定から試し、必要な場合にのみページを低解像度の画像に変換して目標サイズに近づけます。',
    otherSizes: 'その他のサイズ：',
    steps: [
      ['PDF を追加', '上のボックスに PDF をドロップするか、クリックして選択します。目標 {size} は選択済みです。'],
      ['圧縮', '「PDF を圧縮」をクリックします。穏やかな設定から順に、ファイルが収まるまで強い設定を試します。'],
      ['ダウンロード', '新しいファイルサイズを確認して PDF をダウンロードします。'],
    ],
    useCases: [
      ['試験・求人の応募フォーム', '応募サイトでは 100 KB や 200 KB など、サイズ上限のある書類提出がよく求められます。'],
      ['行政・ビザ申請サイト', 'スキャンした証明書や身分証のコピーを、厳しいサイズ制限に合わせて提出できます。'],
      ['メール・メッセージ', '添付ファイルの上限に収まり、スマホでもすぐ開ける PDF を送れます。'],
    ],
    faq: [
      ['本当に {size} 以下になりますか？', 'ほとんどの場合はなります。収まるまで設定を強めていきます。ページ数の多い文書は {size} に届かないこともあり、その場合は到達できた最小サイズを表示します。ページを削除するか PDF を分割してください。'],
      ['画質は落ちますか？', '文字中心のファイルは見た目がほぼ変わらないことが多いです。非常に小さいサイズにする場合、ページが低解像度の画像になり、読むことはできますが文字の選択や検索はできなくなります。'],
      ['ファイルはアップロードされますか？', 'いいえ。圧縮はお使いの端末のブラウザ内で行われ、PDF がサーバーに送られることはありません。'],
      ['無料ですか？', 'はい。登録不要、透かしなし、1 日の回数制限もなく無料です。'],
    ],
  },
  ko: {
    title: 'PDF를 {size}로 압축',
    meta: 'PDF를 {size} 이하로 무료 압축하세요. 시험 원서, 채용 사이트, 관공서 사이트 제출에 적합합니다. 업로드·가입 없이 브라우저에서 처리됩니다.',
    intro: '시험·채용 지원서부터 관공서·대학 포털까지, 많은 온라인 양식은 정해진 크기 이하의 PDF만 받습니다. 이 페이지에서 PDF를 브라우저 안에서 {size} 이하로 압축할 수 있습니다.',
    privacy: '파일은 기기 밖으로 나가지 않습니다. 먼저 글자를 선명하게 유지하는 약한 설정부터 시도하고, 필요할 때만 페이지를 저해상도 이미지로 바꿔 목표 크기에 맞춥니다.',
    otherSizes: '다른 크기:',
    steps: [
      ['PDF 추가', '위 상자에 PDF를 끌어다 놓거나 클릭해 선택하세요. 목표 크기 {size}가 이미 선택되어 있습니다.'],
      ['압축', 'PDF 압축을 클릭하세요. 약한 설정부터 시작해 파일이 맞을 때까지 점점 강한 설정을 시도합니다.'],
      ['다운로드', '새 파일 크기를 확인하고 PDF를 다운로드하세요.'],
    ],
    useCases: [
      ['시험·채용 지원서', '지원 포털은 100 KB, 200 KB처럼 크기 제한이 있는 서류를 요구하는 경우가 많습니다.'],
      ['관공서·비자 사이트', '스캔한 증명서와 신분증 사본을 엄격한 크기 제한에 맞게 올릴 수 있습니다.'],
      ['이메일·메신저', '첨부 용량 제한에 맞고 휴대폰에서도 빨리 열리는 PDF를 보낼 수 있습니다.'],
    ],
    faq: [
      ['정말 {size} 이하가 되나요?', '대부분은 그렇습니다. 파일이 맞을 때까지 설정을 강하게 합니다. 페이지가 많은 문서는 {size}에 도달하지 못할 수 있으며, 이때는 도달한 가장 작은 크기를 보여 드립니다. 페이지를 삭제하거나 PDF를 분할해 보세요.'],
      ['화질이 떨어지나요?', '텍스트 위주 파일은 눈에 띄는 변화 없이 줄어드는 경우가 많습니다. 아주 작게 줄이려면 페이지가 저해상도 이미지로 바뀌며, 읽을 수는 있지만 텍스트 선택·검색은 할 수 없게 됩니다.'],
      ['파일이 업로드되나요?', '아니요. 압축은 사용자 기기의 브라우저에서 실행되며 PDF는 서버로 전송되지 않습니다.'],
      ['무료인가요?', '네. 가입, 워터마크, 일일 제한 없이 무료입니다.'],
    ],
  },
  es: {
    title: 'Comprimir PDF a {size}',
    meta: 'Comprime un PDF a {size} o menos, gratis y en tu navegador. Ideal para formularios de exámenes, portales de empleo y webs del gobierno. Sin subir archivos.',
    intro: 'Muchos formularios en línea, desde solicitudes de exámenes y empleo hasta portales del gobierno y universidades, solo aceptan PDF por debajo de un tamaño fijo. Esta página comprime tu PDF a {size} o menos, directamente en tu navegador.',
    privacy: 'Tu archivo nunca sale de tu dispositivo. Primero se prueban ajustes suaves para mantener el texto nítido; solo si hace falta, las páginas se convierten en imágenes de menor resolución para llegar al objetivo.',
    otherSizes: 'Otros tamaños:',
    steps: [
      ['Añade tu PDF', 'Arrastra el PDF al recuadro de arriba o haz clic para elegirlo. El objetivo de {size} ya está seleccionado.'],
      ['Comprime', 'Haz clic en Comprimir PDF. Se prueban primero ajustes suaves y luego otros más fuertes hasta que el archivo quepa.'],
      ['Descarga', 'Comprueba el nuevo tamaño y descarga tu PDF.'],
    ],
    useCases: [
      ['Exámenes y solicitudes de empleo', 'Los portales de solicitud suelen aceptar documentos solo por debajo de un tamaño fijo, como 100 KB o 200 KB.'],
      ['Webs del gobierno y de visados', 'Sube certificados escaneados, copias del documento de identidad y justificantes que cumplan límites estrictos.'],
      ['Correo y mensajería', 'Envía PDF que respeten el límite de adjuntos y se abran rápido en el móvil.'],
    ],
    faq: [
      ['¿De verdad quedará por debajo de {size}?', 'En la mayoría de los casos, sí. Se prueban ajustes más fuertes hasta que el archivo quepa. Un documento con muchas páginas puede no llegar a {size}; verás el tamaño más pequeño conseguido y podrás eliminar páginas o dividir el PDF.'],
      ['¿Bajará la calidad?', 'Los archivos con solo texto suelen caber sin cambios visibles. Para tamaños muy pequeños, las páginas pueden convertirse en imágenes de menor resolución: se leen bien, pero el texto ya no se puede seleccionar ni buscar.'],
      ['¿Se sube mi archivo?', 'No. La compresión se hace en tu navegador, en tu propio dispositivo. Tu PDF nunca se envía a un servidor.'],
      ['¿Es gratis?', 'Sí. Gratis, sin registro, sin marca de agua y sin límite diario.'],
    ],
  },
  fr: {
    title: 'Compresser un PDF à {size}',
    meta: 'Compressez un PDF à {size} ou moins, gratuitement et dans votre navigateur. Idéal pour les concours, candidatures et sites administratifs. Sans envoi de fichier.',
    intro: "De nombreux formulaires en ligne, des concours et candidatures aux portails administratifs et universitaires, n'acceptent que des PDF sous une taille fixe. Cette page compresse votre PDF à {size} ou moins, directement dans votre navigateur.",
    privacy: "Votre fichier ne quitte jamais votre appareil. Les réglages les plus doux sont essayés d'abord pour garder un texte net ; seulement si nécessaire, les pages sont converties en images de plus faible résolution pour atteindre la cible.",
    otherSizes: 'Autres tailles :',
    steps: [
      ['Ajoutez votre PDF', 'Déposez le PDF dans le cadre ci-dessus ou cliquez pour le choisir. La cible de {size} est déjà sélectionnée.'],
      ['Compressez', "Cliquez sur Compresser le PDF. Des réglages doux sont essayés d'abord, puis de plus forts jusqu'à ce que le fichier tienne."],
      ['Téléchargez', 'Vérifiez la nouvelle taille et téléchargez votre PDF.'],
    ],
    useCases: [
      ['Concours et candidatures', "Les portails de candidature n'acceptent souvent que des documents sous une taille fixe, comme 100 Ko ou 200 Ko."],
      ['Sites administratifs et de visa', "Envoyez des certificats scannés, copies de pièce d'identité et justificatifs qui respectent des limites strictes."],
      ['E-mail et messagerie', 'Envoyez des PDF qui respectent la limite des pièces jointes et s’ouvrent vite sur mobile.'],
    ],
    faq: [
      ['Mon PDF sera-t-il vraiment sous {size} ?', "Dans la plupart des cas, oui. Des réglages plus forts sont essayés jusqu'à ce que le fichier tienne. Un document de nombreuses pages peut ne pas atteindre {size} : la plus petite taille obtenue s'affiche, et vous pouvez supprimer des pages ou diviser le PDF."],
      ['La qualité va-t-elle baisser ?', "Les fichiers composés de texte tiennent souvent sans changement visible. Pour une très petite taille, les pages peuvent devenir des images de plus faible résolution : elles restent lisibles, mais le texte n'est plus sélectionnable ni recherchable."],
      ['Mon fichier est-il envoyé ?', "Non. La compression s'effectue dans votre navigateur, sur votre appareil. Votre PDF n'est jamais envoyé à un serveur."],
      ["Est-ce gratuit ?", 'Oui. Gratuit, sans inscription, sans filigrane et sans limite quotidienne.'],
    ],
  },
  de: {
    title: 'PDF auf {size} komprimieren',
    meta: 'PDF kostenlos im Browser auf {size} oder weniger komprimieren. Ideal für Bewerbungsportale, Prüfungsanmeldungen und Behördenseiten. Ohne Upload, ohne Anmeldung.',
    intro: 'Viele Online-Formulare, von Bewerbungen und Prüfungsanmeldungen bis zu Behörden- und Hochschulportalen, akzeptieren nur PDFs unter einer festen Größe. Diese Seite komprimiert Ihre PDF direkt im Browser auf {size} oder weniger.',
    privacy: 'Ihre Datei verlässt nie Ihr Gerät. Zuerst werden schonende Einstellungen versucht, damit der Text scharf bleibt; nur wenn nötig, werden Seiten in Bilder mit geringerer Auflösung umgewandelt, um das Ziel zu erreichen.',
    otherSizes: 'Andere Größen:',
    steps: [
      ['PDF hinzufügen', 'Ziehen Sie die PDF in das Feld oben oder klicken Sie, um sie auszuwählen. Das Ziel {size} ist bereits gewählt.'],
      ['Komprimieren', 'Klicken Sie auf „PDF komprimieren“. Zuerst werden schonende, dann stärkere Einstellungen versucht, bis die Datei passt.'],
      ['Herunterladen', 'Prüfen Sie die neue Dateigröße und laden Sie Ihre PDF herunter.'],
    ],
    useCases: [
      ['Bewerbungen und Prüfungsanmeldungen', 'Bewerbungsportale akzeptieren Unterlagen oft nur unter einer festen Größe, etwa 100 KB oder 200 KB.'],
      ['Behörden- und Visa-Webseiten', 'Laden Sie gescannte Urkunden, Ausweiskopien und Nachweise hoch, die strenge Größenlimits erfüllen.'],
      ['E-Mail und Messenger', 'Versenden Sie PDFs, die ins Anhangslimit passen und sich auf dem Handy schnell öffnen.'],
    ],
    faq: [
      ['Ist meine PDF danach wirklich unter {size}?', 'In den meisten Fällen ja. Es werden stärkere Einstellungen versucht, bis die Datei passt. Ein Dokument mit vielen Seiten erreicht {size} eventuell nicht; dann sehen Sie die kleinste erreichte Größe und können Seiten entfernen oder die PDF teilen.'],
      ['Leidet die Qualität?', 'Reine Textdateien passen oft ohne sichtbaren Unterschied. Für sehr kleine Größen werden Seiten eventuell zu Bildern mit geringerer Auflösung: gut lesbar, aber der Text lässt sich nicht mehr markieren oder durchsuchen.'],
      ['Wird meine Datei hochgeladen?', 'Nein. Die Komprimierung läuft in Ihrem Browser auf Ihrem eigenen Gerät. Ihre PDF wird nie an einen Server gesendet.'],
      ['Ist das kostenlos?', 'Ja. Kostenlos, ohne Anmeldung, ohne Wasserzeichen und ohne Tageslimit.'],
    ],
  },
  zh: {
    title: '将 PDF 压缩到 {size}',
    meta: '免费在浏览器中把 PDF 压缩到 {size} 以内。适合考试报名、求职网站和政务网站上传。无需上传文件，无需注册。',
    intro: '从考试报名、求职申请到政务和高校网站，很多在线表单只接受不超过固定大小的 PDF。本页面可在浏览器中直接把 PDF 压缩到 {size} 以内。',
    privacy: '文件始终留在你的设备上。会先尝试保持文字清晰的温和设置；只有在必要时，才会把页面转换为较低分辨率的图片以达到目标大小。',
    otherSizes: '其他大小：',
    steps: [
      ['添加 PDF', '把 PDF 拖到上方框中，或点击选择文件。已预先选好 {size} 目标。'],
      ['压缩', '点击“压缩 PDF”。会先尝试温和设置，再逐步加强，直到文件符合大小。'],
      ['下载', '查看新的文件大小并下载 PDF。'],
    ],
    useCases: [
      ['考试报名与求职申请', '报名和招聘网站常要求材料不超过固定大小，例如 100 KB 或 200 KB。'],
      ['政务与签证网站', '上传符合严格大小限制的证书扫描件、身份证复印件和证明材料。'],
      ['邮件与聊天', '发送符合附件大小限制、在手机上也能快速打开的 PDF。'],
    ],
    faq: [
      ['真的能压到 {size} 以内吗？', '大多数情况下可以。会不断加强设置直到文件符合要求。页数很多的文档可能达不到 {size}，届时会显示能达到的最小大小，你可以删除部分页面或拆分 PDF。'],
      ['画质会下降吗？', '纯文字文件通常压缩后看不出变化。要压到很小时，页面可能会转换为较低分辨率的图片：仍然清晰可读，但文字将无法再选择或搜索。'],
      ['文件会被上传吗？', '不会。压缩在你自己设备的浏览器中完成，PDF 不会发送到任何服务器。'],
      ['免费吗？', '是的。免费使用，无需注册，无水印，无每日次数限制。'],
    ],
  },
  'zh-TW': {
    title: '將 PDF 壓縮到 {size}',
    meta: '免費在瀏覽器中把 PDF 壓縮到 {size} 以內。適合考試報名、求職網站與政府網站上傳。無需上傳檔案，無需註冊。',
    intro: '從考試報名、求職申請到政府與大學網站，許多線上表單只接受不超過固定大小的 PDF。本頁面可在瀏覽器中直接把 PDF 壓縮到 {size} 以內。',
    privacy: '檔案始終留在你的裝置上。會先嘗試保持文字清晰的溫和設定；只有在必要時，才會把頁面轉換為較低解析度的圖片以達到目標大小。',
    otherSizes: '其他大小：',
    steps: [
      ['加入 PDF', '把 PDF 拖到上方框中，或點擊選擇檔案。已預先選好 {size} 目標。'],
      ['壓縮', '點擊「壓縮 PDF」。會先嘗試溫和設定，再逐步加強，直到檔案符合大小。'],
      ['下載', '查看新的檔案大小並下載 PDF。'],
    ],
    useCases: [
      ['考試報名與求職申請', '報名與徵才網站常要求文件不超過固定大小，例如 100 KB 或 200 KB。'],
      ['政府與簽證網站', '上傳符合嚴格大小限制的證書掃描檔、身分證影本與證明文件。'],
      ['電子郵件與通訊軟體', '傳送符合附件大小限制、在手機上也能快速開啟的 PDF。'],
    ],
    faq: [
      ['真的能壓到 {size} 以內嗎？', '大多數情況下可以。會不斷加強設定直到檔案符合要求。頁數很多的文件可能達不到 {size}，屆時會顯示可達到的最小大小，你可以刪除部分頁面或分割 PDF。'],
      ['畫質會下降嗎？', '純文字檔案通常壓縮後看不出變化。若要壓到很小，頁面可能會轉換為較低解析度的圖片：仍可清楚閱讀，但文字將無法再選取或搜尋。'],
      ['檔案會被上傳嗎？', '不會。壓縮在你自己裝置的瀏覽器中完成，PDF 不會傳送到任何伺服器。'],
      ['免費嗎？', '是的。免費使用，無需註冊，無浮水印，無每日次數限制。'],
    ],
  },
  pt: {
    title: 'Comprimir PDF para {size}',
    meta: 'Comprima um PDF para {size} ou menos, grátis e no navegador. Ideal para inscrições em concursos, vagas de emprego e sites do governo. Sem enviar arquivos.',
    intro: 'Muitos formulários on-line, de inscrições em concursos e vagas de emprego a portais do governo e universidades, só aceitam PDFs abaixo de um tamanho fixo. Esta página comprime seu PDF para {size} ou menos, direto no navegador.',
    privacy: 'Seu arquivo nunca sai do seu dispositivo. Primeiro tentamos ajustes leves para manter o texto nítido; só se for preciso, as páginas viram imagens de menor resolução para chegar à meta.',
    otherSizes: 'Outros tamanhos:',
    steps: [
      ['Adicione seu PDF', 'Arraste o PDF para a caixa acima ou clique para escolher. A meta de {size} já está selecionada.'],
      ['Comprima', 'Clique em Comprimir PDF. Ajustes leves são testados primeiro, depois outros mais fortes até o arquivo caber.'],
      ['Baixe', 'Confira o novo tamanho e baixe seu PDF.'],
    ],
    useCases: [
      ['Concursos e vagas de emprego', 'Portais de inscrição costumam aceitar documentos só abaixo de um tamanho fixo, como 100 KB ou 200 KB.'],
      ['Sites do governo e de vistos', 'Envie certificados digitalizados, cópias de documentos e comprovantes que respeitem limites rígidos.'],
      ['E-mail e mensagens', 'Envie PDFs que cabem no limite de anexos e abrem rápido no celular.'],
    ],
    faq: [
      ['Meu PDF vai mesmo ficar abaixo de {size}?', 'Na maioria dos casos, sim. Ajustes mais fortes são testados até o arquivo caber. Um documento com muitas páginas pode não chegar a {size}; você verá o menor tamanho alcançado e poderá remover páginas ou dividir o PDF.'],
      ['A qualidade vai cair?', 'Arquivos só com texto costumam caber sem mudança visível. Para tamanhos muito pequenos, as páginas podem virar imagens de menor resolução: continuam legíveis, mas o texto não pode mais ser selecionado nem pesquisado.'],
      ['Meu arquivo é enviado?', 'Não. A compressão acontece no seu navegador, no seu próprio dispositivo. Seu PDF nunca é enviado a um servidor.'],
      ['É grátis?', 'Sim. Grátis, sem cadastro, sem marca d’água e sem limite diário.'],
    ],
  },
  ar: {
    title: 'ضغط PDF إلى {size}',
    meta: 'اضغط ملف PDF إلى {size} أو أقل مجانًا داخل المتصفح. مثالي لنماذج الامتحانات والتوظيف والمواقع الحكومية. بدون رفع الملف وبدون تسجيل.',
    intro: 'كثير من النماذج الإلكترونية، من التقديم للامتحانات والوظائف إلى البوابات الحكومية والجامعية، لا تقبل إلا ملفات PDF أصغر من حجم محدد. تضغط هذه الصفحة ملفك إلى {size} أو أقل مباشرة في المتصفح.',
    privacy: 'لا يغادر ملفك جهازك أبدًا. نجرب الإعدادات الخفيفة أولًا للحفاظ على وضوح النص، وعند الحاجة فقط تتحول الصفحات إلى صور بدقة أقل للوصول إلى الحجم المطلوب.',
    otherSizes: 'أحجام أخرى:',
    steps: [
      ['أضف ملف PDF', 'اسحب الملف إلى المربع أعلاه أو انقر لاختياره. الحجم المستهدف {size} محدد مسبقًا.'],
      ['اضغط الملف', 'انقر على ضغط PDF. نجرب الإعدادات الخفيفة أولًا ثم الأقوى حتى يناسب الملف الحجم المطلوب.'],
      ['نزّل الملف', 'تحقق من الحجم الجديد ونزّل ملف PDF.'],
    ],
    useCases: [
      ['نماذج الامتحانات والتوظيف', 'كثيرًا ما تقبل بوابات التقديم المستندات تحت حجم محدد فقط، مثل 100 KB أو 200 KB.'],
      ['المواقع الحكومية ومواقع التأشيرات', 'ارفع الشهادات الممسوحة ونسخ الهوية والمستندات الداعمة ضمن حدود الحجم الصارمة.'],
      ['البريد الإلكتروني والمراسلة', 'أرسل ملفات PDF تناسب حد المرفقات وتُفتح بسرعة على الهاتف.'],
    ],
    faq: [
      ['هل سيصبح الملف فعلًا أقل من {size}؟', 'في أغلب الحالات نعم. نجرب إعدادات أقوى حتى يناسب الملف الحجم. قد لا يصل مستند كثير الصفحات إلى {size}، وعندها نعرض أصغر حجم تم الوصول إليه، ويمكنك حذف بعض الصفحات أو تقسيم الملف.'],
      ['هل ستنخفض الجودة؟', 'الملفات النصية غالبًا تصغر دون تغيير ملحوظ. للوصول إلى أحجام صغيرة جدًا قد تتحول الصفحات إلى صور بدقة أقل: تبقى مقروءة، لكن لا يمكن تحديد النص أو البحث فيه.'],
      ['هل يُرفع ملفي؟', 'لا. يتم الضغط داخل متصفحك على جهازك، ولا يُرسل ملف PDF إلى أي خادم.'],
      ['هل الخدمة مجانية؟', 'نعم. مجانية بدون تسجيل وبدون علامة مائية وبدون حد يومي.'],
    ],
  },
  he: {
    title: 'דחיסת PDF ל-{size}',
    meta: 'דחסו PDF ל-{size} או פחות, בחינם ובדפדפן. מתאים לטופסי מבחנים, אתרי דרושים ואתרים ממשלתיים. בלי העלאה ובלי הרשמה.',
    intro: 'טפסים מקוונים רבים, מהרשמה למבחנים ומשרות ועד פורטלים ממשלתיים ואוניברסיטאיים, מקבלים רק קובצי PDF מתחת לגודל קבוע. הדף הזה דוחס את ה-PDF שלכם ל-{size} או פחות, ישירות בדפדפן.',
    privacy: 'הקובץ לעולם לא יוצא מהמכשיר שלכם. קודם מנסים הגדרות עדינות כדי לשמור על טקסט חד; רק אם צריך, העמודים הופכים לתמונות ברזולוציה נמוכה יותר כדי להגיע ליעד.',
    otherSizes: 'גדלים נוספים:',
    steps: [
      ['הוסיפו PDF', 'גררו את הקובץ לתיבה למעלה או לחצו כדי לבחור. יעד ה-{size} כבר נבחר.'],
      ['דחסו', 'לחצו על דחיסת PDF. קודם מנסים הגדרות עדינות ואחר כך חזקות יותר עד שהקובץ מתאים.'],
      ['הורידו', 'בדקו את גודל הקובץ החדש והורידו את ה-PDF.'],
    ],
    useCases: [
      ['טופסי מבחנים ומשרות', 'פורטלי הגשה מקבלים לרוב מסמכים רק מתחת לגודל קבוע, למשל 100 KB או 200 KB.'],
      ['אתרים ממשלתיים ואתרי ויזה', 'העלו תעודות סרוקות, צילומי תעודת זהות ואסמכתאות שעומדים במגבלות גודל קפדניות.'],
      ['אימייל והודעות', 'שלחו קובצי PDF שמתאימים למגבלת הקבצים המצורפים ונפתחים מהר בטלפון.'],
    ],
    faq: [
      ['האם הקובץ באמת יהיה מתחת ל-{size}?', 'ברוב המקרים כן. מנסים הגדרות חזקות יותר עד שהקובץ מתאים. מסמך עם הרבה עמודים עשוי לא להגיע ל-{size}; תראו את הגודל הקטן ביותר שהושג, ותוכלו להסיר עמודים או לפצל את ה-PDF.'],
      ['האם האיכות תרד?', 'קבצים עם טקסט בלבד מתאימים לרוב בלי שינוי נראה לעין. כדי להגיע לגודל קטן מאוד, העמודים עשויים להפוך לתמונות ברזולוציה נמוכה: הם נשארים קריאים, אבל אי אפשר עוד לבחור או לחפש טקסט.'],
      ['האם הקובץ שלי מועלה?', 'לא. הדחיסה מתבצעת בדפדפן, במכשיר שלכם. ה-PDF לעולם לא נשלח לשרת.'],
      ['האם זה בחינם?', 'כן. בחינם, בלי הרשמה, בלי סימן מים ובלי מגבלה יומית.'],
    ],
  },
  it: {
    title: 'Comprimere PDF a {size}',
    meta: 'Comprimi un PDF a {size} o meno, gratis e nel browser. Ideale per concorsi, candidature di lavoro e siti della pubblica amministrazione. Senza caricare file.',
    intro: 'Molti moduli online, da concorsi e candidature a portali della pubblica amministrazione e delle università, accettano solo PDF sotto una dimensione fissa. Questa pagina comprime il tuo PDF a {size} o meno, direttamente nel browser.',
    privacy: 'Il tuo file non lascia mai il dispositivo. Si provano prima impostazioni leggere per mantenere il testo nitido; solo se serve, le pagine vengono convertite in immagini a risoluzione più bassa per raggiungere l’obiettivo.',
    otherSizes: 'Altre dimensioni:',
    steps: [
      ['Aggiungi il PDF', 'Trascina il PDF nel riquadro qui sopra o fai clic per sceglierlo. L’obiettivo di {size} è già selezionato.'],
      ['Comprimi', 'Fai clic su Comprimi PDF. Si provano prima impostazioni leggere, poi più forti finché il file rientra.'],
      ['Scarica', 'Controlla la nuova dimensione e scarica il PDF.'],
    ],
    useCases: [
      ['Concorsi e candidature', 'I portali di candidatura spesso accettano documenti solo sotto una dimensione fissa, come 100 KB o 200 KB.'],
      ['Siti della PA e per i visti', 'Carica certificati scansionati, copie del documento d’identità e giustificativi che rispettano limiti rigidi.'],
      ['Email e messaggi', 'Invia PDF che rientrano nel limite degli allegati e si aprono subito sul telefono.'],
    ],
    faq: [
      ['Il PDF sarà davvero sotto {size}?', 'Nella maggior parte dei casi sì. Si provano impostazioni più forti finché il file rientra. Un documento con molte pagine potrebbe non arrivare a {size}: vedrai la dimensione più piccola raggiunta e potrai eliminare pagine o dividere il PDF.'],
      ['La qualità peggiorerà?', 'I file di solo testo spesso rientrano senza differenze visibili. Per dimensioni molto piccole le pagine possono diventare immagini a risoluzione più bassa: restano leggibili, ma il testo non si può più selezionare né cercare.'],
      ['Il mio file viene caricato?', 'No. La compressione avviene nel browser, sul tuo dispositivo. Il PDF non viene mai inviato a un server.'],
      ['È gratis?', 'Sì. Gratis, senza registrazione, senza filigrana e senza limiti giornalieri.'],
    ],
  },
  id: {
    title: 'Kompres PDF ke {size}',
    meta: 'Kompres PDF ke {size} atau kurang, gratis di browser. Cocok untuk pendaftaran ujian, CPNS, lamaran kerja, dan situs pemerintah. Tanpa unggah, tanpa daftar.',
    intro: 'Banyak formulir online, mulai dari pendaftaran ujian dan lamaran kerja hingga portal pemerintah dan kampus, hanya menerima PDF di bawah ukuran tertentu. Halaman ini mengompres PDF Anda menjadi {size} atau kurang, langsung di browser.',
    privacy: 'File Anda tidak pernah keluar dari perangkat. Pengaturan ringan dicoba lebih dulu agar teks tetap tajam; hanya jika perlu, halaman diubah menjadi gambar beresolusi lebih rendah untuk mencapai target.',
    otherSizes: 'Ukuran lain:',
    steps: [
      ['Tambahkan PDF', 'Seret PDF ke kotak di atas atau klik untuk memilih. Target {size} sudah dipilih.'],
      ['Kompres', 'Klik Kompres PDF. Pengaturan ringan dicoba dulu, lalu yang lebih kuat sampai file muat.'],
      ['Unduh', 'Periksa ukuran file baru dan unduh PDF Anda.'],
    ],
    useCases: [
      ['Pendaftaran ujian dan lamaran kerja', 'Portal pendaftaran sering hanya menerima dokumen di bawah ukuran tertentu, misalnya 100 KB atau 200 KB.'],
      ['Situs pemerintah dan visa', 'Unggah ijazah hasil pindai, fotokopi KTP, dan dokumen pendukung yang memenuhi batas ukuran ketat.'],
      ['Email dan chat', 'Kirim PDF yang sesuai batas lampiran dan cepat dibuka di HP.'],
    ],
    faq: [
      ['Apakah PDF saya benar-benar akan di bawah {size}?', 'Pada sebagian besar kasus, ya. Pengaturan yang lebih kuat dicoba sampai file muat. Dokumen dengan banyak halaman mungkin tidak mencapai {size}; Anda akan melihat ukuran terkecil yang dicapai, lalu bisa menghapus halaman atau memisahkan PDF.'],
      ['Apakah kualitasnya turun?', 'File berisi teks biasanya muat tanpa perubahan yang terlihat. Untuk ukuran sangat kecil, halaman bisa diubah menjadi gambar beresolusi rendah: tetap terbaca, tetapi teks tidak bisa dipilih atau dicari lagi.'],
      ['Apakah file saya diunggah?', 'Tidak. Kompresi berjalan di browser pada perangkat Anda sendiri. PDF Anda tidak pernah dikirim ke server.'],
      ['Apakah gratis?', 'Ya. Gratis, tanpa daftar, tanpa watermark, dan tanpa batas harian.'],
    ],
  },
  vi: {
    title: 'Nén PDF xuống {size}',
    meta: 'Nén PDF xuống {size} hoặc nhỏ hơn, miễn phí ngay trên trình duyệt. Phù hợp hồ sơ thi cử, ứng tuyển việc làm và cổng dịch vụ công. Không tải lên, không đăng ký.',
    intro: 'Nhiều biểu mẫu trực tuyến, từ đăng ký thi, ứng tuyển việc làm đến cổng dịch vụ công và trường đại học, chỉ nhận PDF dưới một dung lượng nhất định. Trang này nén PDF của bạn xuống {size} hoặc nhỏ hơn, ngay trong trình duyệt.',
    privacy: 'Tệp của bạn không bao giờ rời khỏi thiết bị. Các thiết lập nhẹ được thử trước để chữ vẫn sắc nét; chỉ khi cần, các trang mới được chuyển thành hình ảnh độ phân giải thấp hơn để đạt mục tiêu.',
    otherSizes: 'Kích thước khác:',
    steps: [
      ['Thêm PDF', 'Kéo tệp PDF vào ô phía trên hoặc bấm để chọn. Mục tiêu {size} đã được chọn sẵn.'],
      ['Nén', 'Bấm Nén PDF. Thiết lập nhẹ được thử trước, sau đó mạnh dần cho đến khi tệp vừa dung lượng.'],
      ['Tải xuống', 'Kiểm tra dung lượng mới và tải PDF về.'],
    ],
    useCases: [
      ['Hồ sơ thi và ứng tuyển', 'Cổng nộp hồ sơ thường chỉ nhận tài liệu dưới một dung lượng cố định, như 100 KB hoặc 200 KB.'],
      ['Cổng dịch vụ công và thị thực', 'Tải lên bằng cấp đã scan, bản sao CCCD và giấy tờ chứng minh đáp ứng giới hạn dung lượng nghiêm ngặt.'],
      ['Email và tin nhắn', 'Gửi PDF vừa giới hạn tệp đính kèm và mở nhanh trên điện thoại.'],
    ],
    faq: [
      ['PDF của tôi có thật sự dưới {size} không?', 'Trong hầu hết trường hợp là có. Thiết lập mạnh hơn được thử cho đến khi tệp vừa. Tài liệu nhiều trang có thể không đạt {size}; bạn sẽ thấy dung lượng nhỏ nhất đạt được và có thể xóa bớt trang hoặc tách PDF.'],
      ['Chất lượng có giảm không?', 'Tệp chỉ có chữ thường vừa dung lượng mà không thay đổi rõ rệt. Để đạt kích thước rất nhỏ, các trang có thể thành hình ảnh độ phân giải thấp: vẫn đọc được nhưng không chọn hay tìm kiếm chữ được nữa.'],
      ['Tệp của tôi có bị tải lên không?', 'Không. Việc nén diễn ra trong trình duyệt trên thiết bị của bạn. PDF không bao giờ được gửi lên máy chủ.'],
      ['Có miễn phí không?', 'Có. Miễn phí, không cần đăng ký, không hình mờ và không giới hạn mỗi ngày.'],
    ],
  },
  ro: {
    title: 'Comprimă PDF la {size}',
    meta: 'Comprimă un PDF la {size} sau mai puțin, gratuit, în browser. Ideal pentru înscrieri la examene, joburi și site-uri guvernamentale. Fără încărcare, fără cont.',
    intro: 'Multe formulare online, de la înscrieri la examene și aplicații pentru joburi până la portaluri guvernamentale și universitare, acceptă doar PDF-uri sub o anumită dimensiune. Această pagină îți comprimă PDF-ul la {size} sau mai puțin, direct în browser.',
    privacy: 'Fișierul tău nu părăsește niciodată dispozitivul. Se încearcă mai întâi setări blânde pentru un text clar; doar dacă e nevoie, paginile sunt transformate în imagini cu rezoluție mai mică pentru a atinge ținta.',
    otherSizes: 'Alte dimensiuni:',
    steps: [
      ['Adaugă PDF-ul', 'Trage PDF-ul în caseta de mai sus sau dă clic pentru a-l alege. Ținta de {size} este deja selectată.'],
      ['Comprimă', 'Dă clic pe Comprimă PDF. Se încearcă întâi setări blânde, apoi mai puternice, până când fișierul se încadrează.'],
      ['Descarcă', 'Verifică noua dimensiune și descarcă PDF-ul.'],
    ],
    useCases: [
      ['Examene și aplicații pentru joburi', 'Portalurile de înscriere acceptă adesea documente doar sub o dimensiune fixă, cum ar fi 100 KB sau 200 KB.'],
      ['Site-uri guvernamentale și de vize', 'Încarcă diplome scanate, copii după actul de identitate și documente justificative care respectă limite stricte.'],
      ['E-mail și mesagerie', 'Trimite PDF-uri care se încadrează în limita atașamentelor și se deschid rapid pe telefon.'],
    ],
    faq: [
      ['PDF-ul va fi chiar sub {size}?', 'În majoritatea cazurilor, da. Se încearcă setări mai puternice până când fișierul se încadrează. Un document cu multe pagini s-ar putea să nu ajungă la {size}; vei vedea cea mai mică dimensiune obținută și poți elimina pagini sau împărți PDF-ul.'],
      ['Va scădea calitatea?', 'Fișierele doar cu text se încadrează de obicei fără diferențe vizibile. Pentru dimensiuni foarte mici, paginile pot deveni imagini cu rezoluție mai mică: rămân lizibile, dar textul nu mai poate fi selectat sau căutat.'],
      ['Fișierul meu este încărcat?', 'Nu. Comprimarea are loc în browser, pe dispozitivul tău. PDF-ul nu este trimis niciodată la un server.'],
      ['Este gratuit?', 'Da. Gratuit, fără cont, fără filigran și fără limită zilnică.'],
    ],
  },
  pl: {
    title: 'Kompresuj PDF do {size}',
    meta: 'Skompresuj PDF do {size} lub mniej, za darmo w przeglądarce. Idealne do rekrutacji, zapisów na egzaminy i stron urzędowych. Bez wysyłania pliku i rejestracji.',
    intro: 'Wiele formularzy online, od rekrutacji i zapisów na egzaminy po portale urzędowe i uczelniane, przyjmuje tylko pliki PDF poniżej określonego rozmiaru. Ta strona kompresuje Twój PDF do {size} lub mniej, bezpośrednio w przeglądarce.',
    privacy: 'Twój plik nigdy nie opuszcza urządzenia. Najpierw próbujemy łagodnych ustawień, by tekst pozostał wyraźny; tylko w razie potrzeby strony są zamieniane na obrazy o niższej rozdzielczości, aby osiągnąć cel.',
    otherSizes: 'Inne rozmiary:',
    steps: [
      ['Dodaj PDF', 'Przeciągnij PDF do pola powyżej lub kliknij, aby go wybrać. Cel {size} jest już ustawiony.'],
      ['Kompresuj', 'Kliknij Kompresuj PDF. Najpierw próbowane są łagodne ustawienia, potem mocniejsze, aż plik się zmieści.'],
      ['Pobierz', 'Sprawdź nowy rozmiar i pobierz PDF.'],
    ],
    useCases: [
      ['Rekrutacje i zapisy na egzaminy', 'Portale rekrutacyjne często przyjmują dokumenty tylko poniżej stałego rozmiaru, np. 100 KB lub 200 KB.'],
      ['Strony urzędowe i wizowe', 'Wysyłaj zeskanowane świadectwa, kopie dowodu osobistego i zaświadczenia mieszczące się w ścisłych limitach.'],
      ['E-mail i komunikatory', 'Wysyłaj PDF-y, które mieszczą się w limicie załączników i szybko otwierają się na telefonie.'],
    ],
    faq: [
      ['Czy mój PDF naprawdę będzie mniejszy niż {size}?', 'W większości przypadków tak. Próbowane są coraz mocniejsze ustawienia, aż plik się zmieści. Dokument z wieloma stronami może nie osiągnąć {size}; zobaczysz najmniejszy uzyskany rozmiar i możesz usunąć strony lub podzielić PDF.'],
      ['Czy jakość spadnie?', 'Pliki z samym tekstem zwykle mieszczą się bez widocznej zmiany. Przy bardzo małych rozmiarach strony mogą zostać zamienione na obrazy o niższej rozdzielczości: są czytelne, ale tekstu nie da się już zaznaczyć ani przeszukać.'],
      ['Czy mój plik jest wysyłany?', 'Nie. Kompresja odbywa się w przeglądarce, na Twoim urządzeniu. PDF nigdy nie trafia na serwer.'],
      ['Czy to jest darmowe?', 'Tak. Za darmo, bez rejestracji, bez znaku wodnego i bez dziennego limitu.'],
    ],
  },
  cs: {
    title: 'Komprimovat PDF na {size}',
    meta: 'Zkomprimujte PDF na {size} nebo méně, zdarma v prohlížeči. Ideální pro přihlášky ke zkouškám, pracovní portály a úřední weby. Bez nahrávání a registrace.',
    intro: 'Mnoho online formulářů, od přihlášek ke zkouškám a do zaměstnání až po úřední a univerzitní portály, přijímá jen PDF pod pevně danou velikostí. Tato stránka zkomprimuje vaše PDF na {size} nebo méně, přímo v prohlížeči.',
    privacy: 'Soubor nikdy neopustí vaše zařízení. Nejprve se zkoušejí šetrná nastavení, aby text zůstal ostrý; jen když je to nutné, převedou se stránky na obrázky s nižším rozlišením, aby se dosáhlo cíle.',
    otherSizes: 'Další velikosti:',
    steps: [
      ['Přidejte PDF', 'Přetáhněte PDF do pole výše nebo klikněte a vyberte jej. Cíl {size} je už nastaven.'],
      ['Komprimujte', 'Klikněte na Komprimovat PDF. Nejprve se zkoušejí šetrná nastavení, pak silnější, dokud se soubor nevejde.'],
      ['Stáhněte', 'Zkontrolujte novou velikost a stáhněte PDF.'],
    ],
    useCases: [
      ['Přihlášky ke zkouškám a do zaměstnání', 'Portály pro přihlášky často přijímají dokumenty jen pod pevnou velikostí, například 100 KB nebo 200 KB.'],
      ['Úřední a vízové weby', 'Nahrajte naskenovaná vysvědčení, kopie průkazů a doklady splňující přísné limity.'],
      ['E-mail a zprávy', 'Posílejte PDF, která se vejdou do limitu příloh a rychle se otevřou v telefonu.'],
    ],
    faq: [
      ['Bude moje PDF opravdu pod {size}?', 'Ve většině případů ano. Zkoušejí se silnější nastavení, dokud se soubor nevejde. Dokument s mnoha stránkami nemusí {size} dosáhnout; uvidíte nejmenší dosaženou velikost a můžete odstranit stránky nebo PDF rozdělit.'],
      ['Sníží se kvalita?', 'Čistě textové soubory se obvykle vejdou bez viditelné změny. Pro velmi malé velikosti se stránky mohou převést na obrázky s nižším rozlišením: zůstanou čitelné, ale text už nepůjde označit ani vyhledat.'],
      ['Nahrává se můj soubor?', 'Ne. Komprese probíhá ve vašem prohlížeči, na vašem zařízení. PDF se nikdy neodesílá na server.'],
      ['Je to zdarma?', 'Ano. Zdarma, bez registrace, bez vodoznaku a bez denního limitu.'],
    ],
  },
  hi: {
    title: 'PDF को {size} में कम्प्रेस करें',
    meta: 'PDF को {size} या उससे कम में मुफ़्त कम्प्रेस करें, सीधे ब्राउज़र में। परीक्षा फ़ॉर्म, नौकरी पोर्टल और सरकारी वेबसाइटों के लिए बढ़िया। न अपलोड, न साइन-अप।',
    intro: 'परीक्षा और नौकरी के आवेदन से लेकर सरकारी और यूनिवर्सिटी पोर्टल तक, कई ऑनलाइन फ़ॉर्म तय साइज़ से छोटी PDF ही स्वीकार करते हैं। यह पेज आपकी PDF को सीधे ब्राउज़र में {size} या उससे कम में कम्प्रेस करता है।',
    privacy: 'आपकी फ़ाइल कभी आपके डिवाइस से बाहर नहीं जाती। टेक्स्ट को साफ़ रखने के लिए पहले हल्की सेटिंग आज़माई जाती हैं; ज़रूरत पड़ने पर ही पेज कम रिज़ॉल्यूशन की इमेज में बदले जाते हैं ताकि लक्ष्य तक पहुँचा जा सके।',
    otherSizes: 'अन्य साइज़:',
    steps: [
      ['PDF जोड़ें', 'PDF को ऊपर वाले बॉक्स में खींचें या चुनने के लिए क्लिक करें। {size} का लक्ष्य पहले से चुना हुआ है।'],
      ['कम्प्रेस करें', 'Compress PDF पर क्लिक करें। पहले हल्की सेटिंग आज़माई जाती हैं, फिर फ़ाइल फ़िट होने तक मज़बूत सेटिंग।'],
      ['डाउनलोड करें', 'नया फ़ाइल साइज़ देखें और अपनी PDF डाउनलोड करें।'],
    ],
    useCases: [
      ['परीक्षा और नौकरी के फ़ॉर्म', 'आवेदन पोर्टल अक्सर तय साइज़ से छोटे दस्तावेज़ ही लेते हैं, जैसे 100 KB या 200 KB।'],
      ['सरकारी और वीज़ा वेबसाइटें', 'स्कैन किए प्रमाणपत्र, पहचान पत्र की कॉपी और प्रमाण सख़्त साइज़ सीमा के अंदर अपलोड करें।'],
      ['ईमेल और मैसेजिंग', 'ऐसी PDF भेजें जो अटैचमेंट सीमा में फ़िट हो और फ़ोन पर जल्दी खुले।'],
    ],
    faq: [
      ['क्या मेरी PDF सच में {size} से कम होगी?', 'ज़्यादातर मामलों में हाँ। फ़ाइल फ़िट होने तक मज़बूत सेटिंग आज़माई जाती हैं। बहुत ज़्यादा पेज वाला दस्तावेज़ शायद {size} तक न पहुँचे; तब आपको सबसे छोटा साइज़ दिखेगा, और आप कुछ पेज हटा सकते हैं या PDF को बाँट सकते हैं।'],
      ['क्या क्वालिटी कम होगी?', 'सिर्फ़ टेक्स्ट वाली फ़ाइलें अक्सर बिना दिखने वाले बदलाव के फ़िट हो जाती हैं। बहुत छोटे साइज़ के लिए पेज कम रिज़ॉल्यूशन की इमेज बन सकते हैं: पढ़ने में साफ़ रहते हैं, लेकिन टेक्स्ट चुना या खोजा नहीं जा सकेगा।'],
      ['क्या मेरी फ़ाइल अपलोड होती है?', 'नहीं। कम्प्रेशन आपके अपने डिवाइस के ब्राउज़र में होता है। आपकी PDF कभी किसी सर्वर पर नहीं भेजी जाती।'],
      ['क्या यह मुफ़्त है?', 'हाँ। मुफ़्त, बिना साइन-अप, बिना वॉटरमार्क और बिना रोज़ की सीमा के।'],
    ],
  },
};

/**
 * Page content for a preset in the given locale, in the same shape as a
 * tool's content so the standard tool page layout can render it.
 */
export function getCompressPresetContent(locale: Locale, preset: CompressPreset): ToolContent {
  const s = STRINGS[locale] ?? STRINGS.en;
  const size = formatPresetSize(preset.kb, locale);
  const fill = (text: string) => text.split('{size}').join(size);

  const otherLinks = COMPRESS_PRESETS.filter((p) => p.slug !== preset.slug)
    .map((p) => `<a href="/${locale}/compress-pdf-to/${p.slug}/">${fill(s.title.replace('{size}', formatPresetSize(p.kb, locale)))}</a>`)
    .join(' · ');

  return {
    title: fill(s.title),
    metaDescription: fill(s.meta),
    keywords: [`compress pdf to ${preset.slug}`, `pdf ${preset.slug}`, `reduce pdf size to ${preset.slug}`],
    description: `<p>${fill(s.intro)}</p><p>${fill(s.privacy)}</p><p><strong>${s.otherSizes}</strong> ${otherLinks}</p>`,
    howToUse: s.steps.map(([title, description], i) => ({ step: i + 1, title: fill(title), description: fill(description) })),
    useCases: s.useCases.map(([title, description]) => ({ title: fill(title), description: fill(description), icon: 'file' })),
    faq: s.faq.map(([question, answer]) => ({ question: fill(question), answer: fill(answer) })),
  };
}
