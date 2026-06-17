'use client'

/**
 * Mobile-only session counters shown at the bottom of the main column.
 */

interface SessionMobileCountersProps {
  correct: number
  wrong: number
  skipped: number
}

export function SessionMobileCounters({ correct, wrong, skipped }: SessionMobileCountersProps) {
  return (
    <div className="md:hidden flex items-center justify-center gap-6 mt-auto py-2">
      <span className="text-sm text-success">✓ {correct}</span>
      <span className="text-sm text-error">✗ {wrong}</span>
      <span className="text-sm text-text-muted">→ {skipped}</span>
    </div>
  )
}
