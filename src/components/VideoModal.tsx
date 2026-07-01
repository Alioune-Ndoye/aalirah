import { useEffect } from 'react';
import { embedSrc, videoKind } from '../lib/video';
import Icon from './Icon';

type Props = {
  /** Video source URL (file, YouTube, or Facebook). Null/undefined keeps the modal closed. */
  src: string | null;
  /** Accessible label, e.g. the customer's name. */
  label?: string;
  onClose: () => void;
};

export default function VideoModal({ src, label, onClose }: Props) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [src, onClose]);

  if (!src) return null;

  const iframe = embedSrc(src);
  const isFile = videoKind(src) === 'file';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label ? `Video review from ${label}` : 'Video review'}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(20,28,24,0.82)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5vw',
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close video"
        style={{
          position: 'absolute',
          top: 'max(18px, 3vh)',
          right: 'max(18px, 3vw)',
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.25)',
          background: 'rgba(255,255,255,0.08)',
          color: '#fff',
          fontSize: '1.4rem',
          lineHeight: 1,
          cursor: 'pointer',
        }}
      >
        ×
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(900px, 100%)',
          aspectRatio: '16 / 9',
          borderRadius: 18,
          overflow: 'hidden',
          background: '#000',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        }}
      >
        {isFile ? (
          <video
            src={src}
            controls
            autoPlay
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
          />
        ) : iframe ? (
          <iframe
            src={iframe}
            title={label ? `Video review from ${label}` : 'Video review'}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 0 }}
          />
        ) : (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            <Icon name="play" size={18} fill /> Watch video
          </a>
        )}
      </div>
    </div>
  );
}
