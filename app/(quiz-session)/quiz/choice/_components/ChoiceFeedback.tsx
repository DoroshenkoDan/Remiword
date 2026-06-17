'use client'

/**
 * Feedback bar (Correct / Wrong) and Next/Finish button.
 * Rendered only after the user has selected an answer.
 */

import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChoiceFeedbackProps {
  isCorrect: boolean
  correctAnswer: string
  isLast: boolean
  onNext: () => void
}

export function ChoiceFeedback({ isCorrect, correctAnswer, isLast, onNext }: ChoiceFeedbackProps) {
  return (
    <div className='flex justify-between'>
      {/* Feedback bar */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg border',
        isCorrect ? 'bg-success/10 border-success/30' : 'bg-error/10 border-error/30'
      )}>
        {isCorrect
          ? <CheckCircle2 size={16} strokeWidth={1.5} className="text-success shrink-0" />
          : <XCircle size={16} strokeWidth={1.5} className="text-error shrink-0" />
        }
        <div className="flex flex-col">
          <span className={cn('text-base font-medium', isCorrect ? 'text-success' : 'text-error')}>
            {isCorrect ? 'Correct!' : 'Wrong answer'}
          </span>
          {!isCorrect && (
            <span className="text-xs text-text-muted">
              Correct answer: {correctAnswer}
            </span>
          )}
        </div>
      </div>

      {/* Next / Finish button */}
      <div className="mt-auto pt-2">
        <button
          onClick={onNext}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary text-text-primary text-base font-medium cursor-pointer border-none hover:opacity-80 transition-opacity"
        >
          {isLast ? 'Finish' : 'Next'}
          <ChevronRight size={15} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
