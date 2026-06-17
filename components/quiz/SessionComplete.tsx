'use client'

/**
 * Full-screen "Session complete" screen shown after all cards are rated.
 */
import { CircleCheck, CircleX, CircleArrowRight, Balloon } from 'lucide-react'
interface SessionCompleteProps {
  correct: number
  wrong: number
  skipped: number
  onBack: () => void
}

export function SessionComplete({ correct, wrong, skipped, onBack }: SessionCompleteProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100dvh-56px)] md:h-screen pt-14 md:pt-0 pb-15 md:pb-0 gap-4 px-4">
      <span className="text-xl font-semibold text-text-primary flex items-center gap-2"><Balloon size={24} className='text-primary' />Session complete!<Balloon size={24} className='text-primary' /></span>
      <div className="flex gap-6 mt-2">
        <span className="text-md text-success flex items-center gap-1.5"><CircleCheck />{correct} correct</span>
        <span className="text-md text-error flex items-center gap-1.5"><CircleX /> {wrong} wrong</span>
        <span className="text-md text-text-muted flex items-center gap-1.5"><CircleArrowRight /> {skipped} skipped</span>
      </div>
      <button
        onClick={onBack}
        className="mt-4 px-6 py-3 rounded-lg bg-primary text-text-primary text-md font-medium cursor-pointer border-none hover:opacity-80 transition-opacity"
      >
        Back to Quiz
      </button>
    </div>
  )
}
