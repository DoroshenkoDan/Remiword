'use client'

import { motion } from 'framer-motion'

export function HowItWorksHeading() {
  return (
    <motion.div
      className="flex flex-col items-center gap-1 xl:gap-2"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <h2 className="text-[32px] font-medium text-text-primary text-center">
        How it works
      </h2>
      <p className="text-[15px] text-text-secondary text-center">
        Three steps to better vocabulary
      </p>
    </motion.div>
  )
}
