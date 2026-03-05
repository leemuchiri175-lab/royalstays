import { useState } from 'react'
import { useStore } from '../context/store'
import PropertyCard from '../components/PropertyCard'
import Footer from '../components/Footer'
import { Icon } from '../components/ui'
import { MOCK_PROPERTIES } from '../lib/data'

const CATEGORIES = [
  { icon: '🏖️', label: 'Beach',     type: 'villa' },
  { icon: '🏙️', label: 'City',      type: 'apartment' },
  { icon: '🦁', label: 'Safari',    type: 'luxury_lodge' },
  { icon: '🏕️', label: 'Nature',    type: 'cottage' },
  { icon: '🌺', label: 'Heritage',  type: 'holiday_home' },
  { icon: '🏨', label: 'Boutique',  type: 'boutique_hotel' },
  { icon: '🌲', label: 'Treehouse', type: 'treehouse' },
  { icon: '🏡', label: 'Guesthouse',type: 'guesthouse' },
]

const DESTINATIONS = [
  { city: 'Diani Beach',  props: 42, img: 'https://images.unsplash.com/photo-1602343168117-bb8afa9aceae?w=500&q=70' },
  { city: 'Maasai Mara',  props: 28, img: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&q=70' },
  { city: 'Nairobi',      props: 65, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=70' },
  { city: 'Lamu',         props: 19, img: 'https://images.unsplash.com/photo-1587382901867-5b9a58c7bc6d?w=500&q=70' },
  { city: 'Mombasa',      props: 38, img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500&q=70' },
]

export default function HomePage() {
  const { navigate, compareList, toggleCompare } = useStore()
  const [loc, setLoc] = useState('')
  const [cin, setCin] = useState('')
  const [cout, setCout] = useState('')
  const featured = MOCK_PROPERTIES.filter(p => p.status === 'approved').slice(0, 6)

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(150deg, var(--forest) 0%, var(--forest-mid) 60%, #142820 100%)',
        padding: 'clamp(56px,8vw,96px) 24px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Bg texture */}
        <div style={{ position: 'absolute', inset: 0, background: "url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=30') center/cover", opacity: .07 }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, background: 'radial-gradient(circle, rgba(201,168,76,.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(74,140,100,.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 740, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,.18)', border: '1px solid rgba(201,168,76,.38)', color: 'var(--gold)', padding: '5px 14px', borderRadius: 100, fontSize: 11, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 20 }}>
            🇰🇪 Kenya's Premier Stays
          </div>

          <h1 style={{ fontSize: 'clamp(38px,6vw,68px)', fontWeight: 700, color: '#fff', lineHeight: 1.03, letterSpacing: '-.5px', marginBottom: 16 }}>
            Discover <span style={{ color: 'var(--gold)' }}>Royal</span>
            <br />Stays Across Kenya
          </h1>
          <p style={{ color: '#A8BDB8', fontSize: 17, lineHeight: 1.65, marginBottom: 36, fontWeight: 300 }}>
            From Diani's coral beaches to Mara's endless savannas — book handpicked stays with <strong style={{ color: 'var(--gold)' }}>2% cashback</strong> guaranteed on every booking.
          </p>

          {/* Search bar */}
          <div style={{
            background: 'var(--white)', borderRadius: 28, padding: 6,
            display: 'flex', alignItems: 'center', gap: 2,
            boxShadow: '0 20px 60px rgba(0,0,0,.3)', maxWidth: 760, margin: '0 auto',
          }}>
            {[
              { label: 'Where to?', type: 'text', placeholder: 'Nairobi, Diani, Mara…', value: loc, onChange: e => setLoc(e.target.value) },
              { label: 'Check In',  type: 'date', value: cin,  onChange: e => setCin(e.target.value) },
              { label: 'Check Out', type: 'date', value: cout, onChange: e => setCout(e.target.value) },
            ].map((f, i, arr) => (
              <div key={f.label} style={{ flex: i === 0 ? 2 : 1, display: 'flex', alignItems: 'center', minWidth: 0 }}>
                {i > 0 && <div style={{ width: 1, background: 'var(--border)', height: 36, flexShrink: 0 }} />}
                <div style={{ flex: 1, padding: '10px 14px', borderRadius: 16, cursor: 'pointer' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.9px', color: 'var(--text-sec)', marginBottom: 3 }}>{f.label}</div>
                  <input type={f.type} placeholder={f.placeholder} value={f.value} onChange={f.onChange}
                    style={{ border: 'none', outline: 'none', fontSize: 14, fontWeight: 500, color: 'var(--charcoal)', background: 'transparent', width: '100%' }} />
                </div>
              </div>
            ))}
            <button onClick={() => navigate('search', { loc, cin, cout })}
              style={{
                background: 'var(--forest)', color: '#fff', border: 'none', padding: '14px 22px',
                borderRadius: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 14, fontWeight: 600, transition: 'all .18s', whiteSpace: 'nowrap', flexShrink: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--forest-light)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--forest)'}
            >
              <Icon name="search" size={15} color="#fff" /> Search
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 40, flexWrap: 'wrap' }}>
            {[['500+', 'Properties'], ['12K+', 'Happy Guests'], ['47', 'Counties Covered'], ['4.8★', 'Avg Rating']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ color: '#fff', fontSize: 26, fontWeight: 700, fontFamily: "'Cormorant Garamond',serif" }}>{v}</div>
                <div style={{ color: '#7A9E98', fontSize: 12, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE STRIP ── */}
      <section style={{ background: 'var(--forest-mid)', padding: '36px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20 }}>
          {[
            ['💳', '2% Cashback',       'Earn on every stay, redeem on the next'],
            ['✅', 'Verified Listings',  'Every property reviewed & approved'],
            ['📱', 'M-Pesa Native',      'Pay via Paybill or Till — instant & safe'],
            ['🔒', 'Booking Protection', 'Admin-verified payments, full support'],
          ].map(([ic, h, p]) => (
            <div key={h} style={{ textAlign: 'center', color: '#fff' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{ic}</div>
              <h3 style={{ color: 'var(--gold)', fontFamily: "'Cormorant Garamond',serif", fontSize: 17, marginBottom: 4 }}>{h}</h3>
              <p style={{ fontSize: 12.5, color: '#7A9E98', lineHeight: 1.55, fontWeight: 300 }}>{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section style={{ padding: '60px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(22px,3vw,30px)', fontWeight: 700, marginBottom: 4 }}>Explore by Style</h2>
          <p style={{ color: 'var(--text-sec)', fontSize: 14, fontWeight: 300 }}>Curated for every kind of traveler</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 10 }}>
          {CATEGORIES.map(c => (
            <button key={c.type} onClick={() => navigate('search', { type: c.type })}
              style={{
                background: 'var(--white)', borderRadius: 12, padding: '16px 8px',
                textAlign: 'center', cursor: 'pointer', border: '1px solid var(--border)',
                transition: 'all .18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--forest-muted)'; e.currentTarget.style.background = 'rgba(22,48,43,.04)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--white)' }}
            >
              <div style={{ fontSize: 24, marginBottom: 5 }}>{c.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{c.label}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section style={{ padding: '0 24px 60px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(22px,3vw,30px)', fontWeight: 700, marginBottom: 4 }}>Featured Properties</h2>
            <p style={{ color: 'var(--text-sec)', fontSize: 14, fontWeight: 300 }}>Handpicked stays worth every shilling</p>
          </div>
          <button onClick={() => navigate('search')} style={{ color: 'var(--forest-muted)', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', border: 'none', background: 'none' }}>
            View all →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(295px,1fr))', gap: 22 }}>
          {featured.map(p => <PropertyCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section style={{ background: 'var(--forest)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(22px,3vw,30px)', fontWeight: 700, marginBottom: 4, color: '#fff' }}>Top Destinations</h2>
            <p style={{ color: '#7A9E98', fontSize: 14, fontWeight: 300 }}>Most booked this season</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12 }}>
            {DESTINATIONS.map(d => (
              <div key={d.city} onClick={() => navigate('search', { loc: d.city })}
                style={{ borderRadius: 12, overflow: 'hidden', cursor: 'pointer', position: 'relative', height: 160 }}>
                <img src={d.img} alt={d.city} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .3s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.6), transparent)' }} />
                <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                  <div style={{ color: '#fff', fontFamily: "'Cormorant Garamond',serif", fontSize: 16, fontWeight: 700 }}>{d.city}</div>
                  <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 11 }}>{d.props} properties</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OWNER CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #F9F6EE 0%, #F0F9F4 100%)', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🏡</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,4vw,40px)', marginBottom: 10 }}>Own a property?</h2>
        <p style={{ color: 'var(--text-sec)', fontSize: 16, marginBottom: 28, fontWeight: 300, maxWidth: 480, margin: '0 auto 28px' }}>
          List on RoyalStays and earn <strong>90% of every booking</strong>. Join 200+ owners across Kenya.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('register')}
            style={{ background: 'var(--gold)', color: 'var(--forest)', border: 'none', padding: '14px 32px', borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            List Your Property
          </button>
          <button onClick={() => navigate('about')}
            style={{ padding: '14px 32px', fontSize: 15, border: '2px solid var(--forest)', background: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, color: 'var(--forest)' }}>
            Learn More
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
