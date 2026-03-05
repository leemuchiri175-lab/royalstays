import { useState } from 'react'
import { useStore } from '../context/store'
import { Icon, Avatar, Badge, StatCard, BarChart, Table, Th, Td, ActionBtn, Empty, Field, Input, Select, Textarea } from '../components/ui'
import { formatKES, formatDate, STATUS_CFG, ANALYTICS, AMENITY_ICONS, MOCK_PROPERTIES } from '../lib/data'

const MENU = [
  { k:'overview',    icon:'trending', lbl:'Overview' },
  { k:'properties',  icon:'home',     lbl:'My Properties' },
  { k:'bookings',    icon:'cal',      lbl:'Bookings' },
  { k:'earnings',    icon:'dollar',   lbl:'Earnings' },
  { k:'analytics',   icon:'chart',    lbl:'Analytics' },
  { k:'add',         icon:'plus',     lbl:'Add Property' },
]

export default function OwnerDashboard() {
  const { user, bookings, navigate, showToast } = useStore()
  const [tab, setTab] = useState('overview')

  const myProps    = MOCK_PROPERTIES.filter(p=>p.owner_id==='u2' || p.owner_id==='u4')
  const myBookings = bookings

  return (
    <div style={{ display:'flex', minHeight:'calc(100vh - 64px)' }}>
      <aside style={{ width:240, background:'#1A1A1C', flexShrink:0, display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'22px 18px 18px', borderBottom:'1px solid rgba(255,255,255,.1)' }}>
          <Avatar name={user.firstName} size={46} bg="var(--gold)" color="#1A1A1C"/>
          <div style={{ color:'#fff', fontWeight:700, fontSize:15, marginTop:10 }}>{user.firstName} {user.lastName}</div>
          <div style={{ color:'var(--gold)', fontSize:10.5, textTransform:'uppercase', letterSpacing:'1px', fontWeight:700 }}>Property Owner</div>
        </div>
        <nav style={{ padding:'10px 0', flex:1 }}>
          {MENU.map(m=>(
            <button key={m.k} onClick={()=>setTab(m.k)} style={{
              display:'flex', alignItems:'center', gap:10, width:'100%',
              padding:'10px 18px', border:'none', textAlign:'left', cursor:'pointer',
              fontSize:13.5, fontWeight:500, transition:'all .18s',
              color:       tab===m.k ? 'var(--gold)' : '#9CA3AF',
              background:  tab===m.k ? 'rgba(201,168,76,.1)' : 'none',
              borderRight:`3px solid ${tab===m.k ? 'var(--gold)' : 'transparent'}`,
            }}>
              <Icon name={m.icon} size={16} color="currentColor"/>{m.lbl}
            </button>
          ))}
        </nav>
        <div style={{ padding:'16px 18px', borderTop:'1px solid rgba(255,255,255,.1)' }}>
          <div style={{ background:'rgba(201,168,76,.12)', border:'1px solid rgba(201,168,76,.25)', borderRadius:10, padding:12 }}>
            <div style={{ color:'var(--gold)', fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'.8px', marginBottom:2 }}>Total Revenue</div>
            <div style={{ color:'#fff', fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700 }}>KES 842,000</div>
          </div>
        </div>
      </aside>

      <main style={{ flex:1, padding:'28px 30px 56px', background:'var(--cream)', overflowY:'auto' }}>
        {tab==='overview'   && <OwnerOverview myProps={myProps} myBookings={myBookings} navigate={navigate}/>}
        {tab==='properties' && <OwnerProperties myProps={myProps} navigate={navigate} showToast={showToast}/>}
        {tab==='bookings'   && <OwnerBookings myBookings={myBookings} showToast={showToast}/>}
        {tab==='earnings'   && <OwnerEarnings myBookings={myBookings}/>}
        {tab==='analytics'  && <OwnerAnalytics/>}
        {tab==='add'        && <AddProperty showToast={showToast} setTab={setTab}/>}
      </main>
    </div>
  )
}

