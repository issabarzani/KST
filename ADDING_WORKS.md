# Manual: adding clients and their works

## Easiest way: the Projects Manager
Open `projects-manager.html` in any browser (double-click, no install).
1. Add a client: type the name in Kurdish, English and Arabic, tick every work you did for them, choose the location, press **Add client**.
2. Remove a client: press **Remove** on its row. **Edit** changes its names, works or location.
3. Press **Download portfolio.json** and replace `src/content/data/portfolio.json` with that file.
4. Run `npm run build` and publish.

To start from the list that is already on the website, the tool opens with it. Your draft is kept in the browser until you download it or press **Reset to site data**.
On the website, clients show 10 at a time with a **Show more** button and a search box, so a long list stays easy to browse.

## Editing the file by hand

Every client in the Clients section can have **one or more works** (HVAC, IT, Construction, and so on).
The client is listed once, shows one tag for each work, and appears under every filter that matches one of its works.

## Where to edit
`src/content/data/portfolio.json`

## One client entry
```json
{
  "id": "korek-telecom",
  "nameKu": "کۆرەک تێلیکۆم",
  "nameEn": "Korek Telecom",
  "nameAr": "كورك تيليكوم",
  "sectors": ["IT", "HVAC", "Electrical", "Construction"],
  "location": "هەولێر",
  "locationEn": "Erbil",
  "locationAr": "أربيل"
}
```

## Steps
1. Open `portfolio.json`.
2. To add works to an existing client, add names to its `sectors` list, separated by commas.
   Example: `"sectors": ["Construction"]` becomes `"sectors": ["Construction", "HVAC", "IT"]`.
3. To add a new client, copy a whole `{ ... }` block, give it a new unique `id`, and fill in the three names, the sectors and the location. Put a comma between blocks.
4. Save, then run `npm run build` (or `npm run dev` to preview).

## Allowed work names (write them exactly like this, capital letters included)
| Name in `sectors` | Shown as (Kurdish / English / Arabic) |
|---|---|
| `Construction` | بیناسازی / Construction / البناء |
| `HVAC` | ساردکەرەوە / HVAC / تكييف |
| `Ventilation` | ئایر فرێش / Ventilation / تهوية |
| `Electrical` | کارەبا / Electrical / كهرباء |
| `Cleanroom` | هۆڵی نەشتەرگەری / Operating rooms / غرف العمليات |
| `Medical` | پزیشکی / Medical / طبي |
| `Maintenance` | چاککردنەوە / Medical maintenance / صيانة طبية |
| `IT` | ئایتی / IT / تقنية المعلومات |
| `Supervision` | سەرپەرشتی / Supervision / إشراف |
| `Turnkey` | تەواوکاری / Turnkey / تسليم مفتاح |

## Adding a brand-new type of work
1. Add its name to `sectors` of the client(s), for example `"Fire safety"`.
2. In `src/lib/i18n.ts`, find `sectorLabels` and add one line with the Kurdish, English and Arabic text:
   `'Fire safety': { ku: '…', en: 'Fire safety', ar: '…' },`
   Without this line the tag still appears, but only in English.
3. The filter button for it appears automatically.

## Rules that keep it reliable
- `sectors` must have at least one work, and it must be a list in square brackets `[ ]` with each name in quotes.
- Spell names the same way everywhere: `HVAC` and `hvac` would become two different filters.
- Each `id` must be unique and not change once used.
- Keep the same client in one entry. Do not repeat a client once per work.
