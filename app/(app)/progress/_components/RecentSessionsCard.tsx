import { CreditCard, LayoutList, PenLine } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Session {
  mode: 'flashcard' | 'choice' | 'spelling'
  category?: string
  accuracy: number
  date: string
  wordCount: number
}

const MODE_META: Record<Session['mode'], { label: string; icon: LucideIcon; iconBg: string; iconColor: string }> = {
  flashcard: { label: 'Flashcard', icon: CreditCard, iconBg: 'bg-primary/15', iconColor: 'text-primary' },
  choice: { label: 'Multiple Choice', icon: LayoutList, iconBg: 'bg-success/15', iconColor: 'text-success' },
  spelling: { label: 'Spelling', icon: PenLine, iconBg: 'bg-warning/15', iconColor: 'text-warning' },
}

function accuracyColor(pct: number) {
  if (pct >= 85) return { text: 'text-success', bar: 'bg-success' }
  if (pct >= 70) return { text: 'text-warning', bar: 'bg-warning' }
  return { text: 'text-error', bar: 'bg-error' }
}

interface RecentSessionsCardProps {
  sessions: Session[]
}

export function RecentSessionsCard({ sessions }: RecentSessionsCardProps) {
  return (
    <div className="flex flex-col gap-4 bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center justify-between">
        <span className="text-md font-medium text-text-primary">Recent sessions</span>
      </div>

      {sessions.length === 0 && (
        <p className="text-sm text-text-muted text-center py-4">No sessions yet</p>
      )}

      <div className="flex flex-col">
        {sessions.map((s, i) => {
          const meta = MODE_META[s.mode]
          const Icon = meta.icon
          const colors = accuracyColor(s.accuracy)
          return (
            <div
              key={i}
              className={`flex items-center gap-3 py-3 ${i < sessions.length - 1 ? 'border-b border-border' : ''
                }`}
            >
              {/* Icon */}
              <div className={`flex items-center justify-center size-8 rounded-lg shrink-0 ${meta.iconBg}`}>
                <Icon size={16} strokeWidth={1.5} className={meta.iconColor} />
              </div>

              {/* Title + meta */}
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span className="text-base text-text-primary truncate">
                  {meta.label}{s.category ? ` · ${s.category}` : ''}
                </span>
                <span className="text-xs text-text-muted">
                  {s.date} · {s.wordCount} words
                </span>
              </div>

              {/* Progress bar + accuracy */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-16 h-1 rounded-full bg-nav-active/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${colors.bar}`}
                    style={{ width: `${s.accuracy}%` }}
                  />
                </div>
                <span className={`text-sm font-medium w-9 text-right ${colors.text}`}>
                  {s.accuracy}%
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
