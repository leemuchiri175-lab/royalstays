import { useState } from 'react'
import { useStore } from '../context/store'
import { Icon, Avatar, Badge, StatCard, Table, Th, Td, ActionBtn, Empty, Field, Input, Textarea } from '../components/ui'
import Messaging from '../components/Messaging'
import ReviewModal from '../components/ReviewModal'
import { formatKES, formatDate, formatDateShort, STATUS_CFG, MOCK_PROPERTIES } from '../lib/data'

const SIDEBAR_MENU = [
  { k: 'overview', icon: 'trending', lbl: 'Overview' },
  { k: 'bookings', icon: 'cal',      lbl: 'My Bookings' },
  { k: 'messages', icon: 'msg',      lbl: 'Messages', badge: true },
  { k: 'cashback', icon: 'wallet',   lbl: 'Cashback' },
  { k: 'referral', icon: 'gift',     lbl: 'Refer & Earn' },
  { k: 'payment',  icon: 'upload',   lbl: 'Upload Payment' },
  { k: 'wishlist', icon: 'heart',    lbl: 'Wishlist' },
  { k: 'profile',  icon: 'users',    lbl: 'Profile' },
]

export default function ClientDashboard() {
  const { user, bookings, updateBookingStatus, markReviewed, navigate, conversations, showToast, notifications, favourites } = useStore()
  const [tab, setTab]               = useState('overview')
  const [reviewTarget, setReview]   = useState(null)
  const unread = conversations.reduce((s, c) => s + c.unread, 0)

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
      {/* ── Sidebar ── */}
      <aside style={{ width: 240, background: 'var(--forest)', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '22px 18px 18px', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
          <Avatar name={user.firstName} size={46} bg="var(--gold)" color="var(--forest)" />
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginTop: 10 }}>{user.firstName} {user.lastName}</div>
          <div style={{ color: 'var(--gold)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Traveler</div>
        </div>

        <nav style={{ padding: '10px 0', flex: 1 }}>
          {SIDEBAR_MENU.map(m => (
            <button key={m.k} onClick={() => setTab(m.k)} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '10px 18px', border: 'none', textAlign: 'left', cursor: 'pointer',
              fontSize: 13.5, fontWeight: 500, transition: 'all .18s',
              color:       tab === m.k ? 'var(--gold)' : '#A8BDB8',
              background:  tab === m.k ? 'rgba(201,168,76,.12)' : 'none',
              borderRight: `3px solid ${tab === m.k ? 'var(--gold)' : 'transparent'}`,
            }}>
              <Icon name={m.icon} size={16} color="currentColor" />
              {m.lbl}
              {m.badge && unread > 0 && (
                <span style={{ marginLeft:'auto', background:'var(--forest-muted)', color:'#fff', width:18, height:18, borderRadius:'50%', fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>{unread}</span>
              )}
            </button>
          ))}
        </nav>

        <div style={{ padding: '16px 18px', borderTop: '1px solid rgba(255,255,255,.1)' }}>
          <div style={{ background:'rgba(201,168,76,.15)', border:'1px solid rgba(201,168,76,.3)', borderRadius:10, padding:12 }}>
            <div style={{ color:'var(--gold)', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'.8px', marginBottom:2 }}>Cashback</div>
            <div style={{ color:'#fff', fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700 }}>{formatKES(user.cashbackBalance || 0)}</div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex:1, padding:'28px 30px 56px', background:'var(--cream)', overflowY:'auto' }}>
        {tab === 'overview' && <Overview bookings={bookings} notifications={notifications} user={user} navigate={navigate} />}
        {tab === 'bookings' && <Bookings bookings={bookings} updateStatus={updateBookingStatus} onReview={setReview} showToast={showToast} navigate={navigate} />}
        {tab === 'messages' && (
          <>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>Messages</h2>
            <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:20 }}>Chat with your hosts</p>
            <Messaging />
          </>
        )}
        {tab === 'cashback' && <Cashback user={user} />}
        {tab === 'referral' && <Referral user={user} showToast={showToast} />}
        {tab === 'payment'  && <PaymentUpload bookings={bookings} showToast={showToast} />}
        {tab === 'wishlist' && <Wishlist favs={favourites} navigate={navigate} />}
        {tab === 'profile'  && <Profile user={user} showToast={showToast} />}
      </main>

      {reviewTarget && (
        <ReviewModal
          booking={reviewTarget}
          onClose={() => setReview(null)}
          onSubmit={() => { markReviewed(reviewTarget.id); showToast('Review submitted! ⭐') }}
        />
      )}
    </div>
  )
}

