'use client'

import { cn } from '@/lib/utils'

const FIXED_COUNTS = [10, 20, 30, 40] as const
export type WordCount = 10 | 20 | 30 | 40 | 'All'

export function defaultWordCount(total: number): WordCount {
  return ([40, 30, 20, 10] as const).find((c) => c <= total) ?? 'All'
}

interface QuizWordCountSelectorProps {
  total: number
  value: WordCount
  onChange: (count: WordCount) => void
}

export function QuizWordCountSelector({ total, value, onChange }: QuizWordCountSelectorProps) {
  const visibleCounts = FIXED_COUNTS.filter((c) => c <= total)
  const showAll = total > 0 && total < 40

  const chipClass = (active: boolean) => cn(
    'px-3.5 py-1.25 rounded-full text-xs font-medium transition-colors cursor-pointer border-none',
    active
      ? 'bg-primary text-text-primary'
      : 'bg-surface border border-nav-active/20 text-text-secondary hover:border-nav-active/40'
  )

  return (
    <div className="flex gap-2 flex-wrap">
      {visibleCounts.map((c) => (
        <button key={c} onClick={() => onChange(c)} className={chipClass(value === c)}>
          {c}
        </button>
      ))}
      {showAll && (
        <button onClick={() => onChange('All')} className={chipClass(value === 'All')}>
          All ({total})
        </button>
      )}
    </div>
  )
}
