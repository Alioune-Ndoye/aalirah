import Icon from './Icon';
import { trustItems } from '../lib/data';

export default function TrustMarquee() {
  const loop = [...trustItems, ...trustItems];
  return (
    <div className="trust-marquee-outer">
      <div className="trust-marquee-track">
        {loop.map((t, i) => (
          <div className="trust-item" key={i}>
            <Icon name={t.icon} size={14} fill={t.fill} strokeWidth={1.8} />
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
}