function OwnerOverview({ myProps, myBookings, navigate }) {
  const totalRevenue = myBookings.filter(b=>['confirmed','completed'].includes(b.status)).reduce((s,b)=>s+(b.owner_payout||0),0)
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, marginBottom:4 }}>Owner Dashboard</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>Your property portfolio at a glance</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:14, marginBottom:24 }}>
        <StatCard label="Active Listings"  value={myProps.length}              icon="home"    iconBg="#DBEAFE" iconColor="#2563EB"/>
        <StatCard label="Total Bookings"   value={myBookings.length}           icon="cal"     iconBg="#DCFCE7" iconColor="#16A34A"/>
        <StatCard label="Total Earned"     value={formatKES(totalRevenue)}     icon="dollar"  iconBg="#FEF3C7" iconColor="#D97706"/>
        <StatCard label="Avg Occupancy"    value="84%"                         icon="trending" iconBg="#F0F9F4" iconColor="var(--forest-muted)" trend="+6% this month"/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
        <BarChart data={ANALYTICS.monthly} xKey="month" yKey="revenue" title="Monthly Revenue (KES)" color="var(--forest-light)"/>
        <BarChart data={ANALYTICS.monthly} xKey="month" yKey="bookings" title="Monthly Bookings" color="var(--gold)"/>
      </div>
      <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, overflow:'hidden' }}>
        <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)', fontWeight:700, fontSize:15 }}>Recent Bookings</div>
        {myBookings.slice(0,4).map(b=>{
          const sc=STATUS_CFG[b.status]||{}
          return (
            <div key={b.id} style={{ padding:'13px 20px', borderBottom:'1px solid var(--border)', display:'flex', gap:12, alignItems:'center' }}>
              <img src={b.property_image} alt="" style={{ width:48, height:38, objectFit:'cover', borderRadius:6, flexShrink:0 }}/>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, fontSize:13.5 }}>{b.property_name}</div>
                <div style={{ fontSize:12, color:'var(--text-sec)' }}>{formatDate(b.checkin_date)} → {formatDate(b.checkout_date)}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <Badge color={sc.color} bg={sc.bg}>{sc.label}</Badge>
                <div style={{ fontSize:13, fontWeight:700, marginTop:3 }}>{formatKES(b.owner_payout||0)}</div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

function OwnerProperties({ myProps, navigate, showToast }) {
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>My Properties</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>{myProps.length} listing{myProps.length!==1?'s':''}</p>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {myProps.map(p=>(
          <div key={p.id} style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, overflow:'hidden', display:'flex' }}>
            <img src={p.featured_image} alt="" style={{ width:160, objectFit:'cover', flexShrink:0 }}/>
            <div style={{ padding:'16px 20px', flex:1 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                <div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:17 }}>{p.name}</div>
                  <div style={{ fontSize:12.5, color:'var(--text-sec)', marginTop:2 }}>{p.city}, {p.county}</div>
                </div>
                <Badge color="#16a34a" bg="#dcfce7" dot="#22c55e">Live</Badge>
              </div>
              <div style={{ display:'flex', gap:16, fontSize:13, color:'var(--text-sec)', marginBottom:12 }}>
                <span>KES {p.price_per_night.toLocaleString()}/night</span>
                <span>⭐ {p.average_rating} ({p.total_reviews} reviews)</span>
                <span>{p.total_bookings} bookings</span>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <ActionBtn variant="view" onClick={()=>navigate('property',p)}>View Listing</ActionBtn>
                <ActionBtn variant="warn" onClick={()=>showToast('Property editor coming soon')}>Edit</ActionBtn>
                <ActionBtn variant="no"   onClick={()=>showToast('Property deactivated','error')}>Deactivate</ActionBtn>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function OwnerBookings({ myBookings, showToast }) {
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>Property Bookings</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>{myBookings.length} reservations</p>
      <Table>
        <thead><tr><Th>Property</Th><Th>Dates</Th><Th>Guest</Th><Th>Total</Th><Th>Your Payout</Th><Th>Status</Th><Th>Action</Th></tr></thead>
        <tbody>
          {myBookings.map(b=>{
            const sc=STATUS_CFG[b.status]||{}
            return (
              <tr key={b.id}>
                <Td><div style={{ fontWeight:600 }}>{b.property_name}</div><div style={{ fontSize:11, color:'var(--text-muted)', fontFamily:'monospace' }}>{b.booking_number}</div></Td>
                <Td style={{ fontSize:12, color:'var(--text-sec)' }}>{formatDate(b.checkin_date)}<br/>{formatDate(b.checkout_date)}</Td>
                <Td style={{ fontSize:12 }}>{b.guest_email}</Td>
                <Td style={{ fontWeight:700 }}>{formatKES(b.total_amount)}</Td>
                <Td style={{ fontWeight:700, color:'var(--forest-muted)' }}>{formatKES(b.owner_payout||0)}</Td>
                <Td><Badge color={sc.color} bg={sc.bg} dot={sc.dot}>{sc.label}</Badge></Td>
                <Td><ActionBtn variant="view" onClick={()=>showToast('Booking detail view coming soon')}>Details</ActionBtn></Td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

function OwnerEarnings({ myBookings }) {
  const earned    = myBookings.filter(b=>['confirmed','completed'].includes(b.status)).reduce((s,b)=>s+(b.owner_payout||0),0)
  const pending   = myBookings.filter(b=>b.status==='payment_verified').reduce((s,b)=>s+(b.owner_payout||0),0)
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>Earnings</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>You keep 90% of every booking</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:22 }}>
        <StatCard label="Total Paid Out"    value={formatKES(earned)}   icon="dollar"  iconBg="#DCFCE7" iconColor="#16A34A"/>
        <StatCard label="Awaiting Payout"   value={formatKES(pending)}  icon="wallet"  iconBg="#FEF3C7" iconColor="#D97706"/>
        <StatCard label="This Month"        value="KES 147,000"         icon="trending" iconBg="#DBEAFE" iconColor="#2563EB" trend="+22% vs last month"/>
      </div>
      <BarChart data={ANALYTICS.monthly} xKey="month" yKey="revenue" title="Revenue History (KES)" color="var(--forest-light)"/>
      <div style={{ height:16 }}/>
      <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, padding:22 }}>
        <h3 style={{ fontWeight:700, fontSize:15, marginBottom:14 }}>Property Performance</h3>
        {ANALYTICS.prop_breakdown.map(p=>(
          <div key={p.name} style={{ marginBottom:14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:4 }}>
              <span style={{ fontWeight:600 }}>{p.name}</span>
              <span style={{ color:'var(--text-sec)' }}>{formatKES(p.revenue)} · {p.pct}%</span>
            </div>
            <div style={{ height:7, background:'var(--border)', borderRadius:100, overflow:'hidden' }}>
              <div style={{ height:'100%', borderRadius:100, background:'linear-gradient(90deg, var(--forest-light), var(--forest-muted))', width:`${p.pct}%`, transition:'width .8s' }}/>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function OwnerAnalytics() {
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>Analytics</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>Insights into your property performance</p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
        <BarChart data={ANALYTICS.monthly} xKey="month" yKey="bookings"  title="Bookings per Month" color="var(--forest-light)"/>
        <BarChart data={ANALYTICS.monthly} xKey="month" yKey="occupancy" title="Occupancy % per Month" color="var(--gold)"/>
      </div>
      <BarChart data={ANALYTICS.monthly} xKey="month" yKey="revenue" title="Revenue (KES) per Month" color="#7c3aed"/>
      <div style={{ height:16 }}/>
      <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, padding:22 }}>
        <h3 style={{ fontWeight:700, fontSize:15, marginBottom:14 }}>Top Booking Cities</h3>
        <Table>
          <thead><tr><Th>City</Th><Th>Bookings</Th><Th>Revenue</Th></tr></thead>
          <tbody>
            {ANALYTICS.top_cities.map(c=>(
              <tr key={c.city}><Td style={{ fontWeight:600 }}>{c.city}</Td><Td>{c.bookings}</Td><Td style={{ fontWeight:700 }}>{formatKES(c.revenue)}</Td></tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

function AddProperty({ showToast, setTab }) {
  const [f,setF] = useState({ name:'', city:'', county:'', type:'villa', price:'', bedrooms:'', bathrooms:'', maxGuests:'', desc:'' })
  const upd = k => e => setF({...f,[k]:e.target.value})
  const TYPES = ['villa','apartment','holiday_home','luxury_lodge','treehouse','cottage','guesthouse','boutique_hotel','studio']
  const COUNTIES = ['Nairobi','Mombasa','Kwale','Kilifi','Lamu','Tana River','Narok','Kajiado','Nakuru','Nyandarua','Nyeri','Kirinyaga','Muranga','Kiambu','Turkana','West Pokot','Samburu','Trans Nzoia','Uasin Gishu','Elgeyo Marakwet','Nandi','Baringo','Laikipia','Isiolo','Marsabit','Meru','Tharaka Nithi','Embu','Kitui','Machakos','Makueni','Garissa','Wajir','Mandera','Siaya','Kisumu','Homa Bay','Migori','Kisii','Nyamira','Busia','Vihiga','Bungoma','Kakamega','Trans Nzoia','Bomet','Kericho']
  return (
    <>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:700, marginBottom:4 }}>List New Property</h2>
      <p style={{ color:'var(--text-sec)', fontSize:13.5, marginBottom:22 }}>Add your property for admin review — typically approved within 24 hours</p>
      <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:18, padding:28, maxWidth:720 }}>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700, marginBottom:16 }}>Basic Information</h3>
        <Field label="Property Name *"><Input placeholder="e.g. Sunset Beach Villa" value={f.name} onChange={upd('name')}/></Field>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          <Field label="City *"><Input placeholder="Diani Beach" value={f.city} onChange={upd('city')}/></Field>
          <Field label="County *">
            <Select value={f.county} onChange={upd('county')}>
              <option value="">Select county</option>
              {COUNTIES.map(c=><option key={c} value={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Property Type *">
            <Select value={f.type} onChange={upd('type')}>
              {TYPES.map(t=><option key={t} value={t}>{t.replace(/_/g,' ')}</option>)}
            </Select>
          </Field>
          <Field label="Price per Night (KES) *"><Input type="number" placeholder="5000" value={f.price} onChange={upd('price')}/></Field>
          <Field label="Bedrooms"><Input type="number" placeholder="2" value={f.bedrooms} onChange={upd('bedrooms')}/></Field>
          <Field label="Bathrooms"><Input type="number" placeholder="2" value={f.bathrooms} onChange={upd('bathrooms')}/></Field>
        </div>
        <Field label="Max Guests"><Input type="number" placeholder="4" value={f.maxGuests} onChange={upd('maxGuests')}/></Field>
        <Field label="Property Description *">
          <Textarea rows={5} placeholder="Describe your property — what makes it special, amenities, nearby attractions…" value={f.desc} onChange={upd('desc')}/>
        </Field>
        <div style={{ background:'#FEF3C7', borderRadius:10, padding:12, marginBottom:18, fontSize:12.5, color:'#92400E', border:'1px solid #FDE68A' }}>
          📋 After submission, our team will review your listing within 24 hours. You'll receive an email notification upon approval.
        </div>
        <button onClick={()=>{ if(!f.name||!f.city||!f.price){ showToast('Please fill required fields','error'); return } showToast('Property submitted for review! You\'ll be notified within 24h. ✅'); setTab('properties') }}
          style={{ background:'var(--forest)', color:'#fff', border:'none', padding:'12px 28px', borderRadius:12, fontSize:14, fontWeight:700, cursor:'pointer' }}>
          Submit for Review →
        </button>
      </div>
    </>
  )
}
