import { Fragment, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { MessageCircle, Send, X } from 'lucide-react';
import { useLang, localize, sectionPath, stripLang, type Lang } from '@/lib/lang-context';
import { chatText as T, localAnswer, suggestions } from '@/lib/kb';
import { getService, isServiceSlug } from '@/lib/services';
import WhatsAppIcon from '@/components/WhatsAppIcon';

/*
  Turns the assistant's links into real links, in the language the visitor is reading:
  [label](/services/hvac), a bare /services/hvac, or a full https://kurdistanserviceteam.com/... address.
  Only pages of this website become links; anything else stays plain text.
*/
const LINK = /\[([^\]\n]{1,120})\]\(([^)\s]{1,200})\)|((?:https?:\/\/(?:www\.)?kurdistanserviceteam\.com)?(?:\/(?:en|ar))?\/services\/[a-z-]+)/g;

function internalPath(href: string, lang: Lang): string | null {
  const path = href.replace(/^https?:\/\/(?:www\.)?kurdistanserviceteam\.com/i, '').replace(/[.,;:!?،؛]+$/, '');
  const base = stripLang(path.split('#')[0] || '/');
  const m = /^\/services\/([a-z-]+)\/?$/.exec(base);
  if (m && isServiceSlug(m[1])) return localize(`/services/${m[1]}`, lang);
  if (base === '/') return localize('/', lang) + (path.includes('#') ? `#${path.split('#')[1]}` : '');
  return null;
}

function RichText({ text, lang, onFollow }: { text: string; lang: Lang; onFollow: () => void }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const [whole, label, href, bare] = m;
    const to = internalPath(href ?? bare, lang);
    // a field page link always shows that field's name in the language being read
    const slug = to ? /\/services\/([a-z-]+)$/.exec(to)?.[1] : undefined;
    const name = slug ? getService(slug)?.name[lang] : undefined;
    out.push(text.slice(last, m.index));
    out.push(
      to ? (
        <Link key={m.index} to={to} onClick={onFollow} className="font-bold text-primary underline underline-offset-2">
          {name ?? label ?? whole}
        </Link>
      ) : (
        <Fragment key={m.index}>{label ?? whole}</Fragment>
      )
    );
    last = (m.index ?? 0) + whole.length;
  }
  out.push(text.slice(last));
  return <>{out}</>;
}

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}


/** Try the AI endpoint; any failure (no key, offline, server error) returns null so we use built-in answers. */
async function askAI(history: Msg[]): Promise<string | null> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 45000); // Kurdish answers can take longer to write
    const r = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: history }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!r.ok) return null;
    const data = (await r.json()) as { reply?: string };
    return data.reply || null;
  } catch {
    return null;
  }
}

export default function ChatAgent() {
  const { lang } = useLang();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [msgs, busy, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const send = async (q: string) => {
    const question = q.trim().slice(0, 600);
    if (!question || busy) return;
    const next: Msg[] = [...msgs, { role: 'user', content: question }];
    setMsgs(next);
    setText('');
    setBusy(true);
    const ai = await askAI(next);
    const reply = ai ?? localAnswer(question, lang).text;
    // small pause so built-in answers do not feel abrupt
    if (!ai) await new Promise((r) => setTimeout(r, 350));
    setMsgs((m) => [...m, { role: 'assistant', content: reply }]);
    setBusy(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(text);
  };

  const goQuote = () => {
    setOpen(false);
    const el = stripLang(location.pathname) === '/' ? document.getElementById('contact') : null;
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else navigate(sectionPath('contact', lang));
  };
  // On a phone the chat covers the page, so close it when the visitor opens a link
  const onFollow = () => {
    if (window.innerWidth < 640) setOpen(false);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label={T.open[lang]}
          style={{ bottom: 'calc(1.25rem + var(--banner-h, 0px))' }}
          className="fixed end-5 z-40 flex h-14 items-center gap-2 rounded-full bg-[hsl(var(--gold))] px-5 font-bold text-[hsl(var(--night))] shadow-xl transition-colors hover:bg-[hsl(40_70%_66%)]"
        >
          <MessageCircle size={22} />
          <span className="hidden sm:inline">{T.title[lang]}</span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label={T.title[lang]}
          className="fixed inset-x-3 bottom-3 z-[60] flex max-h-[min(640px,calc(100dvh-5.5rem))] flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-2xl sm:inset-x-auto sm:end-5 sm:bottom-5 sm:w-[390px]"
        >
          <div className="flex items-center justify-between gap-3 bg-[hsl(var(--night))] px-4 py-3 text-white">
            <div>
              <p className="font-bold leading-tight">{T.title[lang]}</p>
              <p className="text-xs text-white/65">{T.subtitle[lang]}</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label={T.close[lang]} className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-white/10">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            <div className="max-w-[88%] rounded-lg rounded-ss-none bg-muted px-3.5 py-2.5 text-sm leading-relaxed">{T.hello[lang]}</div>

            {msgs.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => void send(s.label[lang])}
                    className="rounded-full border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                  >
                    {s.label[lang]}
                  </button>
                ))}
              </div>
            )}

            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[88%] whitespace-pre-line rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'ms-auto rounded-se-none bg-primary text-primary-foreground'
                    : 'rounded-ss-none bg-muted'
                }`}
              >
                {m.role === 'assistant' ? <RichText text={m.content} lang={lang} onFollow={onFollow} /> : m.content}
              </div>
            ))}
            {busy && <div className="w-fit rounded-lg bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">{T.thinking[lang]}</div>}

            {msgs.length > 0 && !busy && (
              <div className="flex flex-wrap gap-2 pt-1">
                <button onClick={goQuote} className="inline-flex items-center gap-1.5 rounded-full bg-[#0e7a3e] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0b6a35]">
                  <WhatsAppIcon size={14} /> {T.call[lang]}
                </button>
                <button onClick={goQuote} className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                  {T.quote[lang]}
                </button>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={onSubmit} className="border-t border-border p-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={600}
                placeholder={T.placeholder[lang]}
                aria-label={T.placeholder[lang]}
                className="field !py-2.5 text-sm"
              />
              <button
                type="submit"
                disabled={busy || !text.trim()}
                aria-label={T.send[lang]}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-40"
              >
                <Send size={18} className="rtl:-scale-x-100" />
              </button>
            </div>
            <p className="mt-2 text-[0.7rem] leading-snug text-muted-foreground">{T.note[lang]}</p>
          </form>
        </div>
      )}
    </>
  );
}
