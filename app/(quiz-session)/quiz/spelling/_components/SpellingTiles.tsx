'use client'

import { cn } from '@/lib/utils'

type LetterState = 'correct' | 'present' | 'absent' | 'empty' | 'typing'

const STATE_CLASSES: Record<LetterState, string> = {
  correct: 'border-success/70 bg-success/15 text-success',
  present: 'border-warning/70 bg-warning/15 text-warning',
  absent:  'border-nav-inactive/40 bg-nav-inactive/10 text-text-muted',
  empty:   'border-nav-active/20 bg-surface',
  typing:  'border-nav-active/50 bg-nav-active/10 text-text-primary',
}

function evaluateGuess(guess: string, target: string): LetterState[] {
  const g = guess.toLowerCase()
  const t = target.toLowerCase()
  const len = t.length
  const result: LetterState[] = new Array(len).fill('absent')
  const targetChars = t.split('')

  for (let i = 0; i < len; i++) {
    if (g[i] === targetChars[i]) {
      result[i] = 'correct'
      targetChars[i] = '\0'
    }
  }

  for (let i = 0; i < len; i++) {
    if (result[i] === 'correct') continue
    const idx = g[i] ? targetChars.indexOf(g[i]) : -1
    if (idx !== -1) {
      result[i] = 'present'
      targetChars[idx] = '\0'
    }
  }

  return result
}

interface SpellingTilesProps {
  word: string
  currentGuess: string
  attempts: string[]
}

export function SpellingTiles({ word, currentGuess, attempts }: SpellingTilesProps) {
  const lastAttempt = attempts[attempts.length - 1]
  const displayGuess = currentGuess || lastAttempt || ''
  const isEvaluated = !currentGuess && attempts.length > 0
  const states = isEvaluated ? evaluateGuess(displayGuess, word) : null

  const len = word.length
  const tileSize = len <= 5 ? 'w-14 h-14 text-xl' : len <= 8 ? 'w-11 h-11 text-lg' : 'w-9 h-9 text-sm'
  const gap = len <= 8 ? 'gap-2' : 'gap-1'

  return (
    <div className={cn('flex justify-center', gap)}>
      {Array.from({ length: len }, (_, i) => {
        const char = displayGuess[i] ?? ''
        const state: LetterState = isEvaluated
          ? (states?.[i] ?? 'absent')
          : char ? 'typing' : 'empty'
        return (
          <div
            key={i}
            className={cn(
              'flex items-center justify-center rounded-md border font-bold uppercase transition-colors',
              tileSize,
              STATE_CLASSES[state],
            )}
          >
            {char.toUpperCase()}
          </div>
        )
      })}
    </div>
  )
}
