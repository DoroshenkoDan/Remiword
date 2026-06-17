'use client'

/**
 * Desktop-only left panel showing live session stats and an exit button.
 * Used in flashcard, choice, and spelling sessions.
 */

import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface SessionStatsPanelProps {
  correct: number
  wrong: number
  skipped: number
  remaining: number
  currentIndex: number
}

export function SessionStatsPanel({
  correct,
  wrong,
  skipped,
  remaining,
  currentIndex,
}: SessionStatsPanelProps) {
  const accuracy = currentIndex > 0 ? Math.round((correct / currentIndex) * 100) : 0
  const router = useRouter()
  return (
    <div className="hidden md:flex flex-col w-[200px] shrink-0 border-r border-border px-4 py-5 gap-4">
      <span className="text-2xs font-semibold text-text-muted tracking-[0.08em]">SESSION</span>

      <div className="flex flex-col gap-3">
        <StatRow label="Correct" value={correct} color="text-success" />
        <StatRow label="Wrong" value={wrong} color="text-error" />
        <StatRow label="Skipped" value={skipped} color="text-text-muted" />
        <StatRow label="Remaining" value={remaining} color="text-text-primary" />
      </div>

      {currentIndex > 0 && (
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-muted">Accuracy</span>
            <span className="text-xs text-text-primary">{accuracy}%</span>
          </div>
          <div className="h-1 rounded-full bg-surface border border-border overflow-hidden">
            <div
              className="h-full bg-success rounded-full transition-all"
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>
      )}

      <button
        onClick={() => router.push('/quiz')}
        className="mt-auto flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-error bg-error/10 border border-error/30 cursor-pointer hover:bg-error/20 transition-colors"
      >
        <X size={14} strokeWidth={1.5} />
        Exit session
      </button>
    </div>
  )
}

function StatRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text-muted">{label}</span>
      <span className={cn('text-md font-semibold', color)}>{value}</span>
    </div>
  )
}
