import React, { useState, useEffect } from 'react';
import { siteData } from '../data/siteData';
import { translations } from '../translations';
import { Mail, Globe, ExternalLink } from 'lucide-react';

export default function HomePage() {
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

  const socialLinks = [
    { label: 'GitHub', href: siteData.links.connect[0].href, icon: ExternalLink },
    { label: 'LinkedIn', href: siteData.links.connect[1].href, icon: ExternalLink },
    { label: 'Email', href: siteData.links.connect[3].href, icon: Mail },
  ];

  return (
    <main className="max-w-2xl mx-auto px-6 pt-16 pb-24">
      {/* Hero Section */}
      <section className="mb-20">
        <h1 className="text-2xl sm:text-3xl font-medium leading-tight tracking-tight mb-2">
          <span className="text-accent">{siteData.firstName}</span> {siteData.lastName}
        </h1>
        
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-6">
          {siteData.role}
        </p>

        <p className="text-base leading-relaxed text-fg/90 mb-10 max-w-2xl">
          {t.home.bio}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
          <span>{t.home.availability}</span>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a 
                key={link.label}
                href={link.href} 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs font-medium hover:text-accent transition-colors flex items-center gap-2 group"
              >
                <Icon size={14} className="text-muted group-hover:text-accent transition-colors" />
                {link.label}
              </a>
            );
          })}
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="mb-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-10">
          {t.home.featuredWork || 'FEATURED WORK'}
        </p>
        
        <div className="grid grid-cols-1 gap-6">
          {siteData.projects.map((project, idx) => (
            <a 
              key={idx}
              href={project.url} 
              target="_blank" 
              rel="noreferrer" 
              className="group block p-6 rounded-2xl border border-border/50 bg-surface/10 hover:bg-surface/30 hover:border-border transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-serif group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted py-1 px-2 rounded-md bg-border/30">
                  {project.category}
                </span>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-6">
                {project.desc}
              </p>
              <div className="flex items-center text-xs font-medium gap-1">
                View Project <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Scenery Illustration */}
      <div className="w-full h-48 bg-surface/30 rounded-3xl border border-border/50 mb-20 overflow-hidden flex items-end justify-center relative">
        <svg width="100%" height="100%" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 grayscale dark:invert transition-all duration-700">
          <path d="M0 180C150 140 300 190 450 160C600 130 750 170 800 150V200H0V180Z" fill="var(--accent)" opacity="0.1" />
          <path d="M0 190C100 170 200 195 300 185C400 175 500 190 600 180C700 170 800 190 800 190V200H0V190Z" fill="var(--accent)" opacity="0.2" />
          <circle cx="650" cy="50" r="30" fill="var(--accent)" opacity="0.05" />
        </svg>
      </div>

      {/* Experience Section */}
      <section id="experience" className="mb-20">
        <h2 className="text-xl font-serif mb-10">{t.home.experience}</h2>
        <div className="space-y-8">
          {siteData.experience.map((exp, idx) => (
            <div key={idx} className="group">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <p className="text-sm font-medium text-fg">{exp.period}</p>
              </div>
              <h3 className="text-base font-medium text-fg mb-1">
                {exp.role} at <span className="text-accent">{exp.company}</span>
              </h3>
              <p className="text-xs text-muted mb-3">Full-time</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
