'use client'

import { cn } from '@/lib/utils'
import type { WordStatus } from '@/lib/supabase/words'

interface WordCardProps {
  word: string
  translation: string
  categoryName?: string
  categoryColor?: string
  status: WordStatus
  onClick?: () => void
}

const statusDot: Record<WordStatus, string> = {
  new:      'bg-nav-inactive',
  learning: 'bg-warning',
  mastered: 'bg-success',
}

export function WordCard({ word, translation, categoryName, categoryColor, status, onClick }: WordCardProps) {
  const color = categoryColor ?? '#4F6EF7'
  const badgeStyle = {
    backgroundColor: `${color}26`,
    color,
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center justify-between px-3.5 py-3 rounded-[12px] bg-surface border border-border hover:border-border-strong transition-colors',
        onClick && 'cursor-pointer'
      )}
    >
      <div className="flex flex-col gap-1 min-w-0">
        <span className="truncate text-[16px] font-medium text-text-primary">{word}</span>
        <span className="truncate text-[13px] text-text-secondary">{translation}</span>
        {categoryName && (
          <span style={badgeStyle} className="w-fit mt-0.5 px-2 py-0.5 rounded-full text-2xs font-medium">
            {categoryName}
          </span>
        )}
      </div>
      <div className={cn('w-2 h-2 rounded-full shrink-0 ml-4', statusDot[status])} title={status} />
    </div>
  )
}