// ─── OVERVIEW ────────────────────────────────────────────────
function Overview({ bookings, notifications, user, navigate }) {
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, marginBottom:4 }}>Good day, {user.firstName}! 👋</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>Here's your RoyalStays at a glance</p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:14, marginBottom:24 }}>
        <StatCard label="Total Bookings"   value={bookings.length} icon="cal"    iconBg="#DBEAFE" iconColor="#2563EB" />
        <StatCard label="Confirmed Stays"  value={bookings.filter(b=>['confirmed','completed'].includes(b.status)).length} icon="check" iconBg="#DCFCE7" iconColor="#16A34A" />
        <StatCard label="Total Spent"      value={formatKES(bookings.reduce((s,b)=>s+(b.total_amount||0),0))} icon="dollar" iconBg="#FEF3C7" iconColor="#D97706" />
        <StatCard label="Cashback Balance" value={formatKES(user.cashbackBalance||0)} icon="wallet" iconBg="#F0F9F4" iconColor="var(--forest-muted)" />
      </div>

      {bookings.filter(b=>b.status==='confirmed').length > 0 && (
        <div style={{ background:'var(--white)', borderRadius:18, border:'1px solid var(--border)', marginBottom:20, overflow:'hidden' }}>
          <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)', fontWeight:700, fontSize:15 }}>🗓 Upcoming Stays</div>
          {bookings.filter(b=>b.status==='confirmed').map(b => (
            <div key={b.id} style={{ padding:'14px 20px', display:'flex', gap:14, alignItems:'center', borderBottom:'1px solid var(--border)' }}>
              <img src={b.property_image} alt="" style={{ width:56, height:42, objectFit:'cover', borderRadius:7, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:14 }}>{b.property_name}</div>
                <div style={{ fontSize:12.5, color:'var(--text-sec)', marginTop:2 }}>{formatDate(b.checkin_date)} → {formatDate(b.checkout_date)}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <Badge color="#16a34a" bg="#dcfce7">✓ Confirmed</Badge>
                <div style={{ fontSize:13, fontWeight:700, marginTop:4 }}>{formatKES(b.total_amount)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ background:'var(--white)', borderRadius:18, border:'1px solid var(--border)', overflow:'hidden' }}>
        <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)', fontWeight:700, fontSize:15 }}>🔔 Recent Notifications</div>
        {notifications.slice(0,5).map(n => (
          <div key={n.id} style={{ padding:'12px 20px', display:'flex', gap:12, alignItems:'flex-start', borderBottom:'1px solid var(--border)', background:!n.read?'rgba(22,48,43,.03)':'transparent' }}>
            <span style={{ fontSize:20 }}>{n.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:13 }}>{n.title}</div>
              <div style={{ fontSize:12, color:'var(--text-sec)', marginTop:2 }}>{n.message}</div>
            </div>
            <div style={{ fontSize:11, color:'var(--text-muted)', whiteSpace:'nowrap' }}>{n.time}</div>
          </div>
        ))}
      </div>
    </>
  )
}

