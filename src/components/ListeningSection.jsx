import React, { useState, useEffect } from 'react';

const LASTFM_USER = 'Ivannaff_';
const LASTFM_API_KEY = 'f8957c344f3570a77bb020fd196bcd02';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function fmtDate(uts) {
  if (!uts) return '';
  const d = new Date(Number(uts) * 1000);
  return `${MONTHS[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
}

export default function ListeningSection({ empty }) {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchTracks() {
      try {
        const url =
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks` +
          `&user=${encodeURIComponent(LASTFM_USER)}` +
          `&api_key=${LASTFM_API_KEY}&format=json&limit=4`;
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        const raw = (data?.recenttracks?.track ?? []).slice(0, 4);

        const formatted = raw.map((track) => {
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
            date: track.date?.uts,
            nowPlaying: track['@attr']?.nowplaying === 'true',
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

  if (loading) {
    return <p className="text-xs text-muted font-mono animate-pulse">Loading recent tracks…</p>;
  }
  if (tracks.length === 0) {
    return <p className="text-sm text-muted">{empty}</p>;
  }

  return (
    <ul class="mt-4 space-y-5">
      {tracks.map((track, idx) => (
        <li key={idx} class="group flex items-center gap-3">
          {/* Album art */}
          {track.image ? (
            <img
              src={track.image}
              alt=""
              width={40}
              height={40}
              loading="lazy"
              class="h-10 w-10 shrink-0 rounded-md border border-border object-cover"
            />
          ) : (
            <div class="h-10 w-10 shrink-0 rounded-md border border-border bg-surface flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" class="text-muted" aria-hidden="true">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
          )}

          <span class="flex flex-col min-w-0">
            {track.url ? (
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 font-medium text-fg transition-colors group-hover:text-accent"
              >
                {track.name}
                <svg width="1em" height="1em" viewBox="0 0 24 24" class="h-3 w-3" aria-hidden="true">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10M7 17L17 7" />
                </svg>
              </a>
            ) : (
              <span class="font-medium text-fg">{track.name}</span>
            )}
            <span class="text-sm text-muted">
              {track.artist}
              {track.date && (
                <span class="ml-2 font-mono text-sm text-muted">· since {fmtDate(track.date)}</span>
              )}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}