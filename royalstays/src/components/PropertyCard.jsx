import { useStore } from '../context/store'
import { Icon, Badge } from './ui'
import { PRICE_CAT, formatKES } from '../lib/data'

export default function PropertyCard({ p, listView = false, showCompare = true }) {
  const { favourites, toggleFav, compareList, toggleCompare, navigate } = useStore()
  const isFav = favourites.includes(p.id)
  const inCmp = compareList.includes(p.id)
  const cat   = PRICE_CAT(p.price_per_night)

  const open = () => navigate('property', p)

  if (listView) return (
    <div onClick={open} style={{
      background: 'var(--white)', borderRadius: 18, overflow: 'hidden',
      border: '1px solid var(--border)', display: 'flex', cursor: 'pointer',
      transition: 'all .22s', boxShadow: '0 1px 3px rgba(0,0,0,.07)',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.09)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,.3)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,.07)'; e.currentTarget.style.borderColor = 'var(--border)' }}
    >
      <div style={{ width: 200, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
        <img src={p.featured_image} alt={p.name} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}
        />
      </div>
      <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-sec)', fontSize: 12, marginBottom: 5 }}>
            <Icon name="map" size={11} />{p.city}, {p.county}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 20, marginBottom: 6 }}>{p.name}</div>
          <div style={{ fontSize: 13, color: 'var(--text-sec)', lineHeight: 1.5, marginBottom: 10 }}>{p.short_description}</div>
          <div style={{ display: 'flex', gap: 12, color: 'var(--text-sec)', fontSize: 12, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Icon name="bed" size={12} />{p.bedrooms} bed</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Icon name="bath" size={12} />{p.bathrooms} bath</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Icon name="users" size={12} />Up to {p.max_guests}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#F59E0B', fontWeight: 600 }}>
              <Icon name="star" size={12} color="#F59E0B" />{p.average_rating} ({p.total_reviews})
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border)', marginTop: 10 }}>
          <div>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 20 }}>{formatKES(p.price_per_night)}</span>
            <span style={{ fontSize: 11, color: 'var(--text-sec)' }}> / night</span>
            <br />
            <Badge color={cat.color} bg={cat.bg} style={{ marginTop: 4, fontSize: 10 }}>{cat.label}</Badge>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {showCompare && (
              <button onClick={e => { e.stopPropagation(); toggleCompare(p.id) }} style={{
                padding: '5px 12px', borderRadius: 7, fontSize: 11.5, fontWeight: 600, cursor: 'pointer', border: 'none',
                background: inCmp ? '#dcfce7' : '#dbeafe', color: inCmp ? '#16a34a' : '#2563eb',
              }}>{inCmp ? '✓ Added' : 'Compare'}</button>
            )}
            <button onClick={e => { e.stopPropagation(); toggleFav(p.id) }} style={{
              background: 'none', border: '1px solid var(--border)', borderRadius: '50%',
              width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all .18s',
            }}>
              <Icon name="heart" size={16} color={isFav ? '#ef4444' : 'var(--text-muted)'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div onClick={open} style={{
      background: 'var(--white)', borderRadius: 18, overflow: 'hidden',
      border: '1px solid var(--border)', cursor: 'pointer',
      transition: 'transform .22s, box-shadow .22s, border-color .22s',
      boxShadow: '0 1px 3px rgba(0,0,0,.07)',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,.14)'; e.currentTarget.style.borderColor = 'rgba(201,168,76,.3)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,.07)'; e.currentTarget.style.borderColor = 'var(--border)' }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={p.featured_image} alt={p.name} loading="lazy"
          style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block', transition: 'transform .4s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}
        />
        <div style={{
          position: 'absolute', top: 10, left: 10,
          background: 'var(--forest)', color: '#fff',
          padding: '3px 9px', borderRadius: 100, fontSize: 10.5, fontWeight: 600, textTransform: 'capitalize',
        }}>{p.property_type.replace(/_/g, ' ')}</div>
        <button
          onClick={e => { e.stopPropagation(); toggleFav(p.id) }}
          style={{
            position: 'absolute', top: 10, right: 10,
            background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(4px)',
            border: 'none', borderRadius: '50%', width: 34, height: 34,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all .18s', boxShadow: '0 1px 3px rgba(0,0,0,.07)',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
          onMouseLeave={e => e.currentTarget.style.transform = ''}
        >
          <Icon name="heart" size={16} color={isFav ? '#ef4444' : 'var(--text-muted)'} />
        </button>
        {showCompare && (
          <button
            onClick={e => { e.stopPropagation(); toggleCompare(p.id) }}
            style={{
              position: 'absolute', bottom: 10, right: 10,
              background: inCmp ? 'var(--gold)' : 'rgba(255,255,255,.92)',
              backdropFilter: 'blur(4px)', border: 'none', borderRadius: 6,
              padding: '4px 8px', fontSize: 10, fontWeight: 600, cursor: 'pointer',
              color: inCmp ? 'var(--forest)' : 'var(--charcoal)',
            }}
          >{inCmp ? '✓ Comparing' : '⊕ Compare'}</button>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-sec)', fontSize: 11.5, marginBottom: 5 }}>
          <Icon name="map" size={11} />{p.city}, {p.county}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 17, marginBottom: 7, lineHeight: 1.25 }}>{p.name}</div>
        <div style={{ display: 'flex', gap: 10, color: 'var(--text-sec)', fontSize: 11.5, marginBottom: 11 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Icon name="bed" size={12} />{p.bedrooms}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Icon name="bath" size={12} />{p.bathrooms}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Icon name="users" size={12} />{p.max_guests}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
          <div>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 20 }}>{formatKES(p.price_per_night)}</span>
            <span style={{ fontSize: 11, color: 'var(--text-sec)' }}> / night</span>
            <br />
            <Badge color={cat.color} bg={cat.bg}>{cat.label}</Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 13, fontWeight: 600 }}>
            <Icon name="star" size={13} color="#F59E0B" />
            {p.average_rating}
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({p.total_reviews})</span>
          </div>
        </div>
      </div>
    </div>
  )
}
