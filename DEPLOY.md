# بڵاوکردنەوەی ماڵپەڕی KST لەسەر Cloudflare Pages

ئەم ڕێنماییە بۆ بڵاوکردنەوەی ماڵپەڕەکەیە بە Cloudflare Pages، کە کۆدەکە لە GitHub (`issabarzani/KST`) دادەنرێت.
هەموو هەنگاوەکان پێشتر لەسەر هەمان ژینگەی Cloudflare (Node 22.23.4، `npm ci`، wrangler) تاقیکراونەتەوە.

## بۆچی Cloudflare و نەک GitHub Pages؟

| | Cloudflare Pages | GitHub Pages |
|---|---|---|
| ماڵپەڕ، فۆرمی Formspree، سێ زمانەکە | کار دەکات | کار دەکات |
| یاریدەدەری AI (وەڵامی زیرەک) | کار دەکات (`functions/api/chat.js`) | ناتوانێت، تەنیا وەڵامی ئامادە |
| هێدەری ئاسایش (`_headers`) و پەڕەی 404 | هەیە | هێدەر نییە |
| خێرایی و SSL | تۆڕی جیهانی Cloudflare، SSL بەخۆڕایی | باش |
| نرخ | بەخۆڕایی | بەخۆڕایی |

کۆدەکە هەر لە GitHub دەمێنێتەوە؛ Cloudflare لە هەر گۆڕانکارییەکدا خۆکار بڵاوی دەکاتەوە.

---

## ڕێگەی یەکەم (پێشنیارکراو): GitHub + Cloudflare

### ١. کۆدەکە بخەرە ناو GitHub

ڕیپۆی `issabarzani/KST` بەتاڵە. دوو ڕێگە هەیە:

