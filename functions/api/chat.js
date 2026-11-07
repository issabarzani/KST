/*
  KST assistant endpoint for Cloudflare Pages (POST /api/chat).
  Set the secret ANTHROPIC_API_KEY in the Pages project settings.
  Without it this returns 503 and the website chat uses its built-in answers.
  The model, limits and company facts come from functions-lib/chat-config.js,
  which `npm run build:static` regenerates from the website content on every build.
*/
import { CHAT_MODEL, MAX_CHARS, MAX_MESSAGES, MAX_TOKENS, SYSTEM_PROMPT } from '../../functions-lib/chat-config.js';

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

export async function onRequestPost({ request, env }) {
  const key = env.ANTHROPIC_API_KEY;
  if (!key) return json(503, { error: 'assistant not configured' });

  // Only answer requests coming from this website, so others can't use your API key
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
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: CHAT_MODEL, max_tokens: MAX_TOKENS, system: SYSTEM_PROMPT, messages }),
    });
    if (!r.ok) {
      console.error('chat.upstream_failed', r.status);
      return json(502, { error: 'upstream error' });
    }
    const data = await r.json();
    const reply = (data.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('').trim();
    return reply ? json(200, { reply }) : json(502, { error: 'empty reply' });
  } catch (e) {
    console.error('chat.failed', e && e.message);
    return json(502, { error: 'upstream error' });
  }
}
