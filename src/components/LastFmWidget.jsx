import React, { useState, useEffect } from 'react';

const LASTFM_USER = 'Ivannaff_';
const LASTFM_API_KEY = 'f8957c344f3570a77bb020fd196bcd02';

export default function LastFmWidget() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchTracks() {
      try {
        const url =
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks` +
          `&user=${encodeURIComponent(LASTFM_USER)}` +
          `&api_key=${LASTFM_API_KEY}&format=json&limit=5`;
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        const raw = data?.recenttracks?.track ?? [];

        const formatted = raw.map((track) => {
          const nowPlaying = track['@attr']?.nowplaying === 'true';
          // prefer extralarge → large → medium → small
          const image =
            track.image?.find((i) => i.size === 'extralarge')?.['#text'] ||
            track.image?.find((i) => i.size === 'large')?.['#text'] ||
            track.image?.find((i) => i.size === 'medium')?.['#text'] ||
            null;
          return {
            name: track.name,
            artist: track.artist?.['#text'] ?? '',
            url: track.url,
            image: image && image !== '' ? image : null,
            nowPlaying,
          };
        });

        if (!cancelled) {
          setTracks(formatted);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    fetchTracks();
    const timer = setInterval(fetchTracks, 60_000);
    return () => { cancelled = true; clearInterval(timer); };
  }, []);

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="flex flex-col items-end gap-2 animate-pulse min-w-[180px]">
        <div className="h-2.5 w-24 bg-surface rounded" />
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end gap-1.5">
            <div className="h-3 w-32 bg-surface rounded" />
            <div className="h-2.5 w-20 bg-surface rounded" />
          </div>
          <div className="w-12 h-12 bg-surface rounded flex-shrink-0" />
        </div>
      </div>
    );
  }

  if (tracks.length === 0) return null;

  const [featured] = tracks;
  const isNowPlaying = featured.nowPlaying;

  return (
    <div className="flex flex-col items-end gap-2 text-right">

      {/* ── Label ── */}
      <p className="text-muted text-[10px] uppercase tracking-wider leading-none">
        {isNowPlaying ? (
          <span className="inline-flex items-center gap-1.5">
            {/* pulsing dot */}
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Now playing
          </span>
        ) : (
          'Latest played song'
        )}
      </p>

      {/* ── Featured track row: image LEFT · text RIGHT ── */}
      <div className="flex items-center gap-3">
        {/* Album art */}
        {featured.image ? (
          <img
            src={featured.image}
            alt={`${featured.name} album art`}
            width={48}
            height={48}
            className="w-12 h-12 rounded object-cover flex-shrink-0 border border-border"
            loading="lazy"
          />
        ) : (
          <div className="w-12 h-12 rounded bg-surface border border-border flex items-center justify-center flex-shrink-0">
            <MusicNote />
          </div>
        )}

        {/* Song name + artist */}
        <div className="flex flex-col items-end">
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors font-medium leading-snug"
          >
            {featured.name}&nbsp;↗
          </a>
          <span className="text-muted text-[11px] leading-snug">{featured.artist}</span>
        </div>
      </div>


    </div>
  );
}

function MusicNote() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18" height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-muted"
      aria-hidden="true"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
