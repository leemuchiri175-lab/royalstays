// CheckoutPage.jsx
import { useState, useRef } from 'react'
import { useStore } from '../context/store'
import { Icon, Breadcrumb, Field, Input, Select, Textarea } from '../components/ui'
import { formatKES, formatDate } from '../lib/data'

export function CheckoutPage() {
  const { selectedProp: p, bookingDetails: bd, user, navigate, addBooking, showToast } = useStore()
  if (!p || !bd) { navigate('search'); return null }

  const [step,    setStep]    = useState(1)
  const [special, setSpecial] = useState('')
  const [method,  setMethod]  = useState('mpesa_paybill')
  const [txCode,  setTxCode]  = useState('')
  const [phone,   setPhone]   = useState('')
  const [proofFile, setProof] = useState(null)
  const [useCb,   setUseCb]   = useState(false)
  const fileRef = useRef()

  const bookingNum   = 'RYS-' + Date.now().toString().slice(-8).toUpperCase()
  const cbAvail      = user?.cashbackBalance || 0
  const cbApplied    = useCb ? Math.min(cbAvail, bd.total) : 0
  const finalTotal   = Math.round(bd.total - cbApplied)

  const handleSubmit = () => {
    if (!txCode) { showToast('Please enter your M-Pesa transaction code', 'error'); return }
    if (txCode.length < 8) { showToast('Transaction code looks too short', 'error'); return }
    const booking = {
      id: 'b' + Date.now(), booking_number: bookingNum,
      property_id: p.id, property_name: p.name, property_city: p.city, property_image: p.featured_image,
      checkin_date: bd.cin, checkout_date: bd.cout,
      status: 'payment_uploaded', total_amount: finalTotal, nights_count: bd.nights,
      price_per_night: p.price_per_night, cleaning_fee: p.cleaning_fee,
      platform_fee: Math.round(bd.platformFee), cashback_amount: Math.round(bd.cashback),
      owner_payout: Math.round(bd.subtotal * 0.9), guests_adults: bd.guests, guests_children: 0,
      guest_email: user.email, special_requests: special, reviewed: false,
    }
    addBooking(booking)
    showToast('🎉 Payment proof submitted! Admin will verify within 24h.')
    navigate('dashboard')
  }

  const steps = ['Trip Details', 'Payment', 'Confirmed']

  return (
    <div style={{ maxWidth: 940, margin: '0 auto', padding: '28px 24px 64px' }}>
      <Breadcrumb crumbs={[{ label: 'Home', page: 'home' }, { label: p.name, page: 'property', data: p }, { label: 'Checkout' }]} />
      <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 700, marginBottom: 22 }}>Complete Your Booking</h1>

      {/* Step bar */}
      <div style={{ display: 'flex', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 28 }}>
        {steps.map((lbl, i) => (
          <div key={i} style={{
            flex: 1, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10,
            fontSize: 13, fontWeight: 600, transition: 'all .2s',
            background: step === i + 1 ? 'var(--forest)' : step > i + 1 ? '#F0F9F4' : 'transparent',
            color:      step === i + 1 ? '#fff' : step > i + 1 ? 'var(--forest-muted)' : 'var(--text-sec)',
          }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, background: step === i + 1 ? 'rgba(255,255,255,.2)' : step > i + 1 ? 'var(--forest-muted)' : 'var(--border)', color: step > i + 1 ? '#fff' : 'inherit' }}>
              {step > i + 1 ? <Icon name="check" size={13} color="#fff" /> : i + 1}
            </div>
            {lbl}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 }}>
        <div>
          {step === 1 && (
            <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--border)', padding: 24 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, marginBottom: 18 }}>Your Trip</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                {[['Check-in', formatDate(bd.cin)], ['Check-out', formatDate(bd.cout)], ['Duration', `${bd.nights} night${bd.nights !== 1 ? 's' : ''}`], ['Guests', `${bd.guests} guest${bd.guests !== 1 ? 's' : ''}`]].map(([k, v]) => (
                  <div key={k} style={{ background: 'var(--cream)', borderRadius: 10, padding: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.7px', color: 'var(--text-sec)', marginBottom: 3 }}>{k}</div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{v}</div>
                  </div>
                ))}
              </div>
              <Field label="Special Requests">
                <Textarea placeholder="Early check-in, parking, baby cot, dietary requirements…" value={special} onChange={e => setSpecial(e.target.value)} />
              </Field>
              <div style={{ height: 1, background: 'var(--border)', margin: '16px 0' }} />
              {cbAvail > 0 && (
                <div style={{ background: '#F0F9F4', borderRadius: 12, padding: 16, border: '1px solid #C6E6D0', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--forest)', fontSize: 14, marginBottom: 3 }}>💰 Apply Cashback Balance</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-sec)' }}>You have {formatKES(cbAvail)} available</div>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input type="checkbox" checked={useCb} onChange={e => setUseCb(e.target.checked)} style={{ width: 18, height: 18 }} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Apply</span>
                  </label>
                </div>
              )}
              <div style={{ background: '#F0F9F4', borderRadius: 12, padding: 14, border: '1px solid #C6E6D0', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                  <Icon name="wallet" size={15} color="var(--forest-light)" />
                  <span style={{ fontWeight: 700, color: 'var(--forest-light)', fontSize: 13.5 }}>Earn {formatKES(Math.round(bd.cashback))} cashback on this booking!</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-sec)' }}>2% of your stay cost credited after checkout.</div>
              </div>
              <button onClick={() => setStep(2)} style={{ width: '100%', padding: 13, background: 'var(--forest)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                Continue to Payment →
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ background: 'linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 100%)', color: '#fff', borderRadius: 18, padding: 24, marginBottom: 20 }}>
                <h3 style={{ color: 'var(--gold)', fontFamily: "'Cormorant Garamond',serif", fontSize: 20, marginBottom: 14 }}>Payment Instructions</h3>
                {[
                  'Open M-Pesa on your phone and tap Lipa na M-Pesa → Paybill',
                  `Enter Business Number: 123456 · Account: ${bookingNum}`,
                  `Enter Amount: ${formatKES(finalTotal)}`,
                  'Enter your M-Pesa PIN → OK → Copy the confirmation code below',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 22, height: 22, background: 'var(--gold)', color: 'var(--forest)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6 }}>{t}</div>
                  </div>
                ))}
                <div style={{ background: 'rgba(201,168,76,.2)', borderRadius: 8, padding: '10px 12px', marginTop: 8, fontSize: 12.5, color: 'var(--gold)' }}>
                  <strong>Keep your M-Pesa SMS!</strong> You'll need the transaction code below.
                </div>
              </div>

              <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--border)', padding: 24 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, marginBottom: 18 }}>Upload Proof of Payment</h3>
                <Field label="Payment Method">
                  <Select value={method} onChange={e => setMethod(e.target.value)}>
                    <option value="mpesa_paybill">M-Pesa Paybill (123456)</option>
                    <option value="mpesa_till">M-Pesa Till (654321)</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </Select>
                </Field>
                <Field label="M-Pesa Transaction Code *">
                  <Input placeholder="e.g. QL9K2J3N5P" value={txCode} onChange={e => setTxCode(e.target.value.toUpperCase())} />
                </Field>
                <Field label="Phone Number Used">
                  <Input placeholder="254712345678" value={phone} onChange={e => setPhone(e.target.value)} />
                </Field>
                <Field label="M-Pesa Screenshot (optional)">
                  <div onClick={() => fileRef.current?.click()}
                    style={{ border: '2px dashed var(--border)', borderRadius: 18, padding: 36, textAlign: 'center', cursor: 'pointer', transition: 'all .2s', background: 'var(--cream)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--forest-muted)'; e.currentTarget.style.background = '#F0F9F4' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--cream)' }}
                  >
                    <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => setProof(e.target.files[0])} />
                    {proofFile
                      ? <div><div style={{ fontSize: 32 }}>✅</div><div style={{ fontWeight: 600, fontSize: 14, marginTop: 6 }}>{proofFile.name}</div></div>
                      : <div><Icon name="upload" size={28} color="var(--text-muted)" /><div style={{ fontWeight: 600, fontSize: 14, margin: '8px 0 4px' }}>Upload Screenshot</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>JPG or PNG · Max 5MB</div></div>
                    }
                  </div>
                </Field>
                <button onClick={handleSubmit} style={{ width: '100%', padding: 13, background: 'var(--forest)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
                  Submit Payment Proof →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--border)', padding: 22, height: 'fit-content', position: 'sticky', top: 80 }}>
          <img src={p.featured_image} alt="" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 12, marginBottom: 14 }} />
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 16, marginBottom: 3 }}>{p.name}</div>
          <div style={{ fontSize: 12.5, color: 'var(--text-sec)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="map" size={12} />{p.city}, {p.county}
          </div>
          <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
          {[
            [`${formatKES(p.price_per_night)} × ${bd.nights} nights`, formatKES(Math.round(bd.subtotal))],
            ['Cleaning fee', formatKES(p.cleaning_fee)],
            ['Service fee (8%)', formatKES(Math.round(bd.platformFee))],
            ...(cbApplied > 0 ? [['Cashback applied', `-${formatKES(cbApplied)}`]] : []),
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: 13 }}>
              <span style={{ color: 'var(--text-sec)' }}>{k}</span>
              <span style={{ color: k.startsWith('Cashback') ? '#16a34a' : undefined }}>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
            <span>Total</span><span>{formatKES(finalTotal)}</span>
          </div>
          <div style={{ marginTop: 10, background: '#F0F9F4', borderRadius: 8, padding: 10, fontSize: 12, color: 'var(--forest-light)', fontWeight: 600 }}>
            💰 Earn {formatKES(Math.round(bd.cashback))} cashback after checkout
          </div>
          {step === 2 && (
            <div style={{ marginTop: 10, background: '#FEF3C7', borderRadius: 8, padding: 10, fontSize: 12, color: '#92400E', lineHeight: 1.5, border: '1px solid #FDE68A' }}>
              ⏱ Admin verifies payments within 24 hours. You'll receive email confirmation.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
