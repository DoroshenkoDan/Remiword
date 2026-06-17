'use client'

/**
 * Bulk paste tab — textarea input with auto-detection of word pairs.
 * Parses lines using common separators: dash, colon, equals, pipe.
 */

import { Textarea } from '@/components/ui/textarea'

interface BulkPasteProps {
  bulkText: string
  onBulkTextChange: (text: string) => void
  detectedCount: number
}

export function BulkPaste({
  bulkText,
  onBulkTextChange,
  detectedCount,
}: BulkPasteProps) {
  return (
    <div className="flex flex-col gap-1">
      <Textarea
        value={bulkText}
        onChange={(e) => onBulkTextChange(e.target.value)}
        placeholder={'Hello - Привіт\nGood morning - Добрий ранок'}
        className="resize-none min-h-45 bg-surface border-nav-active/30 text-text-primary text-[13px] rounded-[10px] leading-relaxed"
      />
      <div className="flex items-center justify-between">
        {detectedCount > 0 ? (
          <span className="text-[11px] text-nav-active">{detectedCount} pairs detected</span>
        ) : (
          <span />
        )}
        {bulkText && (
          <button
            onClick={() => onBulkTextChange('')}
            className="text-[11px] text-text-secondary bg-transparent border-none cursor-pointer hover:opacity-70"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
