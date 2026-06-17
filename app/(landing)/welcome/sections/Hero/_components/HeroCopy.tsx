'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const heading: Variants = {
  hidden: { opacity: 0.1, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export function HeroCopy() {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 lg:items-start xl:gap-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
      }}
    >
      {/* Badge */}
      <motion.div
        variants={item}
        className="flex items-center gap-1.5 px-3.75 py-1.75 rounded-full bg-primary/15 border border-badge-business-text/30"
      >
        <div className="size-1.5 rounded-full bg-badge-business-text" />
        <span className="text-[11px] font-normal text-badge-business-text uppercase tracking-[1.32px]">
          Made for language learners
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={heading}
        className="text-[32px] font-medium text-text-primary leading-[1.2] text-center lg:text-left xl:text-[56px] xl:leading-[1.15]"
      >
        Learn English
        <br />
        at your pace
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={item}
        className="text-md text-text-secondary leading-[1.6] text-center lg:text-left lg:max-w-md xl:text-lg xl:max-w-lg"
      >
        Add words from your tutor, practice with smart quizzes and never forget what you learned.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={item}
        className="flex flex-col items-stretch w-full gap-2.5 pt-4 lg:flex-row lg:items-center lg:w-auto"
      >
        <Link
          href="/register"
          className="flex items-center justify-center gap-2 h-12.5 bg-primary hover:bg-primary/90 text-text-primary text-[15px] font-medium rounded-[14px] transition-colors md:px-8"
        >
          Get started for free
          <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
        <Link
          href="/login"
          className="flex items-center justify-center h-12 border border-nav-active/30 hover:border-nav-active/60 text-nav-active text-md font-medium rounded-[14px] transition-colors md:px-7"
        >
          Sign in<span className="lg:hidden"> to your account</span>
        </Link>
      </motion.div>
    </motion.div>
  )
}
