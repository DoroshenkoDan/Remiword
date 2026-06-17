'use client'

import { Fragment } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Plus, Brain, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: Plus,
    step: 'STEP 01',
    title: 'Add words',
    description: 'Paste a word list from your tutor or add words one by one.',
  },
  {
    icon: Brain,
    step: 'STEP 02',
    title: 'Practice daily',
    description: 'Choose flashcard, multiple choice or spelling — whatever suits you.',
  },
  {
    icon: Sparkles,
    step: 'STEP 03',
    title: 'Never forget',
    description: 'Spaced repetition schedules reviews exactly when you need them.',
  },
]

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const step: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export function StepsCardMotion() {
  return (
    <motion.div
      className="backdrop-blur-md bg-white/5 border border-white/10 rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.2)] flex flex-col gap-4 lg:gap-5 xl:gap-6 px-8.25 lg:px-8 xl:px-10 pt-8.25 lg:pt-8 xl:pt-16.5 pb-8.25 lg:pb-8 xl:pb-10 w-full lg:max-w-200 xl:max-w-215"
      variants={card}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {steps.map(({ icon: Icon, step: stepLabel, title, description }, i) => (
        <Fragment key={stepLabel}>
          {i > 0 && <motion.div variants={step} className="h-px bg-white/8" />}
          <motion.div variants={step} className="flex items-center gap-5">
            <div className="relative size-14 rounded-xl bg-background border border-primary/20 flex items-center justify-center shrink-0 overflow-hidden">
              <div className="absolute inset-0 bg-primary/15" />
              <Icon size={28} strokeWidth={1.5} className="relative text-badge-business-text" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-[1.32px] text-nav-active">
                {stepLabel}
              </span>
              <span className="text-[18px] xl:text-[20px] font-medium text-text-primary leading-7">
                {title}
              </span>
              <span className="text-md xl:text-[15px] text-text-secondary leading-[1.6]">
                {description}
              </span>
            </div>
          </motion.div>
        </Fragment>
      ))}
    </motion.div>
  )
}
