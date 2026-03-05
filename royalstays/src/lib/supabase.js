import { createClient } from '@supabase/supabase-js'

const url  = import.meta.env.VITE_SUPABASE_URL  || 'https://placeholder.supabase.co'
const key  = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(url, key)

// ─── AUTH HELPERS ────────────────────────────────────────────
export const signIn  = (email, password) =>
  supabase.auth.signInWithPassword({ email, password })

export const signUp  = (email, password, meta) =>
  supabase.auth.signUp({ email, password, options: { data: meta } })

export const signOut = () => supabase.auth.signOut()

export const getSession = () => supabase.auth.getSession()

// ─── DB HELPERS ──────────────────────────────────────────────
export const db = {
  properties: () => supabase.from('properties'),
  bookings:   () => supabase.from('bookings'),
  profiles:   () => supabase.from('profiles'),
  reviews:    () => supabase.from('reviews'),
  paymentProofs: () => supabase.from('payment_proofs'),
  cashback:   () => supabase.from('cashback_transactions'),
  messages:   () => supabase.from('messages'),
  payouts:    () => supabase.from('payout_requests'),
  adminLogs:  () => supabase.from('admin_logs'),
}

// ─── STORAGE HELPERS ─────────────────────────────────────────
export const storage = {
  uploadPaymentProof: async (bookingId, file) => {
    const ext  = file.name.split('.').pop()
    const path = `${bookingId}/${Date.now()}.${ext}`
    const { data, error } = await supabase.storage
      .from('payment-proofs')
      .upload(path, file, { upsert: false })
    if (error) throw error
    return supabase.storage.from('payment-proofs').getPublicUrl(path).data.publicUrl
  },

  uploadPropertyImage: async (propertyId, file, index = 0) => {
    const ext  = file.name.split('.').pop()
    const path = `${propertyId}/${index}.${ext}`
    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(path, file, { upsert: true })
    if (error) throw error
    return supabase.storage.from('property-images').getPublicUrl(path).data.publicUrl
  },
}
