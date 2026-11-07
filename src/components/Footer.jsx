import React, { useState, useEffect } from 'react';
import { siteData } from '../data/siteData';
import LastFmWidget from './LastFmWidget';

export default function Footer() {
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

  const thisPageLinks = [
    { label: 'Home', href: '/' },
    { label: 'Now', href: '/now' },
    { href: '/uses', label: 'Uses' },
    { href: '/til', label: 'TIL' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="mt-24 border-t border-border pt-12 pb-24 font-mono text-xs">
      <div className="max-w-2xl mx-auto px-6">
        {/* Top row: branding left, Last.fm widget right */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-16">
          <div>
            <p className="text-fg font-medium">@{siteData.github.split('/').pop()}</p>
            <p className="text-muted mt-1">
              © {new Date().getFullYear()} {siteData.name}
            </p>
          </div>

          {/* Last.fm widget — client-only to allow fetch on the browser */}
          <LastFmWidget />
        </div>

        {/* Navigation columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="text-muted mb-3 uppercase tracking-wider text-[10px]">This Site</p>
            <ul className="space-y-2">
              {thisPageLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-muted hover:text-fg transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-muted mb-3 uppercase tracking-wider text-[10px]">Resources</p>
            <ul className="space-y-2">
              {siteData.links.resources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    target={link.external ? "_blank" : undefined} 
                    rel={link.external ? "noopener noreferrer" : undefined} 
                    className="inline-flex items-center gap-1 text-muted hover:text-fg transition-colors"
                  >
                    {link.label} {link.external && <span>↗</span>}
                  </a>
                </li>
              ))}
              <li>
                <a href="/colophon" className="text-muted hover:text-fg transition-colors">Colophon</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-muted mb-3 uppercase tracking-wider text-[10px]">Connect</p>
            <ul className="space-y-2">
              {siteData.links.connect.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 text-muted hover:text-fg transition-colors"
                  >
                    {link.label} {link.external && <span>↗</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
