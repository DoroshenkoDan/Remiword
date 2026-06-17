'use client'

/**
 * Multiple choice quiz component with 4 options.
 * Shows correct/wrong feedback and auto-advances after 1500ms.
 */

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface MultipleChoiceProps {
  word: string
  options: string[]
  correctIndex: number
  onAnswer: (isCorrect: boolean) => void
}

type AnswerState = 'idle' | 'correct' | 'wrong'

const LETTER_LABELS = ['A', 'B', 'C', 'D']

export function MultipleChoice({ word, options, correctIndex, onAnswer }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    setSelected(null)
  }, [word])

  const handleSelect = (index: number) => {
    if (selected !== null) return
    setSelected(index)
    const isCorrect = index === correctIndex
    setTimeout(() => onAnswer(isCorrect), 1500)
  }

  const getOptionState = (index: number): AnswerState => {
    if (selected === null) return 'idle'
    if (index === correctIndex) return 'correct'
    if (index === selected) return 'wrong'
    return 'idle'
  }

  const optionStyles: Record<AnswerState, { bg: string; border: string; color: string; badge: string }> = {
    idle: {
      bg: '#1C2340',
      border: 'rgba(129,140,248,0.2)',
      color: '#EEF2FF',
      badge: 'rgba(129,140,248,0.1)',
    },
    correct: {
      bg: 'rgba(16,185,129,0.1)',
      border: '#10B981',
      color: '#34D399',
      badge: 'rgba(16,185,129,0.2)',
    },
    wrong: {
      bg: 'rgba(239,68,68,0.1)',
      border: '#EF4444',
      color: '#F87171',
      badge: 'rgba(239,68,68,0.2)',
    },
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Question card */}
      <div
        className="flex items-center justify-center rounded-[16px] p-8"
        style={{ background: '#1C2340', border: '0.5px solid rgba(129,140,248,0.2)', minHeight: 140 }}
      >
        <span style={{ fontSize: 34, fontWeight: 500, color: '#EEF2FF', textAlign: 'center' }}>
          {word}
        </span>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {options.map((option, index) => {
          const state = getOptionState(index)
          const styles = optionStyles[selected !== null && state === 'idle' ? 'idle' : state]
          const isDimmed = selected !== null && state === 'idle' && index !== correctIndex

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={selected !== null}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-[12px] text-left transition-all',
                isDimmed && 'opacity-40'
              )}
              style={{
                background: styles.bg,
                border: `0.5px solid ${styles.border}`,
                cursor: selected !== null ? 'default' : 'pointer',
              }}
            >
              {/* Letter badge */}
              <div
                className="flex items-center justify-center rounded-[6px] shrink-0"
                style={{
                  width: 24,
                  height: 24,
                  background: styles.badge,
                  fontSize: 11,
                  fontWeight: 600,
                  color: styles.color,
                }}
              >
                {state === 'correct' ? '✓' : state === 'wrong' ? '✗' : LETTER_LABELS[index]}
              </div>

              <span style={{ fontSize: 14, color: styles.color, fontWeight: 400 }}>
                {option}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
