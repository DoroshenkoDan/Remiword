'use client'

import Link from 'next/link'
export function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 lg:h-14 flex items-center justify-between px-4 sm:px-8 lg:px-15 bg-background/80 backdrop-blur-md border-b border-white/6">
      <button onClick={() => document.getElementById('landing-scroll')?.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
        <div className="flex items-center justify-center size-9 rounded-[10px] bg-primary shrink-0 border border-white/6">
          <span className="text-lg font-medium text-text-primary">R</span>
        </div>
        <span className="text-[17px] font-medium text-text-primary tracking-[-0.3px]">Remiword</span>
      </button>

      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-[14px] font-medium text-nav-active px-4 sm:px-[21px] py-2 sm:py-[9px] rounded-[10px] border border-nav-active/30 hover:border-nav-active/60 transition-colors"
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="text-[14px] font-medium text-text-primary bg-primary hover:bg-primary/90 px-4 sm:px-5 py-2 rounded-[10px] transition-colors"
        >
          Get started
        </Link>
      </div>
    </header >
  )
}
