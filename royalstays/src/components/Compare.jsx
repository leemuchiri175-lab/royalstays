import { useStore } from '../context/store'
import { Modal, Icon } from './ui'
import { MOCK_PROPERTIES, formatKES } from '../lib/data'

export function CompareBar() {
  const { compareList, toggleCompare, clearCompare, navigate } = useStore()
  if (compareList.length === 0) return null
  const props = compareList.map(id => MOCK_PROPERTIES.find(p => p.id === id)).filter(Boolean)

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 400,
      background: 'var(--forest)', color: '#fff', padding: '14px 24px',
      display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
      boxShadow: '0 -4px 20px rgba(0,0,0,.2)',
      animation: 'slideInRight .3s ease',
    }}>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 16, color: 'var(--gold)', flexShrink: 0 }}>
        Compare ({compareList.length}/3)
      </div>
      <div style={{ display: 'flex', gap: 10, flex: 1, flexWrap: 'wrap' }}>
        {props.map(p => (
          <div key={p.id} style={{
            background: 'rgba(255,255,255,.15)', borderRadius: 8,
            padding: '6px 12px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <img src={p.featured_image} alt="" style={{ width: 28, height: 22, objectFit: 'cover', borderRadius: 4 }} />
            {p.name}
            <button onClick={() => toggleCompare(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.6)', padding: 0 }}>
              <Icon name="x" size={13} color="currentColor" />
            </button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
        {compareList.length >= 2 && (
          <button onClick={() => navigate('compare')} style={{
            background: 'var(--gold)', color: 'var(--forest)', border: 'none',
            padding: '9px 18px', borderRadius: 8, fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
          }}>Compare Now</button>
        )}
        <button onClick={clearCompare} style={{
          background: 'rgba(255,255,255,.1)', color: '#fff', border: '1px solid rgba(255,255,255,.2)',
          padding: '9px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
        }}>Clear</button>
      </div>
    </div>
  )
}

export function CompareModal({ onClose }) {
  const { compareList, navigate } = useStore()
  const props = compareList.map(id => MOCK_PROPERTIES.find(p => p.id === id)).filter(Boolean)
  if (props.length < 2) { onClose(); return null }

  const rows = [
    ['Price/night',     p => formatKES(p.price_per_night)],
    ['Bedrooms',        p => p.bedrooms],
    ['Bathrooms',       p => p.bathrooms],
    ['Max guests',      p => p.max_guests],
    ['Rating',          p => `★ ${p.average_rating} (${p.total_reviews} reviews)`],
    ['City',            p => p.city],
    ['Type',            p => p.property_type.replace(/_/g, ' ')],
    ['Min stay',        p => `${p.minimum_stay} night${p.minimum_stay !== 1 ? 's' : ''}`],
    ['Cancellation',    p => p.cancellation_policy],
    ['Cleaning fee',    p => formatKES(p.cleaning_fee)],
    ['Security deposit',p => formatKES(p.security_deposit)],
  ]

  const cols = props.length
  return (
    <Modal title="Compare Properties" onClose={onClose} maxWidth={700}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ width: 150, padding: 8 }} />
              {props.map(p => (
                <th key={p.id} style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '2px solid var(--border)' }}>
                  <img src={p.featured_image} alt="" style={{ width: '100%', height: 70, objectFit: 'cover', borderRadius: 8, marginBottom: 6 }} />
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>{p.name}</div>
                  <button
                    onClick={() => { onClose(); navigate('property', p) }}
                    style={{ marginTop: 6, background: 'var(--gold)', color: 'var(--forest)', border: 'none', padding: '4px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                  >View</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, fn]) => (
              <tr key={label}>
                <td style={{ padding: '9px 12px', background: 'var(--cream)', fontWeight: 600, fontSize: 12.5, borderTop: '1px solid var(--border)' }}>{label}</td>
                {props.map(p => (
                  <td key={p.id} style={{ padding: '9px 12px', textAlign: 'center', fontSize: 13, borderTop: '1px solid var(--border)' }}>
                    {fn(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  )
}
