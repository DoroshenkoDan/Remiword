'use client'

/**
 * 4-option answer grid. Highlights correct/wrong after the user selects.
 */

import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const OPTION_LABELS = ['A', 'B', 'C', 'D']

interface ChoiceOptionsProps {
  options: string[]
  selected: number | null
  correctOption: number
  answered: boolean
  onSelect: (index: number) => void
}

export function ChoiceOptions({ options, selected, correctOption, answered, onSelect }: ChoiceOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {options.map((option, i) => {
        const isSelected      = selected === i
        const isCorrectOption = i === correctOption

        let style      = 'bg-surface border-border text-text-primary'
        let labelStyle = 'bg-nav-inactive/20 text-text-muted'
        let icon: React.ReactNode = null

        if (answered) {
          if (isCorrectOption) {
            style      = 'bg-success/15 border-success/40 text-success'
            labelStyle = 'bg-success text-white'
            icon       = <CheckCircle2 size={16} strokeWidth={1.5} className="text-success shrink-0" />
          } else if (isSelected) {
            style      = 'bg-error/15 border-error/40 text-error'
            labelStyle = 'bg-error text-white'
            icon       = <XCircle size={16} strokeWidth={1.5} className="text-error shrink-0" />
          } else {
            style = 'bg-surface border-border text-text-muted opacity-40'
          }
        }

        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            disabled={answered}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left w-full cursor-pointer',
              style,
              !answered && 'hover:border-nav-active/40 hover:bg-nav-active/5'
            )}
          >
            <span className={cn(
              'flex items-center justify-center w-6 h-6 rounded-sm text-xs font-semibold shrink-0 transition-colors',
              labelStyle
            )}>
              {OPTION_LABELS[i]}
            </span>
            <span className="flex-1 text-base leading-snug">{option}</span>
            {icon}
          </button>
        )
      })}
    </div>
  )
}
