import type { Request, Response } from 'express';
import { getSecret } from '#airo/secrets';
import { CHAT_MODEL, MAX_TOKENS, SYSTEM_PROMPT, cleanMessages } from '@/lib/chat-core';

/*
  KST assistant endpoint (Node server).
  Needs the secret ANTHROPIC_API_KEY. Without it this returns 503 and the website chat
  automatically falls back to its built-in answers, so visitors never see an error.
  The Cloudflare Pages version of this endpoint is functions/api/chat.js.
*/

export default async function handler(req: Request, res: Response): Promise<void> {
  const key = getSecret('ANTHROPIC_API_KEY');
  if (typeof key !== 'string' || key.length === 0) {
    res.status(503).json({ error: 'assistant not configured' });
    return;
  }

  const messages = cleanMessages((req.body as { messages?: unknown })?.messages);
  if (!messages) {
    res.status(400).json({ error: 'messages required, last one from the visitor' });
    return;
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: CHAT_MODEL, max_tokens: MAX_TOKENS, system: SYSTEM_PROMPT, messages }),
    });
    if (!r.ok) {
      console.error('chat.upstream_failed', r.status);
      res.status(502).json({ error: 'upstream error' });
      return;
    }
    const data = (await r.json()) as { content?: { type: string; text?: string }[] };
    const reply = data.content?.filter((c) => c.type === 'text').map((c) => c.text).join('').trim();
    if (!reply) {
      res.status(502).json({ error: 'empty reply' });
      return;
    }
    res.json({ reply });
  } catch (e) {
    console.error('chat.failed', e instanceof Error ? e.message : 'unknown');
    res.status(502).json({ error: 'upstream error' });
  }
}
