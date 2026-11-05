import React, { useState, useEffect } from 'react';
import { translations } from '../translations';

export default function UsesPage() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    setLang(savedLang);

    const handleStorage = (e) => {
      if (e.key === 'lang') {
        setLang(e.newValue || 'en');
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const t = translations[lang] || translations.en;
  const uses = t.uses || translations.en.uses;

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-2xl sm:text-3xl font-medium leading-tight tracking-tight mb-2">
        {uses.title}
      </h1>

      <p className="max-w-[70ch] text-lg leading-relaxed text-muted">
        {uses.intro}
      </p>

      <hr className="my-12 border-border" />

      <div className="divide-y divide-border">
        {uses.sections.map((section, idx) => (
          <section key={idx} className="grid gap-3 py-8 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8">
            <p className="pt-1 font-mono text-sm text-muted">{section.label}</p>
            <div>
              <ul className="space-y-6">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <p className="font-medium text-fg">{item.name}</p>
                    {item.note && (
                      <p className="mt-1 max-w-[70ch] leading-relaxed text-muted">
                        {item.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
