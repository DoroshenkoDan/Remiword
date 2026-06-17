'use client'

import { motion, type Variants } from 'framer-motion'
import { Layers, LayoutGrid, PenLine, Tag, BookOpen, Flame } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const features: {
  icon: LucideIcon
  title: string
  mobileTitle?: string
  description: string
  mobileDesc: string
}[] = [
    {
      icon: Layers,
      title: 'Flashcards',
      description: 'Flip cards and rate yourself. SM-2 algorithm schedules reviews.',
      mobileDesc: 'Flip and rate yourself',
    },
    {
      icon: LayoutGrid,
      title: 'Multiple choice',
      description: 'Pick from 4 options. Auto-advance keeps the session moving.',
      mobileDesc: 'Pick the right answer',
    },
    {
      icon: PenLine,
      title: 'Spelling',
      description: 'Type the word from memory. Smart typo detection catches near-misses.',
      mobileDesc: 'Type from memory',
    },
    {
      icon: Tag,
      title: 'Organize by collections',
      description: 'Tag words by topic — Business, Travel, Tutor — and practice them separately.',
      mobileDesc: 'Tag words by topic',
    },
    {
      icon: BookOpen,
      title: 'Grammar reference',
      mobileTitle: 'Grammar guide',
      description: 'Tenses, conditionals, modal verbs. Clean reference — no fluff.',
      mobileDesc: 'Tenses and more',
    },
    {
      icon: Flame,
      title: 'Streak & progress',
      mobileTitle: 'Streaks',
      description: 'Daily streak, accuracy tracking and word mastery heatmap.',
      mobileDesc: 'Build a daily habit',
    },
  ]

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const card: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function FeatureGridMotion() {
  return (
    <motion.div
      className="flex flex-col gap-4 lg:gap-7.75 lg:items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {/* Heading */}
      <motion.div variants={headingVariant} className="flex flex-col items-center gap-2">
        <h2 className="text-[18px] lg:text-[32px] font-medium text-text-primary leading-7 lg:leading-[1.56] text-center">
          <span className="inline">Everything you need to learn</span>
        </h2>
        <p className="block text-[15px] text-text-secondary leading-normal text-center">
          Six powerful tools in one app
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 lg:gap-4 w-full">
        {features.map(({ icon: Icon, title, mobileTitle, description, mobileDesc }) => (
          <motion.div
            key={title}
            variants={card}
            className="backdrop-blur-md bg-white/[0.07] border border-white/10 rounded-[14px] shadow-[0_4px_24px_rgba(0,0,0,0.2)] p-3.75 lg:p-6.25 flex flex-col gap-0.5 lg:gap-1.5"
          >
            <div className="size-8 lg:size-10 rounded-[10px] bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
              <Icon size={16} strokeWidth={1.5} className="text-badge-business-text lg:hidden" />
              <Icon size={20} strokeWidth={1.5} className="text-badge-business-text hidden lg:block" />
            </div>
            <span className="text-base lg:text-[15px] xl:text-[20px] font-medium text-text-primary pt-1.75 leading-normal">
              {mobileTitle ? (
                <>
                  <span className="lg:hidden">{mobileTitle}</span>
                  <span className="hidden lg:inline">{title}</span>
                </>
              ) : title}
            </span>
            <span className="text-xs lg:text-base xl:text-[15px] text-text-secondary leading-[1.6]">
              <span className="lg:hidden">{mobileDesc}</span>
              <span className="hidden lg:inline">{description}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
