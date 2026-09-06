import { readFileSync, writeFileSync, mkdirSync } from 'fs';

export const SITE = 'https://wibe.site';

/* дата: язык → папка. en-US живёт на корне, ru-BY обслуживается папкой ru */
export const DIRS = [
  { dir: 'ru',    code: 'ru-RU' },
  { dir: 'en-gb', code: 'en-GB' },
  { dir: 'pl',    code: 'pl-PL' },
  { dir: 'de',    code: 'de-DE' },
  { dir: 'zh',    code: 'zh-CN' },
  { dir: 'ja',    code: 'ja-JP' },
  { dir: 'kk',    code: 'kk-KZ' },
  { dir: 'uz',    code: 'uz-UZ' },
  { dir: 'ka',    code: 'ka-GE' },
  { dir: 'he',    code: 'he-IL' },
  { dir: 'hy',    code: 'hy-AM' },
  { dir: 'az',    code: 'az-AZ' },
  { dir: 'ky',    code: 'ky-KG' },
  { dir: 'tg',    code: 'tg-TJ' },
  { dir: 'tk',    code: 'tk-TM' },
  { dir: 'ro',    code: 'ro-MD' }
];

/* все коды для hreflang: сначала корневой en-US, затем папки */
export const CODES = ['en-US'].concat(DIRS.map(d => d.code));

export function dirOf(code) {
  if (code === 'en-US') return null;
  if (code === 'ru-BY') return 'ru';
  return (DIRS.find(d => d.code === code) || {}).dir || null;
}

export function urlFor(code, page, overrideDir) {
  const dir = overrideDir !== undefined ? overrideDir : dirOf(code);
  if (page === '') return dir ? `${SITE}/${dir}/` : `${SITE}/`;
  return dir ? `${SITE}/${dir}/${page}` : `${SITE}/${page}`;
}

export function hreflang(page) {
  const lines = CODES.map(c =>
    `<link rel="alternate" hreflang="${c}" href="${urlFor(c, page)}">`
  ).join('\n');
  const og = CODES.map(c =>
    `<meta property="og:locale:alternate" content="${c.replace('-', '_')}">`
  ).join('\n');
  return `<!-- hrl:start -->\n${lines}\n<link rel="alternate" hreflang="x-default" href="${urlFor('en-US', page)}">\n${og}\n<!-- hrl:end -->`;
}

