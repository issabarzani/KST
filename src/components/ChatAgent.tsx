import { useEffect, useRef, useState, type FormEvent } from 'react';
import { MessageCircle, Phone, Send, X } from 'lucide-react';
import { home } from 'virtual:content';
import { useLang } from '@/lib/lang-context';
import { chatText as T, localAnswer, suggestions } from '@/lib/kb';

interface Msg {
  role: 'user' | 'assistant';
  content: string;
}

const phone = home.contact.phone1;

/** Try the AI endpoint; any failure (no key, offline, server error) returns null so we use built-in answers. */
async function askAI(history: Msg[]): Promise<string | null> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
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
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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
                {m.content}
              </div>
            ))}
            {busy && <div className="w-fit rounded-lg bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">{T.thinking[lang]}</div>}

            {msgs.length > 0 && !busy && (
              <div className="flex flex-wrap gap-2 pt-1">
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted">
                  <Phone size={13} /> {T.call[lang]}
                </a>
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
