/**
 * Formula block for tense grammar topics.
 * Shows positive / negative / question rows with numbered colored badges.
 */

import type { TensesFormula } from '@/content/types'

interface TensesFormulaBlockProps {
  formula: TensesFormula[]
}

const FORMULA_STYLE: Record<TensesFormula['type'], { num: string; row: string; symbol: string }> = {
  positive: { num: 'bg-success/15 text-success', row: 'bg-success/5', symbol: '+' },
  negative: { num: 'bg-error/15 text-error', row: 'bg-error/5', symbol: '−' },
  question: { num: 'bg-nav-active/15 text-nav-active', row: 'bg-nav-active/5', symbol: '?' },
}

export function TensesFormulaBlock({ formula }: TensesFormulaBlockProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-2xs font-semibold text-text-muted tracking-[0.08em]">FORMULA</span>
      <div className="flex flex-col gap-1.5">
        {formula.map((row) => {
          const s = FORMULA_STYLE[row.type]
          return (
            <div key={row.type} className='flex items-center gap-3'>
              <span className={`size-6 flex items-center justify-center rounded text-xs font-semibold shrink-0 ${s.num}`}>
                {s.symbol}
              </span>
              <div className={`px-3 py-2.5 rounded-lg ${s.row} w-full`}>
                <span className="text-sm text-text-primary font-mono">{row.formula}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
