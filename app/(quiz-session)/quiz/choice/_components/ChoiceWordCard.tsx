'use client'

/**
 * Word card showing the question prompt, the word to translate, and its category badge.
 */

interface ChoiceWordCardProps {
  word: string
  category: string
}

export function ChoiceWordCard({ word, category }: ChoiceWordCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-8 py-8 rounded-xl bg-surface border border-nav-active/20 min-h-[160px] md:min-h-[200px]">
      <span className="text-xs text-text-muted">What does this word mean?</span>
      <span className="text-[30px] md:text-[36px] font-medium text-text-primary text-center leading-tight">
        {word}
      </span>
      <span className="px-3 py-1 rounded-full bg-nav-active/10 border border-nav-active/20 text-xs text-nav-active font-medium">
        {category}
      </span>
    </div>
  )
}
