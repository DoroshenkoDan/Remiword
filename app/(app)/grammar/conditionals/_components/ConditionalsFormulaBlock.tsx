/**
 * Formula block for conditionals grammar topics.
 * Shows if-clause / main-clause rows with a realOrUnreal badge and example sentence.
 */

import type { ConditionalsFormula } from '@/content/types'

interface ConditionalsFormulaBlockProps {
  formula: ConditionalsFormula
  realOrUnreal: 'real' | 'unreal' | 'mixed'
}

const BADGE: Record<'real' | 'unreal' | 'mixed', { label: string; className: string }> = {
  real:   { label: 'Real situation',           className: 'bg-success/10 text-success' },
  unreal: { label: 'Unreal / Hypothetical',    className: 'bg-error/10 text-error' },
  mixed:  { label: 'Mixed time reference',     className: 'bg-warning/10 text-warning' },
}

const ROWS = [
  { label: 'If clause',   key: 'ifClause' as const },
  { label: 'Main clause', key: 'mainClause' as const },
]

export function ConditionalsFormulaBlock({ formula, realOrUnreal }: ConditionalsFormulaBlockProps) {
  const badge = BADGE[realOrUnreal]

  return (
    <div className="flex flex-col gap-3">
      <span className="text-2xs font-semibold text-text-muted tracking-[0.08em]">FORMULA</span>

      <div className="flex flex-col gap-2">
        {ROWS.map(({ label, key }) => (
          <div key={key} className="flex items-center gap-3">
            <span className="text-[11px] text-text-muted w-20 shrink-0">{label}</span>
            <div className="flex-1 bg-surface border border-border rounded-lg px-3.5 py-2.5">
              <span className="text-sm font-medium text-text-primary">{formula[key]}</span>
            </div>
          </div>
        ))}
      </div>

      <span className={`self-start px-3 py-1 rounded-full text-xs font-medium ${badge.className}`}>
        {badge.label}
      </span>

      <p className="text-[13px] text-text-secondary italic">
        <span className="text-text-muted not-italic">e.g. </span>
        {formula.example}
      </p>
    </div>
  )
}
