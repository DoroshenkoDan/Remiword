'use client'

/**
 * 4-button rating grid for flashcard review mode.
 * Each button represents a difficulty rating (0–3) and shows next review interval.
 */

type Rating = 0 | 1 | 2 | 3

interface RatingButtonsProps {
  onRate: (rating: Rating) => void
}

const RATINGS: {
  value: Rating
  label: string
  subtext: string
  bg: string
  border: string
  color: string
}[] = [
  {
    value: 0,
    label: "Didn't know",
    subtext: '→ Tomorrow',
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.3)',
    color: '#EF4444',
  },
  {
    value: 1,
    label: 'Hard',
    subtext: '→ 3 days',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.3)',
    color: '#F59E0B',
  },
  {
    value: 2,
    label: 'Good',
    subtext: '→ 7 days',
    bg: 'rgba(79,110,247,0.1)',
    border: 'rgba(79,110,247,0.3)',
    color: '#818CF8',
  },
  {
    value: 3,
    label: 'Easy',
    subtext: '→ 14 days',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.3)',
    color: '#10B981',
  },
]

export function RatingButtons({ onRate }: RatingButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {RATINGS.map(({ value, label, subtext, bg, border, color }) => (
        <button
          key={value}
          onClick={() => onRate(value)}
          className="flex flex-col items-center justify-center rounded-[12px] transition-opacity hover:opacity-80"
          style={{
            padding: 14,
            background: bg,
            border: `0.5px solid ${border}`,
            cursor: 'pointer',
            gap: 4,
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 500, color, fontFamily: 'var(--font-inter)' }}>
            {label}
          </span>
          <span style={{ fontSize: 11, color, opacity: 0.7 }}>
            {subtext}
          </span>
        </button>
      ))}
    </div>
  )
}
