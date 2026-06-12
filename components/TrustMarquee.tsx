const trustItems = [
  { icon: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>', label: '5-Star Google Rating' },
  { icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', label: 'Fully Insured' },
  { icon: '<path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>', label: 'Eco-Certified Products' },
  { icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>', label: 'Background-Checked Team' },
  { icon: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>', label: 'Same-Day Availability' },
  { icon: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>', label: '100% Satisfaction Guarantee' },
  { icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>', label: '500+ Homes Transformed' },
];

// Duplicate for seamless infinite scroll
const allItems = [...trustItems, ...trustItems];

export default function TrustMarquee() {
  return (
    <div className="trust-marquee-outer" style={{background:'rgba(7,16,30,0.75)',backdropFilter:'blur(12px)',borderTop:'1px solid rgba(200,132,90,0.15)'}}>
      <div className="trust-marquee-track">
        {allItems.map((t, i) => (
          <div key={i} className="trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" dangerouslySetInnerHTML={{__html: t.icon}} />
            {t.label}
          </div>
        ))}
      </div>
    </div>
  );
}