// ─── BOOKINGS ────────────────────────────────────────────────
function Bookings({ bookings, updateStatus, onReview, showToast, navigate }) {
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>My Bookings</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>{bookings.length} total booking{bookings.length!==1?'s':''}</p>

      {bookings.length===0
        ? <Empty icon="🏠" title="No bookings yet" subtitle="Start exploring Kenya's finest properties" action="Find a Property" onAction={()=>navigate('search')} />
        : bookings.map(b => {
            const sc = STATUS_CFG[b.status]||{}
            return (
              <div key={b.id} style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, overflow:'hidden', marginBottom:14 }}>
                <div style={{ display:'flex' }}>
                  <img src={b.property_image} alt="" style={{ width:130, objectFit:'cover', flexShrink:0 }} />
                  <div style={{ padding:'16px 18px', flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:7 }}>
                      <div>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:16 }}>{b.property_name}</div>
                        <div style={{ fontSize:11.5, color:'var(--text-muted)', marginTop:2, fontFamily:'monospace' }}>{b.booking_number}</div>
                      </div>
                      <Badge color={sc.color} bg={sc.bg} dot={sc.dot}>{sc.label}</Badge>
                    </div>
                    <div style={{ display:'flex', gap:16, fontSize:13, color:'var(--text-sec)', marginBottom:12, flexWrap:'wrap' }}>
                      <span style={{ display:'flex', alignItems:'center', gap:4 }}><Icon name="cal" size={13}/>{formatDateShort(b.checkin_date)} – {formatDateShort(b.checkout_date)}</span>
                      <span style={{ display:'flex', alignItems:'center', gap:4 }}><Icon name="users" size={13}/>{b.guests_adults} guest{b.guests_adults!==1?'s':''}</span>
                      <span style={{ fontWeight:700, color:'var(--charcoal)' }}>{formatKES(b.total_amount)}</span>
                    </div>
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                      {b.status==='pending_payment' && <ActionBtn variant="warn" onClick={()=>showToast('Go to the Payment tab to upload your M-Pesa proof','info')}>💳 Upload Payment</ActionBtn>}
                      {b.status==='completed' && !b.reviewed && <ActionBtn variant="ok" onClick={()=>onReview(b)}>⭐ Write Review</ActionBtn>}
                      {b.status==='completed' && b.reviewed && <span style={{ fontSize:12, color:'#16a34a', fontWeight:600 }}>✓ Reviewed</span>}
                      {b.status==='confirmed' && <ActionBtn variant="view" onClick={()=>showToast('Receipt download coming soon','info')}>📄 Receipt</ActionBtn>}
                      {['pending_payment','confirmed'].includes(b.status) && (
                        <ActionBtn variant="no" onClick={()=>{ updateStatus(b.id,'cancelled'); showToast('Booking cancelled','error') }}>Cancel</ActionBtn>
                      )}
                    </div>
                  </div>
                </div>
                {b.status==='completed' && b.cashback_amount>0 && (
                  <div style={{ padding:'8px 20px', background:'#F0F9F4', borderTop:'1px solid var(--border)', fontSize:12, color:'var(--forest-muted)', fontWeight:600 }}>
                    💰 {formatKES(b.cashback_amount)} cashback credited after checkout
                  </div>
                )}
              </div>
            )
          })
      }
    </>
  )
}

