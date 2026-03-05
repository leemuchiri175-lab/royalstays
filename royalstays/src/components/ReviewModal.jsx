import { useState } from 'react'
import { Modal, StarInput, Field, Input, Textarea } from './ui'
import { formatDate } from '../lib/data'

export default function ReviewModal({ booking, onClose, onSubmit }) {
  const [ratings, setRatings] = useState({ overall: 0, cleanliness: 0, communication: 0, value: 0, location: 0 })
  const [title,   setTitle]   = useState('')
  const [comment, setComment] = useState('')
  const [error,   setError]   = useState('')

  const handleSubmit = () => {
    if (!ratings.overall) { setError('Please give an overall rating'); return }
    if (!comment.trim())  { setError('Please write a comment'); return }
    onSubmit({ ...ratings, title, comment, bookingId: booking.id, propertyName: booking.property_name })
    onClose()
  }

  const cats = [
    { key: 'overall',       label: 'Overall Rating' },
    { key: 'cleanliness',   label: 'Cleanliness' },
    { key: 'communication', label: 'Communication' },
    { key: 'value',         label: 'Value for Money' },
    { key: 'location',      label: 'Location' },
  ]

  return (
    <Modal title="Rate Your Stay" onClose={onClose}>
      {/* Booking preview */}
      <div style={{ display: 'flex', gap: 12, padding: 14, background: 'var(--cream)', borderRadius: 12, marginBottom: 20, alignItems: 'center' }}>
        <img src={booking.property_image} alt="" style={{ width: 56, height: 42, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{booking.property_name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-sec)', marginTop: 2 }}>
            {formatDate(booking.checkin_date)} – {formatDate(booking.checkout_date)}
          </div>
        </div>
      </div>

      {/* Rating categories */}
      {cats.map(c => (
        <div key={c.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{c.label}</div>
          <StarInput value={ratings[c.key]} onChange={v => setRatings({ ...ratings, [c.key]: v })} size={20} />
        </div>
      ))}

      <div style={{ marginTop: 16 }}>
        <Field label="Review Title (optional)">
          <Input placeholder="Summarise your stay in a sentence" value={title} onChange={e => setTitle(e.target.value)} />
        </Field>
        <Field label="Your Review *" error={error}>
          <Textarea
            rows={4}
            placeholder="What did you love? Any tips for future guests?"
            value={comment}
            onChange={e => { setComment(e.target.value); setError('') }}
          />
        </Field>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          width: '100%', padding: 13, background: 'var(--forest)', color: '#fff',
          border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer',
          opacity: !ratings.overall || !comment ? 0.6 : 1,
        }}
      >Submit Review</button>
    </Modal>
  )
}
