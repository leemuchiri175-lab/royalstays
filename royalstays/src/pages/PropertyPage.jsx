import { useState } from 'react'
import { useStore } from '../context/store'
import { Icon, Avatar, Breadcrumb, ProgressBar, Badge } from '../components/ui'
import { formatKES, calcNights, AMENITY_ICONS, STATUS_CFG } from '../lib/data'

export default function PropertyPage() {
  const { pageData: p, user, navigate, favourites, toggleFav, showToast, setSelectedProp, setBookingDetails } = useStore()
  if (!p) { navigate('search'); return null }

  const [imgIdx,     setImgIdx]     = useState(0)
  const [activeTab,  setActiveTab]  = useState('overview')
  const [cin,        setCin]        = useState('')
  const [cout,       setCout]       = useState('')
  const [guests,     setGuests]     = useState(1)
  const isFav = favourites.includes(p.id)

  const nights   = cin && cout ? calcNights(cin, cout) : 0
  const subtotal = nights * p.price_per_night
  const platFee  = subtotal * 0.08
  const total    = subtotal + p.cleaning_fee + platFee
  const cashback = subtotal * 0.02

  const handleBook = () => {
    if (!user) { navigate('login'); return }
    if (!cin || !cout) { showToast('Please select check-in and check-out dates', 'error'); return }
    setSelectedProp(p)
    setBookingDetails({ cin, cout, guests, nights, subtotal, platformFee: platFee, total, cashback })
    navigate('checkout')
  }

  const tabs = ['overview', 'amenities', 'location', 'reviews']

  return (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '28px 24px 64px' }}>
      <Breadcrumb crumbs={[
        { label: 'Home',       page: 'home' },
        { label: 'Properties', page: 'search' },
        { label: p.city,       page: 'search', data: { loc: p.city } },
        { label: p.name },
      ]} />

      {/* Gallery */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 6, borderRadius: 18, overflow: 'hidden', height: 440, marginBottom: 32, position: 'relative' }}>
        <div style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setImgIdx((imgIdx + 1) % p.images.length)}>
          <img src={p.images[imgIdx] || p.featured_image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          />
          {p.images.length > 1 && (
            <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
              {p.images.map((_, i) => (
                <div key={i} onClick={e => { e.stopPropagation(); setImgIdx(i) }}
                  style={{ width: 7, height: 7, borderRadius: '50%', background: i === imgIdx ? 'white' : 'rgba(255,255,255,.5)', cursor: 'pointer' }} />
              ))}
            </div>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 6 }}>
          {(p.images.length >= 3 ? [p.images[1], p.images[2]] : [p.featured_image, p.featured_image]).map((img, i) => (
            <div key={i} style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => setImgIdx(i + 1)}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .3s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              />
            </div>
          ))}
        </div>
        <button onClick={() => showToast('Full gallery coming soon')} style={{
          position: 'absolute', bottom: 16, right: 16, background: 'rgba(255,255,255,.9)',
          backdropFilter: 'blur(4px)', border: 'none', borderRadius: 8, padding: '8px 14px',
          fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Icon name="img" size={14} /> {p.images.length} photos
        </button>
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48 }}>
        <div>
          {/* Title row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: 'var(--text-sec)', textTransform: 'capitalize', marginBottom: 4 }}>
                {p.property_type.replace(/_/g, ' ')} · {p.city}, {p.county}
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(24px,3vw,38px)', fontWeight: 700, marginBottom: 8 }}>{p.name}</h1>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexShrink: 0 }}>
              <button onClick={() => { navigator.clipboard?.writeText(window.location.href); showToast('Link copied!') }}
                style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: 8, cursor: 'pointer', color: 'var(--text-sec)', display: 'flex' }}>
                <Icon name="share" size={16} />
              </button>
              <button onClick={() => toggleFav(p.id)}
                style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: 8, cursor: 'pointer', display: 'flex' }}>
                <Icon name="heart" size={16} color={isFav ? '#ef4444' : 'var(--text-muted)'} />
              </button>
            </div>
          </div>

          {/* Meta row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, color: 'var(--text-sec)', fontSize: 14, marginBottom: 20 }}>
            <span style={{ color: '#F59E0B', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="star" size={14} color="#F59E0B" />{p.average_rating}
              <span style={{ color: 'var(--text-sec)', fontWeight: 400 }}>({p.total_reviews} reviews)</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="bed" size={14} />{p.bedrooms} bedroom{p.bedrooms !== 1 ? 's' : ''}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="bath" size={14} />{p.bathrooms} bath{p.bathrooms !== 1 ? 's' : ''}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="users" size={14} />Up to {p.max_guests} guests</span>
          </div>

          {/* Highlights */}
          {p.highlights && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {p.highlights.map(h => (
                <span key={h} style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 100, padding: '5px 12px', fontSize: 12.5, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5 }}>
                  ✦ {h}
                </span>
              ))}
            </div>
          )}

          {/* TABS */}
          <div style={{ display: 'flex', gap: 6, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 100, padding: 4, marginBottom: 22, width: 'fit-content' }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                padding: '7px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', border: 'none', transition: 'all .18s', textTransform: 'capitalize',
                background: activeTab === t ? 'var(--forest)' : 'none',
                color:      activeTab === t ? '#fff' : 'var(--text-sec)',
              }}>{t}</button>
            ))}
          </div>

          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>About This Place</h3>
              {p.description.split('\n\n').map((para, i) => (
                <p key={i} style={{ lineHeight: 1.78, color: 'var(--text-sec)', fontSize: 15, marginBottom: 12 }}>{para}</p>
              ))}
              <div style={{ height: 1, background: 'var(--border)', margin: '22px 0' }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>House Rules</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  ['Check-in',  `From ${p.checkin_time}`],
                  ['Check-out', `By ${p.checkout_time}`],
                  ['Min stay',  `${p.minimum_stay} night${p.minimum_stay !== 1 ? 's' : ''}`],
                  ['Cancellation', p.cancellation_policy],
                  ['Pets',      p.amenities.includes('Pet Allowed') ? 'Allowed' : 'Not allowed'],
                  ['Max guests',`${p.max_guests} guests`],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: 'var(--cream)', borderRadius: 10, padding: '12px 14px' }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.7px', color: 'var(--text-sec)', marginBottom: 3 }}>{k}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, textTransform: 'capitalize' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ height: 1, background: 'var(--border)', margin: '22px 0' }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Your Host</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 18, background: 'var(--cream)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <Avatar name={p.owner_name} size={56} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{p.owner_name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-sec)', marginTop: 2 }}>Hosting since {p.owner_since} · Verified host</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <Badge color="#16a34a" bg="#dcfce7">✓ Verified</Badge>
                    {p.owner_superhost && <Badge color="#2563eb" bg="#dbeafe">🌟 Superhost</Badge>}
                  </div>
                </div>
                <button onClick={() => showToast('Messaging available after booking')}
                  style={{ padding: '9px 16px', border: '1px solid var(--border)', borderRadius: 8, background: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="msg" size={14} /> Message
                </button>
              </div>
            </>
          )}

          {/* TAB: AMENITIES */}
          {activeTab === 'amenities' && (
            <>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>What's Included</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {p.amenities.map(a => (
                  <span key={a} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 100, padding: '5px 12px', fontSize: 13, margin: 4 }}>
                    {AMENITY_ICONS[a] || '✓'} {a}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* TAB: LOCATION */}
          {activeTab === 'location' && (
            <>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Where You'll Be</h3>
              <div style={{ background: 'var(--cream)', borderRadius: 18, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', marginBottom: 20 }}>
                <div style={{ textAlign: 'center', color: 'var(--text-sec)' }}>
                  <Icon name="map" size={32} color="var(--forest-muted)" />
                  <div style={{ fontWeight: 600, marginTop: 8 }}>{p.city}, {p.county}</div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>Exact address provided after booking</div>
                </div>
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>What's Nearby</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {p.nearby.map(n => (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-sec)' }}>
                    <Icon name="map" size={14} color="var(--forest-muted)" /> {n}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* TAB: REVIEWS */}
          {activeTab === 'reviews' && (
            <>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 24 }}>
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 52, fontWeight: 700, lineHeight: 1 }}>{p.average_rating}</div>
                  <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginBottom: 4 }}>
                    {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={14} color={i <= Math.round(p.average_rating) ? '#F59E0B' : '#D1D5DB'} />)}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-sec)' }}>{p.total_reviews} reviews</div>
                </div>
                <div style={{ flex: 1 }}>
                  {[['Cleanliness',92],['Communication',96],['Value',88],['Location',94]].map(([lbl,pct]) => (
                    <ProgressBar key={lbl} label={lbl} value={pct} showValue={(pct/20).toFixed(1)} />
                  ))}
                </div>
              </div>
              {p.reviews.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>✍️</div>
                  <p>No reviews yet. Be the first!</p>
                </div>
              ) : (
                p.reviews.map((r, i) => (
                  <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px', marginBottom: 14 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                      <Avatar name={r.avatar || r.user} size={38} bg={['var(--forest)','#7c3aed','#dc2626'][i % 3]} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{r.user}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{r.date}</div>
                      </div>
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                        {[1,2,3,4,5].map(s => <Icon key={s} name="star" size={13} color={s <= r.rating ? '#F59E0B' : '#E5E7EB'} />)}
                      </div>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--text-sec)', lineHeight: 1.65 }}>{r.comment}</p>
                    {i === 0 && (
                      <div style={{ background: 'var(--cream)', borderRadius: 8, padding: '12px 14px', marginTop: 12, borderLeft: '3px solid var(--gold)' }}>
                        <div style={{ fontSize: 11.5, fontWeight: 700, marginBottom: 4, color: 'var(--forest)' }}>Response from {p.owner_name}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-sec)' }}>Thank you so much for your kind words! It was a pleasure hosting you and we hope to welcome you back soon.</div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </>
          )}
        </div>

        {/* BOOKING WIDGET */}
        <div>
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 18, padding: 24, boxShadow: '0 12px 40px rgba(0,0,0,.1)', position: 'sticky', top: 80 }}>
            <div style={{ marginBottom: 18 }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 30, fontWeight: 700 }}>{formatKES(p.price_per_night)}</span>
              <span style={{ color: 'var(--text-sec)', fontSize: 13 }}> / night</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
                <Icon name="star" size={13} color="#F59E0B" />
                <span style={{ fontSize: 13, fontWeight: 600 }}>{p.average_rating}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>({p.total_reviews})</span>
              </div>
            </div>

            {/* Date picker */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1.5px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 10 }}>
              {[['Check-in', cin, setCin], ['Check-out', cout, setCout]].map(([lbl, val, setter], i) => (
                <div key={lbl} style={{ padding: '10px 12px', borderRight: i === 0 ? '1px solid var(--border)' : 'none' }}>
                  <label style={{ display: 'block', fontSize: 9.5, fontWeight: 700, letterSpacing: '.9px', textTransform: 'uppercase', color: 'var(--text-sec)', marginBottom: 3 }}>{lbl}</label>
                  <input type="date" value={val} onChange={e => setter(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: 13.5, fontWeight: 500, background: 'transparent', color: 'var(--charcoal)', width: '100%' }} />
                </div>
              ))}
            </div>

            {/* Guests */}
            <div style={{ border: '1.5px solid var(--border)', borderRadius: 12, padding: '10px 12px', marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 9.5, fontWeight: 700, letterSpacing: '.9px', textTransform: 'uppercase', color: 'var(--text-sec)', marginBottom: 3 }}>Guests</label>
              <select value={guests} onChange={e => setGuests(+e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: 13.5, fontWeight: 500, background: 'transparent', color: 'var(--charcoal)', width: '100%', cursor: 'pointer' }}>
                {Array.from({ length: p.max_guests }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n} guest{n !== 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            {/* Price breakdown */}
            {nights > 0 && (
              <div style={{ background: 'var(--cream)', borderRadius: 12, padding: 14, marginBottom: 14 }}>
                {[
                  [`${formatKES(p.price_per_night)} × ${nights} night${nights !== 1 ? 's' : ''}`, formatKES(subtotal)],
                  ['Cleaning fee', formatKES(p.cleaning_fee)],
                  ['Service fee (8%)', formatKES(Math.round(platFee))],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, padding: '3px 0' }}>
                    <span>{k}</span><span>{v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 15, borderTop: '1px solid var(--border)', paddingTop: 10, marginTop: 6 }}>
                  <span>Total</span><span>{formatKES(Math.round(total))}</span>
                </div>
              </div>
            )}

            <button onClick={handleBook} style={{
              width: '100%', padding: 15, background: 'var(--forest)', color: '#fff',
              border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer',
              transition: 'all .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--forest-light)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--forest)'; e.currentTarget.style.transform = '' }}
            >
              {user ? (nights > 0 ? 'Reserve Now' : 'Select Dates to Book') : 'Sign In to Book'}
            </button>

            {nights > 0 && (
              <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--forest-muted)', marginTop: 8, fontWeight: 600 }}>
                💰 You'll earn {formatKES(Math.round(cashback))} cashback!
              </div>
            )}
            <div style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--text-muted)', marginTop: 6 }}>
              You won't be charged until payment is verified
            </div>

            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', gap: 8, justifyContent: 'center' }}>
              {[['share','Share'], ['eye','Report']].map(([ic, lbl]) => (
                <button key={ic} onClick={() => showToast(`${lbl} clicked`)} style={{
                  background: 'none', border: '1px solid var(--border)', borderRadius: 8,
                  padding: '7px 14px', cursor: 'pointer', fontSize: 12, color: 'var(--text-sec)',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  <Icon name={ic} size={13} /> {lbl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
