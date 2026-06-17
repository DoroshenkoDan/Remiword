'use client'

import { motion } from 'framer-motion'

const filters = ['All', 'Tutor', 'Travel', 'Business']

const words = [
  { word: 'Resilience', translation: 'Стійкість', category: 'Business', dot: 'bg-warning' },
  { word: 'Acknowledge', translation: 'Визнавати', category: 'Tutor', dot: 'bg-success' },
  { word: 'Itinerary', translation: 'Маршрут', category: 'Travel', dot: 'bg-text-muted' },
]

const badgeStyles: Record<string, { bg: string; text: string }> = {
  Business: { bg: 'bg-badge-business', text: 'text-badge-business-text' },
  Tutor: { bg: 'bg-badge-tutor', text: 'text-badge-tutor-text' },
  Travel: { bg: 'bg-badge-travel', text: 'text-badge-travel-text' },
}

export function HeroUIPreview() {
  return (
    <motion.div
      className="hidden lg:flex flex-col gap-3 xl:gap-4 bg-surface border border-border rounded-2xl p-5.25 xl:p-7 w-full max-w-sm xl:max-w-md shrink-0"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-base xl:text-md font-medium text-text-primary">My Words</span>
        <span className="bg-primary rounded-full px-[10px] xl:px-3 py-1 xl:py-1.5 text-2xs xl:text-xs font-medium text-text-primary">
          + Add words
        </span>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1.5 xl:gap-2">
        {filters.map((f) => (
          <span
            key={f}
            className={
              f === 'All'
                ? 'bg-primary rounded-full px-3 xl:px-4 py-2 text-2xs xl:text-xs text-text-primary'
                : 'bg-surface border border-border rounded-full px-3 xl:px-4 py-2 text-2xs xl:text-xs text-text-muted'
            }
          >
            {f}
          </span>
        ))}
      </div>

      {/* Word list */}
      <div className="flex flex-col gap-1.5 xl:gap-2">
        {words.map(({ word, translation, category, dot }) => {
          const badge = badgeStyles[category]
          return (
            <div
              key={word}
              className="flex items-center justify-between bg-background border border-nav-active/15 rounded-[10px] px-[13px] xl:px-4 py-2.25 xl:py-3"
            >
              <div className="flex flex-col gap-0.5 xl:gap-1">
                <span className="text-sm xl:text-base font-medium text-text-primary">{word}</span>
                <span className="text-2xs xl:text-xs text-text-secondary pb-1">{translation}</span>
                <span className={`${badge.bg} ${badge.text} text-[8px] xl:text-2xs px-1.5 xl:px-2 py-0.5 rounded-full w-fit`}>
                  {category}
                </span>
              </div>
              <div className={`${dot} size-1.5 xl:size-2 rounded-full shrink-0`} />
            </div>
          )
        })}
      </div>

      {/* Start quiz button */}
      <div className="bg-primary rounded-[10px] py-[10px] xl:py-3 text-xs xl:text-sm font-medium text-text-primary text-center">
        Start quiz — 20 words ready
      </div>
    </motion.div>
  )
}
