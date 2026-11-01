import React, { useState, useEffect } from 'react';
import { siteData } from '../data/siteData';

export default function Footer() {
  const [lang, setLang] = useState('en');
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchLastFm = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/lastfm.json');
        const data = await res.json();
        
        if (data.error) {
          setError(data.error);
          setSong({
            title: 'No recent tracks',
            artist: 'Play something on Last.fm',
            albumArt: null,
            isPlaying: false,
          });
        } else {
          setSong(data);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to fetch Last.fm data:', err);
        setError('Connection error');
        setSong({
          title: 'Connection error',
          artist: 'Failed to load track',
          albumArt: null,
          isPlaying: false,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLastFm();
    const interval = setInterval(fetchLastFm, 30000);
    return () => clearInterval(interval);
  }, []);

  const thisPageLinks = [
    { label: 'Home', href: '/' },
    { label: 'Now', href: '/now' },
    { label: 'Uses', href: '/uses' },
    { label: 'TIL', href: '/uses' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="mt-24 border-t border-border pt-12 pb-24 font-mono text-xs">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-16">
          <div>
            <p className="text-fg font-medium">@{siteData.github.split('/').pop()}</p>
            <p className="text-muted mt-1">
              © {new Date().getFullYear()} {siteData.name}
            </p>
          </div>
          
          <div className="flex items-center gap-3 p-2.5 rounded-xl border border-border bg-surface/30 max-w-xs">
            {song?.albumArt ? (
              <img 
                src={song.albumArt} 
                alt={`${song.title} by ${song.artist}`}
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-border flex-shrink-0 flex items-center justify-center text-muted text-xs">
                {loading ? '...' : '♫'}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-[10px] uppercase text-muted tracking-wider">
                {loading ? 'Loading...' : song?.isPlaying ? 'Now Playing' : 'Last Played'}
              </p>
              <p className="text-xs font-medium text-fg truncate">
                {loading ? 'Loading...' : song?.title}
              </p>
              <p className="text-[11px] text-muted truncate">
                {loading ? '...' : song?.artist}
              </p>
              {error && !loading && (
                <p className="text-[9px] text-muted/60 italic">({error})</p>
              )}
            </div>
          </div>
        </div>

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
            </ul>
          </div>
          <div>
            <p className="text-muted mb-3 uppercase tracking-wider text-[10px]">Connect</p>
            <ul className="space-y-2">
              {siteData.links.connect.map((link) => (
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
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
