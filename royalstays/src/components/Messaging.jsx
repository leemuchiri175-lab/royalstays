import { useState, useRef, useEffect } from 'react'
import { useStore } from '../context/store'
import { Avatar, Icon, Empty } from './ui'

export default function Messaging() {
  const { conversations, sendMessage } = useStore()
  const [activeId, setActiveId] = useState(conversations[0]?.id || null)
  const [draft,    setDraft]    = useState('')
  const bodyRef = useRef()

  const conv = conversations.find(c => c.id === activeId)

  const handleSend = () => {
    if (!draft.trim() || !activeId) return
    sendMessage(activeId, draft.trim())
    setDraft('')
  }

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [conv?.messages?.length])

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '280px 1fr',
      height: 520, border: '1px solid var(--border)', borderRadius: 18,
      overflow: 'hidden', background: 'var(--white)',
    }}>
      {/* Conversation list */}
      <div style={{ borderRight: '1px solid var(--border)', overflowY: 'auto' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: 14 }}>
          Messages
        </div>
        {conversations.map(c => (
          <div key={c.id}
            onClick={() => setActiveId(c.id)}
            style={{
              padding: '14px 16px', borderBottom: '1px solid var(--border)', cursor: 'pointer',
              background: activeId === c.id ? 'rgba(22,48,43,.05)' : 'transparent',
              transition: 'background .15s',
            }}
          >
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <Avatar name={c.with_name} size={38} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{c.with_name}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{c.last_time}</div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-sec)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.last_message}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{c.property}</div>
              </div>
              {c.unread > 0 && (
                <div style={{ background: 'var(--forest-muted)', color: '#fff', width: 18, height: 18, borderRadius: '50%', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {c.unread}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message area */}
      {conv ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name={conv.with_name} size={38} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{conv.with_name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-sec)' }}>{conv.property}</div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--forest-muted)', fontWeight: 600 }}>🟢 Online</div>
          </div>

          {/* Messages */}
          <div ref={bodyRef} style={{ flex: 1, overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--cream)' }}>
            {conv.messages.map(m => (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.mine ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '72%', padding: '10px 14px', borderRadius: 16, fontSize: 13.5, lineHeight: 1.55,
                  ...(m.mine
                    ? { background: 'var(--forest)', color: '#fff', borderBottomRightRadius: 4 }
                    : { background: 'var(--white)', border: '1px solid var(--border)', color: 'var(--charcoal)', borderBottomLeftRadius: 4 }
                  )
                }}>{m.text}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>{m.time}</div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
            <input
              style={{ flex: 1, padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 100, fontSize: 13.5, outline: 'none', background: 'var(--cream)', color: 'var(--charcoal)' }}
              placeholder="Type a message…"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} style={{
              background: 'var(--forest)', border: 'none', color: '#fff',
              width: 40, height: 40, borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name="send" size={16} color="#fff" />
            </button>
          </div>
        </div>
      ) : (
        <Empty icon="💬" title="Select a conversation" />
      )}
    </div>
  )
}