export const INDEX_META = {
  'ru-RU': ['WIBE — сайты и ИИ-решения для бизнеса', 'Сайты, чат-боты, голосовые помощники и мини-приложения на ИИ. Прозрачные цены от $100, честные сроки, поддержка после запуска.'],
  'ru-BY': ['WIBE — сайты и ИИ-решения для бизнеса', 'Сайты, чат-боты, голосовые помощники и мини-приложения на ИИ. Прозрачные цены от $100, честные сроки, поддержка после запуска.'],
  'en-US': ['WIBE — AI Websites, Bots & Mini-Apps', 'AI websites, chatbots, voice assistants and mini-apps for business. Transparent pricing from $100, honest timelines, post-launch support.'],
  'en-GB': ['WIBE — AI Websites, Bots & Mini-Apps', 'AI websites, chatbots, voice assistants and mini-apps for business. Clear pricing from $100, honest timelines and post-launch support.'],
  'pl-PL': ['WIBE — strony i AI dla firm', 'Strony, chatboty, asystenci głosowi i miniaplikacje AI. Przejrzyste ceny od $100, uczciwe terminy, wsparcie po starcie.'],
  'de-DE': ['WIBE — Websites & KI fürs Unternehmen', 'KI-Websites, Chatbots, Sprachassistenten und Mini-Apps. Transparente Preise ab 100 $, ehrliche Fristen, Support nach dem Start.'],
  'zh-CN': ['WIBE — 网站与人工智能解决方案', 'AI 网站、聊天机器人、语音助手和小程序。价格透明，从 100 美元起，诚实的工期和上线后支持。'],
  'ja-JP': ['WIBE — ウェブサイトとAIソリューション', 'AIサイト、チャットボット、音声アシスタント、ミニアプリ。100ドルからの明朗会計、誠実な納期、リリース後のサポート。'],
  'kk-KZ': ['WIBE — сайттар және AI-шешімдер', 'AI сайттар, чат-боттар, дауыс көмекшілер және мини-қосымшалар. Мөлдір бағалар $100-ден, адал мерзімдер, іске қосқан соң қолдау.'],
  'uz-UZ': ['WIBE — saytlar va AI yechimlar', 'AI saytlar, chatbotlar, ovozli yordamchilar va mini-ilovalar. Shaffof narxlar $100 dan, halol muddatlar, ishga tushgach qo‘llab-quvvatlash.'],
  'ka-GE': ['WIBE — ვებსაიტები და AI გადაწყვეტილებები', 'AI ვებსაიტები, ჩეთბოტები, ხმოვანი ასისტენტები და მინი-აპები. გამჭვირვალე ფასები, პატიოსანი ვადები, მხარდაჭერა.'],
  'he-IL': ['WIBE — אתרים ופתרונות AI', 'אתרי AI, צ׳אטבוטים, עוזרים קוליים ויישומונים. מחירים שקופים, לוחות זמנים כן, תמיכה לאחר ההשקה.'],
  'hy-AM': ['WIBE — կայքեր և AI լուծումներ', 'AI կայքեր, չաթ-բոտեր, ձայնային օգնականներ և մինի-հավելվածներ։ Թափանցիկ գներ, ազնիվ ժամկետներ, օժանդակություն։'],
  'az-AZ': ['WIBE — vebsaytlar və AI həlləri', 'AI vebsaytlar, çatbotlar, səs köməkçiləri və mini-tətbiqlər. Şəffaf qiymətlər, dürüst müddətlər, dəstək.'],
  'ky-KG': ['WIBE — сайттар жана AI чечимдер', 'AI сайттар, чат-боттор, үн жардамчылары жана мини-тиркемелер. Ачык баалар, ак ниет мөөнөттөр, колдоо.'],
  'tg-TJ': ['WIBE — вебсайтҳо ва ҳалли AI', 'Вебсайтҳои AI, чатботҳо, ёварони савтӣ ва мини-барномаҳо. Нархҳои шаффоф, муҳлатҳои бовиҷдон, дастгирӣ.'],
  'tk-TM': ['WIBE — web-sahypalar we AI çözgütler', 'AI web-sahypalar, çatbotlar, sesli kömekçiler we mini-goşundylar. Açyk bahalar, dogry möhletler, goldaw.'],
  'ro-MD': ['WIBE — site-uri și soluții AI', 'Site-uri AI, chatbot-uri, asistenți vocali și mini-aplicații. Prețuri transparente, termene oneste, suport.']
};

