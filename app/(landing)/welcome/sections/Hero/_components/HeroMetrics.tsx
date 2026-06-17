'use client'

import { motion, type Variants } from 'framer-motion'
import { Target, TrendingUp, Send } from 'lucide-react'

const metrics = [
  { icon: Target,     label: 'Quiz modes',     description: '3 modes to practice' },
  { icon: TrendingUp, label: 'Track progress', description: 'Streaks & stats' },
  { icon: Send,       label: 'Reminders',      description: 'Daily in Telegram' },
]

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.4,
      ease: 'easeOut',
      staggerChildren: 0.12,
      delayChildren: 0.35,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export function HeroMetrics() {
  return (
    <motion.div
      className="flex flex-col gap-4 p-4.25 bg-surface border border-nav-active/15 rounded-[14px] lg:flex-row lg:items-start lg:gap-8 lg:pt-6 lg:p-0 lg:bg-transparent lg:border-0 lg:rounded-none xl:gap-12 xl:pt-8"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {metrics.map(({ icon: Icon, label, description }) => (
        <motion.div key={label} variants={item} className="flex items-center gap-3 xl:gap-4">
          <div className="flex items-center justify-center size-10 xl:size-12 rounded-[10px] xl:rounded-[12px] bg-primary/15 shrink-0">
            <Icon size={20} strokeWidth={1.5} className="text-badge-business-text xl:hidden" />
            <Icon size={24} strokeWidth={1.5} className="text-badge-business-text hidden xl:block" />
          </div>
          <div className="flex flex-col">
            <span className="text-md xl:text-lg font-medium text-text-primary leading-5 xl:leading-6">
              {label}
            </span>
            <span className="text-[12px] xl:text-sm text-text-secondary leading-4 xl:leading-5">
              {description}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
