import { useState, useRef, useEffect } from 'react'
import { useStore } from '../context/store'
import { Icon, Avatar } from './ui'

const S = {
  nav: {
    background: 'var(--forest)', height: 64, padding: '0 20px',
    display: 'flex', alignItems: 'center', gap: 8,
    position: 'sticky', top: 0, zIndex: 200,
    boxShadow: '0 2px 20px rgba(0,0,0,.25)',
  },
  logo: {
    fontFamily: "'Cormorant Garamond',serif", fontSize: 21, fontWeight: 700,
    color: 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
    whiteSpace: 'nowrap', letterSpacing: '.3px', flexShrink: 0, border: 'none', background: 'none',
  },
  link: {
    color: '#C8D5D2', fontSize: 13.5, fontWeight: 500, padding: '7px 12px',
    borderRadius: 8, cursor: 'pointer', transition: 'all .18s', background: 'none',
    border: 'none', whiteSpace: 'nowrap',
  },
  linkActive: { color: 'var(--gold)', background: 'rgba(201,168,76,.1)' },
  iconBtn: {
    background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.18)',
    width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer', transition: 'all .18s', color: '#fff',
  },
}

export default function Navbar() {
  const { user, isAdmin, page, navigate, clearUser, dark, toggleDark, notifications, markAllRead, showToast } = useStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef()
  const unread = notifications.filter(n => !n.read).length

  useEffect(() => {
    const h = e => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const handleLogout = () => { clearUser(); navigate('home'); showToast('Signed out successfully') }

  const links = [
    { page: 'home', label: 'Home' },
    { page: 'search', label: 'Properties' },
    ...(user ? [{ page: 'dashboard', label: 'Dashboard' }] : []),
    ...(isAdmin ? [{ page: 'admin', label: '👑 Admin' }] : []),
  ]

  return (
    <>
      <nav style={S.nav}>
        {/* Logo */}
        <button style={S.logo} onClick={() => navigate('home')}>
          Royal<span style={{ color: '#fff' }}>Stays</span>
        </button>

        <div style={{ flex: 1 }} />

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }} className="hide-mobile">
          {links.map(l => (
            <button key={l.page}
              style={{ ...S.link, ...(page === l.page ? S.linkActive : {}) }}
              onClick={() => navigate(l.page)}
            >{l.label}</button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {/* Notifications */}
          <div ref={notifRef} style={{ position: 'relative' }}>
            <button style={S.iconBtn} onClick={() => { setNotifOpen(!notifOpen); if (!notifOpen) markAllRead() }}>
              <Icon name="bell" size={16} color="#fff" />
              {unread > 0 && (
                <span style={{
                  position: 'absolute', top: 6, right: 6, width: 8, height: 8,
                  background: '#ef4444', borderRadius: '50%', border: '2px solid var(--forest)',
                }} />
              )}
            </button>
            {notifOpen && <NotifPanel notifications={notifications} />}
          </div>

          {/* Dark mode */}
          <button style={S.iconBtn} onClick={toggleDark} title="Toggle dark mode">
            <Icon name={dark ? 'sun' : 'moon'} size={15} color="#fff" />
          </button>

          {/* Auth */}
          {user ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="hide-mobile">
              <span style={{ color: '#9CA3AF', fontSize: 12.5 }}>{user.firstName}</span>
              <button
                onClick={handleLogout}
                style={{ ...S.iconBtn, width: 'auto', padding: '0 14px', borderRadius: 8, fontSize: 13, fontWeight: 500 }}
              >Sign out</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 6 }} className="hide-mobile">
              <button
                onClick={() => navigate('login')}
                style={{ ...S.iconBtn, width: 'auto', padding: '0 14px', borderRadius: 8, fontSize: 13, fontWeight: 500 }}
              >Sign in</button>
              <button
                onClick={() => navigate('register')}
                style={{ background: 'var(--gold)', color: 'var(--forest)', border: 'none', padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
              >Join free</button>
            </div>
          )}

          {/* Mobile menu */}
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 4, display: 'none' }} className="show-mobile" onClick={() => setMobileOpen(true)}>
            <Icon name="menu" size={22} color="#fff" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && <MobileMenu links={links} user={user} onClose={() => setMobileOpen(false)} onLogout={handleLogout} />}

      <style>{`
        @media(max-width:768px){
          .hide-mobile{display:none!important;}
          .show-mobile{display:flex!important;}
        }
      `}</style>
    </>
  )
}

function NotifPanel({ notifications }) {
  return (
    <div style={{
      position: 'absolute', top: 48, right: 0, width: 340,
      background: 'var(--white)', border: '1px solid var(--border)',
      borderRadius: 18, boxShadow: '0 12px 40px rgba(0,0,0,.14)',
      zIndex: 300, overflow: 'hidden',
    }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>Notifications</span>
        <span style={{ fontSize: 12, color: 'var(--text-sec)' }}>{notifications.filter(n => !n.read).length} unread</span>
      </div>
      {notifications.map(n => (
        <div key={n.id} style={{
          padding: '12px 20px', borderBottom: '1px solid var(--border)',
          cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start',
          background: !n.read ? 'rgba(22,48,43,.04)' : 'transparent',
          transition: 'background .15s',
        }}>
          <span style={{ fontSize: 20 }}>{n.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{n.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-sec)', marginTop: 2 }}>{n.message}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{n.time}</div>
          </div>
          {!n.read && <div style={{ width: 8, height: 8, background: 'var(--forest-muted)', borderRadius: '50%', marginTop: 4, flexShrink: 0 }} />}
        </div>
      ))}
    </div>
  )
}

function MobileMenu({ links, user, onClose, onLogout }) {
  const { navigate } = useStore()
  const go = page => { navigate(page); onClose() }
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'var(--forest)', zIndex: 500,
      display: 'flex', flexDirection: 'column', padding: 24,
      animation: 'fadeIn .25s ease',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: 'var(--gold)' }}>Royal<span style={{ color: '#fff' }}>Stays</span></span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }} onClick={onClose}>
          <Icon name="x" size={24} color="#fff" />
        </button>
      </div>
      {links.map(l => (
        <button key={l.page} onClick={() => go(l.page)} style={{
          display: 'block', color: '#C8D5D2', fontSize: 22,
          fontFamily: "'Cormorant Garamond',serif", fontWeight: 600,
          padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,.08)',
          cursor: 'pointer', background: 'none', border: 'none',
          borderBottom: '1px solid rgba(255,255,255,.08)',
          textAlign: 'left',
        }}>{l.label}</button>
      ))}
      {user
        ? <button onClick={() => { onLogout(); onClose() }} style={{ marginTop: 24, background: 'rgba(255,255,255,.1)', color: '#fff', border: 'none', padding: '12px', borderRadius: 10, fontSize: 15, cursor: 'pointer' }}>Sign out</button>
        : <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => go('login')}  style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: 'none', padding: 12, borderRadius: 10, fontSize: 15, cursor: 'pointer' }}>Sign in</button>
            <button onClick={() => go('register')} style={{ background: 'var(--gold)', color: 'var(--forest)', border: 'none', padding: 12, borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Join free</button>
          </div>
      }
    </div>
  )
}
