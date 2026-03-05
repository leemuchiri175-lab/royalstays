import { useStore } from '../context/store'

export default function Footer() {
  const { navigate } = useStore()
  const cols = [
    {
      title: 'Explore',
      links: [['Properties', 'search'], ['Beach Stays', 'search'], ['Safari Lodges', 'search'], ['City Apartments', 'search'], ['Heritage Homes', 'search']],
    },
    {
      title: 'Hosts',
      links: [['List Your Property', 'register'], ['Owner Dashboard', 'dashboard'], ['Pricing & Fees', 'about'], ['Host Guidelines', 'about'], ['Superhost Program', 'about']],
    },
    {
      title: 'Support',
      links: [['Help Center', 'about'], ['Contact Us', 'about'], ['Safety Info', 'about'], ['Terms of Service', 'about'], ['Privacy Policy', 'about']],
    },
  ]

  return (
    <footer style={{ background: '#1A1A1C', color: '#9CA3AF', padding: '48px 24px 24px', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 32, marginBottom: 32 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: 'var(--gold)', marginBottom: 10 }}>
              RoyalStays 🇰🇪
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#6B7280', marginBottom: 16 }}>
              Kenya's premier short-term accommodation platform. From Diani's coral beaches to Mara's endless savannas — book handpicked stays with 2% cashback guaranteed.
            </p>
            <div style={{ fontSize: 13, lineHeight: 2, color: '#6B7280' }}>
              <div>📧 support@royalstays.co.ke</div>
              <div>📱 WhatsApp: +254 700 000 000</div>
              <div>🌐 www.royalstays.co.ke</div>
            </div>
          </div>

          {/* Columns */}
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ color: '#fff', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.9px', marginBottom: 12, fontFamily: 'Outfit, sans-serif' }}>
                {col.title}
              </h4>
              {col.links.map(([label, page]) => (
                <button key={label} onClick={() => navigate(page)} style={{
                  display: 'block', fontSize: 13, color: '#6B7280', marginBottom: 7,
                  cursor: 'pointer', background: 'none', border: 'none',
                  padding: 0, textAlign: 'left', transition: 'color .15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
                >{label}</button>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid #374151', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontSize: 12 }}>
          <div>© {new Date().getFullYear()} RoyalStays Kenya Ltd. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 16, color: '#6B7280' }}>
            {['Terms', 'Privacy', 'Cookies', 'Sitemap'].map(t => (
              <button key={t} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: 12 }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
              >{t}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
