'use client'

import { Monitor, ShieldCheck, Send, TrendingUp, type LucideIcon } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { SectionWrapper, itemVariants } from '../../_components/SectionWrapper'

const cardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const benefits: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Monitor,
    title: 'Sync across all devices',
    description: 'Your words follow you everywhere. Switch between devices seamlessly.',
  },
  {
    icon: ShieldCheck,
    title: 'Never lose your progress',
    description: 'Local words disappear when you clear cache. Account keeps everything safe.',
  },
  {
    icon: Send,
    title: 'Daily Telegram reminders',
    description: 'Connect your bot and get words sent to you every morning automatically.',
  },
  {
    icon: TrendingUp,
    title: 'Track your progress',
    description: 'Streak calendar, accuracy stats and word mastery — all in one place.',
  },
]

export function WhyCreateAccount() {
  return (
    <SectionWrapper id="why-create-account">
      <motion.h2
        className="text-[18px] font-medium text-text-primary leading-7 mb-4 text-center md:text-[32px] md:leading-12.5 md:mb-3"
        variants={itemVariants}
      >
        Why create an account ?
      </motion.h2>

      <motion.p
        className="text-[15px] text-text-secondary leading-[22.5px] mb-8 text-center"
        variants={itemVariants}
      >
        Your words, your progress - always with you.
      </motion.p>

      <motion.div
        className="flex flex-col gap-2.5 md:grid md:grid-cols-2 md:gap-4"
        variants={cardContainerVariants}
      >
        {benefits.map((b) => {
          const Icon = b.icon
          return (
            <motion.div
              key={b.title}
              variants={cardVariants}
              className="flex items-start gap-3 p-3.75 rounded-[14px] backdrop-blur-md bg-white/[0.07] border border-white/10 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.2)] md:flex-col md:gap-3.5 md:p-6.25"
            >
              <div className="shrink-0 size-9.5 rounded-[10px] bg-primary/15 border border-primary/20 flex items-center justify-center md:size-11">
                <Icon size={20} strokeWidth={1.6} className="text-badge-business-text" />
              </div>
              <div className="flex flex-col gap-1 pt-px md:pt-0 md:gap-1.25">
                <p className="text-md font-medium text-text-primary leading-5 md:text-base md:leading-6 xl:text-[20px] xl:leading-7">{b.title}</p>
                <p className="text-[12px] text-text-secondary leading-4.5 md:text-[13px] md:leading-[20.8px] xl:text-[15px] xl:leading-[22.5px]">{b.description}</p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}
