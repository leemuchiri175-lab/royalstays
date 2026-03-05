import { useState } from 'react'
import { useStore } from '../context/store'
import { Icon, Avatar, Badge, StatCard, BarChart, Table, Th, Td, ActionBtn, Modal } from '../components/ui'
import { formatKES, formatDate, STATUS_CFG, ANALYTICS, MOCK_PROPERTIES, MOCK_BOOKINGS } from '../lib/data'

const MENU = [
  { k:'overview',   icon:'trending', lbl:'Overview' },
  { k:'payments',   icon:'wallet',   lbl:'Payments', badge: true },
  { k:'properties', icon:'home',     lbl:'Properties', badge: true },
  { k:'bookings',   icon:'cal',      lbl:'All Bookings' },
  { k:'users',      icon:'users',    lbl:'Users' },
  { k:'analytics',  icon:'chart',    lbl:'Analytics' },
  { k:'payouts',    icon:'payout',   lbl:'Payouts' },
  { k:'settings',   icon:'settings', lbl:'Settings' },
  { k:'logs',       icon:'log',      lbl:'Audit Logs' },
]

export default function AdminDashboard() {
  const { user, pendingPayments, pendingProps, bookings, approvePayment, rejectPayment, approveProp, rejectProp, showToast } = useStore()
  const [tab, setTab] = useState('overview')

  return (
    <div style={{ display:'flex', minHeight:'calc(100vh - 64px)' }}>
      <aside style={{ width:240, background:'#0D1117', flexShrink:0, display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'22px 18px 18px', borderBottom:'1px solid rgba(255,255,255,.1)' }}>
          <div style={{ background:'var(--gold)', color:'var(--forest)', width:46, height:46, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:800 }}>👑</div>
          <div style={{ color:'#fff', fontWeight:700, fontSize:15, marginTop:10 }}>{user.firstName}</div>
          <div style={{ color:'var(--gold)', fontSize:10.5, textTransform:'uppercase', letterSpacing:'1.2px', fontWeight:700 }}>Platform Admin</div>
        </div>
        <nav style={{ padding:'10px 0', flex:1 }}>
          {MENU.map(m=>(
            <button key={m.k} onClick={()=>setTab(m.k)} style={{
              display:'flex', alignItems:'center', gap:10, width:'100%',
              padding:'10px 18px', border:'none', textAlign:'left', cursor:'pointer',
              fontSize:13.5, fontWeight:500, transition:'all .18s',
              color:      tab===m.k ? 'var(--gold)' : '#9CA3AF',
              background: tab===m.k ? 'rgba(201,168,76,.1)' : 'none',
              borderRight:`3px solid ${tab===m.k ? 'var(--gold)' : 'transparent'}`,
            }}>
              <Icon name={m.icon} size={15} color="currentColor"/>{m.lbl}
              {m.badge && m.k==='payments'   && pendingPayments.length > 0 && <span style={{ marginLeft:'auto', background:'#ef4444', color:'#fff', width:18, height:18, borderRadius:'50%', fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>{pendingPayments.length}</span>}
              {m.badge && m.k==='properties' && pendingProps.filter(p=>p.status==='pending').length > 0 && <span style={{ marginLeft:'auto', background:'#f59e0b', color:'#fff', width:18, height:18, borderRadius:'50%', fontSize:10, fontWeight:700, display:'flex', alignItems:'center', justifyContent:'center' }}>{pendingProps.filter(p=>p.status==='pending').length}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding:'14px 18px', borderTop:'1px solid rgba(255,255,255,.1)', fontSize:11, color:'#6B7280', lineHeight:1.6 }}>
          Platform v2.0<br/>
          {new Date().toLocaleDateString('en-KE',{day:'numeric',month:'short',year:'numeric'})}
        </div>
      </aside>

      <main style={{ flex:1, padding:'28px 30px 56px', background:'var(--cream)', overflowY:'auto' }}>
        {tab==='overview'   && <AdminOverview pendingPayments={pendingPayments} pendingProps={pendingProps} bookings={bookings}/>}
        {tab==='payments'   && <AdminPayments payments={pendingPayments} onApprove={approvePayment} onReject={rejectPayment} showToast={showToast}/>}
        {tab==='properties' && <AdminProperties props={pendingProps} onApprove={approveProp} onReject={rejectProp} showToast={showToast}/>}
        {tab==='bookings'   && <AdminBookings bookings={bookings}/>}
        {tab==='users'      && <AdminUsers showToast={showToast}/>}
        {tab==='analytics'  && <AdminAnalytics/>}
        {tab==='payouts'    && <AdminPayouts showToast={showToast}/>}
        {tab==='settings'   && <AdminSettings showToast={showToast}/>}
        {tab==='logs'       && <AdminLogs/>}
      </main>
    </div>
  )
}

// ─── OVERVIEW ────────────────────────────────────────────────
function AdminOverview({ pendingPayments, pendingProps, bookings }) {
  const totalRevenue = bookings.reduce((s,b)=>s+(b.total_amount||0),0)
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, marginBottom:4 }}>Admin Overview 👑</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>Platform health at a glance</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(155px,1fr))', gap:14, marginBottom:24 }}>
        <StatCard label="Total Revenue"       value={formatKES(totalRevenue)}    icon="dollar"   iconBg="#DCFCE7" iconColor="#16A34A" trend="+18% this month"/>
        <StatCard label="Total Bookings"      value={bookings.length+248}        icon="cal"      iconBg="#DBEAFE" iconColor="#2563EB"/>
        <StatCard label="Active Properties"   value={MOCK_PROPERTIES.length+492} icon="home"     iconBg="#FEF3C7" iconColor="#D97706"/>
        <StatCard label="Pending Payments"    value={pendingPayments.length}     icon="wallet"   iconBg="#FEE2E2" iconColor="#DC2626"/>
        <StatCard label="Pending Properties"  value={pendingProps.filter(p=>p.status==='pending').length} icon="eye" iconBg="#FFF7ED" iconColor="#EA580C"/>
        <StatCard label="Platform Cashback"   value={formatKES(4820)}            icon="gift"     iconBg="#F0F9F4" iconColor="var(--forest-muted)"/>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
        <BarChart data={ANALYTICS.monthly} xKey="month" yKey="revenue"  title="Revenue (KES)" color="var(--forest-light)"/>
        <BarChart data={ANALYTICS.monthly} xKey="month" yKey="bookings" title="Bookings"       color="var(--gold)"/>
      </div>

      {pendingPayments.length > 0 && (
        <div style={{ background:'#FFF7ED', border:'1px solid #FED7AA', borderRadius:18, padding:20, marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
            <div style={{ width:8, height:8, background:'#EA580C', borderRadius:'50%' }}/>
            <div style={{ fontWeight:700, fontSize:14, color:'#9A3412' }}>⚡ {pendingPayments.length} Payment{pendingPayments.length!==1?'s':''} Awaiting Verification</div>
          </div>
          <div style={{ fontSize:13, color:'#C2410C' }}>Review and approve M-Pesa payments in the Payments tab.</div>
        </div>
      )}
    </>
  )
}

// ─── PAYMENTS ────────────────────────────────────────────────
function AdminPayments({ payments, onApprove, onReject, showToast }) {
  const [selected, setSelected] = useState(null)
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>Payment Verification</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>{payments.length} payment{payments.length!==1?'s':''} pending review</p>

      {payments.length===0 ? (
        <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, padding:40, textAlign:'center', color:'var(--text-muted)' }}>
          <div style={{ fontSize:44, marginBottom:12 }}>✅</div>
          <div style={{ fontWeight:700, fontSize:16 }}>All caught up!</div>
          <div style={{ fontSize:13, marginTop:4 }}>No payments awaiting verification.</div>
        </div>
      ) : (
        <Table>
          <thead><tr><Th>Booking</Th><Th>Guest</Th><Th>Amount</Th><Th>M-Pesa Code</Th><Th>Method</Th><Th>Date</Th><Th>Actions</Th></tr></thead>
          <tbody>
            {payments.map(p=>(
              <tr key={p.id}>
                <Td><div style={{ fontWeight:600 }}>{p.property_name}</div><div style={{ fontSize:11, fontFamily:'monospace', color:'var(--text-muted)' }}>{p.booking_number}</div></Td>
                <Td><div style={{ fontWeight:500 }}>{p.user_name}</div><div style={{ fontSize:11, color:'var(--text-muted)' }}>{p.user_email}</div></Td>
                <Td style={{ fontWeight:700 }}>{formatKES(p.amount)}</Td>
                <Td><code style={{ background:'var(--cream)', padding:'3px 7px', borderRadius:5, fontSize:12, fontFamily:'monospace', fontWeight:700 }}>{p.transaction_code}</code></Td>
                <Td style={{ fontSize:12 }}>{p.payment_method.replace(/_/g,' ')}</Td>
                <Td style={{ fontSize:12, color:'var(--text-sec)' }}>{formatDate(p.created_at)}</Td>
                <Td>
                  <div style={{ display:'flex', gap:6 }}>
                    <ActionBtn variant="ok" onClick={()=>{ onApprove(p.id); showToast(`Payment ${p.booking_number} approved ✅`) }}>Approve</ActionBtn>
                    <ActionBtn variant="no" onClick={()=>{ onReject(p.id);  showToast(`Payment rejected`,'error') }}>Reject</ActionBtn>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

// ─── PROPERTIES ──────────────────────────────────────────────
function AdminProperties({ props, onApprove, onReject, showToast }) {
  const [preview, setPreview] = useState(null)
  const pending = props.filter(p=>p.status==='pending')
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>Property Approvals</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>{pending.length} propert{pending.length!==1?'ies':'y'} awaiting review</p>

      {props.map(p=>(
        <div key={p.id} style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, overflow:'hidden', display:'flex', marginBottom:14 }}>
          <img src={p.featured_image} alt="" style={{ width:140, objectFit:'cover', flexShrink:0 }}/>
          <div style={{ padding:'16px 20px', flex:1 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
              <div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:16 }}>{p.name}</div>
                <div style={{ fontSize:12.5, color:'var(--text-sec)', marginTop:2 }}>{p.city}, {p.county} · {p.owner_name}</div>
              </div>
              <Badge
                color={p.status==='approved'?'#16a34a':p.status==='rejected'?'#dc2626':'#d97706'}
                bg={p.status==='approved'?'#dcfce7':p.status==='rejected'?'#fee2e2':'#fef3c7'}
              >{p.status}</Badge>
            </div>
            <div style={{ fontSize:13, color:'var(--text-sec)', marginBottom:12, lineHeight:1.5 }}>{p.description?.slice(0,120)}…</div>
            <div style={{ display:'flex', gap:8 }}>
              <ActionBtn variant="view" onClick={()=>setPreview(p)}>Preview</ActionBtn>
              {p.status==='pending' && <>
                <ActionBtn variant="ok" onClick={()=>{ onApprove(p.id); showToast(`"${p.name}" approved and live! ✅`) }}>Approve</ActionBtn>
                <ActionBtn variant="no" onClick={()=>{ onReject(p.id);  showToast(`"${p.name}" rejected`,'error') }}>Reject</ActionBtn>
              </>}
            </div>
          </div>
        </div>
      ))}

      {preview && (
        <Modal title={preview.name} onClose={()=>setPreview(null)} maxWidth={600}>
          <img src={preview.featured_image} alt="" style={{ width:'100%', height:180, objectFit:'cover', borderRadius:12, marginBottom:16 }}/>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
            {[['City',preview.city],['County',preview.county],['Type',preview.property_type],['Price',formatKES(preview.price_per_night)+'/night'],['Bedrooms',preview.bedrooms],['Max Guests',preview.max_guests]].map(([k,v])=>(
              <div key={k} style={{ background:'var(--cream)', borderRadius:8, padding:'8px 12px' }}>
                <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'.7px', color:'var(--text-sec)', marginBottom:2 }}>{k}</div>
                <div style={{ fontWeight:600, fontSize:13, textTransform:'capitalize' }}>{v}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize:13.5, color:'var(--text-sec)', lineHeight:1.7 }}>{preview.description}</p>
        </Modal>
      )}
    </>
  )
}

// ─── BOOKINGS ────────────────────────────────────────────────
function AdminBookings({ bookings }) {
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>All Bookings</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>{bookings.length} bookings in system</p>
      <Table>
        <thead><tr><Th>Booking #</Th><Th>Property</Th><Th>Guest</Th><Th>Dates</Th><Th>Total</Th><Th>Owner Payout</Th><Th>Status</Th></tr></thead>
        <tbody>
          {bookings.map(b=>{
            const sc=STATUS_CFG[b.status]||{}
            return (
              <tr key={b.id}>
                <Td><code style={{ fontSize:11, fontFamily:'monospace' }}>{b.booking_number}</code></Td>
                <Td style={{ fontWeight:600 }}>{b.property_name}</Td>
                <Td style={{ fontSize:12 }}>{b.guest_email}</Td>
                <Td style={{ fontSize:12, color:'var(--text-sec)' }}>{formatDate(b.checkin_date)}</Td>
                <Td style={{ fontWeight:700 }}>{formatKES(b.total_amount)}</Td>
                <Td style={{ color:'var(--forest-muted)', fontWeight:600 }}>{formatKES(b.owner_payout||0)}</Td>
                <Td><Badge color={sc.color} bg={sc.bg} dot={sc.dot}>{sc.label}</Badge></Td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

// ─── USERS ───────────────────────────────────────────────────
const MOCK_USERS = [
  { id:'u1', name:'Demo Client',      email:'user@test.com',          type:'client', bookings:4, spent:168300, joined:'Jan 2024', status:'active' },
  { id:'u2', name:'James Mwangi',     email:'james@example.com',      type:'owner',  bookings:0, spent:0, joined:'Mar 2022', status:'active', props:2 },
  { id:'u3', name:'Amina Hassan',     email:'amina@example.com',      type:'owner',  bookings:0, spent:0, joined:'Jun 2021', status:'active', props:2 },
  { id:'u4', name:'David Kipchoge',   email:'david@example.com',      type:'owner',  bookings:0, spent:0, joined:'Jan 2020', status:'active', props:2 },
  { id:'u5', name:'Grace Wanjiru',    email:'grace@example.com',      type:'owner',  bookings:0, spent:0, joined:'Sep 2023', status:'active', props:2 },
  { id:'u6', name:'Peter Ochieng',    email:'peter@example.com',      type:'client', bookings:7, spent:42800,  joined:'Feb 2023', status:'active' },
  { id:'u7', name:'Mary Njoroge',     email:'mary@example.com',       type:'client', bookings:2, spent:18400,  joined:'Nov 2023', status:'active' },
  { id:'u8', name:'Banned User',      email:'bad@example.com',        type:'client', bookings:1, spent:3200,   joined:'Dec 2023', status:'suspended' },
]

function AdminUsers({ showToast }) {
  const [users, setUsers] = useState(MOCK_USERS)
  const toggle = id => {
    setUsers(us => us.map(u => u.id===id ? {...u, status: u.status==='active'?'suspended':'active'} : u))
    const u = users.find(u=>u.id===id)
    showToast(u?.status==='active' ? `${u?.name} suspended` : `${u?.name} reinstated`, u?.status==='active'?'error':'success')
  }
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>User Management</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>{users.length} registered users</p>
      <Table>
        <thead><tr><Th>Name</Th><Th>Email</Th><Th>Type</Th><Th>Bookings</Th><Th>Total Spent</Th><Th>Joined</Th><Th>Status</Th><Th>Action</Th></tr></thead>
        <tbody>
          {users.map(u=>(
            <tr key={u.id}>
              <Td style={{ fontWeight:600 }}>{u.name}</Td>
              <Td style={{ fontSize:12 }}>{u.email}</Td>
              <Td><Badge color={u.type==='owner'?'#7c3aed':'#2563eb'} bg={u.type==='owner'?'#ede9fe':'#dbeafe'}>{u.type}{u.props?` (${u.props} props)`:''}</Badge></Td>
              <Td>{u.bookings}</Td>
              <Td>{u.spent>0?formatKES(u.spent):'—'}</Td>
              <Td style={{ fontSize:12, color:'var(--text-sec)' }}>{u.joined}</Td>
              <Td><Badge color={u.status==='active'?'#16a34a':'#dc2626'} bg={u.status==='active'?'#dcfce7':'#fee2e2'} dot={u.status==='active'?'#22c55e':'#ef4444'}>{u.status}</Badge></Td>
              <Td><ActionBtn variant={u.status==='active'?'no':'ok'} onClick={()=>toggle(u.id)}>{u.status==='active'?'Suspend':'Reinstate'}</ActionBtn></Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

// ─── ANALYTICS ───────────────────────────────────────────────
function AdminAnalytics() {
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>Platform Analytics</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>Real-time insights across the whole platform</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:20 }}>
        <StatCard label="Monthly Revenue"  value="KES 147K" icon="dollar"  iconBg="#DCFCE7" iconColor="#16A34A" trend="+22%" />
        <StatCard label="New Users"        value="84"       icon="users"   iconBg="#DBEAFE" iconColor="#2563EB" trend="+12%"/>
        <StatCard label="Avg Booking Value" value="KES 18K" icon="trending" iconBg="#FEF3C7" iconColor="#D97706" />
        <StatCard label="Cashback Issued"  value="KES 4.8K" icon="gift"    iconBg="#F0F9F4" iconColor="var(--forest-muted)"/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
        <BarChart data={ANALYTICS.monthly} xKey="month" yKey="revenue"  title="Platform Revenue (KES)" color="var(--forest-light)"/>
        <BarChart data={ANALYTICS.monthly} xKey="month" yKey="bookings" title="Total Bookings"          color="var(--gold)"/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, padding:22 }}>
          <h3 style={{ fontWeight:700, fontSize:15, marginBottom:14 }}>Top Cities by Bookings</h3>
          {ANALYTICS.top_cities.map((c,i)=>(
            <div key={c.city} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:'1px solid var(--border)', fontSize:13 }}>
              <span style={{ fontWeight:500 }}>#{i+1} {c.city}</span>
              <span style={{ fontWeight:700 }}>{c.bookings} bookings</span>
            </div>
          ))}
        </div>
        <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, padding:22 }}>
          <h3 style={{ fontWeight:700, fontSize:15, marginBottom:14 }}>Top Cities by Revenue</h3>
          {ANALYTICS.top_cities.sort((a,b)=>b.revenue-a.revenue).map((c,i)=>(
            <div key={c.city} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'7px 0', borderBottom:'1px solid var(--border)', fontSize:13 }}>
              <span style={{ fontWeight:500 }}>#{i+1} {c.city}</span>
              <span style={{ fontWeight:700 }}>{formatKES(c.revenue)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── PAYOUTS ─────────────────────────────────────────────────
const MOCK_PAYOUTS = [
  { id:'po1', owner:'James Mwangi',  email:'james@example.com', amount:45000, method:'M-Pesa', account:'0712345678', period:'Mar 2024', status:'pending' },
  { id:'po2', owner:'David Kipchoge',email:'david@example.com', amount:84000, method:'Bank',   account:'Equity 0123456', period:'Mar 2024', status:'pending' },
  { id:'po3', owner:'Amina Hassan',  email:'amina@example.com', amount:29000, method:'M-Pesa', account:'0723456789', period:'Feb 2024', status:'paid' },
]

function AdminPayouts({ showToast }) {
  const [payouts, setPayouts] = useState(MOCK_PAYOUTS)
  const pay = id => {
    setPayouts(ps=>ps.map(p=>p.id===id?{...p,status:'paid'}:p))
    showToast('Payout marked as sent ✅')
  }
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>Owner Payouts</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>Manage and send owner earnings (90% of booking value)</p>
      <Table>
        <thead><tr><Th>Owner</Th><Th>Amount</Th><Th>Method</Th><Th>Account</Th><Th>Period</Th><Th>Status</Th><Th>Action</Th></tr></thead>
        <tbody>
          {payouts.map(p=>(
            <tr key={p.id}>
              <Td><div style={{ fontWeight:600 }}>{p.owner}</div><div style={{ fontSize:11, color:'var(--text-muted)' }}>{p.email}</div></Td>
              <Td style={{ fontWeight:700 }}>{formatKES(p.amount)}</Td>
              <Td>{p.method}</Td>
              <Td style={{ fontSize:12, fontFamily:'monospace' }}>{p.account}</Td>
              <Td style={{ fontSize:12 }}>{p.period}</Td>
              <Td><Badge color={p.status==='paid'?'#16a34a':'#d97706'} bg={p.status==='paid'?'#dcfce7':'#fef3c7'} dot={p.status==='paid'?'#22c55e':'#f59e0b'}>{p.status}</Badge></Td>
              <Td>{p.status==='pending'?<ActionBtn variant="ok" onClick={()=>pay(p.id)}>Mark Paid</ActionBtn>:<span style={{ color:'#16a34a', fontSize:12, fontWeight:600 }}>✓ Done</span>}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

// ─── SETTINGS ────────────────────────────────────────────────
function AdminSettings({ showToast }) {
  const [s, setS] = useState({ commission:8, cashback:2, minPrice:1500, maxPrice:500000, mpesaPaybill:'123456', mpesaTill:'654321', bankAcc:'RoyalStays Ltd — Equity Bank — 0123456789' })
  const upd = k => e => setS({...s,[k]:e.target.value})
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>Platform Settings</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>Configure RoyalStays platform parameters</p>
      <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, padding:28, maxWidth:600 }}>
        {[
          ['Platform Commission (%)', 'commission', 'number', '0–100'],
          ['Client Cashback (%)',     'cashback',   'number', '0–100'],
          ['Min Listing Price (KES)', 'minPrice',   'number', ''],
          ['Max Listing Price (KES)', 'maxPrice',   'number', ''],
          ['M-Pesa Paybill',          'mpesaPaybill','text',  ''],
          ['M-Pesa Till Number',      'mpesaTill',  'text',   ''],
          ['Bank Account Details',    'bankAcc',    'text',   ''],
        ].map(([lbl,k,t,ph])=>(
          <div key={k} style={{ marginBottom:14 }}>
            <label style={{ display:'block', fontSize:12, fontWeight:700, marginBottom:4, color:'var(--charcoal)' }}>{lbl}</label>
            <input type={t} placeholder={ph} value={s[k]} onChange={upd(k)}
              style={{ width:'100%', padding:'10px 13px', border:'1.5px solid var(--border)', borderRadius:10, fontSize:13.5, outline:'none', background:'var(--white)', color:'var(--charcoal)' }}/>
          </div>
        ))}
        <button onClick={()=>showToast('Settings saved ✅')} style={{ background:'var(--forest)', color:'#fff', border:'none', padding:'11px 24px', borderRadius:10, fontSize:14, fontWeight:700, cursor:'pointer' }}>
          Save Settings
        </button>
      </div>
    </>
  )
}

// ─── LOGS ────────────────────────────────────────────────────
const MOCK_LOGS = [
  { id:'l1', action:'payment_approved', user:'admin@royalstays.co.ke', detail:'Booking RYS-20240315-AB1234 — KES 52,000', time:'2 min ago' },
  { id:'l2', action:'property_approved', user:'admin@royalstays.co.ke', detail:'Nyali Beach House by Robert Omondi', time:'1 hr ago' },
  { id:'l3', action:'user_suspended', user:'admin@royalstays.co.ke', detail:'User bad@example.com suspended for policy violation', time:'3 hr ago' },
  { id:'l4', action:'payout_sent', user:'admin@royalstays.co.ke', detail:'KES 29,000 to Amina Hassan — M-Pesa 0723456789', time:'5 hr ago' },
  { id:'l5', action:'settings_updated', user:'admin@royalstays.co.ke', detail:'Commission rate updated to 8%', time:'1 day ago' },
  { id:'l6', action:'property_rejected', user:'martztush@gmail.com', detail:'Property "CBD Apartment" rejected — poor photos', time:'2 days ago' },
]

const LOG_COLORS = { payment_approved:'#16a34a', property_approved:'#2563eb', user_suspended:'#dc2626', payout_sent:'#7c3aed', settings_updated:'#d97706', property_rejected:'#dc2626' }

function AdminLogs() {
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>Audit Logs</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>Complete trail of all admin actions</p>
      <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, overflow:'hidden' }}>
        {MOCK_LOGS.map((log,i)=>(
          <div key={log.id} style={{ padding:'14px 20px', borderBottom:'1px solid var(--border)', display:'flex', gap:12, alignItems:'flex-start' }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:LOG_COLORS[log.action]||'#6b7280', marginTop:6, flexShrink:0 }}/>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div>
                  <span style={{ fontWeight:700, fontSize:13, fontFamily:'monospace', color:LOG_COLORS[log.action]||'var(--charcoal)', background:'var(--cream)', padding:'2px 7px', borderRadius:5 }}>{log.action}</span>
                  <span style={{ fontSize:12.5, color:'var(--text-sec)', marginLeft:10 }}>{log.detail}</span>
                </div>
                <span style={{ fontSize:11, color:'var(--text-muted)', whiteSpace:'nowrap', marginLeft:12 }}>{log.time}</span>
              </div>
              <div style={{ fontSize:11.5, color:'var(--text-muted)', marginTop:3 }}>by {log.user}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
