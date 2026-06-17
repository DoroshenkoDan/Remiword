'use client'

import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'

interface AddWordsHeaderProps {
  pairCount: number
  onSave: () => void
  isSaving?: boolean
}

export function AddWordsHeader({ pairCount, onSave, isSaving }: AddWordsHeaderProps) {
  return (
    <div className="flex items-center justify-between px-8 py-4 shrink-0 border-b border-border">
      <div className="flex items-center gap-2">
        <Link
          href="/words"
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          <span className="text-md">Words</span>
        </Link>
        <ChevronRight size={14} strokeWidth={1.5} className="text-text-muted" />
        <span className="text-md text-text-primary">Add Words</span>
      </div>

      <button
        onClick={onSave}
        disabled={pairCount === 0 || isSaving}
        className="bg-primary text-text-primary text-[13px] font-medium px-4 py-1.75 rounded-[8px] disabled:opacity-40 hover:opacity-80 transition-opacity cursor-pointer border-none"
      >
        {isSaving ? 'Saving…' : `Save all ${pairCount > 0 ? pairCount : ''} words`}
      </button>
    </div>
  )
}
