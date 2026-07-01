import { site } from '../lib/site';

export default function Logo({ size = 30, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg
        width={size}
        height={(size * 27) / 30}
        viewBox="0 0 100 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon points="50,2 98,87 2,87" fill={color} />
        <polygon points="50,42 74,83 26,83" fill="#C6A769" />
      </svg>
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 300,
          fontSize: size > 32 ? '1.5rem' : '1.25rem',
          color,
          letterSpacing: '0.06em',
          lineHeight: 1,
          textTransform: 'lowercase',
        }}
      >
        {site.name}
      </span>
    </span>
  );
}
