import React, { useState, useEffect } from 'react';
import { siteData } from '../data/siteData';
import { translations } from '../translations';
import { Mail, Globe, ExternalLink, Code2, FileCode, Paintbrush, Database, Rocket, Sparkles, Layers, Cpu } from 'lucide-react';

const techIcons = {
  'React': Code2,
  'TypeScript': FileCode,
  'Tailwind': Paintbrush,
  'Python': Code2,
  'Flask': Layers,
  'PostgreSQL': Database,
  'Astro': Sparkles,
  'AI': Cpu,
};

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
            <div 
              key={idx}
              className="group block p-6 rounded-2xl border border-border/50 bg-surface/10 hover:bg-surface/30 hover:border-border transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-serif">
                  {project.name}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted py-1 px-2.5 rounded-full border border-border/40 bg-surface/20">
                  {project.category}
                </span>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-6">
                {project.desc}
              </p>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech && project.tech.map((tItem, tIdx) => {
                  const TechIcon = techIcons[tItem] || Code2;
                  return (
                    <span 
                      key={tIdx}
                      className="font-mono text-[11px] text-muted px-2 py-1 rounded-md border border-border/40 bg-surface/30 flex items-center gap-1.5"
                      title={tItem}
                    >
                      <TechIcon size={13} className="text-muted" />
                      <span>{tItem}</span>
                    </span>
                  );
                })}
              </div>

              <div className="flex items-center">
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center text-xs font-medium text-accent hover:underline gap-1"
                >
                  Code <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="mb-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-10">
          {t.home.experience || 'EXPERIENCE'}
        </p>
        <div className="space-y-8">
          {siteData.experience.map((exp, idx) => (
            <div key={idx} className="group p-6 rounded-2xl border border-border/50 bg-surface/10 hover:bg-surface/30 hover:border-border transition-all">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-serif">
                  {exp.role} at <span className="text-accent">{exp.company}</span>
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted py-1 px-2.5 rounded-full border border-border/40 bg-surface/20">
                  {exp.period}
                </span>
              </div>
              <p className="text-xs font-mono text-muted uppercase tracking-wider mb-4">Full-time</p>
              <ul className="space-y-2">
                {exp.points && exp.points.map((point, pIdx) => (
                  <li key={pIdx} className="text-sm text-muted leading-relaxed pl-4 border-l border-border/60">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
