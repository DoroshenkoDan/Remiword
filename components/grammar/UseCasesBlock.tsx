/**
 * "When to use" block — use cases with title and example sentence.
 */

import type { UseCase } from '@/content/types'

interface UseCasesBlockProps {
  useCases: UseCase[]
}

export function UseCasesBlock({ useCases }: UseCasesBlockProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-2xs font-semibold text-text-muted tracking-[0.08em]">WHEN TO USE</span>
      <div className="flex flex-col gap-3">
        {useCases.map((uc, i) => (
          <div key={i} className="flex gap-2.5">
            <div className="w-2 h-2 rounded-full bg-nav-active mt-1" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-text-primary">{uc.title}</span>
              <span className="text-xs text-text-secondary">{uc.example}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