- **ئاسانترین:** ئەپی Claude بۆ GitHub دابمەزرێنە لەسەر ڕیپۆی KST (https://github.com/apps/claude/installations/select_target)، پاشان بە Claude بڵێ «push بکە». Claude خۆی هەموو فایلەکان دەنێرێت.
- **بە دەستی خۆت:** GitHub Desktop دابەزێنە ← `File > Clone repository` ← `issabarzani/KST`. ناوەڕۆکی `KST_github_upload.zip` بخەرە ناو فۆڵدەرەکەی ← `Commit to main` ← `Push origin`.
  تێبینی: بارکردنی وێب (`Add file > Upload files`) تەنیا ١٠٠ فایل وەردەگرێت و پرۆژەکە ١٩٨ فایلە، بۆیە GitHub Desktop باشترە.

> فایلی `docs/PROPOSAL_SOURCE.md` (ناو و ژمارەی کەسیی بەڕێوەبەری پێشووی ZSC) بە ئەنقەست لە GitHub دانانرێت، چونکە ڕیپۆکە گشتییە (public). لە zip ـی پرۆژەکەدا پارێزراوە.

### ٢. پرۆژەی Cloudflare Pages دروست بکە

1. بچۆ https://dash.cloudflare.com و هەژمار دروست بکە (بەخۆڕایی).
2. `Workers & Pages` ← `Create` ← تابی `Pages` ← `Connect to Git` (یان `Import an existing Git repository`).
3. GitHub ببەستەوە و ڕیپۆی `issabarzani/KST` هەڵبژێرە.
4. ڕێکخستنی Build بەم شێوەیە بنووسە:

| خانە | نرخ |
|---|---|
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `npm run build:static` |
| Build output directory | `dist/client` |
| Root directory | (بەتاڵ بەجێی بهێڵە) |

5. `Save and Deploy`. نزیکەی ٢ خولەک دەخایەنێت. ماڵپەڕەکە لەسەر `kst-xxx.pages.dev` دەردەکەوێت.

> `NODE_ENV` دامەنێ. وەشانی Node لە فایلی `.node-version` (22.23.4) دیاری کراوە.

### ٣. یاریدەدەری AI (بەخۆڕایی، چالاک کراوە)

یاریدەدەرەکە **Cloudflare Workers AI** بەکاردێنێت، کە لەسەر هەمان هەژماری Cloudflare کار دەکات و کلیلی API ناوێت.

- مۆدێل: Google Gemma 4 (`@cf/google/gemma-4-26b-a4b-it`)، و Llama 4 Scout وەک یەدەگ.
- بەستنەوە: پرۆژەکە ← `Settings` ← `Bindings` ← جۆری `Workers AI` بە ناوی `AI` (بۆ Production زیاد کراوە).
- نرخ: Cloudflare ڕۆژانە ١٠٬٠٠٠ «Neuron» بەخۆڕایی دەدات؛ هەر پرسیارێک نزیکەی ٢٥ دانە بەکاردێنێت، واتە نزیکەی ٤٠٠ پرسیار لە ڕۆژێکدا بەخۆڕایی.
- کاتێک بەشی بەخۆڕایی ڕۆژەکە تەواو بوو، چاتەکە بە وەڵامی ئامادەکراو لە زانیاری ماڵپەڕەکە وەڵام دەداتەوە، تا ڕۆژی دواتر.
- بەکارهێنان لێرە دەبینرێت: داشبۆرد ← `AI` ← `Workers AI`.

ئارەزوومەندانە: ئەگەر دواتر Claude ـت ویست وەک یەدەگ، لە `Variables and Secrets` سیکرێتێک بە ناوی `ANTHROPIC_API_KEY` زیاد بکە.
کۆدەکە (`functions/api/chat.js`) تەنیا وەڵامی داواکاری ماڵپەڕەکەی خۆت دەداتەوە، بۆ ئەوەی کەسی تر بەشە بەخۆڕاییەکەت بەکار نەهێنێت.

### ٤. دۆمەینی `kurdistanserviceteam.com` (بەستراوە)

دۆمەینەکە لە هەمان هەژماری Cloudflare ـە و بە پرۆژەی Pages ـەوە بەستراوە:
- `kurdistanserviceteam.com` و `www.kurdistanserviceteam.com` هەردووکیان بە تۆماری `CNAME` بۆ `kst-3f1.pages.dev` دەچن، SSL چالاکە.
- ماڵپەڕەکە ئیمەیڵ بەکارناهێنێت؛ پەیوەندی تەنیا لە ڕێگەی واتسئەپ و فۆرمەکەوەیە. ئەگەر دواتر ئیمەیڵت ویست، لە `Email` ← `Email Routing` ئاڕاستەی Gmail ـی بکە.

### ٥. دوای بڵاوکردنەوە

- **فۆرم:** نامەیەکی تاقیکاری لە ماڵپەڕە ڕاستەقینەکەوە بنێرە و ئیمەیڵەکەت بپشکنە. ئەگەر هەڵە هات، لە Formspree ← فۆرمەکە ← `Settings`، دڵنیابە `reCAPTCHA` کوژاوەتەوە (ماڵپەڕەکە بە AJAX دەنێرێت).
- **ئامار:** لە Pages ← `Metrics` ← `Web Analytics` چالاکی بکە (بەبێ کووکیز، بەخۆڕایی).
- **گووگڵ:** لە Google Search Console دۆمەینەکە زیاد بکە و `https://kurdistanserviceteam.com/sitemap.xml` بنێرە.

### گۆڕانکاری لە داهاتوودا

هەر گۆڕانکارییەک بخەیتە ناو `main` لە GitHub (بۆ نموونە زیادکردنی کڕیار لە `src/content/data/portfolio.json`)، Cloudflare خۆکار لە ماوەی ٢ خولەکدا بڵاوی دەکاتەوە. زانیاری یاریدەدەری AI ـیش لە هەمان کاتدا نوێ دەبێتەوە.

---

## ڕێگەی دووەم (خێرا، بەبێ GitHub): ڕاکێشان و دانان

1. `Workers & Pages` ← `Create` ← `Pages` ← `Upload assets` (Direct Upload).
2. ناوێک بنووسە (بۆ نموونە `kst`) ← `KST_cloudflare_upload.zip` ڕابکێشە ← `Deploy site`.

هەموو شتێک کار دەکات، تەنیا یاریدەدەری AI بە وەڵامی ئامادە دەمێنێتەوە (Cloudflare لەم ڕێگەیەدا `functions` قبوڵ ناکات).
تێبینی: پرۆژەی Direct Upload دواتر ناگۆڕدرێت بۆ GitHub؛ ئەگەر دواتر ڕێگەی یەکەمت ویست، پرۆژەیەکی نوێ دروست بکە و دۆمەینەکە بگوازەرەوە.

---

## بۆ پەرەپێدەر

```bash
npm ci
npm run build:static            # → dist/client  (static HTML + assets)
npx wrangler pages dev dist/client   # تاقیکردنەوە لەسەر کۆمپیوتەر لەگەڵ functions/
SITE_URL=https://other-domain.com npm run build:static   # دۆمەینێکی تر
```

- `scripts/build-static.mjs`: بیلد، هەموو پەڕەکان بە سێ زمان وەک HTMLی ئامادە (`index.html`، `en.html`، `ar.html`، `services/<slug>.html`، `en/services/...`، `ar/services/...`، و `404.html` بۆ هەر زمانێک)، `robots.txt`، `sitemap.xml` (لەگەڵ hreflang)، `_redirects`، و `functions-lib/chat-config.js`.
- `src/lib/services.ts`: **تاکە سەرچاوەی ٨ بوارەکە** (ناو، کورتە، خزمەتگوزارییە لاوەکییەکان، هەنگاوەکان، پرسیارە باوەکان، ڕەنگ). کارتەکانی پەڕەی سەرەکی، ٨ پەڕەکە، مێنیو، فووتەر، فۆرمی پەیوەندی و یاریدەدەری AI هەموویان لێرەوە دەخوێننەوە.
- کڕیارەکانی هەر پەڕەیەک خۆکار لە `src/content/data/portfolio.json` فلتەر دەکرێن (بەپێی `sectors`)؛ کڕیارێک لە یەک شوێنەوە زیاد یان لاببە.
- ناونیشانەکان: کوردی `/services/hvac`، ئینگلیزی `/en/services/hvac`، عەرەبی `/ar/services/hvac`.
- `functions/api/chat.js`: یاریدەدەری AI لەسەر Cloudflare.
- `public/_headers`: هێدەرەکانی ئاسایش.
- `npm run build` و `dist/server.bundle.mjs` هێشتا بۆ هۆستینگی Node کار دەکەن.
