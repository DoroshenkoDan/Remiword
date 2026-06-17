'use client'

/**
 * Stats row — Due today, Day streak, Last session accuracy (desktop only).
 */
// TODO: Rewrite component
import { cn } from '@/lib/utils'

interface QuizStatsProps {
  sessionsToday: number
  streak: number
  accuracy: number | null
}

export function QuizStats({ sessionsToday, streak, accuracy }: QuizStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <StatCard value={String(sessionsToday)} label="All quizzes today" />
      <StatCard value={`🔥 ${streak}`} label="Day streak" />
      <StatCard value={accuracy !== null ? `${accuracy}%` : '—'} label="Last session accuracy" className="hidden md:flex" />
    </div>
  )
}

function StatCard({ value, label, className }: { value: string; label: string; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-1 px-4 py-4 rounded-lg bg-surface border border-border', className)}>
      <span className="text-xl xl:text-[28px] font-bold text-text-primary leading-none">{value}</span>
      <span className="text-sm text-text-muted mt-1">{label}</span>
    </div>
  )
}
