'use client'

/**
 * Session progress bar showing current position in a quiz modes session.
 */

import { Progress } from '@base-ui/react/progress'

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <Progress.Root value={percentage} aria-valuetext={`${percentage}%`} className="w-full">
      <Progress.Track className="h-px w-full bg-border-subtle overflow-hidden rounded-none">
        <Progress.Indicator
          className="h-full bg-primary transition-all duration-300 rounded-none"
          style={{ width: `${percentage}%` }}
        />
      </Progress.Track>
    </Progress.Root>
  )
}
