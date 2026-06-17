'use client'

import { Send } from 'lucide-react'
import { toast } from 'sonner'

export function TelegramBotCard() {
  return (
    <div className="flex flex-col gap-4 bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center size-9 rounded-lg bg-primary/15 shrink-0">
          <Send size={16} strokeWidth={1.5} className="text-primary" />
        </div>
        <span className="text-sm font-medium text-text-primary">Telegram Bot</span>
      </div>

      <p className="text-xs text-text-secondary leading-relaxed">
        Connect your Telegram account to receive daily word
        reminders and review words directly in the chat.
      </p>

      <button
        onClick={() => toast.info('Telegram integration is coming soon!')}
        className="flex items-center justify-center gap-2 py-2 rounded-lg border border-border text-text-secondary text-sm transition-colors hover:border-border-strong cursor-pointer"
      >
        <Send size={13} strokeWidth={1.5} />
        Connect Telegram →
      </button>
    </div>
  )
}
