import { useState, useEffect, useRef } from 'react'
import { useStore } from '../context/store'

// ─────────────────────────────────────────────────────────────
// ICON
// ─────────────────────────────────────────────────────────────
const PATHS = {
  search:   <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm5-5 4 4" strokeLinecap="round" strokeLinejoin="round"/>,
  star:     <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>,
  heart:    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
  map:      <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
  bed:      <><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></>,
  bath:     <><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/></>,
  users:    <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  cal:      <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
  home:     <><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
  upload:   <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></>,
  check:    <polyline points="20 6 9 17 4 12"/>,
  x:        <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
  menu:     <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
  arrowL:   <><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>,
  arrowR:   <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
  dollar:   <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
  bell:     <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>,
  shield:   <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
  logout:   <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
  filter:   <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>,
  eye:      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
  trending: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
  wallet:   <><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/></>,
  plus:     <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
  msg:      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  send:     <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
  copy:     <><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
  gift:     <><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></>,
  scale:    <><line x1="12" y1="3" x2="12" y2="21"/><path d="m3 6 9 6 9-6"/><path d="M3 6h18"/></>,
  chart:    <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
  moon:     <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
  sun:      <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>,
  share:    <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
  log:      <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
  payout:   <><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></>,
  img:      <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
  grid:     <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
  list:     <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
  award:    <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></>,
  tag:      <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
}

export function Icon({ name, size = 18, color = 'currentColor', className = '' }) {
  const filled = ['star'].includes(name)
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill={filled ? color : 'none'}
      stroke={color} strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0 }}
      className={className}
    >
      {PATHS[name]}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────────────────────
export function Toast() {
  const { toast, clearToast } = useStore()
  useEffect(() => { if (toast) { const t = setTimeout(clearToast, 3800); return () => clearTimeout(t) } }, [toast])
  if (!toast) return null
  const colors = { success: '#16302B', error: '#991b1b', info: '#1e3a5f' }
  const accents = { success: '#C9A84C', error: '#f87171', info: '#60a5fa' }
  const icons   = { success: '✓', error: '✕', info: 'ℹ' }
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: colors[toast.type] || colors.success,
      color: '#fff', padding: '14px 18px', borderRadius: '12px',
      boxShadow: '0 12px 40px rgba(0,0,0,.25)',
      display: 'flex', alignItems: 'center', gap: 10,
      fontSize: 13.5, fontWeight: 500, maxWidth: 340,
      borderLeft: `4px solid ${accents[toast.type] || accents.success}`,
      animation: 'slideInRight 0.3s ease',
    }}>
      <span style={{ fontSize: 16 }}>{icons[toast.type] || icons.success}</span>
      <span style={{ flex: 1 }}>{toast.message}</span>
      <button onClick={clearToast} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.6)', padding: 2 }}>
        <Icon name="x" size={14} color="currentColor" />
      </button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// AVATAR
// ─────────────────────────────────────────────────────────────
export function Avatar({ name, size = 44, bg = 'var(--forest)', color = '#fff' }) {
  const letter = (name || '?')[0].toUpperCase()
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg, color, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: size * 0.4, fontWeight: 700, flexShrink: 0,
    }}>{letter}</div>
  )
}

// ─────────────────────────────────────────────────────────────
// BADGE
// ─────────────────────────────────────────────────────────────
export function Badge({ children, color, bg, dot }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 9px', borderRadius: '100px',
      fontSize: 11, fontWeight: 600, color, background: bg,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: dot, display: 'inline-block' }} />}
      {children}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────
export function Modal({ title, onClose, children, maxWidth = 580 }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onClose])
  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)',
        zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
    >
      <div style={{
        background: 'var(--white)', borderRadius: 28, padding: '28px 32px',
        maxWidth, width: '100%', maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 24px 60px rgba(0,0,0,.2)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text-sec)', borderRadius: 6 }}>
            <Icon name="x" size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BAR CHART
// ─────────────────────────────────────────────────────────────
export function BarChart({ data, xKey, yKey, title, color = '#2D5A40' }) {
  const max = Math.max(...data.map(d => d[yKey]))
  const fmt = yKey === 'revenue'
    ? v => `${Math.round(v / 1000)}K`
    : v => String(v)
  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 18, padding: 22 }}>
      {title && <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{title}</div>}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 500 }}>{fmt(d[yKey])}</div>
            <div
              title={`${d[xKey]}: ${d[yKey]}`}
              style={{
                width: '100%', minHeight: 4,
                height: `${Math.max(4, (d[yKey] / max) * 100)}px`,
                background: `linear-gradient(180deg, ${color}dd, ${color}66)`,
                borderRadius: '6px 6px 0 0', transition: 'all .4s', cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.2)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'none'}
            />
            <div style={{ fontSize: 10, color: 'var(--text-sec)', fontWeight: 500 }}>{d[xKey]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// STAR INPUT
// ─────────────────────────────────────────────────────────────
export function StarInput({ value, onChange, size = 24 }) {
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <button key={i} type="button"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, transition: 'transform .15s' }}
          onMouseEnter={e => { setHover(i); e.currentTarget.style.transform = 'scale(1.2)' }}
          onMouseLeave={e => { setHover(0); e.currentTarget.style.transform = 'scale(1)' }}
          onClick={() => onChange(i)}>
          <Icon name="star" size={size} color={(hover || value) >= i ? '#F59E0B' : '#D1D5DB'} />
        </button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────────────────────
