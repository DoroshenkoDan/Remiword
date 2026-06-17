/**
 * Forms block for modal verbs — 2×2 grid showing present/negative/past/past-negative.
 */

import { cn } from '@/lib/utils'
import type { ModalForm } from '@/content/types'

interface ModalFormsBlockProps {
  forms: ModalForm
}

const CELLS = [
  { label: 'Positive',      key: 'modal'        as const, valueClass: 'text-text-primary' },
  { label: 'Negative',      key: 'negative'     as const, valueClass: 'text-error' },
  { label: 'Past',          key: 'past'         as const, valueClass: 'text-text-secondary' },
  { label: 'Past negative', key: 'pastNegative' as const, valueClass: 'text-text-secondary' },
]

export function ModalFormsBlock({ forms }: ModalFormsBlockProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-2xs font-semibold text-text-muted tracking-[0.08em]">FORMS</span>
      <div className="grid grid-cols-2 gap-2">
        {CELLS.map(({ label, key, valueClass }) => {
          const value = forms[key]
          const isEmpty = value === '—'
          return (
            <div key={key} className="flex flex-col gap-1.5 bg-surface border border-border rounded-lg p-3">
              <span className="text-[10px] font-semibold text-text-muted tracking-[0.08em] uppercase">{label}</span>
              <span className={cn('text-base font-medium', valueClass, isEmpty && 'opacity-40')}>
                {value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
