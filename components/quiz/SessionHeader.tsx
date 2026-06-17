'use client'

/**
 * Shared header for quiz session pages (flashcard, choice, spelling).
 * Mobile: back button on the left, skip on the right.
 * Desktop: title on the left, skip on the right, progress count centered.
 */

import { X, ChevronRight } from 'lucide-react'

interface SessionHeaderProps {
  title: string
  currentIndex: number
  total: number
  onExit: () => void
  onSkip: () => void
}
// TODO: change exit path
export function SessionHeader({ title, currentIndex, total, onExit, onSkip }: SessionHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 md:px-6 h-14 shrink-0 border-b border-border">

      {/* Mobile: back button */}
      <button
        onClick={onExit}
        className="md:hidden flex items-center justify-center w-8 h-8 rounded-md bg-transparent border-none cursor-pointer text-text-muted hover:text-text-primary transition-colors"
      >
        <X size={18} strokeWidth={1.5} />
      </button>

      {/* Desktop: session title */}
      <span className="hidden md:block text-xl font-semibold text-text-primary">{title}</span>

      {/* Center: progress count */}
      <span className="text-base font-medium text-text-muted md:absolute md:left-1/2 md:-translate-x-1/2">
        {currentIndex + 1} / {total}
      </span>

      {/* Skip button*/}
      <button
        onClick={onSkip}
        className="flex items-center gap-1 text-base text-text-secondary bg-transparent border-none cursor-pointer hover:text-text-primary transition-colors"
      >
        Skip
        <ChevronRight size={14} strokeWidth={1.5} />
      </button>

    </header>
  )
}
