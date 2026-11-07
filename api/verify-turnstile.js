export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { token } = req.body || {};
  if (!token) {
    return res.status(400).json({ success: false, error: 'Missing token' });
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return res.status(500).json({ success: false, error: 'Missing secret key' });
  }

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.append('remoteip', ip);

  try {
    const verify = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body }
    );
    const outcome = await verify.json();

    if (!outcome.success) {
      return res.status(400).json({
        success: false,
        error: 'Verification failed',
        codes: outcome['error-codes'] || [],
      });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res
      .status(500)
      .json({ success: false, error: 'Verification request failed' });
  }
}
