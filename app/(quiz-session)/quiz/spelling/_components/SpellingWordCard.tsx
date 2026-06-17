'use client'

import { SpellingTiles } from './SpellingTiles'

interface SpellingWordCardProps {
  word: string
  translation: string
  currentGuess: string
  attempts: string[]
}

export function SpellingWordCard({ word, translation, currentGuess, attempts }: SpellingWordCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center gap-2 px-8 py-6 rounded-xl bg-surface border border-nav-active/20 min-h-30 md:min-h-40">
        <span className="text-xs text-text-muted">Type the English word</span>
        <span className="text-[28px] md:text-[34px] font-medium text-text-primary text-center leading-tight">
          {translation}
        </span>
        <span className="text-xs text-text-muted">{word.length} letters</span>
      </div>

      <SpellingTiles word={word} currentGuess={currentGuess} attempts={attempts} />
    </div>
  )
}