/* Кейсы: фрагмент title + описание на каждый язык */
const CASE_META_RAW = {
  'case-ecom.html': {
    'ru-RU': ['Кейс: AI-ассистент продаж — +34% к конверсии', 'AI-ассистент продаж для интернет-магазина: консультации 24/7, допродажи, рост среднего чека — без операторов.'],
    'en-US': ['Case study: AI sales assistant — +34% conversion', 'AI sales assistant for e-commerce: 24/7 consultations, upsells and higher average order value without operators.'],
    'en-GB': ['Case study: AI sales assistant — +34% conversion', 'AI sales assistant for e-commerce: 24/7 consultations, upsells and a higher average basket without operators.'],
    'pl-PL': ['Case study: AI asystent sprzedaży — +34% konwersji', 'AI asystent sprzedaży dla e-commerce: konsultacje 24/7, sprzedaż krzyżowa, wyższy koszyk — bez operatorów.'],
    'de-DE': ['Case study: KI-Verkaufsassistent — +34 % Conversion', 'KI-Verkaufsassistent für den Onlineshop: 24/7-Beratung, Upselling, höherer Warenkorb — ohne Operatoren.'],
    'zh-CN': ['案例：AI 销售助手 — 转化率提升 34%', '电商 AI 销售助手：7x24 咨询、追加销售、提升客单价——无需人工坐席。'],
    'ja-JP': ['導入事例：AI販売アシスタント — 成約率+34%', 'EC向けAI販売アシスタント：24時間対応、アップセル、客単価アップをオペレーターなしで実現。'],
    'kk-KZ': ['Кейс: AI сату ассистенті — конверсия +34%', 'Интернет-дүкенге AI сату ассистенті: 24/7 кеңес, қосымша сату, орташа чекті арттыру.'],
    'uz-UZ': ['Case study: AI savdo yordamchisi — +34% konversiya', 'Onlayn do‘konga AI savdo yordamchisi: 24/7 maslahat, qo‘shimcha sotuvlar, o‘rtacha chekni oshirish.'],
    'ka-GE': ['ქეისი: AI გაყიდვების ასისტენტი — +34% კონვერსია', 'AI გაყიდვების ასისტენტი ონლაინ მაღაზიისთვის: 24/7 კონსულტაცია, აპსელი, საშუალო ჩეკის ზრდა.'],
    'he-IL': ['מקרה בוחן: עוזר מכירות AI — +34% המרה', 'עוזר מכירות AI לחנות מקוונת: ייעוץ 24/7, upsell והגדלת סל הקניות ללא נציגים.'],
    'hy-AM': ['Քեյս՝ AI վաճառքի ասիստենտ — +34% փոխարկում', 'AI վաճառքի ասիստենտ առցանց խանութի համար՝ խորհրդատվություն 24/7, աճի վաճառք, միջին չեկի աճ։'],
    'az-AZ': ['Case study: AI satış köməkçisi — +34% konversiya', 'Onlayn mağaza üçün AI satış köməkçisi: 24/7 məsləhət, əlavə satışlar, orta çekin artması.'],
    'ky-KG': ['Кейс: AI сату жардамчысы — конверсия +34%', 'Интернет-дүкен үчүн AI сату жардамчысы: 24/7 кеңеш, кошумча сатуу, орточо чекти көбөйтүү.'],
    'tg-TJ': ['Кейс: ёвари фурӯши AI — +34% ба конверсия', 'Ёвари фурӯши AI барои мағозаи онлайн: маслиҳат 24/7, фурӯши иловагӣ, боло рафтани чек.'],
    'tk-TM': ['Case study: AI satuw kömekçisi — +34% konwersiýa', 'Onlaýn dükany üçin AI satuw kömekçisi: 24/7 maslahat, goşmaça satuwlar, çeki ýokarlandyrmak.'],
    'ro-MD': ['Caz de studiu: asistent de vânzări AI — +34% conversie', 'Asistent de vânzări AI pentru magazinul online: consultanță 24/7, upsell și creșterea coșului mediu.']
  },
  'case-logistics.html': {
    'ru-RU': ['Кейс: автоматизация документооборота — −85% ручной работы', 'LLM решает накладные в любом формате, сверяет данные и заносит их в ERP: −85% ручной обработки, ошибки ниже в 9 раз.'],
    'en-US': ['Case study: document workflow automation — 85% less manual work', 'An LLM reads waybills in any format, checks data and enters records into the ERP: 85% less manual work, 9x fewer errors.'],
    'en-GB': ['Case study: document automation — 85% less manual work', 'An LLM reads consignment notes in any format, verifies data and updates the ERP: 85% less manual work, 9x fewer errors.'],
    'pl-PL': ['Case study: automatyzacja dokumentów — −85% pracy ręcznej', 'LLM czyta listy przewozowe w każdym formacie, weryfikuje dane i wprowadza je do ERP: −85% pracy ręcznej, 9x mniej błędów.'],
    'de-DE': ['Case study: Automatisierung der Dokumente — 85 % weniger Handarbeit', 'Ein LLM liest Frachtbriefe in jedem Format, prüft Daten und pflegt sie in die ERP ein: 85 % weniger Handarbeit, 9x weniger Fehler.'],
    'zh-CN': ['案例：单据自动化 — 减少 85% 手工操作', 'LLM 可读取任意格式的运单、核对数据并录入 ERP：手工处理减少 85%，错误率降至 1/9。'],
    'ja-JP': ['導入事例：書類業務の自動化 — 手作業85%削減', 'LLMがあらゆる形式の納品書を読み取り、データを照合してERPに登録：手作業85%削減、エラー9分の1。'],
    'kk-KZ': ['Кейс: құжат айналымын автоматтандыру — қол еңбегі −85%', 'LLM кез келген форматтағы жүк құжаттарын оқып, деректерді салыстырып ERP-ге енгізеді: қол еңбегі −85%, қателер 9 есе аз.'],
    'uz-UZ': ['Case study: hujjatlar aylanishini avtomatlashtirish — qo‘l ishi −85%', 'LLM istalgan formatdagi yuk hujjatlarini o‘qib, ma’lumotlarni tekshirib ERPga kiritadi: qo‘l ishi −85%, xatolar 9 baravar kam.'],
    'ka-GE': ['ქეისი: დოკუმენტბრუნვის ავტომატიზაცია — ხელით შრომა −85%', 'LLM კითხულობს საბუთებს ნებისმიერ ფორმატში, ამოწმებს მონაცემებს და შეაქვს ERP-ში: ხელით −85%, შეცდომები 9-ჯერ ნაკლები.'],
    'he-IL': ['מקרה בוחן: אוטומציית מסמכים — 85% פחות עבודה ידנית', 'ה-LLM קורא שטרות בכל פורמט, מאמת נתונים ומזין ל-ERP: 85% פחות עבודה ידנית, פי 9 פחות שגיאות.'],
    'hy-AM': ['Քեյս՝ փաստաթղթաշրջանառության ավտոմատացում — ձեռքով աշխատանք −85%', 'LLM-ը կարդում է փաստաթղթերը ցանկացած ձևաչափով, ստուգում տվյալները և մուտքագրում ERP. ձեռքով −85%, սխալներն՝ 9 անգամ քիչ։'],
    'az-AZ': ['Case study: sənəd dövriyyəsinin avtomatlaşdırılması — əl işi −85%', 'LLM yük sənədlərini istənilən formatda oxuyur, məlumatları yoxlayıb ERP-yə daxil edir: əl işi −85%, səhvlər 9 dəfə az.'],
    'ky-KG': ['Кейс: документтер круламдуу автоматташтыруу — кол эмгеги −85%', 'LLM жүк документтерин каалаган форматта окуп, маалыматтарды текшерип ERPге киргизет: кол эмгеги −85%, каталар 9 эсе аз.'],
    'tg-TJ': ['Кейс: автоматикунонии ҳуҷатгардонӣ — кори дастӣ −85%', 'LLM ҳуҷҷатҳоро дар ҳар формат мехонад, маълумотро тафтиш мекунад ва ба ERP ворид мекунад: кори дастӣ −85%, хатогиҳо 9 маротиба кам.'],
    'tk-TM': ['Case study: resminamalary awtomatlaşdyrmak — əl işi −85%', 'LLM ýük resminamalaryny islendik formatda okaýar, maglumatlary barlaýar we ERP-e ýazýar: əl işi −85%, ýalňyşlyklar 9 esse az.'],
    'ro-MD': ['Caz de studiu: automatizarea documentelor — cu 85% mai puțin manual', 'LLM-ul citește avizele în orice format, verifică datele și le introduce în ERP: 85% mai puțin manual, de 9 ori mai puține erori.']
  },
  'case-media.html': {
    'ru-RU': ['Кейс: контент-конвейер — ×12 к скорости', 'Генеративный AI-конвейер для медиа: десятки креативов в день вместо трёх, −60% затрат на производство контента.'],
    'en-US': ['Case study: content pipeline — 12x faster', 'A generative AI pipeline for media: dozens of creatives a day instead of three, 60% lower content production costs.'],
    'en-GB': ['Case study: content pipeline — 12x faster', 'A generative AI pipeline for media teams: dozens of creatives a day instead of three, 60% lower content costs.'],
    'pl-PL': ['Case study: pipeline treści — ×12 szybciej', 'Generatywny pipeline AI dla mediów: dziesiątki kreacji dziennie zamiast trzech, −60% kosztów produkcji treści.'],
    'de-DE': ['Case study: Content-Pipeline — 12x schneller', 'Generative KI-Pipeline für Medien: Dutzende Creatives am Tag statt drei, 60 % weniger Contentkosten.'],
    'zh-CN': ['案例：内容流水线 — 速度提升 12 倍', '面向媒体的生成式 AI 流水线：每天产出几十个创意而非三个，内容制作成本降低 60%。'],
    'ja-JP': ['導入事例：コンテンツパイプライン — 12倍の速さ', 'メディア向け生成AIパイプライン：1日で数十のクリエイティブ、コンテンツ費用60%削減。'],
    'kk-KZ': ['Кейс: контент-конвейер — жылдамдық ×12', 'Медиаға арналған генеративті AI конвейері: күніне үшеудің орнына ондаған креатив, контент шығыны −60%.'],
    'uz-UZ': ['Case study: kontent konveyeri — ×12 tezroq', 'Media uchun generativ AI konveyeri: kuniga uchta o‘rniga o‘nlab kreativ, kontent xarajatlari −60%.'],
    'ka-GE': ['ქეისი: კონტენტ-კონვეიერი — ×12 სისწრაფე', 'გენერაციული AI-კონვეიერი მედიისთვის: დღეში ათობით კრეატივი, კონტენტის ხარჯები −60%.'],
    'he-IL': ['מקרה בוחן: קו ייצור תוכן — מהירות ×12', 'קו ייצור AI גנרטיבי למדיה: עשרות קריאייטיבים ביום, עלויות תוכן −60%.'],
    'hy-AM': ['Քեյս՝ կոնտենտ-կոնվեյեր — արագություն ×12', 'Գեներատիվ AI-կոնվեյեր մեդիայի համար. օրական տասնյակ կրեատիվներ, կոնտենտի ծախսեր −60%։'],
    'az-AZ': ['Case study: kontent konveyeri — ×12 sürət', 'Media üçün generativ AI konveyeri: gündə üç əvəzinə onlarla kreativ, kontent xərcləri −60%.'],
    'ky-KG': ['Кейс: контент-конвейер — ылдамдык ×12', 'Медиа үчүн генеративдик AI конвейери: күнүнө үчөөнүн ордуна ондогон креатив, контент чыгымы −60%.'],
    'tg-TJ': ['Кейс: конвейери контент — суръат ×12', 'Конвейери генеративии AI барои ВАО: рӯзе даҳҳо креатив ба ҷои се, хароҷоти контент −60%.'],
    'tk-TM': ['Case study: kontent konweýeri — ×12 çaltlyk', 'Metbugat üçin generatiw AI konweýeri: günde üçüň ýerine onlarça kreatiw, kontent çykdajylary −60%.'],
    'ro-MD': ['Caz de studiu: pipeline de conținut — de 12 ori mai rapid', 'Un pipeline AI generativ pentru media: zeci de creative pe zi, costuri de conținut reduse cu 60%.']
  }
};

