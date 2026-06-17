'use client'

import { XCircle, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react'

type GameStatus = 'guessing' | 'correct' | 'failed'

interface SpellingFeedbackProps {
  gameStatus: GameStatus
  correctWord: string
  attemptsLeft: number
  isLast: boolean
  onNext: () => void
}

export function SpellingFeedback({ gameStatus, correctWord, attemptsLeft, isLast, onNext }: SpellingFeedbackProps) {
  if (gameStatus === 'guessing') {
    if (attemptsLeft === 1) {
      return (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-warning/10 border-warning/30">
          <AlertTriangle size={16} strokeWidth={1.5} className="text-warning shrink-0" />
          <span className="text-sm text-warning font-medium">Last attempt!</span>
        </div>
      )
    }
    return null
  }

  if (gameStatus === 'correct') {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-success/10 border-success/30">
          <CheckCircle2 size={16} strokeWidth={1.5} className="text-success shrink-0" />
          <span className="text-base font-medium text-success">Correct!</span>
        </div>
        <button
          onClick={onNext}
          className="flex items-center justify-center gap-1.5 w-full py-3.5 rounded-lg bg-primary text-text-primary text-md font-medium cursor-pointer border-none hover:opacity-80 transition-opacity"
        >
          {isLast ? 'Finish' : 'Next'}
          <ChevronRight size={15} strokeWidth={1.5} />
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-error/10 border-error/30">
        <XCircle size={16} strokeWidth={1.5} className="text-error shrink-0" />
        <span className="text-sm text-text-muted">
          The word was{' '}
          <span className="font-semibold text-text-primary">{correctWord}</span>
        </span>
      </div>
      <button
        onClick={onNext}
        className="flex items-center justify-center gap-1.5 w-full py-3.5 rounded-lg bg-primary text-text-primary text-md font-medium cursor-pointer border-none hover:opacity-80 transition-opacity"
      >
        {isLast ? 'Finish' : 'Next'}
        <ChevronRight size={15} strokeWidth={1.5} />
      </button>
    </div>
  )
}
