import type { Request, Response } from 'express';
import { getSecret } from '#airo/secrets';
import { sendEmail } from '@/server/email';

type SendFailureKind =
  | 'gateway-unreachable'
  | 'gateway-rejected'
  | 'gateway-error'
  | 'no-message-id'
  | 'unknown';

function sendFailureKind(error: unknown): SendFailureKind {
  const message: string = error instanceof Error ? error.message : '';
  if (message.startsWith('email gateway unreachable')) return 'gateway-unreachable';
  if (message.startsWith('email send succeeded')) return 'no-message-id';
  if (message.startsWith('email send failed: refused')) return 'gateway-rejected';
  if (message.startsWith('email send failed: HTTP 5')) return 'gateway-error';
  if (message.startsWith('email send failed: non-JSON response')) return 'gateway-error';
  if (message.startsWith('email send failed:')) return 'gateway-rejected';
  if (message.startsWith('email send failed')) return 'gateway-error';
  return 'unknown';
}

export default async function handler(req: Request, res: Response): Promise<void> {
  const recipient = getSecret('NOTIFICATION_RECIPIENT_EMAIL');
  if (typeof recipient !== 'string' || recipient.length === 0) {
    console.error('email.recipient_unset');
    res.status(500).json({ error: 'Email recipient not configured' });
    return;
  }

  const { name, company, phone, email, service, message } = req.body as {
    name?: string;
    company?: string;
    phone?: string;
    email?: string;
    service?: string;
    message?: string;
  };

  if (!name || !phone || !service || !message) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const subject = `KST Inquiry: ${service} — ${name}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; padding: 32px; border-radius: 8px;">
      <div style="border-bottom: 2px solid #f59e0b; padding-bottom: 16px; margin-bottom: 24px;">
        <h1 style="color: #f59e0b; margin: 0; font-size: 22px;">Kurdistan Service Team</h1>
        <p style="color: #94a3b8; margin: 4px 0 0; font-size: 14px;">New Service Inquiry</p>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; width: 130px; vertical-align: top;">Name</td>
          <td style="padding: 10px 0; color: #f1f5f9; font-size: 14px; font-weight: bold;">${name}</td>
        </tr>
        ${company ? `<tr>
          <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; vertical-align: top;">Company</td>
          <td style="padding: 10px 0; color: #f1f5f9; font-size: 14px;">${company}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; vertical-align: top;">Phone</td>
          <td style="padding: 10px 0; color: #f1f5f9; font-size: 14px;">${phone}</td>
        </tr>
        ${email ? `<tr>
          <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; vertical-align: top;">Email</td>
          <td style="padding: 10px 0; color: #f1f5f9; font-size: 14px;">${email}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; vertical-align: top;">Service</td>
          <td style="padding: 10px 0; color: #f59e0b; font-size: 14px; font-weight: bold;">${service}</td>
        </tr>
      </table>

      <div style="margin-top: 20px; background: #1e293b; border-left: 3px solid #f59e0b; padding: 16px; border-radius: 4px;">
        <p style="color: #94a3b8; font-size: 13px; margin: 0 0 8px;">Message</p>
        <p style="color: #f1f5f9; font-size: 14px; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>

      ${email ? `<div style="margin-top: 24px; text-align: center;">
        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(service)}" style="display: inline-block; background: #f59e0b; color: #0f172a; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">Reply to ${name}</a>
      </div>` : ''}

      <p style="color: #475569; font-size: 12px; margin-top: 32px; text-align: center;">
        Submitted via KST website contact form
      </p>
    </div>
  `;

  const text = [
    `KST New Inquiry — ${service}`,
    `Name: ${name}`,
    company ? `Company: ${company}` : null,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : null,
    `Service: ${service}`,
    ``,
    `Message:`,
    message,
  ].filter(Boolean).join('\n');

  try {
    const { messageId } = await sendEmail({
      fromName: 'Kurdistan Service Team',
      to: recipient,
      ...(email ? { replyTo: email } : {}),
      subject,
      html,
      text,
    });
    console.log('email.send.ok', { messageId });
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('email.send.failed', { kind: sendFailureKind(error) });
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}
