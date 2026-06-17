'use client'

/**
 * Mobile-only footer shown at the bottom of the quiz setup screen.
 * Displays a summary line and the "Start session" button.
 */

import { Zap } from 'lucide-react'
import type { Mode } from './QuizModeSelector'

interface QuizMobileFooterProps {
  mode: Mode
  category: string
  quizCount: number
  onStart: () => void
}

export function QuizMobileFooter({ mode, category, quizCount, onStart }: QuizMobileFooterProps) {
  const estTime = Math.max(1, Math.ceil(quizCount * 0.4))
  return (
    <div className="md:hidden flex flex-col gap-3 mt-auto pt-2">
      <div className="h-px bg-border" />
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-secondary capitalize">{mode}</span>
        <span className="text-xs text-text-muted">{`${category} · ${quizCount} words · ${estTime} minutes`}</span>
      </div>
      <button
        onClick={onStart}
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-primary text-text-primary text-lg font-semibold cursor-pointer border-none hover:opacity-80 transition-opacity"
      >
        <Zap size={16} strokeWidth={1.5} />
        Start session →
      </button>
    </div>
  )
}
