/**
 * Common mistakes block — shows wrong/correct pairs with an explanation note.
 */

import { TriangleAlert, CircleCheck, CircleX } from 'lucide-react'
import type { Mistake } from '@/content/types'

interface MistakesBlockProps {
  mistakes: Mistake[]
}

export function MistakesBlock({ mistakes }: MistakesBlockProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5">
        <TriangleAlert size={16} strokeWidth={1.5} className="text-error shrink-0" />
        <span className="text-2xs font-semibold text-error tracking-[0.08em]">COMMON MISTAKES</span>
      </div>
      <div className="flex flex-col gap-4">
        {mistakes.map((m, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <CircleX size={12} className='text-error shrink-0' />
              <span className="text-sm text-error/60 line-through">{m.wrong}</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheck size={12} className='text-success shrink-0' />
              <span className="text-sm text-success">{m.correct}</span>
            </div>
            <p className="text-xs text-text-muted bg-nav-active/5 rounded-sm px-2.5 py-1 mt-0.5">
              {m.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
