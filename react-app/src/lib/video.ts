/** Helpers for rendering customer video testimonials from a variety of sources:
 *  direct video files (.mp4/.webm/.mov), YouTube links, or Facebook video URLs. */

export type VideoKind = 'file' | 'youtube' | 'facebook' | 'unknown';

const YT_ID = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/;

export function youtubeId(url: string): string | null {
  const m = url.match(YT_ID);
  return m ? m[1] : null;
}

export function videoKind(url: string): VideoKind {
  // Recorded/uploaded clips arrive as data: or blob: URLs.
  if (/^(data:video|blob:)/i.test(url)) return 'file';
  if (youtubeId(url)) return 'youtube';
  if (/facebook\.com|fb\.watch/.test(url)) return 'facebook';
  if (/\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(url)) return 'file';
  return 'unknown';
}

/** A URL suitable for an <iframe>, or null when the source is a direct file. */
export function embedSrc(url: string): string | null {
  const id = youtubeId(url);
  if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  if (/facebook\.com|fb\.watch/.test(url)) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&autoplay=true&show_text=false`;
  }
  return null;
}

/** Best-effort thumbnail when no explicit poster is provided. */
export function autoPoster(url: string): string | null {
  const id = youtubeId(url);
  if (id) return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return null;
}
