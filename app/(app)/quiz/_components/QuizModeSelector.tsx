'use client'

/**
 * Mode selector — Flashcard / Multiple Choice / Spelling.
 * Each option shows an icon, title, subtitle, and a radio indicator.
 */

import { CreditCard, LayoutList, PenLine, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Mode = 'flashcard' | 'choice' | 'spelling'

interface ModeOption {
  id: Mode
  label: string
  subtitle: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

export const MODES: ModeOption[] = [
  {
    id: 'flashcard',
    label: 'Flashcard',
    subtitle: 'Flip cards, rate yourself',
    icon: CreditCard,
    iconBg: 'bg-primary/15',
    iconColor: 'text-primary',
  },
  {
    id: 'choice',
    label: 'Multiple Choice',
    subtitle: 'Pick from 4 options',
    icon: LayoutList,
    iconBg: 'bg-success/15',
    iconColor: 'text-success',
  },
  {
    id: 'spelling',
    label: 'Spelling',
    subtitle: 'Type from memory',
    icon: PenLine,
    iconBg: 'bg-warning/15',
    iconColor: 'text-warning',
  },
]

interface QuizModeSelectorProps {
  value: Mode
  onChange: (mode: Mode) => void
}

export function QuizModeSelector({ value, onChange }: QuizModeSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      {MODES.map(({ id, label, subtitle, icon: Icon, iconBg, iconColor }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={cn(
            'flex items-center gap-3 px-3 py-2 xl:px-4 xl:py-3.5 rounded-lg bg-surface border transition-colors cursor-pointer text-left w-full',
            value === id ? 'border-primary/50' : 'border-border hover:border-border-strong'
          )}
        >
          {/* Icon box */}
          <div className={cn('flex items-center justify-center w-9 h-9 rounded-md shrink-0', iconBg)}>
            <Icon size={18} strokeWidth={1.5} className={iconColor} />
          </div>

          {/* Labels */}
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-md font-medium text-text-primary">{label}</span>
            <span className="text-sm text-text-secondary">{subtitle}</span>
          </div>

          {/* Radio indicator */}
          <div
            className={cn(
              'w-[18px] h-[18px] rounded-full border-2 shrink-0 flex items-center justify-center transition-colors',
              value === id ? 'border-primary bg-primary' : 'border-nav-inactive bg-transparent'
            )}
          >
            {value === id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
          </div>
        </button>
      ))}
    </div>
  )
}
