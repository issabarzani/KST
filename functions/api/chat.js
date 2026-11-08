/*
  KST assistant endpoint for Cloudflare Pages (POST /api/chat).

  Which AI answers, in order:
  1. Cloudflare Workers AI (free daily allowance, no API key): add a Workers AI binding named "AI"
     in the Pages project (Settings > Bindings). Model: Google Gemma 4, with Llama 4 Scout as backup.
  2. Anthropic Claude, if the secret ANTHROPIC_API_KEY is set (paid, optional).
  3. Neither available or the daily free allowance used up: returns an error and the website chat
     answers from its built-in company information instead, so visitors never see a failure.

  The company facts, limits and prompt come from functions-lib/chat-config.js,
  which `npm run build:static` regenerates from the website content on every build.
*/
import { CHAT_MODEL, MAX_CHARS, MAX_MESSAGES, MAX_TOKENS, SYSTEM_PROMPT } from '../../functions-lib/chat-config.js';

const WORKERS_AI_MODELS = [
  { id: '@cf/google/gemma-4-26b-a4b-it', limit: 'max_completion_tokens' },
  { id: '@cf/meta/llama-4-scout-17b-16e-instruct', limit: 'max_tokens' },
];

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

/** Plain text for the chat bubble: no hidden reasoning, no markdown symbols. */
function tidy(text) {
  return String(text || '')
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*]\s+/gm, '• ')
    .trim();
}

/*
  Which language the visitor's last message is in. Arabic and Kurdish share a script, and models
  sometimes answer an Arabic question in Kurdish, so the prompt is told explicitly.
*/
function replyLanguage(text) {
  const latin = (text.match(/[A-Za-z]/g) || []).length;
  const arabicScript = (text.match(/[\u0600-\u06FF]/g) || []).length;
  if (latin > arabicScript) return 'English';
  if (/[ێۆڕڵەڤ]/.test(text)) return 'Kurdish (the same dialect the visitor uses: Sorani or Badini)';
  if (arabicScript) return 'Arabic';
  return null;
}

function systemFor(messages) {
  const lang = replyLanguage(messages[messages.length - 1].content);
  return lang ? `${SYSTEM_PROMPT}\n\nTHE VISITOR'S LAST MESSAGE IS IN ${lang.toUpperCase()}. Write your whole reply in ${lang}.` : SYSTEM_PROMPT;
}

async function askWorkersAI(ai, messages) {
  const system = systemFor(messages);
  for (const model of WORKERS_AI_MODELS) {
    try {
      const out = await ai.run(model.id, {
        messages: [{ role: 'system', content: system }, ...messages],
        [model.limit]: Math.max(MAX_TOKENS, 1500), // room for the model to think before it answers
        temperature: 0.3,
      });
      const choice = out?.choices?.[0];
      const text = tidy(choice?.message?.content ?? out?.response ?? '');
      // a reply cut off by the length limit is not shown; the next model tries instead
      if (text && choice?.finish_reason !== 'length') return text;
      console.error('chat.workers_ai_empty_or_cut', model.id, choice?.finish_reason);
    } catch (e) {
      console.error('chat.workers_ai_failed', model.id, e && e.message);
    }
  }
  return null;
}

async function askClaude(key, messages) {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: CHAT_MODEL, max_tokens: MAX_TOKENS, system: systemFor(messages), messages }),
  });
  if (!r.ok) {
    console.error('chat.upstream_failed', r.status);
    return null;
  }
  const data = await r.json();
  return tidy((data.content || []).filter((c) => c.type === 'text').map((c) => c.text).join(''));
}

export async function onRequestPost({ request, env }) {
  if (!env.AI && !env.ANTHROPIC_API_KEY) return json(503, { error: 'assistant not configured' });

  // Only answer requests coming from this website, so others can't use your AI allowance
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json(403, { error: 'forbidden' });

  let raw;
  try {
    raw = (await request.json())?.messages;
  } catch {
    return json(400, { error: 'invalid json' });
  }
  if (!Array.isArray(raw)) return json(400, { error: 'messages required' });
  const messages = raw
    .filter((m) => (m?.role === 'user' || m?.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return json(400, { error: 'last message must be from the visitor' });
  }

  try {
    let reply = env.AI ? await askWorkersAI(env.AI, messages) : null;
    if (!reply && env.ANTHROPIC_API_KEY) reply = await askClaude(env.ANTHROPIC_API_KEY, messages);
    return reply ? json(200, { reply }) : json(502, { error: 'no answer' });
  } catch (e) {
    console.error('chat.failed', e && e.message);
    return json(502, { error: 'upstream error' });
  }
}
