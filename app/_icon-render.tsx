import { ImageResponse } from 'next/og';

const PLAYFAIR_CSS_URL =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';

const NAVY = '#0f172a';
const ORANGE = '#f97316';

async function loadPlayfair(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(PLAYFAIR_CSS_URL, {
      headers: {
        // gstatic returns ttf to non-modern UAs; this avoids woff2 which Satori can't parse.
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0',
      },
    }).then((r) => r.text());
    const url = css.match(/url\(([^)]+)\)\s+format\('truetype'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export async function renderIcon(pixels: number) {
  const playfair = await loadPlayfair();

  const ringInset = Math.round(pixels * 0.085);
  const ringBorder = Math.max(2, Math.round(pixels * 0.008));
  const letterSize = Math.round(pixels * 0.72);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: NAVY,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Subtle orange ring inscribed in the square */}
        <div
          style={{
            position: 'absolute',
            top: ringInset,
            right: ringInset,
            bottom: ringInset,
            left: ringInset,
            borderRadius: '9999px',
            border: `${ringBorder}px solid rgba(249, 115, 22, 0.45)`,
          }}
        />
        {/* The 'I' */}
        <div
          style={{
            display: 'flex',
            color: ORANGE,
            fontFamily: playfair ? 'Playfair' : 'serif',
            fontSize: letterSize,
            fontWeight: 700,
            lineHeight: 1,
            // Optical nudge: pull the glyph up slightly so the serifs feel centered.
            marginTop: -Math.round(pixels * 0.02),
          }}
        >
          I
        </div>
      </div>
    ),
    {
      width: pixels,
      height: pixels,
      fonts: playfair
        ? [
            {
              name: 'Playfair',
              data: playfair,
              weight: 700,
              style: 'normal',
            },
          ]
        : undefined,
    },
  );
}
