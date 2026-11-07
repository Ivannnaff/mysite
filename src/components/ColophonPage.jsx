import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import Footer from './Footer.jsx';

export default function ColophonPage() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    setLang(savedLang);

    const handleStorage = (e) => {
      if (!e || e.key === 'lang') {
        setLang(localStorage.getItem('lang') || 'en');
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const t = translations[lang] || translations.en;
  const c = t.colophon;

  const getDomain = (urlStr) => {
    try {
      return new URL(urlStr).hostname.replace(/^www\./, '');
    } catch {
      return urlStr;
    }
  };

  return (
    <>
      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-xl sm:text-2xl font-medium leading-tight tracking-tight mb-2">
          {c.title}
        </h1>

        <p className="max-w-[70ch] text-sm leading-relaxed text-muted mb-16">
          {c.desc}
        </p>

        {/* Built Section */}
        <section className="mb-16">
          <h2 className="text-base font-medium mb-6">
            {c.built}
          </h2>
          <dl className="mt-6 divide-y divide-border border-y border-border">
            <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted sm:pt-1">{c.framework}</dt>
              <dd className="text-sm leading-relaxed text-fg">{c.frameworkDesc}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted sm:pt-1">{c.styling}</dt>
              <dd className="text-sm leading-relaxed text-fg">{c.stylingDesc}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted sm:pt-1">{c.language}</dt>
              <dd className="text-sm leading-relaxed text-fg">{c.languageDesc}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted sm:pt-1">{c.backend}</dt>
              <dd className="text-sm leading-relaxed text-fg">{c.backendDesc}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <dt className="font-mono text-xs uppercase tracking-wider text-muted sm:pt-1">{c.content}</dt>
              <dd className="text-sm leading-relaxed text-fg">{c.contentDesc}</dd>
            </div>
          </dl>
        </section>

        {/* Inspiration Section */}
        <section>
          <h2 className="text-base font-medium mb-4">
            {c.inspiration}
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-6">
            {c.inspirationDesc}
          </p>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {c.inspirationList.map((site) => (
              <li key={site.name}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <span className="text-sm text-fg transition-colors group-hover:text-accent">
                    {site.name}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-muted">
                    {getDomain(site.url)}
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      className="h-3 w-3 transition-colors group-hover:text-accent"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 7h10v10M7 17L17 7" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
