'use client'

/**
 * Desktop-only page header — "My Words" title + word/due counts.
 * The "+ Add words" button is rendered separately via AddWordsButton (fixed positioned).
 */

interface WordsHeaderProps {
  totalCount: number
}

export function WordsHeader({ totalCount }: WordsHeaderProps) {
  return (
    <div className="hidden md:block px-8 pt-5 pb-4 border-b border-border">
      <h1 className="text-lg xl:text-xl font-semibold text-text-primary leading-tight">My Words</h1>
      <p className="text-base text-text-muted mt-0.5">
        {totalCount} words in total
      </p>
    </div>
  )
}
