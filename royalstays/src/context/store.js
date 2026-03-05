import { create } from 'zustand'
import {
  MOCK_BOOKINGS, MOCK_PENDING_PAYMENTS, MOCK_PENDING_PROPS,
  MOCK_CONVERSATIONS, MOCK_NOTIFICATIONS,
} from '../lib/data'

export const useStore = create((set, get) => ({
  // ── Auth ──────────────────────────────────────────────────
  user:    null,
  isAdmin: false,

  setUser: (user, isAdmin = false) => set({ user, isAdmin }),
  clearUser: () => set({ user: null, isAdmin: false }),

  // ── Navigation ────────────────────────────────────────────
  page:           'home',
  pageData:       null,
  selectedProp:   null,
  bookingDetails: null,

  navigate: (page, data = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    set({ page, pageData: data })
  },
  setSelectedProp:   (p) => set({ selectedProp: p }),
  setBookingDetails: (d) => set({ bookingDetails: d }),

  // ── Dark Mode ─────────────────────────────────────────────
  dark: false,
  toggleDark: () => {
    const next = !get().dark
    set({ dark: next })
    document.documentElement.classList.toggle('dark', next)
  },

  // ── Favourites ────────────────────────────────────────────
  favourites: [],
  toggleFav: (id) => set(s => ({
    favourites: s.favourites.includes(id)
      ? s.favourites.filter(f => f !== id)
      : [...s.favourites, id]
  })),

  // ── Compare ───────────────────────────────────────────────
  compareList: [],
  toggleCompare: (id) => set(s => {
    const cur = s.compareList
    if (cur.includes(id)) return { compareList: cur.filter(c => c !== id) }
    if (cur.length >= 3)  return { compareList: [...cur.slice(1), id] }
    return { compareList: [...cur, id] }
  }),
  clearCompare: () => set({ compareList: [] }),

  // ── Bookings ──────────────────────────────────────────────
  bookings: MOCK_BOOKINGS,
  addBooking: (b) => set(s => ({ bookings: [b, ...s.bookings] })),
  updateBookingStatus: (id, status) => set(s => ({
    bookings: s.bookings.map(b => b.id === id ? { ...b, status } : b)
  })),
  markReviewed: (id) => set(s => ({
    bookings: s.bookings.map(b => b.id === id ? { ...b, reviewed: true } : b)
  })),

  // ── Admin ─────────────────────────────────────────────────
  pendingPayments: MOCK_PENDING_PAYMENTS,
  pendingProps:    MOCK_PENDING_PROPS,
  approvePayment: (id) => set(s => ({
    pendingPayments: s.pendingPayments.filter(p => p.id !== id)
  })),
  rejectPayment: (id) => set(s => ({
    pendingPayments: s.pendingPayments.filter(p => p.id !== id)
  })),
  approveProp: (id) => set(s => ({
    pendingProps: s.pendingProps.map(p => p.id === id ? { ...p, status: 'approved' } : p)
  })),
  rejectProp: (id) => set(s => ({
    pendingProps: s.pendingProps.map(p => p.id === id ? { ...p, status: 'rejected' } : p)
  })),

  // ── Messaging ─────────────────────────────────────────────
  conversations: MOCK_CONVERSATIONS,
  sendMessage: (convId, text) => set(s => ({
    conversations: s.conversations.map(c =>
      c.id === convId
        ? {
            ...c,
            last_message: text,
            last_time: 'Just now',
            messages: [...c.messages, {
              id: 'm' + Date.now(),
              sender: 'me',
              text,
              time: new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' }),
              mine: true,
            }]
          }
        : c
    )
  })),

  // ── Notifications ─────────────────────────────────────────
  notifications: MOCK_NOTIFICATIONS,
  markAllRead: () => set(s => ({
    notifications: s.notifications.map(n => ({ ...n, read: true }))
  })),

  // ── Toast ─────────────────────────────────────────────────
  toast: null,
  showToast: (message, type = 'success') => {
    const id = Date.now()
    set({ toast: { id, message, type } })
    setTimeout(() => set(s => s.toast?.id === id ? { toast: null } : s), 3800)
  },
  clearToast: () => set({ toast: null }),
}))