/* ru-BY и en-GB наследуют базовые тексты там, где вариант уже указан */
const CASE_META = {};
for (const page of Object.keys(CASE_META_RAW)) {
  CASE_META[page] = {};
  for (const code of CODES) {
    if (CASE_META_RAW[page][code]) CASE_META[page][code] = CASE_META_RAW[page][code];
    else if (code === 'ru-BY') CASE_META[page][code] = CASE_META_RAW[page]['ru-RU'];
    else if (code === 'en-GB') CASE_META[page][code] = CASE_META_RAW[page]['en-US'];
  }
}

export const PORTFOLIO_META = {
  'ru-RU': ['Портфолио сайтов — WIBE', 'Кейсы и демо-проекты WIBE: интернет-магазины, логистика, медиа, юриспруденция, финтех, фитнес, кофе.', 'Портфолио WIBE', 'Проекты и кейсы AI digital agency WIBE.', 'Главная', 'Портфолио'],
  'ru-BY': ['Портфолио сайтов — WIBE', 'Кейсы и демо-проекты WIBE: интернет-магазины, логистика, медиа, юриспруденция, финтех, фитнес, кофе.', 'Портфолио WIBE', 'Проекты и кейсы AI digital agency WIBE.', 'Главная', 'Портфолио'],
  'en-US': ['Portfolio of websites — WIBE', 'WIBE cases and demo projects: e-commerce, logistics, media, law, fintech, fitness, coffee.', 'WIBE portfolio', 'Projects and case studies of WIBE AI digital agency.', 'Home', 'Portfolio'],
  'en-GB': ['Portfolio of websites — WIBE', 'WIBE cases and demo projects: e-commerce, logistics, media, law, fintech, fitness, coffee.', 'WIBE portfolio', 'Projects and case studies of WIBE AI digital agency.', 'Home', 'Portfolio'],
  'pl-PL': ['Portfolio stron — WIBE', 'Przykłady i demo-projekty WIBE: e-commerce, logistyka, media, prawo, fintech, fitness, kawa.', 'Portfolio WIBE', 'Projekty i case studies AI digital agency WIBE.', 'Strona główna', 'Portfolio'],
  'de-DE': ['Portfolio — WIBE', 'WIBE-Projekte und Demos: E-Commerce, Logistik, Medien, Recht, Fintech, Fitness, Kaffee.', 'WIBE-Portfolio', 'Projekte und Case Studies von WIBE AI digital agency.', 'Startseite', 'Portfolio'],
  'zh-CN': ['作品集 — WIBE', 'WIBE案例和演示项目：电商、物流、媒体、法律、金融科技、健身、咖啡。', 'WIBE 作品集', 'WIBE AI 数字机构的项目与案例。', '首页', '作品集'],
  'ja-JP': ['ポートフォリオ — WIBE', 'WIBEの実績・デモサイト集：EC・物流・メディア・法律・フィンテック・フィットネス・コーヒー。', 'WIBEポートフォリオ', 'WIBE AIデジタルエージェンシーのプロジェクトと事例。', 'ホーム', 'ポートフォリオ'],
  'kk-KZ': ['Портфолио сайттар — WIBE', 'WIBE кейстері мен демо-жобалары: интернет-дүкендер, логистика, медиа, заң, финтех, фитнес, кофе.', 'WIBE портфолиосы', 'WIBE AI digital agency жобалары мен кейстері.', 'Басты бет', 'Портфолио'],
  'uz-UZ': ['Portfolio saytlar — WIBE', 'WIBE keyslari va demo-loyihalari: internet-doʻkonlar, logistika, media, huquq, fintex, fitnes, qahva.', 'WIBE portfoliyosi', 'WIBE AI digital agency loyihalari va keyslari.', 'Bosh sahifa', 'Portfolio'],
  'ka-GE': ['პორტფოლიო — WIBE', 'WIBE-ს ქეისები და დემო პროექტები: ელ-კომერცია, ლოგისტიკა, მედია, იურისპრუდენცია, ფინტექი, ფიტნესი, ყავა.', 'WIBE პორტფოლიო', 'WIBE AI digital agency პროექტები და ქეისები.', 'მთავარი გვერდი', 'პორტფოლიო'],
  'he-IL': ['פורטפוליו — WIBE', 'הפרויקטים והדמואים של WIBE: איקומרס, לוגיסטיקה, מדיה, משפטים, פינטק, כושר, קפה.', 'הפורטפוליו של WIBE', 'הפרויקטים ומקרי הבוחן של WIBE AI digital agency.', 'דף הבית', 'פורטפוליו'],
  'hy-AM': ['Պորտֆոլիո — WIBE', 'WIBE-ի դեպքերն ու դեմո նախագծերը. ինտերնետ խանութներ, լոգիստիկա, մեդիա, իրավունք, ֆինտեխ, ֆիթնես, սուրճ։', 'WIBE պորտֆոլիո', 'WIBE AI digital agency նախագծերն ու դեպքերը։', 'Գլխավոր էջ', 'Պորտֆոլիո'],
  'az-AZ': ['Portfolio — WIBE', 'WIBE keysləri və demo-layihələri: e-ticarət, logistika, media, hüquq, fintex, fitnes, qəhvə.', 'WIBE portfoliyosu', 'WIBE AI digital agency layihələri və keysləri.', 'Ana səhifə', 'Portfolio'],
  'ky-KG': ['Портфолио сайттар — WIBE', 'WIBE кейстери жана демо-долбоорлору: интернет-дүкөндөр, логистика, медиа, укук, финтех, фитнес, кофе.', 'WIBE портфолиосу', 'WIBE AI digital agency долбоорлору жана кейстери.', 'Башкы бет', 'Портфолио'],
  'tg-TJ': ['Портфолио — WIBE', 'Кейсҳо ва лоиҳаҳои демои WIBE: мағозаҳои онлайн, логистика, ВАО, ҳуқуқ, финтех, фитнес, қаҳва.', 'Портфолиои WIBE', 'Лоиҳаҳо ва кейсҳои WIBE AI digital agency.', 'Саҳифаи асосӣ', 'Портфолио'],
  'tk-TM': ['Portfolio — WIBE', 'WIBE keyesleri we demo-taslamalary: e-täjir, logistika, metbugat, hukuk, finteh, fitnes, gofe.', 'WIBE portfoliosy', 'WIBE AI digital agency taslamalary we keyesleri.', 'Baş sahypa', 'Portfolio'],
  'ro-MD': ['Portofoliu — WIBE', 'Proiectele și demo-urile WIBE: e-commerce, logistică, media, drept, fintech, fitness, cafea.', 'Portofoliul WIBE', 'Proiectele și cazurile de studiu WIBE AI digital agency.', 'Pagina principală', 'Portofoliu']
};