// ─── CASHBACK ────────────────────────────────────────────────
function Cashback({ user }) {
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>Cashback</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>Earn 2% on every booking, redeem on the next</p>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:22 }}>
        <div style={{ background:'linear-gradient(135deg, var(--forest), var(--forest-light))', borderRadius:20, padding:26, color:'#fff' }}>
          <div style={{ fontSize:11, color:'var(--gold)', fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', marginBottom:6 }}>Available Balance</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:42, fontWeight:700, marginBottom:6 }}>{formatKES(user.cashbackBalance||0)}</div>
          <div style={{ fontSize:12.5, color:'rgba(255,255,255,.65)' }}>Apply at checkout on your next stay</div>
        </div>
        <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:20, padding:26 }}>
          <div style={{ fontSize:11, color:'var(--text-sec)', fontWeight:700, textTransform:'uppercase', letterSpacing:'1px', marginBottom:6 }}>Lifetime Earned</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:42, fontWeight:700, marginBottom:6 }}>{formatKES(user.lifetimeCashback||0)}</div>
          <div style={{ fontSize:12.5, color:'var(--text-muted)' }}>Total earned across all stays</div>
        </div>
      </div>

      <Table title="Cashback History">
        <thead><tr><Th>Date</Th><Th>Description</Th><Th>Amount</Th><Th>Status</Th></tr></thead>
        <tbody>
          {[
            ['Mar 2024','Nairobi Skyline Apartment (3 nights)','+KES 330','Credited'],
            ['Jan 2024','First booking bonus','+KES 920','Credited'],
            ['Dec 2023','Referral — 1 friend completed booking','+KES 500','Credited'],
          ].map(([d,desc,amt,st])=>(
            <tr key={desc}><Td style={{color:'var(--text-sec)'}}>{d}</Td><Td>{desc}</Td><Td style={{color:'#16a34a',fontWeight:700}}>{amt}</Td><Td><Badge color="#16a34a" bg="#dcfce7">{st}</Badge></Td></tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

// ─── REFERRAL ────────────────────────────────────────────────
function Referral({ user, showToast }) {
  const code = `ROYAL-${(user.firstName||'USER').toUpperCase().slice(0,5)}-2024`
  const link = `https://royalstays.co.ke?ref=${code}`
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>Refer & Earn</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>Earn KES 500 for every friend who completes their first booking</p>

      <div style={{ background:'linear-gradient(135deg, var(--forest), var(--forest-mid))', color:'#fff', borderRadius:20, padding:'24px 28px', marginBottom:20, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
        <div>
          <div style={{ fontSize:12, color:'rgba(255,255,255,.6)', marginBottom:5 }}>Your unique referral code</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700, letterSpacing:4, color:'var(--gold)' }}>{code}</div>
          <div style={{ fontSize:12, color:'rgba(255,255,255,.5)', marginTop:4 }}>{link}</div>
        </div>
        <button
          onClick={()=>{ navigator.clipboard?.writeText(link); showToast('Referral link copied to clipboard! 📋') }}
          style={{ background:'var(--gold)', color:'var(--forest)', border:'none', padding:'11px 20px', borderRadius:10, fontSize:13.5, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:7 }}>
          <Icon name="copy" size={14} color="var(--forest)"/> Copy Link
        </button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
        <StatCard label="Friends Referred"   value="0" icon="users"  iconBg="#DBEAFE" iconColor="#2563EB"/>
        <StatCard label="Bookings Completed" value="0" icon="check"  iconBg="#DCFCE7" iconColor="#16A34A"/>
        <StatCard label="Total Earned"       value="KES 0" icon="gift" iconBg="#FFF7ED" iconColor="#EA580C"/>
      </div>

      <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, padding:24 }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:700, marginBottom:18 }}>How It Works</h3>
        {[
          ['1','Share','Send your code or link to friends planning a Kenya trip'],
          ['2','They Book','Your friend signs up via your link and completes their first booking'],
          ['3','You Earn','KES 500 cashback lands in your wallet automatically!'],
        ].map(([n,t,d])=>(
          <div key={t} style={{ display:'flex', gap:14, marginBottom:16, alignItems:'flex-start' }}>
            <div style={{ width:32, height:32, background:'var(--forest)', color:'#fff', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13, flexShrink:0 }}>{n}</div>
            <div>
              <div style={{ fontWeight:700, fontSize:14, marginBottom:2 }}>{t}</div>
              <div style={{ fontSize:13, color:'var(--text-sec)' }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ─── PAYMENT UPLOAD ──────────────────────────────────────────
function PaymentUpload({ bookings, showToast }) {
  const [sel, setSel] = useState('')
  const [code, setCode] = useState('')
  const pending = bookings.filter(b=>b.status==='pending_payment')
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>Upload Payment Proof</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>Submit your M-Pesa confirmation for admin verification</p>

      {pending.length===0 ? (
        <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, padding:32, textAlign:'center', color:'var(--text-muted)' }}>
          <div style={{ fontSize:40, marginBottom:12 }}>✅</div>
          <div style={{ fontWeight:700, fontSize:16, marginBottom:4 }}>No pending payments</div>
          <div style={{ fontSize:13 }}>All your bookings are up to date!</div>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          <div>
            <div style={{ background:'linear-gradient(135deg, var(--forest), var(--forest-mid))', color:'#fff', borderRadius:18, padding:22, marginBottom:16 }}>
              <h3 style={{ color:'var(--gold)', fontFamily:"'Cormorant Garamond',serif", fontSize:18, marginBottom:14 }}>M-Pesa Payment Steps</h3>
              {['Open M-Pesa → Lipa na M-Pesa → Pay Bill','Business No: 123456 | Account: Your booking number','Enter exact amount shown below','Enter PIN → confirm → copy the code'].map((t,i)=>(
                <div key={i} style={{ display:'flex', gap:10, marginBottom:10, alignItems:'flex-start' }}>
                  <div style={{ width:22, height:22, background:'var(--gold)', color:'var(--forest)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, flexShrink:0 }}>{i+1}</div>
                  <div style={{ fontSize:13.5, lineHeight:1.5 }}>{t}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, padding:22 }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700, marginBottom:16 }}>Submit Proof</h3>
            <Field label="Select Booking">
              <select value={sel} onChange={e=>setSel(e.target.value)} style={{ width:'100%', padding:'10px 12px', border:'1.5px solid var(--border)', borderRadius:10, fontSize:13.5, outline:'none', background:'var(--white)', color:'var(--charcoal)', cursor:'pointer' }}>
                <option value="">-- Choose a booking --</option>
                {pending.map(b=><option key={b.id} value={b.id}>{b.property_name} · {formatKES(b.total_amount)}</option>)}
              </select>
            </Field>
            <Field label="M-Pesa Transaction Code *">
              <Input placeholder="e.g. QL9K2J3N5P" value={code} onChange={e=>setCode(e.target.value.toUpperCase())}/>
            </Field>
            <button
              onClick={()=>{ if(!sel||!code){ showToast('Select booking and enter code','error'); return } showToast('Payment proof submitted! Admin will verify within 24h. ✅') }}
              style={{ width:'100%', padding:12, background:'var(--forest)', color:'#fff', border:'none', borderRadius:12, fontSize:14, fontWeight:700, cursor:'pointer', marginTop:4 }}>
              Submit Proof →
            </button>
          </div>
        </div>
      )}
    </>
  )
}

// ─── WISHLIST ────────────────────────────────────────────────
function Wishlist({ favs, navigate }) {
  const props = MOCK_PROPERTIES.filter(p=>favs.includes(p.id))
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>Wishlist</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>{props.length} saved propert{props.length!==1?'ies':'y'}</p>
      {props.length===0
        ? <Empty icon="❤️" title="Your wishlist is empty" subtitle="Tap the heart on any property to save it here" action="Browse Properties" onAction={()=>navigate('search')}/>
        : <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:16 }}>
            {props.map(p=>(
              <div key={p.id} onClick={()=>navigate('property',p)} style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden', cursor:'pointer', transition:'all .2s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,.1)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''}}>
                <img src={p.featured_image} alt="" style={{ width:'100%', height:140, objectFit:'cover' }}/>
                <div style={{ padding:'12px 14px' }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:16 }}>{p.name}</div>
                  <div style={{ fontSize:12, color:'var(--text-sec)', marginTop:2 }}>{p.city}</div>
                  <div style={{ fontWeight:700, fontSize:15, marginTop:6 }}>KES {p.price_per_night.toLocaleString()}<span style={{ fontSize:11, fontWeight:400, color:'var(--text-sec)' }}>/night</span></div>
                </div>
              </div>
            ))}
          </div>
      }
    </>
  )
}

