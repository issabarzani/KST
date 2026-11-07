# Kurdistan Service Team website

**Publishing:** see `DEPLOY.md` (Cloudflare Pages + GitHub; build command `npm run build:static`, output `dist/client`).

Trilingual (Kurdish Sorani, English, Arabic) marketing site for KST, built with Vite, React and Tailwind.

## Run
    npm install
    npm run dev      # local preview
    npm run build    # production build (client + server)

## Where things live
- `src/lib/i18n.ts` — all page text in Kurdish / English / Arabic. Edit wording here.
- `src/content/pages/home.json` and `src/content/data/portfolio.json` — contact details, hero text, client list.
- `src/lib/proposals.ts` — the HVAC and Healthcare proposals (Kurdish / English / Arabic).
- `docs/PROPOSAL_SOURCE.md` — full original information kept from the former Zone Service Company documents.
- `ADDING_WORKS.md` and `projects-manager.html` — how to add and remove clients.
- `src/components/home/` — Hero, About, Services, Clients, Contact sections.
- `src/styles/globals.css` — colours (taken from the logo), fonts, spacing.
- `public/assets/` — logo and Erbil photo.

The contact form sends requests to Formspree (`https://formspree.io/f/mdeejylp`), which emails them to the address set on that Formspree form. To change the form, edit `src/config/forms.ts`. Each request arrives with a subject like "KST website request: Refrigeration & HVAC (name)", the visitor's phone, email (used as reply-to), service, message and site language. Spam bots are filtered by a hidden honeypot field. The old `/api/contact` server route is no longer used by the page.


## AI assistant (chat button)

A gold chat button sits bottom-corner on every page. It answers in Kurdish, English or Arabic about services, proposals, guarantees, clients and contact details.

- Its facts come from the same files as the site (`src/lib/i18n.ts`, `src/lib/proposals.ts`, `portfolio.json`, `home.json`) through `src/lib/kb.ts`. Edit the site and the assistant learns it.
- **Built-in mode** (default, no setup): answers by matching keywords. It never fails.
- **AI mode**: set the secret `ANTHROPIC_API_KEY` on your host. The widget then calls `/api/chat` (`src/server/api/chat/POST.ts`), which answers only from the company facts. If the key is missing or the call fails, it silently uses built-in mode.

## Services section (building drawing)

The services list sits beside a section drawing of one building. Choosing a service draws its system in gold (rooftop chiller for HVAC, the operating room for cleanrooms, the server rack for IT, and so on). On phones the drawing stays pinned while the list scrolls and follows the service in the middle of the screen. The drawing is in `src/components/home/BuildingSection.tsx`.

## Language links

The site opens in Kurdish. A visitor's language choice is remembered on their device, and links can open a language directly: `/?lang=en`, `/?lang=ar`, `/?lang=ku`.

## Checks done (November 2026)

- 18 views (Kurdish, English, Arabic × light, dark × phone, tablet, desktop): no sideways scrolling, no console errors, no automated accessibility violations (axe).
- Lighthouse on the production build: accessibility 100; performance 99 desktop / 76 mobile (was 91 / 51 before gzip, deferred scripts, WebP images and the hydration fix).
- Unknown pages return a real 404 status with a translated page.
- Search engines get a GeneralContractor record (name in three languages, phones, email, address, services) and a 1200×630 share image (`public/assets/og-image.jpg`).
- The hero photo is 554×554 px. A photo of at least 1200 px wide would look sharper on high-resolution screens; save it as `public/assets/erbil-skyline.webp`.
