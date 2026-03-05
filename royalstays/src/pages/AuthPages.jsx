import { useState } from 'react'
import { useStore } from '../context/store'
import { ADMIN_EMAILS, ADMIN_PASSWORD } from '../lib/data'
import { Field, Input, Select } from '../components/ui'

const FORM_WRAP = {
  background: 'var(--white)', borderRadius: 28, padding: '36px', maxWidth: 440,
  width: '100%', boxShadow: '0 12px 40px rgba(0,0,0,.1)', border: '1px solid var(--border)',
}
const PAGE_WRAP = {
  background: 'var(--cream)', minHeight: 'calc(100vh - 64px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px',
}

export function LoginPage() {
  const { navigate, setUser, showToast } = useStore()
  const [email, setEmail] = useState('')
  const [pass,  setPass]  = useState('')
  const [loading, setLoading] = useState(false)

  const submit = () => {
    if (!email || !pass) { showToast('Please fill all fields', 'error'); return }
    setLoading(true)
    setTimeout(() => {
      const isAdmin = ADMIN_EMAILS.includes(email)
      if (isAdmin && pass !== ADMIN_PASSWORD) { showToast('Invalid admin credentials', 'error'); setLoading(false); return }
      const u = { id: 'u1', email, firstName: email.split('@')[0], lastName: '', userType: isAdmin ? 'admin' : 'client', cashbackBalance: 1250, lifetimeCashback: 3400 }
      setUser(u, isAdmin)
      showToast(isAdmin ? 'Welcome back, Admin! 👑' : 'Welcome back! 🎉')
      navigate(isAdmin ? 'admin' : 'dashboard')
      setLoading(false)
    }, 600)
  }

  return (
    <div style={PAGE_WRAP}>
      <div style={FORM_WRAP}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: 'var(--forest)', marginBottom: 5 }}>Welcome Back</div>
          <div style={{ color: 'var(--text-sec)', fontSize: 13.5 }}>Sign in to your RoyalStays account</div>
        </div>

        <div style={{ background: '#F0F9F4', borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 12, color: 'var(--text-sec)', lineHeight: 1.7, border: '1px solid #C6E6D0' }}>
          <strong>Demo credentials:</strong><br />
          Admin: leemuchiri175@gmail.com / RoyalAdmin2024!Secure<br />
          Client: any@email.com / anypassword
        </div>

        <Field label="Email address">
          <Input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        </Field>
        <Field label="Password">
          <Input type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} />
        </Field>

        <button onClick={submit} disabled={loading} style={{ width: '100%', padding: 13, background: 'var(--forest)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', opacity: loading ? .7 : 1 }}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>

        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-sec)', fontSize: 13, cursor: 'pointer' }}>Forgot password?</button>
        </div>
        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-sec)', marginTop: 14 }}>
          No account?{' '}
          <button onClick={() => navigate('register')} style={{ background: 'none', border: 'none', color: 'var(--forest-light)', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>Create one free</button>
        </div>
      </div>
    </div>
  )
}

export function RegisterPage() {
  const { navigate, setUser, showToast } = useStore()
  const [f, setF] = useState({ fn: '', ln: '', email: '', phone: '', pass: '', type: 'client' })
  const [loading, setLoading] = useState(false)
  const upd = k => e => setF({ ...f, [k]: e.target.value })

  const submit = () => {
    if (!f.fn || !f.email || !f.pass) { showToast('Please fill required fields', 'error'); return }
    if (ADMIN_EMAILS.includes(f.email)) { showToast('This email is reserved', 'error'); return }
    if (f.pass.length < 8) { showToast('Password must be at least 8 characters', 'error'); return }
    setLoading(true)
    setTimeout(() => {
      const u = { id: 'u' + Date.now(), email: f.email, firstName: f.fn, lastName: f.ln, userType: f.type, cashbackBalance: 0, lifetimeCashback: 0 }
      setUser(u, false)
      showToast('Welcome to RoyalStays! 🎉')
      navigate('dashboard')
      setLoading(false)
    }, 700)
  }

  return (
    <div style={PAGE_WRAP}>
      <div style={{ ...FORM_WRAP, maxWidth: 480 }}>
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, color: 'var(--forest)', marginBottom: 5 }}>Create Account</div>
          <div style={{ color: 'var(--text-sec)', fontSize: 13.5 }}>Join Kenya's premier booking platform — free forever</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Field label="First Name *"><Input placeholder="John" value={f.fn} onChange={upd('fn')} /></Field>
          <Field label="Last Name"><Input placeholder="Kamau" value={f.ln} onChange={upd('ln')} /></Field>
        </div>
        <Field label="Email address *"><Input type="email" placeholder="john@email.com" value={f.email} onChange={upd('email')} /></Field>
        <Field label="Phone (254XXXXXXXXX)"><Input placeholder="254712345678" value={f.phone} onChange={upd('phone')} /></Field>
        <Field label="Password * (min 8 chars)"><Input type="password" placeholder="Create a strong password" value={f.pass} onChange={upd('pass')} /></Field>
        <Field label="I want to…">
          <Select value={f.type} onChange={upd('type')}>
            <option value="client">Book stays as a Traveler</option>
            <option value="owner">List properties as an Owner</option>
          </Select>
        </Field>

        <button onClick={submit} disabled={loading} style={{ width: '100%', padding: 13, background: 'var(--forest)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', opacity: loading ? .7 : 1 }}>
          {loading ? 'Creating account…' : 'Create Free Account'}
        </button>

        <div style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--text-muted)', marginTop: 10 }}>
          By signing up you agree to our Terms of Service & Privacy Policy
        </div>
        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-sec)', marginTop: 12 }}>
          Already have an account?{' '}
          <button onClick={() => navigate('login')} style={{ background: 'none', border: 'none', color: 'var(--forest-light)', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>Sign in</button>
        </div>
      </div>
    </div>
  )
}
