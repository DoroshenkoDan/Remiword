'use client'

import { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { toast } from 'sonner'

export function FeedbackCard() {
  const [text, setText] = useState('')

  const handleSend = () => {
    if (!text.trim()) return
    window.open(
      `mailto:doroshenko.daniil.a@gmail.com?subject=Remiword Feedback&body=${encodeURIComponent(text.trim())}`,
      '_blank'
    )
    setText('')
    toast.success('Thanks for the feedback!')
  }

  return (
    <div className="flex flex-col gap-4 bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-9 rounded-lg bg-primary/15 shrink-0">
          <MessageSquare size={16} strokeWidth={1.5} className="text-primary" />
        </div>
        <span className="text-sm font-medium text-text-primary">Feedback</span>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe a bug or suggest a feature…"
        rows={3}
        className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 transition-colors resize-none"
      />

      <button
        onClick={handleSend}
        disabled={!text.trim()}
        className="flex items-center justify-center py-2 rounded-lg bg-primary text-text-primary text-sm font-medium transition-colors hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        Send feedback →
      </button>
    </div>
  )
}
