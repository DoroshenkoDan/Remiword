

/**
 * Preview panel showing detected word pairs.
 * On mobile: rendered inside BulkPasteTab.
 * On desktop: rendered in the right column.
 */

import {Check } from 'lucide-react'
import { WordPair } from '@/types/word'


interface PreviewTableProps {
  pairs: WordPair[]
  category: string
}

export function PreviewTable({ pairs, category}: PreviewTableProps) {

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-semibold text-text-muted tracking-[0.08em]">
          PREVIEW — {pairs.length} WORDS
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {pairs.map((pair, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-2 rounded-[8px] bg-nav-active/5 border border-nav-active/10"
          >
                <span className="flex-1 text-[13px] text-text-primary">{pair.word}</span>
                <span className="flex-1 text-[13px] text-text-secondary">{pair.translation}</span>
          </div>
        ))}
      </div>

  
      {pairs.length === 0 ? null :<div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-[8px] mt-1 bg-success/8 border border-success/20">
        <Check size={14} strokeWidth={1.5} className="text-success" />
        <span className="text-[12px] text-success">
          {pairs.length} words ready to save to {category}
        </span>
      </div>}
    </div>
  )
}