export function metaFor(page, code) {
  if (page === '') {
    const m = INDEX_META[code] || INDEX_META['en-US'];
    return { title: m[0], desc: m[1] };
  }
  if (page === 'portfolio.html') {
    const m = PORTFOLIO_META[code] || PORTFOLIO_META['en-US'];
    return { title: m[0], desc: m[1] };
  }
  const m = CASE_META[page][code];
  return { title: m[0] + ' | WIBE', desc: m[1] };
}

export const PAGES = [
  { file: 'index.html',            page: '' },
  { file: 'case-ecom.html',        page: 'case-ecom.html' },
  { file: 'case-logistics.html',   page: 'case-logistics.html' },
  { file: 'case-media.html',       page: 'case-media.html' },
  { file: 'portfolio.html',        page: 'portfolio.html' }
];

const SEOTMPL = (title, desc, type, url, ogLocale, hrl) => `<title>${title}</title>
<!-- seo:start -->
<meta name="description" content="${desc}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="${type}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="WIBE">
<meta property="og:locale" content="${ogLocale}">
${hrl}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${SITE}/og-image.png">
<meta name="theme-color" content="#ff7a1f">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="format-detection" content="telephone=no">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- seo:end -->`;

export function buildVariant(source, page, filename, code, dir) {
  let html = source;
  const type = page.startsWith('case') ? 'article' : 'website';
  const { title, desc } = metaFor(page, code);
  const canonical = urlFor(code, page, dir);
  const head = SEOTMPL(title, desc, type, canonical, code.replace('-', '_'), hreflang(page));

  html = html.replace(/<title>[\s\S]*?<!-- seo:end -->/, head);
  html = html.replace(/<html lang="[^"]*"/, '<html lang="' + code + '"');
  html = html.replace('</head>', "<script>window.__forcedLang='" + code + "';</script>\n</head>");

  if (page === 'portfolio.html') {
    const m = PORTFOLIO_META[code] || PORTFOLIO_META['en-US'];
    html = html.replace('"name": "Портфолио WIBE"', '"name": "' + m[2] + '"');
    html = html.replace('"description": "Проекты и кейсы AI digital agency WIBE."', '"description": "' + m[3] + '"');
    html = html.replace('"name": "Главная"', '"name": "' + m[4] + '"');
    html = html.replace('"name": "Портфолио"', '"name": "' + m[5] + '"');
  }

  /* ссылки переводятся на абсолютные/локальные версии */
  html = html.replaceAll('href="case-ecom.html"', `href="/${dir}/case-ecom.html"`);
  html = html.replaceAll('href="case-logistics.html"', `href="/${dir}/case-logistics.html"`);
  html = html.replaceAll('href="case-media.html"', `href="/${dir}/case-media.html"`);
  html = html.replaceAll('href="portfolio.html"', `href="/${dir}/portfolio.html"`);
  html = html.replaceAll('href="index.html#contact"', `href="/${dir}/#contact"`);
  html = html.replaceAll('href="index.html"', `href="/${dir}/"`);
  html = html.replaceAll('href="case.css"', 'href="/case.css"');
  html = html.replaceAll('href="portfolio.css"', 'href="/portfolio.css"');
  for (const site of ['coffee', 'fit', 'law', 'logistics', 'media', 'finlab']) {
    html = html.replaceAll(`href="site-${site}.html"`, `href="/site-${site}.html"`);
  }
  return html;
}

