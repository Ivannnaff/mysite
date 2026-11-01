export async function GET() {
  try {
    const user = 'Ivannnaff_';
    const apiKey = 'f8957c344f3570a77bb020fd196bcd02';
    
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=1`,
      { headers: { 'User-Agent': 'PortfolioApp/1.0' } }
    );
    
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch from Last.fm' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const track = data?.recenttracks?.track?.[0];

    if (!track) {
      return new Response(JSON.stringify({ error: 'No tracks found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const songData = {
      title: track.name,
      artist: track.artist['#text'] || track.artist,
      albumArt: track.image?.[2]?.['#text'] || null,
      isPlaying: track['@attr']?.nowplaying === 'true',
      url: track.url,
    };

    return new Response(JSON.stringify(songData), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