export function ProgressBar({ label, value, max = 100, showValue }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
        <span>{label}</span>
        <span style={{ fontWeight: 600 }}>{showValue || value}</span>
      </div>
      <div style={{ height: 8, background: 'var(--border)', borderRadius: 100, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 100,
          background: 'linear-gradient(90deg, var(--forest-light), var(--forest-muted))',
          width: `${pct}%`, transition: 'width .8s ease',
        }} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BREADCRUMB
// ─────────────────────────────────────────────────────────────
export function Breadcrumb({ crumbs }) {
  const { navigate } = useStore()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-sec)', fontSize: 13, marginBottom: 18 }}>
      {crumbs.map((c, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {i > 0 && <span style={{ color: 'var(--text-muted)' }}>/</span>}
          <span
            style={i < crumbs.length - 1 ? { cursor: 'pointer' } : { color: 'var(--charcoal)', fontWeight: 600 }}
            onClick={() => i < crumbs.length - 1 && c.page && navigate(c.page, c.data)}
          >{c.label}</span>
        </span>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────
export function Empty({ icon = '🔍', title, subtitle, action, onAction }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
      <div style={{ fontSize: 52, marginBottom: 12 }}>{icon}</div>
      {title && <h3 style={{ fontSize: 18, fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, color: 'var(--charcoal)', marginBottom: 6 }}>{title}</h3>}
      {subtitle && <p style={{ fontSize: 13.5, marginBottom: action ? 20 : 0 }}>{subtitle}</p>}
      {action && (
        <button onClick={onAction} style={{
          background: 'var(--forest)', color: '#fff', border: 'none',
          padding: '10px 22px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
        }}>{action}</button>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// FORM INPUT
// ─────────────────────────────────────────────────────────────
export function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 5 }}>{label}</label>}
      {children}
      {error && <p style={{ fontSize: 11.5, color: '#dc2626', marginTop: 4 }}>{error}</p>}
    </div>
  )
}

export const inputStyle = {
  width: '100%', padding: '11px 13px',
  border: '1.5px solid var(--border)', borderRadius: 12,
  fontSize: 13.5, outline: 'none', background: 'var(--white)', color: 'var(--charcoal)',
  transition: 'border-color .18s',
}

export function Input(props) {
  return <input style={inputStyle} {...props} />
}

export function Select({ children, ...props }) {
  return <select style={{ ...inputStyle, cursor: 'pointer' }} {...props}>{children}</select>
}

export function Textarea(props) {
  return <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }} {...props} />
}

// ─────────────────────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────────────────────
export function StatCard({ label, value, icon, iconBg, iconColor, trend, trendUp }) {
  return (
    <div style={{
      background: 'var(--white)', borderRadius: 12, padding: '18px 20px',
      border: '1px solid var(--border)',
    }}>
      <div style={{ width: 42, height: 42, borderRadius: 10, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        <Icon name={icon} size={20} color={iconColor} />
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: 11.5, color: 'var(--text-sec)', marginTop: 1, fontWeight: 500 }}>{label}</div>
      {trend && <div style={{ fontSize: 11, marginTop: 4, fontWeight: 600, color: trendUp !== false ? '#16a34a' : '#dc2626' }}>
        {trendUp !== false ? '↑' : '↓'} {trend}
      </div>}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// ACTION BUTTON (table)
// ─────────────────────────────────────────────────────────────
export function ActionBtn({ variant = 'view', children, ...props }) {
  const styles = {
    ok:   { background: '#dcfce7', color: '#16a34a' },
    no:   { background: '#fee2e2', color: '#dc2626' },
    view: { background: '#dbeafe', color: '#2563eb' },
    warn: { background: '#fef3c7', color: '#d97706' },
  }
  return (
    <button style={{
      ...styles[variant],
      padding: '5px 12px', borderRadius: 7, fontSize: 11.5,
      fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all .15s',
    }} {...props}>{children}</button>
  )
}

// ─────────────────────────────────────────────────────────────
// PILL TABS
// ─────────────────────────────────────────────────────────────
export function PillTabs({ tabs, active, onChange }) {
  return (
    <div style={{
      display: 'flex', gap: 6,
      background: 'var(--white)', border: '1px solid var(--border)',
      borderRadius: 100, padding: 4, marginBottom: 22, width: 'fit-content', flexWrap: 'wrap',
    }}>
      {tabs.map(t => (
        <button key={t.key || t}
          onClick={() => onChange(t.key || t)}
          style={{
            padding: '7px 18px', borderRadius: 100, fontSize: 13,
            fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all .18s',
            background: active === (t.key || t) ? 'var(--forest)' : 'none',
            color: active === (t.key || t) ? '#fff' : 'var(--text-sec)',
          }}>
          {t.label || t}
        </button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// TABLE WRAPPER
// ─────────────────────────────────────────────────────────────
export function Table({ title, action, children }) {
  return (
    <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--border)', overflow: 'hidden' }}>
      {title && (
        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
          {action}
        </div>
      )}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          {children}
        </table>
      </div>
    </div>
  )
}

export function Th({ children }) {
  return <th style={{ textAlign: 'left', padding: '11px 16px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.8px', color: 'var(--text-sec)', background: 'var(--cream)', borderBottom: '1px solid var(--border)' }}>{children}</th>
}

export function Td({ children, ...props }) {
  return <td style={{ padding: '13px 16px', fontSize: 13, borderBottom: '1px solid var(--border)', verticalAlign: 'middle' }} {...props}>{children}</td>
}
