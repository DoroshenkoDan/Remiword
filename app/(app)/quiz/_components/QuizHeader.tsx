'use client'

/**
 * Page header for the Quiz start screen.
 * Desktop only — mobile uses the shared app Header.
 */

export function QuizHeader() {
  return (
    <header className="hidden md:flex items-center shrink-0 px-8 pt-5 pb-4 border-b border-border">
      <span className="text-lg xl:text-xl font-semibold text-text-primary">Quiz</span>
    </header>
  )
}
