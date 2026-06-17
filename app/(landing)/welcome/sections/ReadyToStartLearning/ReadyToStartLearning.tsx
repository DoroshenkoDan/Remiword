'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SectionWrapper, itemVariants } from '../../_components/SectionWrapper'

export function ReadyToStartLearning() {
  return (
    <SectionWrapper id="ready-to-start">
      <div className="flex flex-col items-center gap-1.75 max-w-sm mx-auto md:max-w-2xl">
        <motion.h2
          className="text-[22px] font-medium text-text-primary leading-8.25 text-center md:text-[32px] md:leading-tight xl:text-[36px] xl:leading-13.5"
          variants={itemVariants}
        >
          <span className="md:hidden">Ready to start?</span>
          <span className="hidden md:inline">Ready to start learning?</span>
        </motion.h2>

        <motion.p
          className="text-md text-text-secondary leading-[22.4px] text-center md:text-[15px] md:leading-6"
          variants={itemVariants}
        >
          <span className="md:hidden">Join for free and start building your vocabulary today.</span>
          <span className="hidden md:inline">Join for free — no credit card, no commitment.</span>
        </motion.p>

        <motion.div
          className="flex flex-col gap-4.5 w-full pt-4 md:flex-row md:justify-center md:gap-3 md:w-auto"
          variants={itemVariants}
        >
          <Link
            href="/register"
            className="flex items-center justify-center gap-2 h-12.5 w-full bg-primary rounded-[14px] text-[15px] font-medium text-text-primary transition-opacity hover:opacity-90 md:h-13 md:px-10 md:w-auto"
          >
            Create free account
            <span className="hidden md:inline">→</span>
          </Link>

          <Link
            href="/login"
            className="flex items-center justify-center h-11.5 w-full rounded-[14px] border border-nav-active/30 text-md font-medium text-nav-active transition-opacity hover:opacity-80 md:h-13 md:px-8 md:w-auto md:text-[15px]"
          >
            <span className="md:hidden">Sign in to your account</span>
            <span className="hidden md:inline">Sign in</span>
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