// ─── PROFILE ─────────────────────────────────────────────────
function Profile({ user, showToast }) {
  const [fn, setFn] = useState(user.firstName)
  const [ln, setLn] = useState(user.lastName||'')
  const [phone, setPhone] = useState('254712345678')
  const [bio, setBio]   = useState('')
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>My Profile</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>Manage your personal information</p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, maxWidth:700 }}>
        <Field label="First Name"><Input value={fn} onChange={e=>setFn(e.target.value)}/></Field>
        <Field label="Last Name"><Input value={ln} onChange={e=>setLn(e.target.value)}/></Field>
        <Field label="Email"><Input type="email" value={user.email} readOnly style={{ opacity:.7 }}/></Field>
        <Field label="Phone"><Input value={phone} onChange={e=>setPhone(e.target.value)}/></Field>
      </div>
      <div style={{ maxWidth:700, marginTop:4 }}>
        <Field label="About Me">
          <Textarea rows={3} placeholder="Tell hosts a little about yourself…" value={bio} onChange={e=>setBio(e.target.value)}/>
        </Field>
      </div>
      <button onClick={()=>showToast('Profile saved! ✓')} style={{ background:'var(--forest)', color:'#fff', border:'none', padding:'11px 28px', borderRadius:10, fontSize:14, fontWeight:700, cursor:'pointer', marginTop:4 }}>
        Save Changes
      </button>
    </>
  )
}
