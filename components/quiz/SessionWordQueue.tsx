'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { SESSION_RESULT_DOT, type SessionResult } from './sessionTypes'
import { ScrambleText, type ScrambleState } from './ScrambleText'

const SPEED = 50

interface SessionWordQueueProps {
  words: Array<{ word: string }>
  currentIndex: number
  results: Record<number, SessionResult>
}

export function SessionWordQueue({ words, currentIndex, results }: SessionWordQueueProps) {
  const [revealingIndex, setRevealingIndex] = useState<number | null>(null)
  const prevIndexRef = useRef(currentIndex)

  useEffect(() => {
    const prev = prevIndexRef.current
    prevIndexRef.current = currentIndex

    if (currentIndex <= prev) return

    const wordLen = words[prev]?.word.length ?? 8
    setRevealingIndex(prev)

    // 2 * len * speed = total animation duration + buffer
    const timer = setTimeout(
      () => setRevealingIndex(null),
      (2 * wordLen + 2) * SPEED + 200
    )
    return () => clearTimeout(timer)
  }, [currentIndex, words])

  function getScrambleState(i: number): ScrambleState {
    if (i === revealingIndex) return 'revealing'
    if (i < currentIndex) return 'revealed'
    return 'scrambled'
  }

  return (
    <ScrollArea className="hidden md:flex flex-col w-[200px] shrink-0 border-l border-border px-4 py-5 gap-3 overflow-y-auto">
      <span className="text-2xs font-semibold text-text-muted tracking-[0.08em]">UP NEXT</span>

      {words.map((w, i) => {
        const result = results[i]
        const isCurrent = i === currentIndex
        const scrambleState = getScrambleState(i)
        return (
          <div
            key={i}
            className={cn(
              'flex items-center gap-2',
              i < currentIndex ? 'opacity-60' : isCurrent ? 'opacity-100' : 'opacity-40'
            )}
          >
            <div
              className={cn(
                'size-1.5 rounded-full shrink-0',
                result !== undefined
                  ? SESSION_RESULT_DOT[result]
                  : isCurrent
                    ? 'bg-primary'
                    : 'bg-nav-inactive'
              )}
            />
            <ScrambleText
              text={w.word}
              state={scrambleState}
              speed={SPEED}
              className={cn(
                'text-sm truncate font-mono',
                isCurrent ? 'text-text-primary font-medium' : 'text-text-secondary'
              )}
            />
          </div>
        )
      })}
    </ScrollArea>
  )
}
