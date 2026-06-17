'use client'

/**
 * Flashcard with an integrated rating section.
 * Front: shows the word and a tap-to-reveal prompt.
 * Revealed: shows word + translation, then the 4 rating buttons below.
 */

import { useState } from 'react'
import { XCircle, MinusCircle, CheckCircle, CheckCircle2, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Rating = 0 | 1 | 2 | 3

interface RatingOption {
  value: Rating
  label: string
  subtext: string
  icon: LucideIcon
  bg: string
  border: string
  color: string
}

const RATINGS: RatingOption[] = [
  {
    value: 0,
    label: "Didn't know",
    subtext: '→ Tomorrow',
    icon: XCircle,
    bg: 'bg-error/10',
    border: 'border-error/30',
    color: 'text-error',
  },
  {
    value: 1,
    label: 'Hard',
    subtext: '+3 days',
    icon: MinusCircle,
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    color: 'text-warning',
  },
  {
    value: 2,
    label: 'Good',
    subtext: '+7 days',
    icon: CheckCircle,
    bg: 'bg-nav-active/10',
    border: 'border-nav-active/30',
    color: 'text-nav-active',
  },
  {
    value: 3,
    label: 'Easy',
    subtext: '+14 days',
    icon: CheckCircle2,
    bg: 'bg-success/10',
    border: 'border-success/30',
    color: 'text-success',
  },
]

interface SessionCardProps {
  word: string
  translation: string
  onRate: (rating: Rating) => void
}

export function SessionCard({ word, translation, onRate }: SessionCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  return (
    <div className="flex flex-col gap-3">

      {/* Card face */}
      <div className="relative w-full rounded-xl bg-surface border border-nav-active/20 overflow-hidden flex flex-col items-center justify-center min-h-40 md:min-h-50">
        {!isFlipped ? (
          <button
            onClick={() => setIsFlipped(true)}
            className="flex flex-col items-center justify-center w-full h-full min-h-40 px-8 py-5 cursor-pointer bg-transparent border-none gap-3"
          >
            <span className="absolute top-4 left-4 text-xs text-text-muted">EN - UA</span>
            <span className="text-[32px] font-medium text-text-primary text-center leading-tight">{word}</span>
            <span className="absolute bottom-5 text-sm text-text-muted">Tap to reveal</span>
          </button>
        ) : (
          <div className="flex flex-col items-center justify-center w-full min-h-[120px] px-8 py-6 gap-2">
            <span className="text-[24px] font-medium text-text-primary text-center leading-tight">{word}</span>
            <span className="text-2xs font-semibold text-text-muted tracking-[0.08em] mt-1">TRANSLATE</span>
            <span className="text-[20px] font-medium text-text-secondary text-center">{translation}</span>
          </div>
        )}
      </div>

      {/* Rating */}
      {isFlipped ? (
        <>
          <span className="text-xs text-text-muted text-center">How well did you know it?</span>
          <div className="grid grid-cols-2 gap-2">
            {RATINGS.map(({ value, label, subtext, icon: Icon, bg, border, color }) => (
              <button
                key={value}
                onClick={() => onRate(value)}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 py-3 rounded-lg border transition-opacity hover:opacity-80 cursor-pointer',
                  bg, border
                )}
              >
                <Icon size={16} strokeWidth={1.5} className={color} />
                <span className={cn('text-sm font-medium', color)}>{label}</span>
                <span className={cn('text-2xs opacity-70', color)}>{subtext}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-xs text-text-muted text-center">Tap the card to reveal translation</p>
      )}

    </div>
  )
}
