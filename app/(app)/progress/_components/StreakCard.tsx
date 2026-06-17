import { Flame } from 'lucide-react'

interface StreakCardProps {
  streak: number
}

export function StreakCard({ streak }: StreakCardProps) {
  return (
    <div className="flex justify-between items-center gap-8 bg-surface border border-warning rounded-xl p-4 md:p-0 md:px-6 md:py-5">
      <div className="flex flex-col justify-between gap-1.5">
        <span className="text-sm text-text-secondary">Current streak</span>
        <span className="text-4xl font-medium leading-none text-warning">
          {streak} <span className="text-xl font-normal text-text-secondary">days</span>
        </span><span className="text-sm text-text-muted mt-1">Keep going — study today!</span>
      </div>
      <Flame strokeWidth={1.5} className="text-warning mb-1 size-9 md:size-12" />
    </div>
  )
}
