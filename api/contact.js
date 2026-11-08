import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, message, token } = req.body || {};
  if (!token) {
    return res.status(400).json({ success: false, error: 'Missing token' });
  }
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) {
    return res.status(500).json({ success: false, error: 'Missing turnstile secret key' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return res.status(500).json({ success: false, error: 'Missing Resend API key' });
  }

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress;

  // 1. Verify Turnstile
  try {
    const body = new URLSearchParams({ secret: turnstileSecret, response: token });
    if (ip) body.append('remoteip', ip);

    const verify = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body }
    );
    const outcome = await verify.json();

    if (!outcome.success) {
      return res.status(400).json({
        success: false,
        error: 'Verification failed',
      });
    }
  } catch {
    return res.status(500).json({ success: false, error: 'Verification request failed' });
  }

  // 2. Send email via Resend
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
  const to = process.env.CONTACT_TO_EMAIL || 'ivanalfa647@gmail.com';

  try {
    const resend = new Resend(resendApiKey);
    const data = await resend.emails.send({
      from,
      to: [to],
      subject: `New message from ${name} (${email})`,
      text: message,
      replyTo: email,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || 'Failed to send email' });
  }
}
