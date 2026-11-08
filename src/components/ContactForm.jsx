import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../translations';

const TURNSTILE_SITE_KEY =
  import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAF3pnHZWzpxYJ6Bu';

export default function ContactForm() {
  const [lang, setLang] = useState('en');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const turnstileRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    setLang(savedLang);

    const handleStorage = (e) => {
      if (e.key === 'lang') {
        setLang(e.newValue || 'en');
      }
    };

    window.addEventListener('storage', handleStorage);

    let cancelled = false;
    const renderWidget = () => {
      if (cancelled || !window.turnstile || !turnstileRef.current) return;
      turnstileRef.current.innerHTML = '';
      const isDark = document.documentElement.classList.contains('dark');
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: isDark ? 'dark' : 'light',
        callback: (t) => {
          setToken(t);
          setErrorMessage('');
        },
        'expired-callback': () => setToken(''),
        'error-callback': () => setToken(''),
      });
    };

    const existingScript = document.querySelector('script[data-turnstile-script]');
    if (existingScript) {
      if (window.turnstile) renderWidget();
      else existingScript.addEventListener('load', renderWidget);
    } else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset.turnstileScript = 'true';
      script.onload = renderWidget;
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      window.removeEventListener('storage', handleStorage);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {}
      }
    };
  }, []);

  const t = (translations[lang] || translations.en).contact;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status === 'success') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setErrorMessage(t.captchaRequired);
      return;
    }
    setErrorMessage('');
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, token }),
      });
      const outcome = await res.json();

      if (!res.ok || !outcome.success) {
        setStatus('idle');
        setErrorMessage(t.sendFailed);
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
        setToken('');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setToken('');
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.reset(widgetIdRef.current);
        } catch {}
      }
    } catch {
      setStatus('idle');
      setErrorMessage(t.sendFailed);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-border bg-surface/10 px-4 py-2.5 text-sm text-fg placeholder:text-muted/60 transition-colors hover:border-muted/40 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40';

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted"
          >
            {t.nameLabel}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder={t.namePlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted"
          >
            {t.emailLabel}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            required
            value={form.email}
            onChange={handleChange}
            placeholder={t.emailPlaceholder}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block font-mono text-xs uppercase tracking-wider text-muted"
        >
          {t.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          placeholder={t.messagePlaceholder}
          className={`${inputClass} resize-y`}
        />
      </div>

      <div className="space-y-3">
        <div ref={turnstileRef} className="flex justify-center" />

        {errorMessage && (
          <p className="text-center text-sm font-medium text-red-500" aria-live="polite">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-hover hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? t.sendingButton : t.sendButton}
        </button>

        <p
          aria-live="polite"
          className={`text-center text-sm font-medium text-accent ${status === 'success' ? '' : 'hidden'}`}
        >
          {status === 'success' ? t.successMessage : ''}
        </p>
      </div>
    </form>
  );
}
