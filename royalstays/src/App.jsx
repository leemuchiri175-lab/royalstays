import { useEffect } from 'react'
import { useStore } from './context/store'
import Navbar from './components/Navbar'
import { Toast } from './components/ui'
import { CompareBar, CompareModal } from './components/Compare'

import HomePage        from './pages/HomePage'
import SearchPage      from './pages/SearchPage'
import PropertyPage    from './pages/PropertyPage'
import { CheckoutPage} from './pages/CheckoutPage'
import { LoginPage, RegisterPage } from './pages/AuthPages'
import ClientDashboard from './pages/ClientDashboard'
import OwnerDashboard  from './pages/OwnerDashboard'
import AdminDashboard  from './pages/AdminDashboard'

export default function App() {
  const { page, user, isAdmin, navigate, compareList } = useStore()

  // Redirect compare page back if list too small
  const showCompareModal = page === 'compare' && compareList.length >= 2

  const renderPage = () => {
    switch (page) {
      case 'home':       return <HomePage />
      case 'search':     return <SearchPage />
      case 'property':   return <PropertyPage />
      case 'checkout':   return user ? <CheckoutPage /> : (navigate('login'), null)
      case 'login':      return <LoginPage />
      case 'register':   return <RegisterPage />
      case 'dashboard':
        if (!user) { navigate('login'); return null }
        if (isAdmin)               return <AdminDashboard />
        if (user.userType === 'owner') return <OwnerDashboard />
        return <ClientDashboard />
      case 'admin':
        if (!isAdmin) { navigate('home'); return null }
        return <AdminDashboard />
      case 'compare':
        // Render search page with compare modal on top
        return <SearchPage />
      default:
        return (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'60vh', gap:16, padding:40, textAlign:'center' }}>
            <div style={{ fontSize:64, marginBottom:8 }}>404</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700 }}>Page not found</h2>
            <p style={{ color:'var(--text-sec)', marginBottom:16 }}>The page you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('home')}
              style={{ background:'var(--forest)', color:'#fff', border:'none', padding:'12px 28px', borderRadius:10, fontSize:15, fontWeight:700, cursor:'pointer' }}>
              ← Back to Home
            </button>
          </div>
        )
    }
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'var(--cream)', color:'var(--charcoal)' }}>
      <Navbar />
      <main style={{ flex:1 }}>
        {renderPage()}
      </main>
      <Toast />
      <CompareBar />
      {showCompareModal && <CompareModal onClose={() => navigate('search')} />}
    </div>
  )
}