export function buildSitemap() {
  const root = [
    { loc: `${SITE}/`, priority: '1.0' },
    { loc: `${SITE}/case-ecom.html`, priority: '0.8' },
    { loc: `${SITE}/case-logistics.html`, priority: '0.8' },
    { loc: `${SITE}/case-media.html`, priority: '0.8' },
    { loc: `${SITE}/portfolio.html`, priority: '0.7' },
    { loc: `${SITE}/concept.html`, priority: '0.3' },
    { loc: `${SITE}/site-law.html`, priority: '0.5' },
    { loc: `${SITE}/site-logistics.html`, priority: '0.5' },
    { loc: `${SITE}/site-media.html`, priority: '0.5' },
    { loc: `${SITE}/site-coffee.html`, priority: '0.5' },
    { loc: `${SITE}/site-fit.html`, priority: '0.5' },
    { loc: `${SITE}/site-finlab.html`, priority: '0.5' }
  ];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const p of root) xml += `  <url><loc>${p.loc}</loc><priority>${p.priority}</priority></url>\n`;
  for (const d of DIRS) {
    for (const pg of PAGES) {
      const url = urlFor(d.code, pg.page, d.dir);
      const priority = pg.page === '' ? '0.9' : '0.7';
      xml += `  <url><loc>${url}</loc><priority>${priority}</priority></url>\n`;
    }
  }
  xml += '</urlset>\n';
  return xml;
}

export function generate(outDir) {
  let written = 0;
  for (const d of DIRS) {
    for (const p of PAGES) {
      const src = readFileSync(p.file, 'utf8');
      const out = buildVariant(src, p.page, p.file, d.code, d.dir);
      const dir = outDir + '/' + d.dir;
      mkdirSync(dir, { recursive: true });
      writeFileSync(dir + '/' + p.file, out, 'utf8');
      written++;
    }
  }
  writeFileSync(outDir + '/sitemap.xml', buildSitemap(), 'utf8');
  console.log('i18n: generated ' + written + ' variant pages in ' + DIRS.length + ' locale dirs + sitemap (' + (20 + written) + ' urls)');
  return written;
}