'use client'

/**
 * Flashcard component with CSS 3D flip animation.
 * Front shows the word; back shows the translation after tap/click.
 */

import { cn } from '@/lib/utils'

interface FlashCardProps {
  word: string
  translation: string
  transcription?: string
  category?: string
  isFlipped: boolean
  onFlip: () => void
}

export function FlashCard({ word, translation, transcription, category, isFlipped, onFlip }: FlashCardProps) {
  return (
    <div
      className="relative w-full cursor-pointer select-none"
      style={{ perspective: 1000, minHeight: 280 }}
      onClick={onFlip}
    >
      <div
        className="relative w-full h-full transition-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.4s ease',
          minHeight: 280,
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-[16px] p-8"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: '#1C2340',
            border: '0.5px solid rgba(129,140,248,0.2)',
          }}
        >
          <span
            className="absolute top-4 left-4 text-[11px]"
            style={{ color: '#334068', fontWeight: 400 }}
          >
            EN → UA
          </span>

          <div className="flex flex-col items-center gap-2">
            <span style={{ fontSize: 32, fontWeight: 500, color: '#EEF2FF', textAlign: 'center' }}>
              {word}
            </span>
            {transcription && (
              <span style={{ fontSize: 13, fontWeight: 400, color: '#334068' }}>
                {transcription}
              </span>
            )}
          </div>

          <span
            className="absolute bottom-5"
            style={{ fontSize: 12, color: '#334068' }}
          >
            Tap to reveal
          </span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-[16px] p-8"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#1C2340',
            border: '0.5px solid rgba(129,140,248,0.2)',
          }}
        >
          <span
            className="absolute top-4 left-4 text-[11px]"
            style={{ color: '#334068', fontWeight: 400 }}
          >
            EN → UA
          </span>

          <span style={{ fontSize: 22, fontWeight: 500, color: '#93C5FD', textAlign: 'center' }}>
            {translation}
          </span>

          {category && (
            <span
              className="absolute bottom-5"
              style={{ fontSize: 11, color: '#334068' }}
            >
              {category}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
